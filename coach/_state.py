"""Shared state loading for the coach scripts.

Every file is optional. Nothing here raises because a file is missing — the
brief is supposed to *tell* you what's missing, not die on it.
"""
import json
import os
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATUS_SOLVED = {'mastered', 'revision'}
BUCKET_DESC = {
    1: 'pattern not recognised',
    2: 'pattern known, implementation failed',
    3: 'solved but slow / brute-force / messy',
    4: 'clean solve in cap',
}
OUTCOME_BUCKET = {'clean': 4, 'weak': 3, 'cap': None}  # cap -> 1 or 2, asked at log time


def p(*parts):
    return os.path.join(ROOT, *parts)


def load_json(name, default=None):
    path = p(*name.split('/')) if '/' in name else p(name)
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return default


def load_text(name, default=''):
    path = p(*name.split('/')) if '/' in name else p(name)
    try:
        with open(path, encoding='utf-8') as f:
            return f.read()
    except Exception:
        return default


def age_hours(name):
    path = p(*name.split('/')) if '/' in name else p(name)
    try:
        return (time.time() - os.path.getmtime(path)) / 3600.0
    except Exception:
        return None


def fmt_age(h):
    if h is None:
        return 'missing'
    if h < 1:
        return f'{int(h * 60)}m ago'
    if h < 48:
        return f'{h:.0f}h ago'
    return f'{h / 24:.0f}d ago'


class State:
    def __init__(self):
        self.index = load_json('coach/qbank-index.json', {}) or {}
        self.q = self.index.get('q', {})
        self.progress = load_json('progress.json')
        self.leetcode = load_json('leetcode.json')
        self.legacy = load_json('progress-import.json')
        self.log = load_text('LOG.md')
        self.profile_md = load_text('PROFILE.md')

    # ---- derived ----
    @property
    def linked(self):
        return self.progress is not None

    @property
    def status(self):
        """qid -> status, from progress.json, falling back to the legacy import."""
        if self.progress:
            return (self.progress.get('state') or {}).get('status', {}) or {}
        if self.legacy:
            return self.legacy.get('status', {}) or {}
        return {}

    @property
    def summary(self):
        return (self.progress or {}).get('summary') or {}

    @property
    def history(self):
        """Flat list of every completed problem across every day."""
        out = []
        for day in (self.progress or {}).get('history', []) or []:
            for it in day.get('items', []):
                r = dict(it)
                r['day'] = day.get('day')
                r['date'] = day.get('date')
                out.append(r)
        # the in-flight set counts too
        cur = (self.progress or {}).get('assignment')
        if cur:
            for it in cur.get('items', []):
                if it.get('done'):
                    r = dict(it)
                    r['day'] = cur.get('day')
                    r['date'] = cur.get('date')
                    out.append(r)
        return out

    @property
    def resolve_queue(self):
        return (self.progress or {}).get('resolveQueue', []) or []

    def name(self, qid):
        m = self.q.get(qid)
        if m:
            return m['name']
        for a in ((self.progress or {}).get('state') or {}).get('added', []) or []:
            if a.get('id') == qid:
                return a.get('name', qid)
        return qid

    def topic(self, qid):
        m = self.q.get(qid)
        return m['topic'] if m else '?'

    def buckets(self, scope=None):
        """scope=None -> all time; scope=day_int -> that campaign day onward."""
        counts = {1: 0, 2: 0, 3: 0, 4: 0}
        for r in self.history:
            b = r.get('bucket')
            if b in counts and (scope is None or (r.get('day') or 0) >= scope):
                counts[b] += 1
        return counts

    def topic_rates(self):
        """topic -> (clean, attempts) from logged attempts only."""
        agg = {}
        for r in self.history:
            t = self.topic(r['qid'])
            c, n = agg.get(t, (0, 0))
            agg[t] = (c + (1 if r.get('bucket') == 4 else 0), n + 1)
        return agg
