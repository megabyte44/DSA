# campaigns/

One folder per push at a target. A campaign is a finite thing with a deadline and
an outcome; the coach is not.

```
campaigns/
  2026-08-fidelity/
    PLAN.md      the plan for that push
    LOG.md       archived from the root on close
    RETRO.md     what the buckets said, written at close
```

## What lives where

| | Scope | Resets? |
|---|---|---|
| `PROFILE.md` | who he is, current mark, standing weaknesses, the rules | never |
| `WEAKNESS.md` | the skill model — buckets, topic hit rate, re-solve queue | never |
| `PLAN.md` (root) | the **active** campaign's plan | per campaign |
| `LOG.md` (root) | the **active** campaign's problem log | per campaign |
| `campaigns/<slug>/` | everything archived from a closed campaign | — |

The sheet always appends to the root `LOG.md`, so nothing in `coach-sync.js` needs to
know which campaign is active.

## Opening a campaign

1. Add a row to the History table in `PROFILE.md`, set the current mark.
2. Write the new root `PLAN.md`.
3. Reset the **current campaign** bucket tally in `WEAKNESS.md`. Leave the all-time
   tally, the topic hit rate and the re-solve queue alone.

## Closing one

1. Write `campaigns/<slug>/RETRO.md` — bucket movement start to finish, which topics
   flipped, what the re-solve queue still holds, what the outcome was.
2. Move the root `PLAN.md` and `LOG.md` into the campaign folder.
3. Promote anything that survived the whole campaign into **Standing weaknesses** in
   `PROFILE.md`.
4. Start the next root `LOG.md` from the template header.

A campaign closing without an offer is not a failed campaign. The retro is the point:
the re-solve queue and the standing weaknesses are what the next one starts from.
