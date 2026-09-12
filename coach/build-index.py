#!/usr/bin/env python3
"""Flatten questions.json into coach/qbank-index.json.

One dict keyed by qid with name, url, topic, tier, card, group and an
intra-topic difficulty rank. Lets a coaching session pick problems without
walking the nested tier/card/section structure every time.

    python3 coach/build-index.py
"""
import collections
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'questions.json')
OUT = os.path.join(ROOT, 'coach', 'qbank-index.json')


def main():
    with open(SRC, encoding='utf-8') as f:
        d = json.load(f)

    qs = d['questions']
    idx, order = {}, []

    for sec in d['prioritySections']:
        for card in sec['cards']:
            for sub in card['sections']:
                for ref in sub['questions']:
                    qid = ref['id']
                    if qid in idx:
                        continue
                    q = qs.get(qid, {})
                    idx[qid] = {
                        'name': q.get('name', qid),
                        'url': q.get('url', ''),
                        'src': q.get('source', ''),
                        'hard': bool(q.get('hard')),
                        'topic': sec['id'],
                        'tier': sec['tier'],
                        'card': card['title'],
                        'group': sub.get('label', ''),
                    }
                    order.append(qid)

    bytopic = collections.defaultdict(list)
    for qid in order:
        bytopic[idx[qid]['topic']].append(qid)

    # position within its topic, 0..1 — a rough difficulty proxy since the
    # sheet is already ordered easy -> hard inside each card
    for ids in bytopic.values():
        n = len(ids)
        for i, qid in enumerate(ids):
            idx[qid]['rank'] = round(i / (n - 1), 3) if n > 1 else 0.0

    out = {
        'schema': 1,
        'generatedFrom': 'questions.json',
        'count': len(idx),
        'tiers': {str(t['id']): t['title'] for t in d['tiers']},
        'topics': {s['id']: {'tier': s['tier'], 'count': len(bytopic[s['id']])}
                   for s in d['prioritySections']},
        'order': order,
        'q': idx,
    }

    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=1)

    print(f'{len(idx)} questions -> coach/qbank-index.json')
    for t, ids in sorted(bytopic.items(), key=lambda kv: -len(kv[1])):
        print(f'  {t:<14} {len(ids)}')


if __name__ == '__main__':
    main()
