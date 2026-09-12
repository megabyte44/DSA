/* Static server for the sheet + LeetCode proxy.
 *
 *     node serve.js      ->  http://localhost:5173
 *
 * Two reasons this exists:
 *   1. Chrome's folder picker (File System Access) wants a real origin,
 *      which a file:// URL doesn't reliably provide.
 *   2. LeetCode's API can't be called from the page — no CORS headers —
 *      but it can be called from here, server side.
 *
 * Credentials live in .env (already gitignored). Nothing is required:
 * with no cookie the public endpoints still work, just shallower.
 *
 *   LEETCODE_USERNAME=your-handle
 *   LEETCODE_SESSION=...      # optional, unlocks the full solved list
 *   LEETCODE_CSRF=...         # optional, some endpoints want it alongside
 */
'use strict';

const express = require('express');
const path = require('path');

try { require('dotenv').config({ path: path.join(__dirname, '.env') }); } catch (e) { /* optional */ }

const app = express();
const PORT = process.env.PORT || 5173;
const LC = 'https://leetcode.com';

const USER = (process.env.LEETCODE_USERNAME || '').trim();
const SESSION = (process.env.LEETCODE_SESSION || '').trim();
const CSRF = (process.env.LEETCODE_CSRF || '').trim();

/* ---------- cached so a page reload doesn't hammer LeetCode ---------- */
const cache = new Map();
const TTL_MS = 5 * 60 * 1000;
function cached(key, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return Promise.resolve(hit.val);
  return fn().then(val => { cache.set(key, { at: Date.now(), val }); return val; });
}

function headers(extra) {
  const h = Object.assign({
    'User-Agent': 'Mozilla/5.0 (dsa-roadmap coach sync)',
    'Referer': LC + '/',
    'Accept': 'application/json'
  }, extra || {});
  const cookie = [
    SESSION ? 'LEETCODE_SESSION=' + SESSION : '',
    CSRF ? 'csrftoken=' + CSRF : ''
  ].filter(Boolean).join('; ');
  if (cookie) h.Cookie = cookie;
  if (CSRF) h['x-csrftoken'] = CSRF;
  return h;
}

async function gql(query, variables) {
  const r = await fetch(LC + '/graphql', {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ query, variables: variables || {} })
  });
  if (!r.ok) throw new Error('leetcode graphql ' + r.status);
  const j = await r.json();
  if (j.errors && j.errors.length) throw new Error(j.errors[0].message);
  return j.data;
}

/* ---------- public profile ---------- */
const Q_PROFILE = `query profile($u: String!) {
  matchedUser(username: $u) {
    username
    profile { realName ranking reputation }
    submitStats { acSubmissionNum { difficulty count submissions }
                  totalSubmissionNum { difficulty count submissions } }
    badges { displayName }
    tagProblemCounts {
      advanced     { tagName tagSlug problemsSolved }
      intermediate { tagName tagSlug problemsSolved }
      fundamental  { tagName tagSlug problemsSolved }
    }
  }
  userContestRanking(username: $u) { rating globalRanking attendedContestsCount topPercentage }
}`;

const Q_RECENT = `query recent($u: String!, $n: Int!) {
  recentAcSubmissionList(username: $u, limit: $n) { id title titleSlug timestamp lang }
}`;

const Q_CALENDAR = `query cal($u: String!) {
  matchedUser(username: $u) { userCalendar { streak totalActiveDays submissionCalendar } }
}`;

app.get('/api/leetcode/profile', async (req, res) => {
  const u = (req.query.user || USER).trim();
  if (!u) return res.status(400).json({ error: 'no username — set LEETCODE_USERNAME in .env' });
  try {
    const data = await cached('profile:' + u, () => gql(Q_PROFILE, { u }));
    res.json(data);
  } catch (e) { res.status(502).json({ error: String(e.message || e) }); }
});

app.get('/api/leetcode/recent', async (req, res) => {
  const u = (req.query.user || USER).trim();
  const n = Math.min(Number(req.query.limit) || 20, 100);
  if (!u) return res.status(400).json({ error: 'no username — set LEETCODE_USERNAME in .env' });
  try {
    const data = await cached('recent:' + u + ':' + n, () => gql(Q_RECENT, { u, n }));
    res.json(data);
  } catch (e) { res.status(502).json({ error: String(e.message || e) }); }
});

app.get('/api/leetcode/calendar', async (req, res) => {
  const u = (req.query.user || USER).trim();
  if (!u) return res.status(400).json({ error: 'no username — set LEETCODE_USERNAME in .env' });
  try {
    const data = await cached('cal:' + u, () => gql(Q_CALENDAR, { u }));
    res.json(data);
  } catch (e) { res.status(502).json({ error: String(e.message || e) }); }
});

/* ---------- full solved list (needs the session cookie) ---------- */
app.get('/api/leetcode/solved', async (req, res) => {
  if (!SESSION) {
    return res.status(412).json({
      error: 'no LEETCODE_SESSION in .env',
      hint: 'Log in to leetcode.com, open DevTools > Application > Cookies, copy LEETCODE_SESSION into .env'
    });
  }
  try {
    const out = await cached('solved', async () => {
      const r = await fetch(LC + '/api/problems/all/', { headers: headers() });
      if (!r.ok) throw new Error('leetcode /api/problems/all/ ' + r.status);
      const j = await r.json();
      const pairs = j.stat_status_pairs || [];
      const DIFF = { 1: 'easy', 2: 'medium', 3: 'hard' };
      const ac = [], attempted = [];
      pairs.forEach(p => {
        const slug = p.stat && p.stat.question__title_slug;
        if (!slug) return;
        const row = { slug, title: p.stat.question__title, diff: DIFF[p.difficulty && p.difficulty.level] || '?' };
        if (p.status === 'ac') ac.push(row);
        else if (p.status === 'notac') attempted.push(row);
      });
      return {
        signedInAs: j.user_name || null,
        counts: { total: pairs.length, accepted: ac.length, attempted: attempted.length },
        accepted: ac,
        attempted
      };
    });
    if (!out.signedInAs) {
      return res.status(401).json({ error: 'cookie rejected or expired — re-copy LEETCODE_SESSION into .env' });
    }
    res.json(out);
  } catch (e) { res.status(502).json({ error: String(e.message || e) }); }
});

/* ---------- what the page asks before trying anything ---------- */
app.get('/api/leetcode/status', (req, res) => {
  res.json({ username: USER || null, hasSession: !!SESSION, hasCsrf: !!CSRF });
});

app.use(express.static(__dirname, { extensions: ['html'] }));

app.listen(PORT, () => {
  console.log('DSA sheet     ->  http://localhost:' + PORT);
  console.log('serving       ->  ' + path.resolve(__dirname));
  console.log('leetcode user ->  ' + (USER || 'not set (LEETCODE_USERNAME in .env)'));
  console.log('full sync     ->  ' + (SESSION ? 'on' : 'off (no LEETCODE_SESSION)'));
});
