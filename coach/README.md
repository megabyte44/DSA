# coach/ — the sync contract

How the sheet and the coach talk to each other. Both sides are files in the DSA folder;
there is no server. `coach-sync.js` (loaded by `index.html`) holds a File System Access
handle to this folder and does the reading and writing.

## Files

| File | Written by | Read by | When |
|---|---|---|---|
| `progress.json` | sheet | coach | every state change, debounced ~0.7s |
| `LOG.md` | sheet (appends) + you | coach | on every "Done" in the coach panel |
| `coach.json` | coach | sheet | polled every 10s while linked |
| `leetcode.json` | sheet | coach | on every LeetCode sync |
| `WEAKNESS.md` | coach | you | after each day — never resets |
| `PROFILE.md` | coach | coach, you | when the durable layer changes |
| `coach/qbank-index.json` | `coach/build-index.py` | coach | when `questions.json` changes |

## progress.json

```json
{
  "schema": 1,
  "writtenAt": "2026-08-13T14:02:11.000Z",
  "day": 1,
  "summary": {
    "total": 378, "solved": 210, "pct": 56,
    "byStatus": { "not-attempted": 150, "mastered": 190, "revision": 20, "failed": 18 },
    "byTopic": { "graphs": { "tier": 3, "total": 33, "mastered": 8, "revision": 3,
                             "failed": 5, "not-attempted": 17, "solved": 11, "pct": 33 } },
    "weakest": [ { "topic": "graphs", "tier": 3, "pct": 33, "failed": 5, "revision": 3 } ],
    "stuck": ["lc:..."],
    "needsRevision": ["lc:..."]
  },
  "resolveQueue": ["lc:..."],
  "assignment": { "id": "...", "day": 1, "label": "Day 1", "items": [ /* with timings + buckets */ ] },
  "state": { "status": {}, "notes": {}, "added": [], "hidden": [], "activity": [] }
}
```

`summary` is precomputed so a session can read the shape of the problem without
parsing 378 questions. `assignment.items` carry `elapsedMs`, `outcome` and `bucket`
after a solve — that is the timing evidence behind each LOG entry.

## coach.json

Everything is optional except `id`. `id` is the idempotency key: the sheet keeps the
last 50 applied ids and ignores a repeat, so re-writing the same file is safe.

```json
{
  "schema": 1,
  "id": "2026-08-13-day1",
  "day": 1,
  "setLabel": "Day 1",
  "blind": true,

  "assign": [
    { "slot": "D1-P1", "qid": "lc:koko-eating-bananas", "capMin": 25 }
  ],

  "addQuestions": [
    { "id": "added:coach-monotonic-1", "name": "Sum of Subarray Minimums",
      "url": "https://leetcode.com/problems/sum-of-subarray-minimums/",
      "topic": "stack", "hard": true }
  ],

  "setStatus": { "lc:number-of-islands": "revision" },
  "setNotes":  { "lc:number-of-islands": "D2 — capped, bucket 2, grid bounds check" },
  "resolveQueue": ["lc:number-of-islands"],
  "unhide": [],
  "syncLeetcode": true
}
```

- `assign[].qid` must exist in `questions.json` **or** be added in the same file via
  `addQuestions` (ids for outside problems use the `added:` prefix so the sheet's own
  add-question flow doesn't collide).
- `addQuestions[].topic` must be one of the 17 section ids in `questions.json`.
- `setStatus` values: `not-attempted` · `mastered` · `revision` · `failed`.
- `resolveQueue` is replaced wholesale when present — the coach owns it.

## Status ↔ bucket mapping

The panel writes both a bucket (LOG.md) and a sheet status from one click:

| Outcome | Bucket | Sheet status | Re-solve queue |
|---|---|---|---|
| Clean solve inside cap | 4 | `mastered` | removed |
| Solved but slow / messy | 3 | `revision` | unchanged |
| Cap hit | 1 or 2 (asked) | `failed` | added |

## LeetCode

The page can't call `leetcode.com` — no CORS — so `serve.js` proxies it. Nothing works
over `file://`; run `npm run serve` and use `http://localhost:5173`.

| Route | Needs cookie | Gives |
|---|---|---|
| `/api/leetcode/status` | no | is a username set, is there a session cookie |
| `/api/leetcode/profile` | no | solved counts by difficulty, ranking, contest rating |
| `/api/leetcode/recent` | no | last N accepted submissions with timestamps and language |
| `/api/leetcode/calendar` | no | streak, total active days |
| `/api/leetcode/solved` | **yes** | every accepted and every attempted-but-unsolved problem |

Credentials go in `.env` (gitignored) — see `.env.example`. `LEETCODE_SESSION` expires
every few weeks; the panel says so when it's rejected.

### Reconcile rules

349 of the 378 questions are LeetCode, and `lc:<slug>` matches the URL slug exactly, so
the mapping is 1:1. The remaining 43 are GFG and are never touched.

The reconcile is **upgrade-only**:

| Sheet says | LeetCode says | Result |
|---|---|---|
| `not-attempted` | accepted | promoted to `mastered`, recorded in `applied` |
| `failed` | accepted | **left alone**, recorded in `conflicts` |
| `revision` | accepted | **left alone**, recorded in `conflicts` |
| `mastered` | accepted | agreement, no-op |
| `mastered` | no accept | left alone, recorded in `unverified` |
| `not-attempted` | attempted, unsolved | left alone, recorded in `attemptedOnly` |

A LeetCode accept never clears a capped attempt. Solving it untimed, days later, with a
hint open is a different event from solving it clean in 25 minutes, and collapsing the
two would quietly destroy the only signal the buckets carry. Those land in `conflicts`
and get read.

`leetcode.json` also carries `outsideBank` — accepted problems that aren't in the sheet
at all. That's the honest picture of what's being ground outside the plan.

## Regenerating the index

```bash
python3 coach/build-index.py
```

Run it after adding questions to `questions.json`. Questions added through the sheet
(or through `coach.json`) live in `progress.json` under `state.added` and need no rebuild.
