#!/usr/bin/env python3
"""Session startup. One command, everything the coach needs to know.

    python3 coach/brief.py

Prints campaign state, LeetCode standing, sheet coverage, bucket tallies,
the re-solve queue, recent attempts, and — importantly — what's stale or
missing, so the coach never reasons from data that isn't there.
"""
import sys

from _state import State, fmt_age, age_hours, BUCKET_DESC


def bar(pct, width=18):
    filled = int(round(pct / 100 * width))
    return '#' * filled + '.' * (width - filled)


def main():
    s = State()
    W = []
    out = print

    out('=' * 62)
    out('  DSA COACH — SESSION BRIEF')
    out('=' * 62)

    # ---------------- campaign ----------------
    day = (s.progress or {}).get('day', 0)
    out(f'\nCAMPAIGN  2026-08-fidelity   day {day or "not started"}')
    out(f'  target        Fidelity-track fintech SDE, ~12 LPA')
    out(f'  scope         DSA only')

    # ---------------- data health ----------------
    out('\nDATA')
    for f in ('progress.json', 'leetcode.json', 'LOG.md', 'WEAKNESS.md'):
        h = age_hours(f)
        flag = ''
        if h is None:
            flag = '   <-- MISSING'
            if f == 'progress.json':
                W.append('progress.json missing — folder never linked. Coaching blind.')
            if f == 'leetcode.json':
                W.append('leetcode.json missing — run `npm run serve`, open localhost:5173, hit Sync.')
        elif f == 'progress.json' and h > 36:
            flag = '   <-- stale'
            W.append(f'progress.json is {fmt_age(h)} — sheet may have drifted since.')
        out(f'  {f:<18}{fmt_age(h):<12}{flag}')

    # ---------------- leetcode ----------------
    lc = s.leetcode
    out('\nLEETCODE')
    if not lc:
        out('  not synced')
    else:
        prof = lc.get('profile') or {}
        solved = prof.get('solved') or []
        tot = next((d['count'] for d in solved if d.get('difficulty') == 'All'), None)
        parts = [f"{d['difficulty']} {d['count']}" for d in solved if d.get('difficulty') != 'All']
        out(f"  user          {lc.get('username')}   synced {fmt_age(age_hours('leetcode.json'))}")
        if tot is not None:
            out(f"  solved        {tot}   ({', '.join(parts)})")
        contest = prof.get('contest')
        if contest and contest.get('rating'):
            out(f"  contest       {round(contest['rating'])}  ({contest.get('attendedContestsCount', 0)} contests)")
        rec = lc.get('reconcile')
        if rec:
            out(f"  sheet cover   {rec['coverage']}%  {bar(rec['coverage'])}  "
                f"({rec['accepted']} accepted vs {rec['bankLeetcode']} in sheet)")
            if rec.get('conflicts'):
                out(f"  conflicts     {len(rec['conflicts'])}   accepted on LC but failed/revision here")
                for c in rec['conflicts'][:6]:
                    out(f"                  - {s.name(c['qid'])}  [{c['sheet']}]")
                if len(rec['conflicts']) > 6:
                    out(f"                  ... +{len(rec['conflicts']) - 6} more")
            if rec.get('outsideBank'):
                out(f"  off-plan      {len(rec['outsideBank'])} accepted problems not in the sheet")
        else:
            out('  full reconcile off — no LEETCODE_SESSION, or cookie expired')
            W.append('LeetCode reconcile unavailable — only public stats.')

    # ---------------- sheet ----------------
    out('\nSHEET')
    summ = s.summary
    if summ:
        out(f"  solved        {summ['solved']}/{summ['total']}  ({summ['pct']}%)  {bar(summ['pct'])}")
        bs = summ.get('byStatus', {})
        out(f"  breakdown     mastered {bs.get('mastered', 0)} · "
            f"revision {bs.get('revision', 0)} · stuck {bs.get('failed', 0)} · "
            f"untouched {bs.get('not-attempted', 0)}")
        out('  weakest topics')
        for w in summ.get('weakest', [])[:6]:
            out(f"     T{w['tier']}  {w['topic']:<14}{w['pct']:>3}%  {bar(w['pct'], 14)}"
                f"   stuck {w['failed']}")
    elif s.legacy:
        st = s.legacy.get('status', {})
        out(f'  no progress.json — falling back to progress-import.json ({len(st)} entries)')
        W.append('Sheet numbers are from the stale June import, not live state.')
    else:
        out('  no data')

    # ---------------- buckets ----------------
    hist = s.history
    out('\nBUCKETS')
    if not hist:
        out('  no logged attempts yet')
    else:
        allt = s.buckets()
        n = sum(allt.values())
        for b in (1, 2, 3, 4):
            c = allt[b]
            pct = round(c / n * 100) if n else 0
            out(f'  {b}  {BUCKET_DESC[b]:<42}{c:>3}  {pct:>3}%')
        clean = allt[4] / n if n else 0
        out(f'\n  clean rate    {clean * 100:.0f}%   over {n} logged attempts')
        rates = s.topic_rates()
        if rates:
            out('  by topic (clean/attempts)')
            for t, (c, tot) in sorted(rates.items(), key=lambda kv: kv[1][0] / kv[1][1]):
                out(f'     {t:<14}{c}/{tot}')

    # ---------------- re-solve queue ----------------
    q = s.resolve_queue
    out(f'\nRE-SOLVE QUEUE  ({len(q)})')
    if not q:
        out('  empty')
    for qid in q[:12]:
        out(f'  - {s.name(qid):<46}{s.topic(qid)}')
    if len(q) > 12:
        out(f'  ... +{len(q) - 12} more')

    # ---------------- recent ----------------
    out('\nRECENT ATTEMPTS')
    if not hist:
        out('  none')
    for r in hist[-8:]:
        mins = round((r.get('elapsedMs') or 0) / 60000)
        tag = {'clean': 'CLEAN', 'weak': 'WEAK', 'cap': 'CAP HIT'}.get(r.get('outcome'), '?')
        out(f"  {r.get('slot', '?'):<8}{s.name(r['qid'])[:38]:<40}{mins:>3}min  {tag:<8}b{r.get('bucket')}")
        if r.get('note'):
            out(f"           note: {r['note']}")

    # ---------------- warnings ----------------
    if W:
        out('\n' + '!' * 62)
        for w in W:
            out('  ! ' + w)
        out('!' * 62)

    out('\n' + '=' * 62)
    if not s.linked:
        out('  NEXT: link the folder in the sheet, then `npm run serve` + Sync')
    elif not hist:
        out('  NEXT: python3 coach/pick.py --day 1   (writes coach.json)')
    else:
        out(f'  NEXT: python3 coach/pick.py --day {(day or 0) + 1}')
    out('=' * 62)
    return 0


if __name__ == '__main__':
    sys.exit(main())
