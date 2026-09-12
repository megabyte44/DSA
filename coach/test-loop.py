#!/usr/bin/env python3
"""End-to-end dry run of a full coaching day, against fixtures.

    python3 coach/test-loop.py

Simulates: pick -> coach.json -> sheet applies -> problems solved -> history
-> tally -> brief. Uses a temp copy of the folder so nothing real is touched.
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

passed = failed = 0


def ok(name, cond, extra=''):
    global passed, failed
    if cond:
        passed += 1
        print(f'  \033[32m/\033[0m {name}')
    else:
        failed += 1
        print(f'  \033[31mX\033[0m {name}' + (f'\n      {extra}' if extra else ''))


def run(tmp, *args):
    r = subprocess.run([sys.executable] + list(args), cwd=tmp,
                       capture_output=True, text=True)
    return r


def main():
    tmp = tempfile.mkdtemp(prefix='dsa-loop-')
    os.makedirs(os.path.join(tmp, 'coach'), exist_ok=True)
    for f in ('questions.json', 'progress-import.json', 'PROFILE.md', 'LOG.md'):
        src = os.path.join(ROOT, f)
        if os.path.exists(src):
            shutil.copy(src, tmp)
    for f in ('_state.py', 'brief.py', 'pick.py', 'tally.py',
              'build-index.py', 'qbank-index.json'):
        src = os.path.join(HERE, f)
        if os.path.exists(src):
            shutil.copy(src, os.path.join(tmp, 'coach'))

    print('\nfull-loop dry run\n')

    # --- 1. pick writes coach.json
    r = run(tmp, 'coach/pick.py', '--day', '1', '--seed', '3')
    ok('pick.py exits clean', r.returncode == 0, r.stderr[:300])
    cj = os.path.join(tmp, 'coach.json')
    ok('coach.json written', os.path.exists(cj))
    doc = json.load(open(cj)) if os.path.exists(cj) else {}
    ok('six problems assigned', len(doc.get('assign', [])) == 6,
       str(len(doc.get('assign', []))))
    ok('slots are sequential',
       [a['slot'] for a in doc.get('assign', [])] == [f'D1-P{i}' for i in range(1, 7)])
    ok('every qid resolves in the bank',
       all(a['qid'] in json.load(open(os.path.join(tmp, 'coach/qbank-index.json')))['q']
           for a in doc.get('assign', [])))
    ok('set is blind', doc.get('blind') is True)
    ok('cap defaults to 25', all(a['capMin'] == 25 for a in doc.get('assign', [])))

    # picking twice with the same seed is stable
    shutil.copy(cj, cj + '.first')
    run(tmp, 'coach/pick.py', '--day', '1', '--seed', '3')
    ok('same seed gives the same set',
       json.load(open(cj))['assign'] == json.load(open(cj + '.first'))['assign'])

    # --- 2. simulate the sheet applying it and him working the day
    qids = [a['qid'] for a in doc['assign']]
    outcomes = [('clean', 4, 14), ('cap', 2, 25), ('weak', 3, 22),
                ('clean', 4, 11), ('cap', 1, 25), ('weak', 3, 24)]
    items = []
    for (qid, a, (out, bucket, mins)) in zip(qids, doc['assign'], outcomes):
        items.append({'slot': a['slot'], 'qid': qid, 'outcome': out, 'bucket': bucket,
                      'capMin': 25, 'elapsedMs': mins * 60000,
                      'note': 'sim' if out == 'cap' else ''})
    status = {}
    for it in items:
        status[it['qid']] = {'clean': 'mastered', 'weak': 'revision',
                             'cap': 'failed'}[it['outcome']]
    queue = [it['qid'] for it in items if it['outcome'] == 'cap']

    progress = {
        'schema': 1, 'writtenAt': '2026-08-13T10:00:00Z', 'day': 1,
        'summary': {'total': 378, 'solved': 4, 'pct': 1,
                    'byStatus': {'not-attempted': 374, 'mastered': 2,
                                 'revision': 2, 'failed': 2},
                    'byTopic': {}, 'weakest': [], 'stuck': [], 'needsRevision': []},
        'resolveQueue': queue,
        'assignment': {'id': doc['id'], 'day': 1, 'label': 'Day 1',
                       'date': '2026-08-13',
                       'items': [dict(i, done=True) for i in items]},
        'history': [],
        'state': {'status': status, 'notes': {}, 'added': [], 'hidden': [],
                  'activity': ['2026-08-13']},
    }
    json.dump(progress, open(os.path.join(tmp, 'progress.json'), 'w'), indent=1)

    # --- 3. tally
    r = run(tmp, 'coach/tally.py')
    ok('tally.py exits clean', r.returncode == 0, r.stderr[:300])
    w = open(os.path.join(tmp, 'WEAKNESS.md'), encoding='utf-8').read()
    ok('tally counted all six attempts', '6 logged attempts' in w or 'over 6' in w, w[:200])
    ok('clean rate computed', 'Clean rate **33%**' in w, [l for l in w.split('\n') if 'Clean rate' in l])
    ok('re-solve queue listed', all(q.split(':')[-1][:12] in w or q in w for q in queue))
    ok('topic hit rate populated', 'Topic hit rate' in w and '| Topic |' in w)

    # --- 4. brief reads it back
    r = run(tmp, 'coach/brief.py')
    ok('brief.py exits clean', r.returncode == 0, r.stderr[:300])
    o = r.stdout
    ok('brief shows day 1', 'day 1' in o)
    ok('brief shows bucket spread', 'clean rate' in o and '33%' in o)
    ok('brief lists the re-solve queue', f'RE-SOLVE QUEUE  ({len(queue)})' in o)
    ok('brief shows recent attempts', 'CAP HIT' in o and 'CLEAN' in o)
    ok('brief warns leetcode is unsynced', 'leetcode.json missing' in o)
    ok('brief suggests day 2 next', '--day 2' in o)

    # --- 5. day 2 must not re-serve day 1's clean solves
    r = run(tmp, 'coach/pick.py', '--day', '2', '--seed', '5')
    ok('day 2 picks cleanly', r.returncode == 0, r.stderr[:300])
    d2 = json.load(open(cj))
    d2q = [a['qid'] for a in d2['assign']]
    solved_clean = [it['qid'] for it in items if it['outcome'] == 'clean']
    ok('clean solves are not re-served', not any(q in d2q for q in solved_clean))
    ok('capped problems return via the queue', any(q in d2q for q in queue),
       f'queue={queue} day2={d2q}')
    ok('day 2 slots renumbered', d2['assign'][0]['slot'] == 'D2-P1')
    ok('day 2 has a distinct id', d2['id'] != doc['id'])

    shutil.rmtree(tmp, ignore_errors=True)
    print(f'\n{passed} passed, {failed} failed\n')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
