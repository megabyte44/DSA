/* ============================================================
   COACH SYNC — folder bridge between the sheet and the coach
   ------------------------------------------------------------
   Writes  progress.json   (state + computed summary)  -> folder
   Writes  LOG.md          (appends one entry per solve)
   Reads   coach.json      (assignments / patches)     <- folder

   Self-contained: injects its own panel + styles, touches app.js
   only through its public globals (state, saveState, buildIndices,
   render, getStatus, QBANK, TOPIC_QIDS, ALL_QIDS).

   Requires the File System Access API (Chrome / Edge).
   ============================================================ */

(function () {
  'use strict';

  const SCHEMA = 1;
  const IDB_NAME = 'dsa-coach';
  const IDB_STORE = 'handles';
  const HANDLE_KEY = 'dir';
  const POLL_MS = 10000;
  const WRITE_DEBOUNCE_MS = 700;

  const supported = typeof window.showDirectoryPicker === 'function';

  const C = {
    dir: null,
    connected: false,
    writeTimer: null,
    pollTimer: null,
    ticker: null,
    lastCoachRaw: '',
    busy: false
  };

  /* ---------- tiny IndexedDB for the directory handle ---------- */
  function idb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(IDB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(IDB_STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function idbSet(k, v) {
    const db = await idb();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(v, k);
      tx.oncomplete = res; tx.onerror = () => rej(tx.error);
    });
  }
  async function idbGet(k) {
    const db = await idb();
    return new Promise((res, rej) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const q = tx.objectStore(IDB_STORE).get(k);
      q.onsuccess = () => res(q.result || null);
      q.onerror = () => rej(q.error);
    });
  }

  /* ---------- file helpers ---------- */
  async function readText(name) {
    if (!C.dir) return null;
    try {
      const fh = await C.dir.getFileHandle(name, { create: false });
      return await (await fh.getFile()).text();
    } catch (e) { return null; }
  }
  async function writeText(name, text) {
    if (!C.dir) return false;
    try {
      const fh = await C.dir.getFileHandle(name, { create: true });
      const w = await fh.createWritable();
      await w.write(text);
      await w.close();
      return true;
    } catch (e) { console.warn('[coach] write failed', name, e); return false; }
  }

  /* ---------- coach slice of state ---------- */
  function cs() {
    if (!state.coach) state.coach = { appliedIds: [], assignment: null, resolveQueue: [], day: 0 };
    if (!state.coach.appliedIds) state.coach.appliedIds = [];
    if (!state.coach.resolveQueue) state.coach.resolveQueue = [];
    return state.coach;
  }

  /* ---------- progress snapshot ---------- */
  function buildSummary() {
    const byStatus = { 'not-attempted': 0, mastered: 0, revision: 0, failed: 0 };
    const byTopic = {};
    (QBANK.prioritySections || []).forEach(sec => {
      const ids = TOPIC_QIDS[sec.id] || [];
      const t = { tier: sec.tier, total: ids.length, mastered: 0, revision: 0, failed: 0, 'not-attempted': 0 };
      ids.forEach(id => { const s = getStatus(id); if (t[s] != null) t[s]++; });
      t.solved = t.mastered + t.revision;
      t.pct = t.total ? Math.round((t.solved / t.total) * 100) : 0;
      byTopic[sec.id] = t;
    });
    (ALL_QIDS || []).forEach(id => { const s = getStatus(id); if (byStatus[s] != null) byStatus[s]++; });
    const total = (ALL_QIDS || []).length;
    const solved = byStatus.mastered + byStatus.revision;
    return {
      total, solved, pct: total ? Math.round((solved / total) * 100) : 0,
      byStatus, byTopic,
      weakest: Object.entries(byTopic)
        .filter(([, t]) => t.total > 0)
        .sort((a, b) => a[1].pct - b[1].pct).slice(0, 5)
        .map(([id, t]) => ({ topic: id, tier: t.tier, pct: t.pct, failed: t.failed, revision: t.revision })),
      stuck: (ALL_QIDS || []).filter(id => getStatus(id) === 'failed'),
      needsRevision: (ALL_QIDS || []).filter(id => getStatus(id) === 'revision')
    };
  }

  function snapshot() {
    return JSON.stringify({
      schema: SCHEMA,
      writtenAt: new Date().toISOString(),
      day: cs().day || 0,
      summary: buildSummary(),
      resolveQueue: cs().resolveQueue,
      assignment: cs().assignment,
      history: cs().history || [],
      leetcode: cs().lc || null,
      state: {
        status: state.status,
        notes: state.notes,
        added: state.added || [],
        hidden: state.hidden || [],
        activity: state.activity || []
      }
    }, null, 2);
  }

  async function writeProgress() {
    if (!C.connected) return;
    await writeText('progress.json', snapshot());
    setPill('synced');
  }
  function scheduleWrite() {
    if (!C.connected) return;
    clearTimeout(C.writeTimer);
    setPill('pending');
    C.writeTimer = setTimeout(writeProgress, WRITE_DEBOUNCE_MS);
  }

  /* ---------- LOG.md ---------- */
  async function appendLog(block) {
    const cur = await readText('LOG.md');
    const body = (cur == null ? '# LOG\n\n---\n' : cur).replace(/\s*$/, '');
    await writeText('LOG.md', body + '\n\n' + block.trim() + '\n');
  }

  /* ---------- coach.json ---------- */
  async function pollCoach() {
    if (!C.connected || C.busy) return;
    const raw = await readText('coach.json');
    if (raw == null || raw === C.lastCoachRaw) return;
    C.lastCoachRaw = raw;
    let c; try { c = JSON.parse(raw); } catch (e) { toast('coach.json is not valid JSON'); return; }
    applyCoach(c);
  }

  function applyCoach(c) {
    const S = cs();
    if (!c || !c.id) return;
    if (S.appliedIds.includes(c.id)) { renderPanel(); return; }

    // 1. questions from outside the bank
    (c.addQuestions || []).forEach(q => {
      if (!q.id || !q.topic) return;
      state.added = state.added || [];
      if (state.added.some(a => a.id === q.id)) return;
      state.added.push({ id: q.id, name: q.name, url: q.url || '#', hard: !!q.hard, topic: q.topic });
    });

    // 2. status + note patches
    Object.entries(c.setStatus || {}).forEach(([qid, st]) => { state.status[qid] = st; });
    Object.entries(c.setNotes || {}).forEach(([qid, n]) => { state.notes[qid] = n; });

    // 3. hidden / unhide
    if (Array.isArray(c.unhide)) state.hidden = (state.hidden || []).filter(id => !c.unhide.includes(id));

    // 4. re-solve queue (coach owns it)
    if (Array.isArray(c.resolveQueue)) S.resolveQueue = c.resolveQueue.slice();

    // 5. the day's set
    if (Array.isArray(c.assign) && c.assign.length) {
      // retire the outgoing set first — the per-problem record (bucket, outcome,
      // time on clock) is the structured evidence behind every LOG.md entry, and
      // it would otherwise be lost the moment a new day loads
      if (S.assignment && S.assignment.items && S.assignment.items.some(x => x.done)) {
        S.history = S.history || [];
        S.history.push({
          id: S.assignment.id, day: S.assignment.day,
          label: S.assignment.label, date: S.assignment.date,
          items: S.assignment.items.filter(x => x.done).map(x => ({
            slot: x.slot, qid: x.qid, outcome: x.outcome, bucket: x.bucket,
            capMin: x.capMin, elapsedMs: x.elapsedMs, note: x.note || ''
          }))
        });
        S.history = S.history.slice(-120);
      }
      S.day = c.day || S.day;
      S.assignment = {
        id: c.id,
        day: c.day || 0,
        label: c.setLabel || ('Day ' + (c.day || '')),
        blind: c.blind !== false,
        date: (typeof todayStr === 'function' ? todayStr() : ''),
        items: c.assign.map((a, i) => ({
          slot: a.slot || ('D' + (c.day || 0) + '-P' + (i + 1)),
          qid: a.qid,
          capMin: a.capMin || 25,
          startedAt: null,
          elapsedMs: 0,
          done: false,
          outcome: null
        }))
      };
    }

    S.appliedIds.push(c.id);
    S.appliedIds = S.appliedIds.slice(-50);

    // 6. coach can ask for a LeetCode refresh
    if (c.syncLeetcode) setTimeout(() => lcSync(true), 0);

    saveState();
    try { buildIndices(); render(); renderStats(false); updateRing(false); applyFilters(); } catch (e) { /* non-fatal */ }
    renderPanel();
    toast(S.assignment && S.assignment.id === c.id
      ? S.assignment.label + ' loaded — ' + S.assignment.items.length + ' problems'
      : 'Coach update applied');
  }

  /* ============================================================
     LEETCODE
     Needs serve.js running — the page can't call leetcode.com itself
     (no CORS), so the proxy does it server side.
     ============================================================ */
  const LCX = { status: null, profile: null, report: null, syncing: false, error: null };
  const servedOverHttp = /^https?:$/.test(location.protocol);

  async function lcApi(p) {
    const r = await fetch(p, { headers: { Accept: 'application/json' } });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || ('HTTP ' + r.status));
    return j;
  }

  /* Upgrade-only reconcile.
     A LeetCode accept can promote a question the sheet never saw, but it must
     never overwrite a status set here — "failed" after a capped attempt is a
     coaching fact, and the fact that he later solved it untimed doesn't erase
     that. Those land in `conflicts` for the coach to read instead. */
  function reconcile(solved) {
    const acc = new Set((solved.accepted || []).map(r => r.slug));
    const att = new Set((solved.attempted || []).map(r => r.slug));
    const inBank = new Set((ALL_QIDS || []).filter(id => id.startsWith('lc:')).map(id => id.slice(3)));

    const applied = [], conflicts = [], unverified = [], attemptedOnly = [];

    inBank.forEach(slug => {
      const qid = 'lc:' + slug;
      const cur = getStatus(qid);
      if (acc.has(slug)) {
        if (cur === 'not-attempted') {
          state.status[qid] = 'mastered';
          applied.push({ qid, from: 'not-attempted', to: 'mastered' });
        } else if (cur === 'failed' || cur === 'revision') {
          conflicts.push({ qid, sheet: cur, leetcode: 'accepted' });
        }
      } else {
        if (cur === 'mastered') unverified.push({ qid, sheet: 'mastered', leetcode: 'no accepted submission' });
        else if (att.has(slug) && cur === 'not-attempted') attemptedOnly.push({ qid });
      }
    });

    const outsideBank = (solved.accepted || [])
      .filter(r => !inBank.has(r.slug))
      .map(r => ({ slug: r.slug, title: r.title, diff: r.diff }));

    return {
      at: new Date().toISOString(),
      bankLeetcode: inBank.size,
      accepted: acc.size,
      applied, conflicts, unverified, attemptedOnly, outsideBank,
      coverage: inBank.size ? Math.round(([...inBank].filter(s => acc.has(s)).length / inBank.size) * 100) : 0
    };
  }

  async function lcSync(quiet) {
    if (!servedOverHttp) {
      LCX.error = 'open the sheet through `npm run serve` to reach LeetCode';
      if (!quiet) toast(LCX.error);
      return renderPanel();
    }
    if (LCX.syncing) return;
    LCX.syncing = true; LCX.error = null; renderPanel();
    try {
      LCX.status = await lcApi('/api/leetcode/status');
      if (!LCX.status.username) throw new Error('set LEETCODE_USERNAME in .env');

      const [profile, recent] = await Promise.all([
        lcApi('/api/leetcode/profile').catch(() => null),
        lcApi('/api/leetcode/recent?limit=40').catch(() => null)
      ]);
      LCX.profile = profile;

      let solved = null, report = null;
      if (LCX.status.hasSession) {
        solved = await lcApi('/api/leetcode/solved');
        report = reconcile(solved);
        if (report.applied.length) { saveState(); try { buildIndices(); render(); renderStats(false); updateRing(false); applyFilters(); } catch (e) {} }
      }
      LCX.report = report;
      cs().lc = {
        username: LCX.status.username,
        syncedAt: new Date().toISOString(),
        counts: solved ? solved.counts : null,
        coverage: report ? report.coverage : null
      };
      saveState();

      await writeText('leetcode.json', JSON.stringify({
        schema: SCHEMA,
        syncedAt: new Date().toISOString(),
        username: LCX.status.username,
        fullSync: !!LCX.status.hasSession,
        profile: profile && profile.matchedUser ? {
          ranking: profile.matchedUser.profile && profile.matchedUser.profile.ranking,
          solved: profile.matchedUser.submitStats && profile.matchedUser.submitStats.acSubmissionNum,
          contest: profile.userContestRanking || null,
          // solved-per-tag, LeetCode's own topic breakdown — the honest answer to
          // "which topics am I actually strong in", independent of the sheet
          byTag: profile.matchedUser.tagProblemCounts || null
        } : null,
        recentAccepted: recent && recent.recentAcSubmissionList
          ? recent.recentAcSubmissionList.map(s => ({
              slug: s.titleSlug, title: s.title, lang: s.lang,
              at: new Date(Number(s.timestamp) * 1000).toISOString()
            }))
          : [],
        reconcile: report,
        note: 'reconcile is upgrade-only: it promotes not-attempted -> mastered and never overwrites a coach-set status. `conflicts` are LeetCode accepts on questions the sheet has as failed/revision — solved eventually, but not under the cap.'
      }, null, 2));

      await writeProgress();
      if (!quiet) {
        toast(report
          ? `LeetCode synced — ${report.accepted} accepted, ${report.applied.length} newly marked, ${report.conflicts.length} conflicts`
          : 'LeetCode profile synced (no cookie — set LEETCODE_SESSION for the full reconcile)');
      }
    } catch (e) {
      LCX.error = String(e.message || e);
      if (!quiet) toast('LeetCode: ' + LCX.error);
    } finally {
      LCX.syncing = false;
      renderPanel();
    }
  }

  function lcRow() {
    if (!servedOverHttp) {
      return `<div class="coach-lc"><span class="coach-lc-k">LeetCode</span>
        <span class="coach-lc-msg">run <code>npm run serve</code> and open localhost to enable</span></div>`;
    }
    const saved = cs().lc;
    const rep = LCX.report;
    const ac = LCX.profile && LCX.profile.matchedUser && LCX.profile.matchedUser.submitStats
      ? LCX.profile.matchedUser.submitStats.acSubmissionNum : null;
    const byDiff = ac ? ac.filter(d => d.difficulty !== 'All') : [];
    const total = ac ? (ac.find(d => d.difficulty === 'All') || {}).count : null;
    const rating = LCX.profile && LCX.profile.userContestRanking
      ? Math.round(LCX.profile.userContestRanking.rating) : null;

    let mid;
    if (LCX.syncing) mid = '<span class="coach-lc-msg">syncing…</span>';
    else if (LCX.error) mid = `<span class="coach-lc-msg err">${LCX.error}</span>`;
    else if (total != null) {
      mid = `<span class="coach-lc-stat"><b>${total}</b> solved</span>` +
        byDiff.map(d => `<span class="coach-lc-stat d-${d.difficulty.toLowerCase()}">${d.difficulty[0]} ${d.count}</span>`).join('') +
        (rating ? `<span class="coach-lc-stat">${rating} rating</span>` : '') +
        (rep ? `<span class="coach-lc-stat">sheet coverage <b>${rep.coverage}%</b></span>` : '') +
        (rep && rep.conflicts.length ? `<span class="coach-lc-stat warn">${rep.conflicts.length} conflicts</span>` : '');
    } else if (saved) {
      mid = `<span class="coach-lc-msg">last synced ${new Date(saved.syncedAt).toLocaleDateString()}</span>`;
    } else {
      mid = '<span class="coach-lc-msg">not synced yet</span>';
    }

    return `<div class="coach-lc">
      <span class="coach-lc-k">LeetCode${saved && saved.username ? ' · ' + saved.username : ''}</span>
      ${mid}
      <span class="coach-spacer"></span>
      <button class="coach-btn sm ghost" data-act="lc" ${LCX.syncing ? 'disabled' : ''}>Sync</button>
    </div>`;
  }

  /* ---------- question lookup ---------- */
  function qOf(qid) {
    try {
      const q = (QBANK.questions && QBANK.questions[qid]) || (typeof getQ === 'function' ? getQ(qid) : null);
      if (q) return q;
    } catch (e) {}
    const a = (state.added || []).find(x => x.id === qid);
    return a || { name: qid, url: '#' };
  }

  /* ---------- panel ---------- */
  const STYLE = `
  .coach-panel{max-width:var(--maxw);margin:0 auto 26px;padding:0 24px;}
  .coach-box{background:var(--card-solid);border:1px solid var(--border);border-radius:var(--radius);
    box-shadow:var(--shadow);overflow:hidden}
  .coach-head{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border)}
  .coach-title{font-weight:700;font-size:15px;letter-spacing:-.01em;display:flex;align-items:center;gap:9px}
  .coach-dot{width:8px;height:8px;border-radius:50%;background:var(--blue);box-shadow:0 0 10px rgba(59,130,246,.7)}
  .coach-sub{color:var(--text-3);font-size:12.5px;font-weight:500}
  .coach-spacer{flex:1}
  .coach-pill{font-size:11px;font-weight:600;padding:5px 10px;border-radius:999px;border:1px solid var(--border);
    color:var(--text-3);white-space:nowrap}
  .coach-pill.on{color:var(--green);border-color:rgba(16,185,129,.35);background:rgba(16,185,129,.08)}
  .coach-pill.warn{color:var(--orange);border-color:rgba(245,158,11,.35);background:rgba(245,158,11,.08)}
  .coach-btn{font:inherit;font-size:12.5px;font-weight:600;color:var(--text);background:var(--card);
    border:1px solid var(--border-strong);border-radius:var(--radius-xs);padding:8px 14px;cursor:pointer;
    transition:background .18s var(--ease),transform .18s var(--ease)}
  .coach-btn:hover{background:var(--card-hover)}
  .coach-btn:active{transform:scale(.97)}
  .coach-btn.primary{background:var(--blue);border-color:transparent;color:#fff}
  .coach-btn.ghost{background:transparent;border-color:var(--border)}
  .coach-btn.sm{padding:6px 10px;font-size:11.5px}
  .coach-list{display:flex;flex-direction:column}
  .coach-item{display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:1px solid var(--border)}
  .coach-item:last-child{border-bottom:none}
  .coach-item.done{opacity:.5}
  .coach-slot{font-size:11.5px;font-weight:700;color:var(--text-3);width:52px;flex:none;letter-spacing:.02em}
  .coach-name{flex:1;min-width:0;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .coach-name a{color:inherit;text-decoration:none;border-bottom:1px solid transparent}
  .coach-name a:hover{border-bottom-color:var(--text-3)}
  .coach-timer{font-variant-numeric:tabular-nums;font-size:13.5px;font-weight:700;color:var(--text-2);width:56px;
    text-align:right;flex:none}
  .coach-timer.over{color:var(--red)}
  .coach-actions{display:flex;gap:6px;flex:none}
  .coach-out{font-size:11.5px;font-weight:700;padding:5px 9px;border-radius:999px;flex:none}
  .coach-out.b4{color:var(--green);background:rgba(16,185,129,.12)}
  .coach-out.b3{color:var(--orange);background:rgba(245,158,11,.12)}
  .coach-out.cap{color:var(--red);background:rgba(239,68,68,.12)}
  .coach-empty{padding:22px 20px;color:var(--text-3);font-size:13.5px;line-height:1.65}
  .coach-empty code{background:var(--card);padding:2px 6px;border-radius:6px;font-size:12.5px;color:var(--text-2)}
  .coach-foot{display:flex;align-items:center;gap:10px;padding:12px 20px;border-top:1px solid var(--border);
    background:rgba(255,255,255,.015)}
  .coach-queue{font-size:12px;color:var(--text-3)}
  .coach-queue b{color:var(--orange);font-weight:700}
  .coach-lc{display:flex;align-items:center;gap:12px;padding:11px 20px;border-top:1px solid var(--border);
    flex-wrap:wrap}
  .coach-lc-k{font-size:11.5px;font-weight:700;color:var(--text-2);letter-spacing:.01em}
  .coach-lc-msg{font-size:12px;color:var(--text-3)}
  .coach-lc-msg.err{color:var(--orange)}
  .coach-lc-msg code{background:var(--card);padding:2px 6px;border-radius:6px;color:var(--text-2)}
  .coach-lc-stat{font-size:12px;color:var(--text-3);padding:3px 8px;border-radius:999px;background:var(--card)}
  .coach-lc-stat b{color:var(--text);font-weight:700}
  .coach-lc-stat.d-easy{color:var(--green)}
  .coach-lc-stat.d-medium{color:var(--orange)}
  .coach-lc-stat.d-hard{color:var(--red)}
  .coach-lc-stat.warn{color:var(--orange);background:rgba(245,158,11,.1)}
  .coach-modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);z-index:9000;
    display:flex;align-items:center;justify-content:center;padding:24px}
  .coach-sheet{background:var(--card-solid);border:1px solid var(--border-strong);border-radius:var(--radius);
    box-shadow:var(--shadow-lg);width:min(460px,100%);padding:22px}
  .coach-sheet h3{font-size:15px;font-weight:700;margin:0 0 4px}
  .coach-sheet p{font-size:12.5px;color:var(--text-3);margin:0 0 16px}
  .coach-field{margin-bottom:14px}
  .coach-field label{display:block;font-size:11.5px;font-weight:600;color:var(--text-2);margin-bottom:6px}
  .coach-field select,.coach-field input{width:100%;font:inherit;font-size:13px;color:var(--text);
    background:var(--card);border:1px solid var(--border-strong);border-radius:var(--radius-xs);padding:9px 11px}
  .coach-field select:focus,.coach-field input:focus{outline:none;border-color:var(--blue)}
  .coach-sheet-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:18px}
  @media(max-width:760px){
    .coach-item{flex-wrap:wrap;gap:9px}
    .coach-name{flex-basis:100%;order:-1;white-space:normal}
    .coach-actions{flex:1;justify-content:flex-end}
  }`;

  function mount() {
    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);

    const wrap = document.createElement('section');
    wrap.className = 'coach-panel';
    wrap.id = 'coach-panel';
    const main = document.getElementById('main');
    if (main && main.parentNode) main.parentNode.insertBefore(wrap, main);
    else document.querySelector('.app-shell').appendChild(wrap);
    return wrap;
  }

  function fmtMs(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function elapsed(it) {
    return it.elapsedMs + (it.startedAt ? Date.now() - it.startedAt : 0);
  }

  function setPill(mode) {
    const p = document.getElementById('coach-pill');
    if (!p) return;
    if (!C.connected) { p.className = 'coach-pill warn'; p.textContent = 'not linked'; return; }
    if (mode === 'pending') { p.className = 'coach-pill'; p.textContent = 'saving…'; return; }
    p.className = 'coach-pill on';
    p.textContent = 'synced · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function renderPanel() {
    const wrap = document.getElementById('coach-panel') || mount();
    const S = cs();
    const a = S.assignment;
    const queue = S.resolveQueue || [];

    let body;
    if (!supported) {
      body = `<div class="coach-empty">This browser has no File System Access API, so the sheet can't write
        <code>progress.json</code> into the folder. Open the sheet in Chrome or Edge.</div>`;
    } else if (!C.connected) {
      body = `<div class="coach-empty">Link the <code>DSA</code> folder and the sheet will keep
        <code>progress.json</code> and <code>LOG.md</code> up to date, and pick up
        <code>coach.json</code> when the coach writes a new set.</div>`;
    } else if (!a || !a.items || !a.items.length) {
      body = `<div class="coach-empty">Folder linked. No set assigned yet — say <b>“Day 1”</b> in Cowork and
        the problems land here within ten seconds.</div>`;
    } else {
      body = '<div class="coach-list">' + a.items.map((it, i) => {
        const q = qOf(it.qid);
        const ms = elapsed(it);
        const over = ms > it.capMin * 60000;
        // blind mode: title + link only — no topic, tier or difficulty badge,
        // because recognising the pattern is the thing being tested
        const name = `<a href="${q.url || '#'}" target="_blank" rel="noopener">${q.name || it.qid}</a>`;
        const outTag = it.done
          ? `<span class="coach-out ${it.outcome === 'clean' ? 'b4' : it.outcome === 'weak' ? 'b3' : 'cap'}">${
              it.outcome === 'clean' ? 'CLEAN' : it.outcome === 'weak' ? 'WEAK' : 'CAP HIT'}</span>`
          : '';
        const actions = it.done ? outTag : `
          <button class="coach-btn sm ghost" data-act="${it.startedAt ? 'pause' : 'start'}" data-i="${i}">${it.startedAt ? 'Pause' : 'Start'}</button>
          <button class="coach-btn sm primary" data-act="finish" data-i="${i}">Done</button>`;
        return `<div class="coach-item ${it.done ? 'done' : ''}">
            <span class="coach-slot">${it.slot}</span>
            <span class="coach-name">${name}</span>
            <span class="coach-timer ${over ? 'over' : ''}" data-t="${i}">${fmtMs(ms)}</span>
            <span class="coach-actions">${actions}</span>
          </div>`;
      }).join('') + '</div>';
    }

    const lc = C.connected ? lcRow() : '';

    const foot = C.connected ? `<div class="coach-foot">
        <span class="coach-queue">Re-solve queue: <b>${queue.length}</b></span>
        <span class="coach-spacer"></span>
        <button class="coach-btn sm ghost" data-act="pull">Check for new set</button>
        <button class="coach-btn sm ghost" data-act="push">Write progress now</button>
      </div>` : '';

    wrap.innerHTML = `<div class="coach-box">
      <div class="coach-head">
        <span class="coach-title"><span class="coach-dot"></span>Coach</span>
        <span class="coach-sub">${a && a.label ? a.label : 'DSA sprint'}</span>
        <span class="coach-spacer"></span>
        <span class="coach-pill" id="coach-pill">not linked</span>
        ${supported && !C.connected ? '<button class="coach-btn primary" data-act="connect">Link folder</button>' : ''}
      </div>
      ${body}
      ${lc}
      ${foot}
    </div>`;

    setPill();
    wrap.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', onAction));
  }

  function tick() {
    const S = cs(); const a = S.assignment;
    if (!a) return;
    a.items.forEach((it, i) => {
      if (!it.startedAt || it.done) return;
      const el = document.querySelector(`[data-t="${i}"]`);
      if (!el) return;
      const ms = elapsed(it);
      el.textContent = fmtMs(ms);
      el.classList.toggle('over', ms > it.capMin * 60000);
    });
  }

  /* ---------- actions ---------- */
  async function onAction(e) {
    const act = e.currentTarget.dataset.act;
    const i = Number(e.currentTarget.dataset.i);
    const S = cs();

    if (act === 'connect') return connect();
    if (act === 'pull') { C.lastCoachRaw = ''; await pollCoach(); toast('Checked coach.json'); return; }
    if (act === 'push') { await writeProgress(); toast('progress.json written'); return; }
    if (act === 'lc') return lcSync(false);

    const it = S.assignment && S.assignment.items[i];
    if (!it) return;

    if (act === 'start') { it.startedAt = Date.now(); saveState(); renderPanel(); return; }
    if (act === 'pause') { it.elapsedMs = elapsed(it); it.startedAt = null; saveState(); renderPanel(); return; }
    if (act === 'finish') return finishModal(i);
  }

  function finishModal(i) {
    const S = cs();
    const it = S.assignment.items[i];
    const q = qOf(it.qid);
    const mins = Math.round(elapsed(it) / 60000);
    const capped = mins >= it.capMin;

    const m = document.createElement('div');
    m.className = 'coach-modal';
    m.innerHTML = `<div class="coach-sheet">
      <h3>${it.slot} · ${q.name || it.qid}</h3>
      <p>${mins} min on the clock${capped ? ' — past the ' + it.capMin + '-minute cap' : ''}.</p>
      <div class="coach-field">
        <label>How did it go?</label>
        <select id="cf-out">
          <option value="cap"${capped ? ' selected' : ''}>Cap hit — didn't finish in time</option>
          <option value="weak">Solved, but slow / brute-force / messy</option>
          <option value="clean"${!capped ? ' selected' : ''}>Clean solve inside the cap</option>
        </select>
      </div>
      <div class="coach-field" id="cf-bucket-wrap">
        <label>Which was it?</label>
        <select id="cf-bucket">
          <option value="1">1 — didn't recognise the pattern at all</option>
          <option value="2" selected>2 — knew the pattern, botched the implementation</option>
        </select>
      </div>
      <div class="coach-field">
        <label>One line — where exactly did it break?</label>
        <input id="cf-note" placeholder="got stuck on when to move left pointer" autocomplete="off">
      </div>
      <div class="coach-sheet-actions">
        <button class="coach-btn ghost" data-x="cancel">Cancel</button>
        <button class="coach-btn primary" data-x="save">Log it</button>
      </div>
    </div>`;
    document.body.appendChild(m);

    const out = m.querySelector('#cf-out');
    const bw = m.querySelector('#cf-bucket-wrap');
    const syncBucket = () => { bw.style.display = out.value === 'cap' ? '' : 'none'; };
    out.addEventListener('change', syncBucket); syncBucket();
    setTimeout(() => m.querySelector('#cf-note').focus(), 30);

    m.addEventListener('click', async (ev) => {
      if (ev.target === m || ev.target.dataset.x === 'cancel') { m.remove(); return; }
      if (ev.target.dataset.x !== 'save') return;

      const outcome = out.value;
      const bucket = outcome === 'clean' ? 4 : outcome === 'weak' ? 3 : Number(m.querySelector('#cf-bucket').value);
      const note = m.querySelector('#cf-note').value.trim();
      m.remove();

      it.done = true; it.outcome = outcome; it.bucket = bucket;
      it.elapsedMs = elapsed(it); it.startedAt = null; it.note = note;

      const status = outcome === 'clean' ? 'mastered' : outcome === 'weak' ? 'revision' : 'failed';
      if (typeof setStatus === 'function') setStatus(it.qid, status);
      else { state.status[it.qid] = status; saveState(); }

      // capped problems join the re-solve queue; clean solves leave it
      const S2 = cs();
      if (outcome === 'cap') { if (!S2.resolveQueue.includes(it.qid)) S2.resolveQueue.push(it.qid); }
      else if (outcome === 'clean') S2.resolveQueue = S2.resolveQueue.filter(x => x !== it.qid);

      const tag = outcome === 'cap' ? `${it.capMin}min CAP HIT`
        : outcome === 'weak' ? `${Math.round(it.elapsedMs / 60000)}min WEAK`
        : `${Math.round(it.elapsedMs / 60000)}min CLEAN`;
      const bucketLine = { 1: 'pattern not recognised', 2: 'pattern known, implementation failed',
        3: 'solved but slow / brute-force / messy', 4: 'clean solve in cap' }[bucket];

      await appendLog(
        `${it.slot} | ${q.name || it.qid} | ${tag}\n` +
        `Bucket: ${bucket} (${bucketLine})\n` +
        (note ? `Note: ${note}\n` : '')
      );

      saveState();
      renderPanel();
      await writeProgress();
      toast('Logged — ' + it.slot);
    });
  }

  function toast(msg) {
    if (typeof window.toast === 'function' && window.toast !== toast) { try { return window.toast(msg); } catch (e) {} }
    console.log('[coach]', msg);
  }

  /* ---------- connect / restore ---------- */
  async function afterConnect() {
    C.connected = true;
    renderPanel();
    await writeProgress();
    await pollCoach();
    clearInterval(C.pollTimer);
    C.pollTimer = setInterval(pollCoach, POLL_MS);
    clearInterval(C.ticker);
    C.ticker = setInterval(tick, 1000);
    if (servedOverHttp) lcSync(true);   // quiet refresh on link
  }

  async function connect() {
    try {
      const dir = await window.showDirectoryPicker({ id: 'dsa-folder', mode: 'readwrite' });
      C.dir = dir;
      // failing to remember the handle costs a click next time — never a reason to abort
      try { await idbSet(HANDLE_KEY, dir); } catch (e) { console.warn('[coach] handle not persisted', e); }
      await afterConnect();
      toast('Folder linked');
    } catch (e) { /* user cancelled */ }
  }

  async function restore() {
    if (!supported) return renderPanel();
    let dir = null;
    try { dir = await idbGet(HANDLE_KEY); } catch (e) {}
    if (!dir) return renderPanel();
    C.dir = dir;
    let perm = 'prompt';
    try { perm = await dir.queryPermission({ mode: 'readwrite' }); } catch (e) {}
    if (perm === 'granted') return afterConnect();
    // needs a user gesture — show the button, but skip the picker on click
    renderPanel();
    const btn = document.querySelector('#coach-panel [data-act="connect"]');
    if (btn) {
      btn.textContent = 'Reconnect folder';
      btn.addEventListener('click', async (e) => {
        e.stopImmediatePropagation();
        try {
          const p = await dir.requestPermission({ mode: 'readwrite' });
          if (p === 'granted') { await afterConnect(); toast('Folder reconnected'); }
        } catch (err) { connect(); }
      }, true);
    }
  }

  /* ---------- hook saveState ---------- */
  function hookSave() {
    const orig = window.saveState;
    if (typeof orig !== 'function' || orig.__coachHooked) return;
    const wrapped = function () { const r = orig.apply(this, arguments); scheduleWrite(); return r; };
    wrapped.__coachHooked = true;
    window.saveState = wrapped;
  }

  /* ---------- boot ---------- */
  function boot() {
    if (typeof state === 'undefined' || !state) { setTimeout(boot, 120); return; }
    cs();
    hookSave();
    mount();
    renderPanel();
    restore();
    window.COACH = {
      writeProgress, pollCoach, connect, snapshot, buildSummary, lcSync,
      state: () => cs(),
      __appendLog: appendLog,  // used by coach/test-sync.js
      __reconcile: reconcile
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
