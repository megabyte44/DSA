#!/usr/bin/env python3
"""Select the day's set and write coach.json.

    python3 coach/pick.py --day 1
    python3 coach/pick.py --day 3 --count 6 --cap 25
    python3 coach/pick.py --day 4 --topic graphs --dry

Selection, in order:
  1. Re-solve queue — capped problems come back, oldest first, never same-day.
  2. Weak topics — lowest clean rate from logged buckets; falls back to sheet
     coverage and LeetCode gaps when there's no bucket history yet.
  3. Tier weight — Tier 1 and 2 carry the target, so they're favoured.
  4. Difficulty spread — the set is ordered easy to hard by intra-topic rank so
     the day opens with a win instead of a wall.

Prints its reasoning. That output is for the coach, not for Punith — he gets
the problems unlabeled.
"""
import argparse
import json
import random
import sys
import time
from datetime import date

from _state import State, STATUS_SOLVED

TIER_WEIGHT = {1: 1.0, 2: 0.95, 3: 0.75, 4: 0.4}
RECENT_DAYS = 3       # don't re-serve something assigned this recently
MAX_FROM_QUEUE = 2    # re-solves shouldn't eat the whole day


def build_pool(s, only_topic=None, max_tier=4):
    status = s.status
    hidden = set(((s.progress or {}).get('state') or {}).get('hidden', []) or [])
    recent = set()
    for r in s.history:
        if (r.get('day') or 0) >= 0:
            recent.add(r['qid'])
    recent_cut = set(list(recent)[-RECENT_DAYS * 6:]) if recent else set()

    queue = set(s.resolve_queue)
    pool = []
    for qid, m in s.q.items():
        if qid in hidden:
            continue
        if only_topic and m['topic'] != only_topic:
            continue
        if m['tier'] > max_tier:
            continue
        st = status.get(qid, 'not-attempted')
        if st in STATUS_SOLVED and qid not in queue:
            continue          # already solved and not owed a re-solve
        if qid in recent_cut and qid not in queue:
            continue
        pool.append(qid)
    return pool


def topic_weakness(s):
    """topic -> 0..1, higher means weaker. Buckets first, coverage as fallback.

    Must cover *every* topic. Scoring a missing topic with a flat default lets a
    fully-covered topic outrank a genuinely weak one, which is exactly backwards.
    """
    rates = s.topic_rates()
    out = {}
    if rates:
        for t, (clean, n) in rates.items():
            if n >= 2:
                out[t] = 1.0 - (clean / n)

    summ = s.summary
    # byTopic carries all 17; weakest is only the top 5 and can't stand alone
    for t, d in (summ.get('byTopic') or {}).items():
        out.setdefault(t, 1.0 - (d.get('pct', 0) / 100))
    for w in summ.get('weakest', []) or []:
        out.setdefault(w['topic'], 1.0 - (w['pct'] / 100))

    if not out:
        # nothing logged and no live sheet — use the index + whatever status we have
        status = s.status
        agg = {}
        for qid, m in s.q.items():
            c, n = agg.get(m['topic'], (0, 0))
            agg[m['topic']] = (c + (1 if status.get(qid) in STATUS_SOLVED else 0), n + 1)
        for t, (c, n) in agg.items():
            out[t] = 1.0 - (c / n) if n else 1.0
    return out


def score(s, qid, weak, rng):
    m = s.q[qid]
    w = weak.get(m['topic'], 0.5)
    tier = TIER_WEIGHT.get(m['tier'], 0.5)
    # mid-difficulty bias: rank 0 is trivial, 1.0 is the nastiest in the topic
    rank = m.get('rank', 0.5)
    shape = 1.0 - abs(rank - 0.45) * 0.8
    jitter = rng.uniform(0.92, 1.08)
    return w * tier * shape * jitter


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--day', type=int, required=True)
    ap.add_argument('--count', type=int, default=6)
    ap.add_argument('--cap', type=int, default=25)
    ap.add_argument('--topic', default=None)
    ap.add_argument('--max-tier', type=int, default=3,
                    help='Tier 4 is "only if you have extra time" — off by default')
    ap.add_argument('--seed', type=int, default=None)
    ap.add_argument('--dry', action='store_true', help="print only, don't write coach.json")
    a = ap.parse_args()

    s = State()
    if not s.q:
        print('no coach/qbank-index.json — run: python3 coach/build-index.py', file=sys.stderr)
        return 1

    rng = random.Random(a.seed if a.seed is not None else int(time.time()))
    weak = topic_weakness(s)
    pool = build_pool(s, a.topic, a.max_tier)
    if not pool:
        print('pool is empty — everything is solved or filtered out', file=sys.stderr)
        return 1

    chosen, why = [], {}

    # 1. re-solve queue
    # Keyed on campaign day, not calendar date: a capped problem must not come
    # back inside the same set, but it must return on a later day even if both
    # days happen on one afternoon.
    today = date.today().isoformat()
    same_set = {r['qid'] for r in s.history if (r.get('day') or 0) >= a.day}
    for qid in s.resolve_queue:
        if len(chosen) >= min(MAX_FROM_QUEUE, a.count):
            break
        if qid in same_set or qid not in s.q:
            continue
        chosen.append(qid)
        why[qid] = 're-solve queue'

    # 2. weighted fill, one per topic before doubling up
    ranked = sorted((q for q in pool if q not in chosen),
                    key=lambda q: -score(s, q, weak, rng))
    used_topics = {s.q[q]['topic'] for q in chosen}
    for qid in ranked:
        if len(chosen) >= a.count:
            break
        t = s.q[qid]['topic']
        if t in used_topics:
            continue
        chosen.append(qid)
        used_topics.add(t)
        why[qid] = f'weak topic {t} ({weak.get(t, 0.5):.0%} miss), T{s.q[qid]["tier"]}'
    for qid in ranked:
        if len(chosen) >= a.count:
            break
        if qid in chosen:
            continue
        chosen.append(qid)
        why[qid] = f'fill · {s.q[qid]["topic"]}'

    # 3. easy -> hard within the day
    chosen.sort(key=lambda q: s.q[q].get('rank', 0.5))

    assign = [{'slot': f'D{a.day}-P{i + 1}', 'qid': q, 'capMin': a.cap}
              for i, q in enumerate(chosen)]

    doc = {
        'schema': 1,
        'id': f'{today}-day{a.day}',
        'day': a.day,
        'setLabel': f'Day {a.day}',
        'blind': True,
        'assign': assign,
        'syncLeetcode': True,
    }

    print(f'\nDay {a.day} — {len(assign)} problems, {a.cap}min cap each')
    print('-' * 78)
    for it in assign:
        m = s.q[it['qid']]
        print(f"  {it['slot']:<8}{m['name'][:36]:<38}{m['topic']:<13}T{m['tier']}  "
              f"r{m.get('rank', 0):.2f}")
        print(f"           {why[it['qid']]}")
    print('-' * 78)
    print('  links (hand these over WITHOUT the topic column):')
    for it in assign:
        print(f"    {it['slot']}  {s.q[it['qid']]['name']}")
        print(f"          {s.q[it['qid']]['url']}")

    if a.dry:
        print('\n[dry run — coach.json not written]')
        return 0

    with open(__import__('_state').p('coach.json'), 'w', encoding='utf-8') as f:
        json.dump(doc, f, indent=2)
    print(f"\ncoach.json written — id {doc['id']}")
    print('the sheet picks it up within 10s if the folder is linked')
    return 0


if __name__ == '__main__':
    sys.exit(main())
