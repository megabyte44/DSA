# PLAN — campaign `2026-08-fidelity`

Target: Fidelity-track fintech SDE, ~12 LPA.
Scope: DSA only.
Length: 10 days, 6 problems a day, 25-minute cap each, handed over unlabeled.

## The problem this plan is solving

It isn't volume. LeetCode says 434 Python3 solves, 235 Array-tagged, 72 DP, 65 DFS,
54 BFS. The hours are already in.

What's missing is evidence of **clean solves under time pressure**. Every existing
record is either a coverage log (the June import: 190 entries, 190 marked mastered,
zero revision, zero failed — nobody's clean rate is 100%) or an untimed LeetCode
accept. Neither says what he'd produce in 25 minutes with someone watching, which is
the only thing the interview actually measures.

So the plan is not "learn more topics." It's **convert volume into timed reliability,
and find out where it isn't.**

## Days 1–3 — calibration

Six problems a day, spread across topics the stale file shows as untouched. Some will
be easy — his LeetCode says graphs and DP are not actually gaps, so if those come back
bucket 4, that's a data correction, not a wasted day. The point is a real bucket
distribution instead of a self-report.

By end of Day 3 there should be ~18 timed attempts and a first honest clean rate.

## Days 4–7 — attack the buckets

Re-weight toward whatever Days 1–3 exposed:

- Heavy **bucket 1** (pattern not recognised) → pattern-recognition drilling, mixed
  sets, no topic labels, more problems per day at lower depth.
- Heavy **bucket 2** (pattern known, implementation failed) → fewer problems, same
  problem re-solved from blank until it's clean. This is the most common failure mode
  for someone with high volume.
- Heavy **bucket 3** (solved but messy) → hardest to fix and most likely here. Focus
  on writing the clean version first rather than iterating into it.

Re-solve queue runs throughout: every capped problem returns, and only leaves on a
clean solve from blank on a later day.

## Days 8–10 — interview conditions

Mixed sets, no warning, tier 1–2 weighted. Talk through the approach out loud before
coding. Any problem that still can't be produced clean by Day 10 is a known gap going
in — which is fine, as long as it's known.

## What would make this campaign a success

Not "all 378 done." A clean rate above 60% on timed attempts, an empty or near-empty
re-solve queue, and no topic sitting at zero clean solves.

## Standing risk

The sheet is not the truth right now — it's two months stale and its labels are
ungraded. Until `progress.json` and `leetcode.json` exist, every pick is made on
partial information. That gets fixed by `npm run serve` + Sync, not by more planning.

---

Archive into `campaigns/2026-08-fidelity/` when this closes. See `campaigns/README.md`.
