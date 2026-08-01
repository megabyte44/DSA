/* ============================================================
   DSA Roadmap — dashboard logic
   Reads QUESTION_BANK (questions.js) + progress from localStorage.
   Backwards-compatible state key/format with the legacy tracker.
   ============================================================ */

const STORAGE_KEY = 'dsa-tracker-state-v1';

const STATUS_OPTIONS = [
  { v: 'not-attempted', label: 'Not attempted', short: 'To do' },
  { v: 'mastered',      label: 'Mastered',      short: 'Mastered' },
  { v: 'revision',      label: 'Needs revision', short: 'Revise' },
  { v: 'failed',        label: "Couldn't solve", short: 'Stuck' }
];
const STATUS_LABEL = Object.fromEntries(STATUS_OPTIONS.map(o => [o.v, o]));
const SOLVED = new Set(['mastered', 'revision']);

const RING_C = 2 * Math.PI * 76; // 477.52

/* ---------- SVG icon set (Linear / Raycast style line icons) ---------- */
const I = {
  arrays:      '<rect x="3" y="9" width="18" height="6" rx="1.6" stroke="currentColor" stroke-width="2"/><path d="M9 9v6M15 9v6" stroke="currentColor" stroke-width="2"/>',
  'hash-map':  '<path d="M9.5 4 7.5 20M16.5 4l-2 16M5 9h14.5M4.5 15H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  strings:     '<path d="M5 6h14M5 11h10M5 16h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  'linked-list':'<rect x="3" y="9" width="8" height="6" rx="3" stroke="currentColor" stroke-width="2"/><rect x="13" y="9" width="8" height="6" rx="3" stroke="currentColor" stroke-width="2"/><path d="M11 12h2" stroke="currentColor" stroke-width="2"/>',
  stack:       '<rect x="4" y="5" width="16" height="4" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="4" y="11" width="16" height="4" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="4" y="17" width="16" height="3" rx="1.5" stroke="currentColor" stroke-width="2"/>',
  trees:       '<circle cx="12" cy="5" r="2.4" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="2.4" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" stroke-width="2"/><path d="M10.4 6.8 7.4 16M13.6 6.8 16.6 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  recursion:   '<path d="M4 9a8 8 0 0 1 13.5-3.5L20 8M20 4v4h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 15a8 8 0 0 1-13.5 3.5L4 16M4 20v-4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  'dp-basic':  '<rect x="4" y="4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="4" y="13" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/>',
  greedy:      '<path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  heap:        '<path d="M12 4 4 19h16L12 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7.6 13.5h8.8" stroke="currentColor" stroke-width="2"/>',
  graphs:      '<circle cx="6" cy="6" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="7" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="18" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="17" r="2.3" stroke="currentColor" stroke-width="2"/><path d="M8 7 16 6.6M8 16.4 16 8.4M11 17.4 16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  'dp-advanced':'<rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3.5 9.4h17M3.5 14.8h17M9.4 3.5v17M14.8 3.5v17" stroke="currentColor" stroke-width="2"/>',
  sorting:     '<path d="M4 6h13M4 11h9M4 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 7v10m0 0 2.4-2.4M19 17l-2.4-2.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  trie:        '<circle cx="12" cy="5" r="2.2" stroke="currentColor" stroke-width="2"/><circle cx="5" cy="19" r="2.2" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="19" r="2.2" stroke="currentColor" stroke-width="2"/><circle cx="19" cy="19" r="2.2" stroke="currentColor" stroke-width="2"/><path d="M10.7 6.7 6 17M12 7.2V16.8M13.3 6.7 18 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  bit:         '<rect x="3" y="6" width="18" height="5" rx="2.5" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="8.5" r="1.4" fill="currentColor"/><rect x="3" y="13" width="18" height="5" rx="2.5" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="15.5" r="1.4" fill="currentColor"/>',
  queue:       '<rect x="8" y="7" width="3" height="10" rx="1" stroke="currentColor" stroke-width="2"/><rect x="13" y="7" width="3" height="10" rx="1" stroke="currentColor" stroke-width="2"/><path d="M2 12h3m0 0L4 10.6M5 12 4 13.4M22 12h-3m0 0 1-1.4M19 12l1 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  range:       '<path d="M3 16V8M21 16V8M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="12" r="2.4" fill="var(--card-solid)" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="12" r="2.4" fill="var(--card-solid)" stroke="currentColor" stroke-width="2"/>',
  // utility
  clock:    '<circle cx="12" cy="12" r="8.4" stroke="currentColor" stroke-width="2"/><path d="M12 7.6V12l3 1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  check:    '<path d="M5 12.5 10 17.5 19.5 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
  chevron:  '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  caret:    '<path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  ext:      '<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  flame:    '<path d="M12 2.6s5 3.8 5 9.4a5 5 0 0 1-10 0c0-2 1-3.6 1-3.6s.6 1.6 2.1 2.1c-.1-2.6-1.1-4.2 1.9-7.9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  target:   '<circle cx="12" cy="12" r="8.4" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.9" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  list:     '<path d="M8.5 6H20M8.5 12H20M8.5 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="4.3" cy="6" r="1.3" fill="currentColor"/><circle cx="4.3" cy="12" r="1.3" fill="currentColor"/><circle cx="4.3" cy="18" r="1.3" fill="currentColor"/>',
  percent:  '<path d="M19 5 5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="2.4" stroke="currentColor" stroke-width="2"/><circle cx="16.5" cy="16.5" r="2.4" stroke="currentColor" stroke-width="2"/>',
  trophy:   '<path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7 5.5H4V7a3 3 0 0 0 3 3M17 5.5h3V7a3 3 0 0 1-3 3M9.5 14h5M10 14l-.5 4.5M14 14l.5 4.5M8 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
};
const svg = (k) => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${I[k] || ''}</svg>`;

/* ---------- Per-topic metadata (icon key handled by section id) ---------- */
const META = {
  'arrays':      { c: '#3B82F6', d: "Binary search, Kadane's, prefix sums & two pointers", diff: ['Easy–Medium', 'diff-em'] },
  'hash-map':    { c: '#8B5CF6', d: 'Frequency maps, lookups & hashing patterns',          diff: ['Easy', 'diff-easy'] },
  'strings':     { c: '#10B981', d: 'Sliding window, two pointers & pattern matching',      diff: ['Easy–Medium', 'diff-em'] },
  'linked-list': { c: '#F59E0B', d: 'Reversal, cycle detection, merging & pointers',        diff: ['Easy–Medium', 'diff-em'] },
  'stack':       { c: '#EF4444', d: 'Monotonic stacks, parsing & expression evaluation',    diff: ['Medium', 'diff-med'] },
  'trees':       { c: '#10B981', d: 'Binary trees, BSTs, traversals and DFS/BFS',           diff: ['Easy–Medium', 'diff-em'] },
  'recursion':   { c: '#8B5CF6', d: 'Subsets, permutations, combinations & pruning',        diff: ['Medium', 'diff-med'] },
  'dp-basic':    { c: '#3B82F6', d: '1D DP, knapsack & subsequence foundations',            diff: ['Medium', 'diff-med'] },
  'greedy':      { c: '#F59E0B', d: 'Interval scheduling, merging & jump games',            diff: ['Medium', 'diff-med'] },
  'heap':        { c: '#EF4444', d: 'Priority queues, top-K & merge patterns',              diff: ['Medium', 'diff-med'] },
  'graphs':      { c: '#8B5CF6', d: 'Traversals, shortest paths, topo sort & union-find',   diff: ['Medium–Hard', 'diff-mh'] },
  'dp-advanced': { c: '#3B82F6', d: 'Grid DP, LCS, edit distance & advanced states',        diff: ['Hard', 'diff-hard'] },
  'sorting':     { c: '#10B981', d: 'Custom comparators, merge & counting-sort uses',       diff: ['Easy–Medium', 'diff-em'] },
  'trie':        { c: '#F59E0B', d: 'Prefix trees, word search & autocomplete',             diff: ['Medium', 'diff-med'] },
  'bit':         { c: '#8B5CF6', d: 'XOR tricks, masks, subsets & bit counting',            diff: ['Medium', 'diff-med'] },
  'queue':       { c: '#3B82F6', d: 'Deques, sliding-window maximum & FIFO patterns',       diff: ['Easy–Medium', 'diff-em'] },
  'range':       { c: '#EF4444', d: 'Segment trees, Fenwick/BIT & range queries',           diff: ['Hard', 'diff-hard'] }
};
const TIER_ACCENT = { 1: '#3B82F6', 2: '#8B5CF6', 3: '#10B981', 4: '#F59E0B' };

/* ---------- State ---------- */
let QBANK = null;
let state = null;
let FIRST_REF = {};          // qid -> first ref (for initialStatus)
let TOPIC_QIDS = {};         // sectionId -> [unique qids]
let QID_TOPIC = {};          // qid -> sectionId
let ADDED = {};              // qid -> {name,url,hard,source:'added'} for user-added
let ALL_QIDS = [];           // unique qids globally
let HIDDEN_SET = new Set();  // qids the user has removed
let QID_RANK = {};           // qid -> 0..1 position within topic (for intra-topic difficulty)
let SOLUTION_MAP = {};       // qid -> solution object
let MOTIVATIONS = [
  'Master one pattern at a time. Consistency beats intensity.',
  'Small reps, every day. Future-you is already grateful.',
  'Patterns over problems — learn the shape, not the answer.',
  'Show up today. The streak does the rest.'
];

/* ---------- Helpers ---------- */
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function defaultState() {
  return { status: {}, notes: {}, hidden: [], custom: {}, dailyPicker: { date: '', ids: [], usedIds: [] }, theme: 'dark', activity: [], ui: {}, added: [] };
}
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return Object.assign(defaultState(), parsed, { ui: Object.assign({}, parsed.ui) });
  } catch (e) { return defaultState(); }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function getStatus(id) {
  return state.status[id] || (FIRST_REF[id] && FIRST_REF[id].initialStatus) || 'not-attempted';
}

/* ---------- Index build ---------- */
function getQ(id) { return QBANK.questions[id] || ADDED[id] || null; }

function buildIndices() {
  FIRST_REF = {}; TOPIC_QIDS = {}; QID_TOPIC = {}; ADDED = {};
  const seenGlobal = new Set(); ALL_QIDS = [];
  HIDDEN_SET = new Set(state.hidden || []);
  SOLUTION_MAP = {};
  if (typeof REVISION_DATA !== 'undefined') {
    REVISION_DATA.forEach(sec => {
      if (sec.questions) {
        sec.questions.forEach(q => { SOLUTION_MAP[q.id] = q; });
      }
    });
  }
  QBANK.prioritySections.forEach(sec => {
    const seen = new Set(); const list = [];
    sec.cards.forEach(card => card.sections.forEach(s => s.questions.forEach(ref => {
      if (HIDDEN_SET.has(ref.id)) return;
      if (!(ref.id in FIRST_REF)) FIRST_REF[ref.id] = ref;
      if (!seen.has(ref.id)) { seen.add(ref.id); list.push(ref.id); }
      if (!QID_TOPIC[ref.id]) QID_TOPIC[ref.id] = sec.id;
      if (!seenGlobal.has(ref.id)) { seenGlobal.add(ref.id); ALL_QIDS.push(ref.id); }
    })));
    // Assign a 0..1 rank per question within this topic (used for intra-topic difficulty)
    list.forEach((id, i) => { QID_RANK[id] = list.length > 1 ? i / (list.length - 1) : 0; });
    TOPIC_QIDS[sec.id] = list;
  });
  // user-added questions
  (state.added || []).forEach(a => {
    if (HIDDEN_SET.has(a.id)) return;
    ADDED[a.id] = { name: a.name, url: a.url, hard: !!a.hard, source: 'added' };
    if (TOPIC_QIDS[a.topic] && !TOPIC_QIDS[a.topic].includes(a.id)) TOPIC_QIDS[a.topic].push(a.id);
    QID_TOPIC[a.id] = a.topic;
    if (!seenGlobal.has(a.id)) { seenGlobal.add(a.id); ALL_QIDS.push(a.id); }
  });
}

/* ---------- Stats ---------- */
function topicStats(sectionId) {
  const ids = TOPIC_QIDS[sectionId] || [];
  let solved = 0;
  ids.forEach(id => { if (SOLVED.has(getStatus(id))) solved++; });
  const total = ids.length;
  return { total, solved, pct: total ? Math.round((solved / total) * 100) : 0 };
}
function topicTimeMinutes(sectionId) {
  return (TOPIC_QIDS[sectionId] || []).reduce((m, id) => { const q = getQ(id); return m + ((q && q.hard) ? 25 : 12); }, 0);
}
function fmtTime(min) {
  const h = min / 60;
  if (h < 1) return '~' + Math.max(15, Math.round(min / 5) * 5) + 'm';
  if (h < 10) { const r = Math.round(h * 2) / 2; return '~' + (Number.isInteger(r) ? r : r.toFixed(1)) + 'h'; }
  return '~' + Math.round(h) + 'h';
}
function globalStats() {
  let solved = 0, masteredTopics = 0;
  ALL_QIDS.forEach(id => { if (SOLVED.has(getStatus(id))) solved++; });
  QBANK.prioritySections.forEach(s => { if (topicStats(s.id).pct === 100) masteredTopics++; });
  const total = ALL_QIDS.length;
  return { solved, total, pct: total ? Math.round((solved / total) * 100) : 0, masteredTopics, topics: QBANK.prioritySections.length, streak: computeStreak() };
}
function computeStreak() {
  const set = new Set(state.activity || []);
  let streak = 0; const d = new Date();
  // allow today or yesterday as the anchor
  if (!set.has(fmtDate(d))) d.setDate(d.getDate() - 1);
  while (set.has(fmtDate(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
}
function fmtDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function markActiveToday() {
  const t = todayStr();
  if (!state.activity) state.activity = [];
  if (!state.activity.includes(t)) { state.activity.push(t); state.activity = state.activity.slice(-400); saveState(); }
}

/* ============================================================
   RENDER
   ============================================================ */
function tierTitleParts(tier) {
  const raw = tier.title || ('Tier ' + tier.id);
  const idx = raw.indexOf(' - ');
  const title = idx > -1 ? raw.slice(idx + 3) : raw;
  return { title };
}

function render() {
  renderSidebar();
  renderSections();
  // initial-load animations
  requestAnimationFrame(() => {
    setTimeout(() => {
      $$('.prog-fill').forEach(f => { f.style.width = (f.dataset.pct || 0) + '%'; });
      $$('.nav-bar-fill').forEach(f => { f.style.width = (f.dataset.pct || 0) + '%'; });
      updateRing(true);
      renderStats(true);
    }, 60);
  });
}

function getSidebarCollapsed() { return (state.ui && state.ui.collapsedTiers) ? new Set(state.ui.collapsedTiers) : new Set(); }
function toggleTierGroup(tierId) {
  state.ui = state.ui || {};
  const s = getSidebarCollapsed();
  s.has(tierId) ? s.delete(tierId) : s.add(tierId);
  state.ui.collapsedTiers = Array.from(s);
  saveState();
  // toggle DOM directly without full re-render
  const group = $(`[data-tier-group="${tierId}"]`);
  if (group) {
    const items = $('.tier-items', group);
    const tog = $('.tier-toggle', group);
    const isNowCollapsed = s.has(tierId);
    if (items) items.classList.toggle('is-collapsed', isNowCollapsed);
    if (tog) tog.classList.toggle('is-collapsed', isNowCollapsed);
  }
}

function renderSidebar() {
  const nav = $('#sidebar-nav'); nav.innerHTML = '';
  const collapsedTiers = getSidebarCollapsed();
  QBANK.tiers.forEach(tier => {
    const sections = QBANK.prioritySections.filter(s => s.tier === tier.id);
    if (!sections.length) return;
    const isCollapsed = collapsedTiers.has(tier.id);
    const group = document.createElement('div');
    group.className = 'tier-group';
    group.dataset.tierGroup = tier.id;

    // Clickable tier label
    const toggle = document.createElement('button');
    toggle.className = 'tier-toggle' + (isCollapsed ? ' is-collapsed' : '');
    toggle.innerHTML =
      `<span class="tier-toggle-label">Tier ${tier.id}</span>` +
      `<svg class="tier-toggle-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    toggle.addEventListener('click', () => toggleTierGroup(tier.id));
    group.appendChild(toggle);

    // Items container
    const items = document.createElement('div');
    items.className = 'tier-items' + (isCollapsed ? ' is-collapsed' : '');
    sections.forEach(sec => {
      const m = META[sec.id] || { c: '#3B82F6' };
      const st = topicStats(sec.id);
      const item = document.createElement('button');
      item.className = 'nav-item';
      item.style.setProperty('--accent', m.c);
      item.dataset.target = sec.id;
      item.dataset.label = sec.label;
      item.innerHTML =
        `<span class="nav-ico">${svg(sec.id)}</span>` +
        `<span class="nav-body">` +
          `<span class="nav-top"><span class="nav-label">${esc(sec.label)}</span><span class="nav-pct" data-navpct="${sec.id}">${st.pct}%</span></span>` +
          `<span class="nav-bar"><span class="nav-bar-fill" data-navfill="${sec.id}" data-pct="${st.pct}"></span></span>` +
        `</span>`;
      item.addEventListener('click', () => goToTopic(sec.id));
      items.appendChild(item);
    });
    group.appendChild(items);
    nav.appendChild(group);
  });
}

function renderSections() {
  const root = $('#sections-root'); root.innerHTML = '';
  let cardIndex = 0;
  QBANK.tiers.forEach(tier => {
    const sections = QBANK.prioritySections.filter(s => s.tier === tier.id);
    if (!sections.length) return;
    const accent = TIER_ACCENT[tier.id] || '#3B82F6';
    const band = document.createElement('section');
    band.className = 'tier-band';
    band.dataset.tier = tier.id;
    band.style.setProperty('--accent', accent);
    const { title } = tierTitleParts(tier);
    band.innerHTML =
      `<div class="tier-band-head">` +
        `<span class="tier-badge">Tier ${tier.id}</span>` +
        `<span class="tier-band-title">${esc(title)}</span>` +
        `<span class="tier-band-note">${esc(tier.note || '')}</span>` +
        `<span class="tier-band-line"></span>` +
      `</div><div class="cards-stack"></div>`;
    const stack = $('.cards-stack', band);
    sections.forEach(sec => { stack.appendChild(buildCard(sec, cardIndex++)); });
    root.appendChild(band);
  });
}

function buildCard(sec, idx) {
  const m = META[sec.id] || { c: '#3B82F6', d: '', diff: ['Medium', 'diff-med'] };
  const st = topicStats(sec.id);
  const timeStr = fmtTime(topicTimeMinutes(sec.id));

  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = sec.id;
  card.style.setProperty('--accent', m.c);
  card.style.setProperty('--d', (idx * 55) + 'ms');

  card.innerHTML =
    `<div class="card-head">` +
      `<div class="card-ico">${svg(sec.id)}</div>` +
      `<div class="card-info">` +
        `<div class="card-title-row"><span class="card-title">${esc(sec.label)}</span>` +
          `<span class="badge ${m.diff[1]}">${esc(m.diff[0])}</span></div>` +
        `<div class="card-desc">${esc(m.d)}</div>` +
      `</div>` +
      `<div class="card-meta">` +
        `<div class="meta-stat"><div class="meta-count" data-count="${sec.id}">${st.solved}<span class="sep"> / </span>${st.total}</div><div class="meta-sub">solved</div></div>` +
        `<span class="meta-time">${svg('clock')} ${timeStr}</span>` +
      `</div>` +
      `<span class="card-chevron">${svg('chevron')}</span>` +
    `</div>` +
    `<div class="card-progress">` +
      `<div class="prog-track"><div class="prog-fill ${st.pct === 100 ? 'is-complete' : ''}" data-fill="${sec.id}" data-pct="${st.pct}"></div></div>` +
      `<div class="card-progress-meta">` +
        `<span class="cp-left" data-cpleft="${sec.id}">${st.solved} of ${st.total} solved</span>` +
        `<span class="cp-right ${st.pct === 100 ? 'is-complete' : ''}" data-cpright="${sec.id}">${st.pct === 100 ? svg('check') + ' Complete' : st.pct + '%'}</span>` +
      `</div>` +
      `<div class="card-mobile-meta"><span class="mm badge ${m.diff[1]}">${esc(m.diff[0])}</span><span class="mm">${svg('clock')} ${timeStr}</span></div>` +
    `</div>` +
    `<div class="card-clip"><div class="card-clip-inner"><div class="card-detail">${buildDetail(sec)}</div></div></div>`;

  const head = $('.card-head', card);
  head.addEventListener('click', () => toggleCard(card));
  return card;
}

/* ============================================================
   GREEDY PATTERN TEMPLATES — embedded in the Greedy card
   ============================================================ */
const GREEDY_TEMPLATES = [
  {
    id: 'grd-t1', label: 'Interval — Sort by Start (Merge)', color: '#d946ef',
    tag: 'Merge Intervals · Insert Interval',
    code: `intervals.sort(key=lambda x: x[0])
ans = []
for s, e in intervals:
    if not ans or ans[-1][1] < s:
        ans.append([s, e])
    else:
        ans[-1][1] = max(ans[-1][1], e)
return ans`
  },
  {
    id: 'grd-t2', label: 'Interval — Sort by End (Max Non-Overlapping)', color: '#a855f7',
    tag: 'Non-overlapping · Activity Selection · Min Arrows',
    code: `intervals.sort(key=lambda x: x[1])
end = float("-inf")
keep = 0
for s, e in intervals:
    if s >= end:        # non-overlapping → keep
        keep += 1
        end = e
return len(intervals) - keep`
  },
  {
    id: 'grd-t3', label: 'Interval — Sweep Line (Starts vs Ends)', color: '#8b5cf6',
    tag: 'Meeting Rooms II · Minimum Platforms',
    code: `starts.sort(); ends.sort()
i = j = current = answer = 0
while i < n:
    if starts[i] <= ends[j]:
        current += 1
        answer = max(answer, current)
        i += 1
    else:
        current -= 1; j += 1
return answer`
  },
  {
    id: 'grd-t4a', label: 'Jump Game A — Reachability', color: '#ec4899',
    tag: 'Jump Game I',
    code: `reach = 0
for i in range(n):
    if i > reach: return False
    reach = max(reach, i + nums[i])
return True`
  },
  {
    id: 'grd-t4b', label: 'Jump Game B — Minimum Jumps', color: '#f43f5e',
    tag: 'Jump Game II',
    code: `jumps = currentEnd = farthest = 0
for i in range(n - 1):
    farthest = max(farthest, i + nums[i])
    if i == currentEnd:     # level exhausted
        jumps += 1
        currentEnd = farthest
return jumps`
  },
  {
    id: 'grd-t5a', label: 'Scheduling A — Earliest Finish First', color: '#f97316',
    tag: 'Activity Selection · N Meetings',
    code: `jobs.sort(key=lambda x: x.end)
last_end = count = 0
for start, end in jobs:
    if start >= last_end:
        count += 1; last_end = end`
  },
  {
    id: 'grd-t5b', label: 'Scheduling B — Max Profit Before Deadline', color: '#fb923c',
    tag: 'Job Sequencing',
    code: `jobs.sort(key=lambda x: -x.profit)
slots = [-1] * (maxDeadline + 1)
for job in jobs:
    for d in range(job.deadline, 0, -1):
        if slots[d] == -1:
            slots[d] = job; break`
  },
  {
    id: 'grd-t5c', label: 'Scheduling C — Fixed Cooldown', color: '#f59e0b',
    tag: 'Task Scheduler',
    code: `freq = sorted(Counter(tasks).values())
max_freq = freq[-1]
count_max = freq.count(max_freq)
return max(len(tasks), (max_freq-1)*(n+1) + count_max)`
  },
  {
    id: 'grd-t6a', label: 'Resource A — Smallest Sufficient Resource', color: '#10b981',
    tag: 'Assign Cookies',
    code: `need.sort(); resource.sort()
i = j = 0
while i < len(need) and j < len(resource):
    if resource[j] >= need[i]: i += 1
    j += 1
return i`
  },
  {
    id: 'grd-t6b', label: 'Resource B — Pair Largest + Smallest', color: '#059669',
    tag: 'Boats to Save People',
    code: `arr.sort()
l, r, ans = 0, len(arr)-1, 0
while l <= r:
    if arr[l] + arr[r] <= limit: l += 1
    r -= 1; ans += 1
return ans`
  },
  {
    id: 'grd-t6c', label: 'Resource C — Prefix Balance', color: '#0ea5e9',
    tag: 'Gas Station',
    code: `current = total = start = 0
for i in range(n):
    gain = gas[i] - cost[i]
    current += gain; total += gain
    if current < 0: current = 0; start = i+1
return start if total >= 0 else -1`
  },
  {
    id: 'grd-t6d', label: 'Resource D — Bidirectional (Two Passes)', color: '#3b82f6',
    tag: 'Candy',
    code: `left = [1]*n; right = [1]*n
for i in range(1, n):
    if ratings[i] > ratings[i-1]: left[i] = left[i-1]+1
for i in range(n-2, -1, -1):
    if ratings[i] > ratings[i+1]: right[i] = right[i+1]+1
return sum(max(l,r) for l,r in zip(left, right))`
  },
  {
    id: 'grd-t7', label: 'Huffman — Always Merge Two Smallest', color: '#14b8a6',
    tag: 'Min Cost Ropes · Connect Sticks',
    code: `heapify(arr)
cost = 0
while len(arr) > 1:
    a = heappop(arr); b = heappop(arr)
    cost += a + b
    heappush(arr, a + b)
return cost`
  },
  {
    id: 'grd-t8', label: 'Greedy + Heap — Best Available Option', color: '#6366f1',
    tag: 'IPO · Course Schedule III',
    code: `projects = sorted(zip(capital, profits))
max_heap = []; i = 0
for _ in range(k):
    while i < len(projects) and projects[i][0] <= w:
        heappush(max_heap, -projects[i][1]); i += 1
    if not max_heap: break
    w += -heappop(max_heap)
return w`
  }
];

const HEAP_TEMPLATES = [
  {
    id: 'heap-t1', label: 'Heap A — Top K (Keep Only Best K)', color: '#f97316',
    tag: 'Kth Largest · Top K Frequent · K Closest',
    code: `import heapq
heap = []
for x in nums:
    heapq.heappush(heap, x)
    if len(heap) > k:
        heapq.heappop(heap)
return heap[0]`
  },
  {
    id: 'heap-t2', label: 'Heap B — K-way Merge', color: '#ec4899',
    tag: 'Merge K Sorted Lists · Kth Smallest Matrix',
    code: `import heapq
heap = []
for row in range(len(matrix)):
    heapq.heappush(heap, (matrix[row][0], row, 0))
while heap:
    val, row, col = heapq.heappop(heap)
    # process answer
    if col + 1 < len(matrix[row]):
        heapq.heappush(heap, (matrix[row][col + 1], row, col + 1))`
  },
  {
    id: 'heap-t3', label: 'Heap C — Expand Next Candidate', color: '#3b82f6',
    tag: 'K Pairs with Smallest Sums',
    code: `import heapq
heap = []
for i in range(min(k, len(nums1))):
    heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
ans = []
while heap and len(ans) < k:
    _, i, j = heapq.heappop(heap)
    ans.append([nums1[i], nums2[j]])
    if j + 1 < len(nums2):
        heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
return ans`
  },
  {
    id: 'heap-t4', label: 'Heap D — Frequency Priority', color: '#8b5cf6',
    tag: 'Reorganize String',
    code: `from collections import Counter
import heapq
freq = Counter(s)
heap = []
for ch, f in freq.items():
    heapq.heappush(heap, (-f, ch))
prev = (0, "")
ans = []
while heap:
    f, ch = heapq.heappop(heap)
    ans.append(ch)
    if prev[0] < 0:
        heapq.heappush(heap, prev)
    prev = (f + 1, ch)
return "".join(ans)`
  },
  {
    id: 'heap-t5', label: 'Heap E — Merge Two Smallest', color: '#10b981',
    tag: 'Connect Sticks · Huffman',
    code: `import heapq
heapq.heapify(arr)
cost = 0
while len(arr) > 1:
    x = heapq.heappop(arr)
    y = heapq.heappop(arr)
    cost += x + y
    heapq.heappush(arr, x + y)
return cost`
  },
  {
    id: 'heap-t6', label: 'Heap F — Unlock Then Pick Best', color: '#6366f1',
    tag: 'IPO',
    code: `import heapq
projects = sorted(zip(capital, profits))
heap = []
i = 0
for _ in range(k):
    while i < len(projects) and projects[i][0] <= w:
        heapq.heappush(heap, -projects[i][1])
        i += 1
    if not heap:
        break
    w += -heapq.heappop(heap)
return w`
  },
  {
    id: 'heap-t7', label: 'Heap G — Running Median', color: '#f59e0b',
    tag: 'Median Finder',
    code: `import heapq
small = []      # max heap
large = []      # min heap

def add(num):
    heapq.heappush(small, -num)
    heapq.heappush(large, -heapq.heappop(small))
    if len(large) > len(small):
        heapq.heappush(small, -heapq.heappop(large))

def median():
    if len(small) > len(large):
        return -small[0]
    return (-small[0] + large[0]) / 2`
  }
];

/* ============================================================
   DP BASIC PATTERN TEMPLATES
   ============================================================ */
const DP_BASIC_TEMPLATES = [
  {
    id: 'dp-b-t1', label: 'DP A — 0/1 Knapsack (Pick / Don\'t Pick)', color: '#3b82f6',
    tag: '0/1 Knapsack · Subset Sum · Partition Equal Subset',
    code: `# dp[i][w] = max value using first i items with capacity w
dp = [[0]*(W+1) for _ in range(n+1)]
for i in range(1, n+1):
    wt, val = weights[i-1], values[i-1]
    for w in range(W+1):
        dp[i][w] = dp[i-1][w]          # don't pick
        if wt <= w:
            dp[i][w] = max(dp[i][w], dp[i-1][w-wt] + val)  # pick
return dp[n][W]`
  },
  {
    id: 'dp-b-t2', label: 'DP B — Unbounded Knapsack', color: '#6366f1',
    tag: 'Coin Change · Rod Cutting · Ribbon Cut',
    code: `# dp[w] = min coins to make amount w
dp = [float('inf')] * (amount + 1)
dp[0] = 0
for coin in coins:
    for w in range(coin, amount + 1):
        dp[w] = min(dp[w], dp[w - coin] + 1)
return dp[amount] if dp[amount] != float('inf') else -1`
  },
  {
    id: 'dp-b-t3', label: 'DP C — Longest Common Subsequence (Grid)', color: '#8b5cf6',
    tag: 'LCS · Edit Distance · Shortest Common Supersequence',
    code: `dp = [[0]*(len(t)+1) for _ in range(len(s)+1)]
for i in range(1, len(s)+1):
    for j in range(1, len(t)+1):
        if s[i-1] == t[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
return dp[len(s)][len(t)]`
  },
  {
    id: 'dp-b-t4', label: 'DP D — Longest Increasing Subsequence (1D)', color: '#a855f7',
    tag: 'LIS · Russian Doll Envelopes',
    code: `dp = [1] * n
for i in range(1, n):
    for j in range(i):
        if nums[j] < nums[i]:
            dp[i] = max(dp[i], dp[j] + 1)
return max(dp)

# O(n log n) variant:
# tails = []
# for x in nums:
#     pos = bisect_left(tails, x)
#     if pos == len(tails): tails.append(x)
#     else: tails[pos] = x
# return len(tails)`
  },
  {
    id: 'dp-b-t5', label: 'DP E — 1D Linear (Fibonacci / House Robber)', color: '#ec4899',
    tag: 'House Robber · Climbing Stairs · Min Cost Climbing',
    code: `# House Robber template  
dp = [0] * n
dp[0] = nums[0]
dp[1] = max(nums[0], nums[1])
for i in range(2, n):
    dp[i] = max(dp[i-1], dp[i-2] + nums[i])
return dp[n-1]`
  },
  {
    id: 'dp-b-t6', label: 'DP F — State Machine (Stock Buy & Sell)', color: '#f43f5e',
    tag: 'Best Time to Buy/Sell Stock II, III, IV · Cooldown',
    code: `# With cooldown — generalizes to all stock variants
hold = -float('inf')   # holding a stock
sold = 0               # just sold today
rest = 0               # resting (cooldown)
for price in prices:
    prev_sold = sold
    sold = hold + price
    hold = max(hold, rest - price)
    rest = max(rest, prev_sold)
return max(sold, rest)`
  }
];

/* ============================================================
   DP ADVANCED PATTERN TEMPLATES
   ============================================================ */
const DP_ADVANCED_TEMPLATES = [
  {
    id: 'dp-a-t1', label: 'DP Adv A — Grid DP', color: '#3b82f6',
    tag: 'Unique Paths · Minimum Path Sum · Dungeon Game',
    code: `# Unique Paths / Min Path Sum
dp = [[1]*n for _ in range(m)]
for i in range(1, m):
    for j in range(1, n):
        # Unique Paths:
        dp[i][j] = dp[i-1][j] + dp[i][j-1]
        # Min Path Sum variant:
        # dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
return dp[m-1][n-1]`
  },
  {
    id: 'dp-a-t2', label: 'DP Adv B — Edit Distance (3-way choice)', color: '#6366f1',
    tag: 'Edit Distance · Delete Op for Two Strings',
    code: `dp = [[0]*(len(t)+1) for _ in range(len(s)+1)]
for i in range(len(s)+1): dp[i][0] = i
for j in range(len(t)+1): dp[0][j] = j
for i in range(1, len(s)+1):
    for j in range(1, len(t)+1):
        if s[i-1] == t[j-1]:
            dp[i][j] = dp[i-1][j-1]
        else:
            dp[i][j] = 1 + min(
                dp[i-1][j],    # delete from s
                dp[i][j-1],    # insert into s
                dp[i-1][j-1]   # replace
            )
return dp[len(s)][len(t)]`
  },
  {
    id: 'dp-a-t3', label: 'DP Adv C — Interval DP (Merging)', color: '#8b5cf6',
    tag: 'Burst Balloons · Matrix Chain · Strange Printer',
    code: `# Try all split points k inside [i, j]
dp = [[0]*n for _ in range(n)]
for length in range(2, n+1):         # grow window
    for i in range(n - length + 1):
        j = i + length - 1
        dp[i][j] = float('inf')
        for k in range(i, j):       # split point
            dp[i][j] = min(dp[i][j],
                dp[i][k] + dp[k+1][j] + cost(i, k, j))
return dp[0][n-1]`
  },
  {
    id: 'dp-a-t4', label: 'DP Adv D — Bitmask DP (Subset States)', color: '#a855f7',
    tag: 'TSP · Assign Work · Minimum XOR Sum',
    code: `# dp[mask] = best value using cities in 'mask'
dp = [float('inf')] * (1 << n)
dp[0] = 0
for mask in range(1 << n):
    for city in range(n):
        if mask & (1 << city): continue   # already visited
        new_mask = mask | (1 << city)
        dp[new_mask] = min(dp[new_mask],
                           dp[mask] + cost[prev_city][city])
return dp[(1<<n)-1]`
  },
  {
    id: 'dp-a-t5', label: 'DP Adv E — DP on Strings (Palindrome)', color: '#ec4899',
    tag: 'Longest Palindromic Substring · Palindrome Partitioning',
    code: `# Expand-around-center for longest palindrome
best = ''
def expand(l, r):
    while l >= 0 and r < n and s[l] == s[r]:
        l -= 1; r += 1
    return s[l+1:r]
for i in range(n):
    best = max(expand(i,i), expand(i,i+1), best, key=len)
return best`
  }
];

/* ============================================================
   GRAPHS PATTERN TEMPLATES
   ============================================================ */
const GRAPHS_TEMPLATES = [
  {
    id: 'grph-t1', label: 'Graph A — BFS (Shortest Path / Level Order)', color: '#3b82f6',
    tag: 'Shortest Path · Word Ladder · 01 Matrix · Rotten Oranges',
    code: `from collections import deque
def bfs(graph, src):
    dist = {src: 0}
    q = deque([src])
    while q:
        node = q.popleft()
        for nei in graph[node]:
            if nei not in dist:
                dist[nei] = dist[node] + 1
                q.append(nei)
    return dist`
  },
  {
    id: 'grph-t2', label: 'Graph B — DFS (Connected Components / Cycle)', color: '#6366f1',
    tag: 'Number of Islands · Clone Graph · Cycle Detection',
    code: `def dfs(node, visited, graph):
    visited.add(node)
    for nei in graph[node]:
        if nei not in visited:
            dfs(nei, visited, graph)

visited = set()
components = 0
for node in range(n):
    if node not in visited:
        dfs(node, visited, graph)
        components += 1
return components`
  },
  {
    id: 'grph-t3', label: 'Graph C — Union-Find (Disjoint Set)', color: '#8b5cf6',
    tag: 'Number of Provinces · Redundant Connection · Accounts Merge',
    code: `parent = list(range(n))
rank = [0] * n

def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   # path compression
    return parent[x]

def union(a, b):
    pa, pb = find(a), find(b)
    if pa == pb: return False
    if rank[pa] < rank[pb]: pa, pb = pb, pa
    parent[pb] = pa                    # union by rank
    if rank[pa] == rank[pb]: rank[pa] += 1
    return True`
  },
  {
    id: 'grph-t4', label: 'Graph D — Topological Sort (Kahn\'s BFS)', color: '#a855f7',
    tag: 'Course Schedule · Alien Dictionary · Build Order',
    code: `from collections import deque, defaultdict
indegree = [0] * n
graph = defaultdict(list)
# build graph from edge list...
q = deque(i for i in range(n) if indegree[i] == 0)
order = []
while q:
    node = q.popleft()
    order.append(node)
    for nei in graph[node]:
        indegree[nei] -= 1
        if indegree[nei] == 0:
            q.append(nei)
return order if len(order) == n else []   # [] = cycle`
  },
  {
    id: 'grph-t5', label: 'Graph E — Dijkstra (Weighted Shortest Path)', color: '#ec4899',
    tag: 'Network Delay · Path with Min Effort · Cheapest Flights',
    code: `import heapq
def dijkstra(n, graph, src):
    dist = [float('inf')] * n
    dist[src] = 0
    heap = [(0, src)]     # (cost, node)
    while heap:
        cost, u = heapq.heappop(heap)
        if cost > dist[u]: continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist`
  },
  {
    id: 'grph-t6', label: 'Graph F — Grid DFS / Flood Fill', color: '#f43f5e',
    tag: 'Number of Islands · Pacific Atlantic · Surrounded Regions',
    code: `DIRS = [(0,1),(0,-1),(1,0),(-1,0)]
def dfs(r, c):
    if r < 0 or r >= rows or c < 0 or c >= cols: return
    if grid[r][c] != '1': return
    grid[r][c] = '0'          # mark visited
    for dr, dc in DIRS:
        dfs(r+dr, c+dc)

count = 0
for r in range(rows):
    for c in range(cols):
        if grid[r][c] == '1':
            dfs(r, c); count += 1
return count`
  }
];

/* ============================================================
   RECURSION / BACKTRACKING PATTERN TEMPLATES
   ============================================================ */
const RECURSION_TEMPLATES = [
  {
    id: 'rec-t1', label: 'Backtrack A — Subsets (Include / Exclude)', color: '#3b82f6',
    tag: 'Subsets · Subsets II · Power Set',
    code: `def backtrack(start, current):
    result.append(current[:])     # snapshot every state
    for i in range(start, len(nums)):
        if i > start and nums[i] == nums[i-1]: continue  # skip dups
        current.append(nums[i])
        backtrack(i + 1, current)
        current.pop()

nums.sort(); result = []
backtrack(0, [])
return result`
  },
  {
    id: 'rec-t2', label: 'Backtrack B — Combinations / Combination Sum', color: '#6366f1',
    tag: 'Combination Sum · Combination Sum II · Phone Number Letters',
    code: `def backtrack(start, current, remaining):
    if remaining == 0:
        result.append(current[:])
        return
    if remaining < 0: return
    for i in range(start, len(candidates)):
        current.append(candidates[i])
        backtrack(i, current, remaining - candidates[i])  # i (reuse) or i+1 (no reuse)
        current.pop()

result = []
backtrack(0, [], target)
return result`
  },
  {
    id: 'rec-t3', label: 'Backtrack C — Permutations', color: '#8b5cf6',
    tag: 'Permutations · Permutations II · Next Permutation',
    code: `def backtrack(current, used):
    if len(current) == len(nums):
        result.append(current[:])
        return
    for i in range(len(nums)):
        if used[i]: continue
        if i > 0 and nums[i] == nums[i-1] and not used[i-1]: continue  # skip dups
        used[i] = True
        current.append(nums[i])
        backtrack(current, used)
        current.pop()
        used[i] = False

nums.sort(); result = []; used = [False]*len(nums)
backtrack([], used)
return result`
  },
  {
    id: 'rec-t4', label: 'Backtrack D — N-Queens / Sudoku (Constraint Check)', color: '#a855f7',
    tag: 'N-Queens · Sudoku Solver · Word Search',
    code: `def backtrack(row):
    if row == n:
        result.append([''.join(r) for r in board])
        return
    for col in range(n):
        if col in cols or (row-col) in diag1 or (row+col) in diag2:
            continue
        board[row][col] = 'Q'
        cols.add(col); diag1.add(row-col); diag2.add(row+col)
        backtrack(row + 1)
        board[row][col] = '.'
        cols.discard(col); diag1.discard(row-col); diag2.discard(row+col)

cols = set(); diag1 = set(); diag2 = set()
board = [['.']*n for _ in range(n)]; result = []
backtrack(0)
return result`
  },
  {
    id: 'rec-t5', label: 'Backtrack E — Grid Path (Mark & Unmark)', color: '#ec4899',
    tag: 'Word Search · Rat in a Maze · Unique Paths III',
    code: `DIRS = [(0,1),(0,-1),(1,0),(-1,0)]
def backtrack(r, c, idx):
    if idx == len(word): return True
    if r<0 or r>=rows or c<0 or c>=cols: return False
    if board[r][c] != word[idx]: return False
    tmp, board[r][c] = board[r][c], '#'   # mark visited
    found = any(backtrack(r+dr, c+dc, idx+1) for dr,dc in DIRS)
    board[r][c] = tmp                     # unmark
    return found

for r in range(rows):
    for c in range(cols):
        if backtrack(r, c, 0): return True
return False`
  }
];

/* ============================================================
   ARRAYS PATTERN TEMPLATES (Sliding Window + Two Pointers)
   ============================================================ */
const ARRAYS_TEMPLATES = [
  {
    id: 'arr-t1', label: 'Array A — Variable Sliding Window', color: '#3b82f6',
    tag: 'Longest Substring Without Repeating · Min Window Substring · Fruit Into Baskets',
    code: `# Expand right; shrink left whenever window is invalid
left = 0; best = 0
window = {}  # freq map or set
for right in range(len(s)):
    window[s[right]] = window.get(s[right], 0) + 1
    while len(window) > k:         # invalid condition
        window[s[left]] -= 1
        if window[s[left]] == 0: del window[s[left]]
        left += 1
    best = max(best, right - left + 1)
return best`
  },
  {
    id: 'arr-t2', label: 'Array B — Fixed Sliding Window', color: '#6366f1',
    tag: 'Max Avg Subarray · Contains Duplicate II · Find All Anagrams',
    code: `window_sum = sum(nums[:k])
best = window_sum
for i in range(k, len(nums)):
    window_sum += nums[i] - nums[i-k]
    best = max(best, window_sum)
return best / k`
  },
  {
    id: 'arr-t3', label: 'Array C — Two Pointers (Opposite Ends)', color: '#8b5cf6',
    tag: 'Two Sum II · 3Sum · Container With Most Water · Trapping Rain Water',
    code: `nums.sort()
l, r = 0, len(nums) - 1
while l < r:
    s = nums[l] + nums[r]
    if s == target:
        return [nums[l], nums[r]]
    elif s < target:
        l += 1
    else:
        r -= 1
return []`
  },
  {
    id: 'arr-t4', label: 'Array D — Fast & Slow Pointers', color: '#a855f7',
    tag: 'Linked List Cycle · Happy Number · Middle of List · Find Duplicate',
    code: `# Detect cycle (Floyd's algorithm)
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast:               # cycle found
        slow2 = head
        while slow != slow2:
            slow = slow.next
            slow2 = slow2.next
        return slow                # cycle start
return None`
  },
  {
    id: 'arr-t5', label: 'Array E — Prefix Sum', color: '#ec4899',
    tag: 'Subarray Sum Equals K · Range Sum Query · Continuous Subarray Sum',
    code: `from collections import defaultdict
prefix = 0
count = 0
seen = defaultdict(int)
seen[0] = 1                        # empty prefix
for num in nums:
    prefix += num
    count += seen[prefix - k]      # found subarrays
    seen[prefix] += 1
return count`
  },
  {
    id: 'arr-t6', label: 'Array F — Binary Search on Answer', color: '#f43f5e',
    tag: 'Koko Eating Bananas · Min Capacity Ship · Split Array Largest Sum',
    code: `def canFinish(speed):
    return sum(-(-p // speed) for p in piles) <= h  # ceil division

lo, hi = 1, max(piles)
while lo < hi:
    mid = (lo + hi) // 2
    if canFinish(mid):
        hi = mid
    else:
        lo = mid + 1
return lo`
  }
];

/* ============================================================
   STRINGS PATTERN TEMPLATES
   ============================================================ */
const STRINGS_TEMPLATES = [
  {
    id: 'str-t1', label: 'String A — Sliding Window (Anagram / Substring)', color: '#10b981',
    tag: 'Find All Anagrams · Min Window Substring · Permutation in String',
    code: `from collections import Counter
need = Counter(t)
window = {}
have, total = 0, len(need)
l = best = 0; res = (-1, -1)
for r, ch in enumerate(s):
    window[ch] = window.get(ch, 0) + 1
    if ch in need and window[ch] == need[ch]: have += 1
    while have == total:
        if r - l + 1 < best or not best:
            best = r - l + 1; res = (l, r)
        window[s[l]] -= 1
        if s[l] in need and window[s[l]] < need[s[l]]: have -= 1
        l += 1
return s[res[0]:res[1]+1]`
  },
  {
    id: 'str-t2', label: 'String B — Two Pointers (Valid Palindrome)', color: '#059669',
    tag: 'Valid Palindrome · Reverse Vowels · Sort Characters By Frequency',
    code: `def isPalindrome(s):
    l, r = 0, len(s) - 1
    while l < r:
        while l < r and not s[l].isalnum(): l += 1
        while l < r and not s[r].isalnum(): r -= 1
        if s[l].lower() != s[r].lower(): return False
        l += 1; r -= 1
    return True`
  },
  {
    id: 'str-t3', label: 'String C — KMP / Pattern Search', color: '#0ea5e9',
    tag: 'Find the Index of First Occurrence · Repeated Substring Pattern',
    code: `# Build failure (LPS) table
def kmp(text, pattern):
    lps = [0] * len(pattern)
    j = 0
    for i in range(1, len(pattern)):
        while j and pattern[i] != pattern[j]: j = lps[j-1]
        if pattern[i] == pattern[j]: j += 1
        lps[i] = j
    j = 0
    for i, ch in enumerate(text):
        while j and ch != pattern[j]: j = lps[j-1]
        if ch == pattern[j]: j += 1
        if j == len(pattern): return i - j + 1   # match start
    return -1`
  },
  {
    id: 'str-t4', label: 'String D — Character Frequency / Grouping', color: '#14b8a6',
    tag: 'Group Anagrams · Ransom Note · Valid Anagram · Isomorphic Strings',
    code: `from collections import defaultdict
groups = defaultdict(list)
for word in strs:
    key = tuple(sorted(word))   # canonical form
    # Alternative key: ''.join(sorted(word))
    # For counts: key = tuple(Counter(word).items())
    groups[key].append(word)
return list(groups.values())`
  }
];

/* ============================================================
   TREES PATTERN TEMPLATES
   ============================================================ */
const TREES_TEMPLATES = [
  {
    id: 'tree-t1', label: 'Tree A — DFS Traversals (Pre/In/Post)', color: '#10b981',
    tag: 'Inorder · Preorder · Postorder · Path Sum · Max Depth',
    code: `# Iterative inorder (generalises to pre/post easily)
stack, result = [], []
curr = root
while curr or stack:
    while curr:
        stack.append(curr)
        curr = curr.left          # go left
    curr = stack.pop()
    result.append(curr.val)      # VISIT (move before pop for preorder)
    curr = curr.right
return result`
  },
  {
    id: 'tree-t2', label: 'Tree B — BFS / Level Order', color: '#059669',
    tag: 'Level Order · Zigzag Level · Right Side View · Min Depth',
    code: `from collections import deque
result = []
q = deque([root])
while q:
    level = []
    for _ in range(len(q)):      # snapshot size = current level
        node = q.popleft()
        level.append(node.val)
        if node.left:  q.append(node.left)
        if node.right: q.append(node.right)
    result.append(level)
return result`
  },
  {
    id: 'tree-t3', label: 'Tree C — Recursive Post-order (Return Up)', color: '#0ea5e9',
    tag: 'Max Path Sum · Diameter · Lowest Common Ancestor · Balanced Tree',
    code: `# Post-order: solve children first, combine at root
def dfs(node):
    if not node: return 0
    left  = dfs(node.left)
    right = dfs(node.right)
    # Use left & right to update global answer:
    self.ans = max(self.ans, left + right + node.val)
    return max(left, right) + node.val  # return best path upward

self.ans = float('-inf')
dfs(root)
return self.ans`
  },
  {
    id: 'tree-t4', label: 'Tree D — BST Operations', color: '#14b8a6',
    tag: 'Validate BST · BST Iterator · Kth Smallest · Inorder Successor',
    code: `# Validate BST with range check
def isValid(node, lo, hi):
    if not node: return True
    if not (lo < node.val < hi): return False
    return (isValid(node.left,  lo, node.val) and
            isValid(node.right, node.val, hi))
return isValid(root, float('-inf'), float('inf'))

# Kth Smallest — inorder gives sorted order
def kthSmallest(root, k):
    stack = []; curr = root
    while curr or stack:
        while curr: stack.append(curr); curr = curr.left
        curr = stack.pop(); k -= 1
        if k == 0: return curr.val
        curr = curr.right`
  },
  {
    id: 'tree-t5', label: 'Tree E — Lowest Common Ancestor', color: '#6366f1',
    tag: 'LCA · LCA of BST · All Nodes Distance K',
    code: `def lca(root, p, q):
    if not root or root == p or root == q:
        return root
    left  = lca(root.left,  p, q)
    right = lca(root.right, p, q)
    if left and right:
        return root    # p and q on different sides
    return left or right`
  }
];

/* ============================================================
   SORTING PATTERN TEMPLATES
   ============================================================ */
const SORTING_TEMPLATES = [
  {
    id: 'sort-t1', label: 'Sort A — Custom Comparator', color: '#10b981',
    tag: 'Largest Number · Sort Colors · Wiggle Sort',
    code: `import functools
# Sort by custom rule using cmp_to_key
def compare(a, b):
    if str(a)+str(b) > str(b)+str(a): return -1   # a before b
    return 1
nums.sort(key=functools.cmp_to_key(compare))
return ''.join(map(str, nums))`
  },
  {
    id: 'sort-t2', label: 'Sort B — Merge Sort (Count Inversions)', color: '#059669',
    tag: 'Count Inversions · Sort Linked List · Merge K Sorted',
    code: `def merge_sort(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    left, lc = merge_sort(arr[:mid])
    right, rc = merge_sort(arr[mid:])
    merged = []; inv = lc + rc; i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j])
            inv += len(left) - i       # all remaining left elements invert
            j += 1
    return merged + left[i:] + right[j:], inv`
  },
  {
    id: 'sort-t3', label: 'Sort C — Counting / Bucket Sort', color: '#0ea5e9',
    tag: 'Sort Colors (Dutch Flag) · Top K Frequent · Maximum Gap',
    code: `# Dutch National Flag — 3-way partition
lo = mid = 0; hi = len(nums) - 1
while mid <= hi:
    if nums[mid] == 0:
        nums[lo], nums[mid] = nums[mid], nums[lo]
        lo += 1; mid += 1
    elif nums[mid] == 1:
        mid += 1
    else:
        nums[mid], nums[hi] = nums[hi], nums[mid]
        hi -= 1`
  },
  {
    id: 'sort-t4', label: 'Sort D — Binary Search (Classic Template)', color: '#14b8a6',
    tag: 'Search in Rotated Array · Find First/Last Position · Peak Element',
    code: `# Closed-interval binary search — most universal
lo, hi = 0, len(nums) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] == target:
        return mid
    elif nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1
return -1

# Left-boundary variant (first occurrence):
# while lo < hi:
#     mid = (lo+hi)//2
#     if nums[mid] < target: lo = mid+1
#     else: hi = mid`
  },
  {
    id: 'sort-t5', label: 'Sort E — Monotonic Stack (Next Greater)', color: '#6366f1',
    tag: 'Next Greater Element · Daily Temperatures · Largest Rectangle · Trapping Rain Water',
    code: `# Next Greater Element — monotonic decreasing stack
result = [-1] * len(nums)
stack = []   # stores indices
for i in range(len(nums)):
    while stack and nums[i] > nums[stack[-1]]:
        idx = stack.pop()
        result[idx] = nums[i]      # nums[i] is next greater
    stack.append(i)
return result`
  }
];

/* ============================================================
   TEMPLATE BUILDER — generic factory
   ============================================================ */
function buildTemplateSection(id, label, iconPath, templates) {
  let html = `<div class="grd-tmpl-wrap">
    <button class="grd-tmpl-toggle" id="${id}-tmpl-toggle" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        ${iconPath}
      </svg>
      <span>${label}</span>
      <span class="grd-tmpl-count">${templates.length} patterns</span>
      <svg class="grd-tmpl-chev" viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="grd-tmpl-body" id="${id}-tmpl-body">
      <div class="grd-tmpl-grid">`;

  templates.forEach(t => {
    const codeEsc = esc(t.code);
    html += `<div class="grd-tmpl-card" style="--tc:${t.color}">
      <div class="grd-tmpl-card-head">
        <span class="grd-tmpl-dot" style="background:${t.color};box-shadow:0 0 8px ${t.color}66"></span>
        <div class="grd-tmpl-meta">
          <div class="grd-tmpl-title">${esc(t.label)}</div>
          <div class="grd-tmpl-tag">${esc(t.tag)}</div>
        </div>
        <button class="grd-tmpl-copy" data-code="${codeEsc}" title="Copy code">
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <pre class="grd-tmpl-code"><code>${codeEsc}</code></pre>
    </div>`;
  });

  html += `</div></div></div>`;
  return html;
}

function buildGreedyTemplates() {
  let html = `<div class="grd-tmpl-wrap">
    <button class="grd-tmpl-toggle" id="grd-tmpl-toggle" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
      <span>Pattern Templates</span>
      <span class="grd-tmpl-count">${GREEDY_TEMPLATES.length} patterns</span>
      <svg class="grd-tmpl-chev" viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="grd-tmpl-body" id="grd-tmpl-body">
      <div class="grd-tmpl-grid">`;

  GREEDY_TEMPLATES.forEach(t => {
    const codeEsc = esc(t.code);
    html += `<div class="grd-tmpl-card" style="--tc:${t.color}">
      <div class="grd-tmpl-card-head">
        <span class="grd-tmpl-dot" style="background:${t.color};box-shadow:0 0 8px ${t.color}66"></span>
        <div class="grd-tmpl-meta">
          <div class="grd-tmpl-title">${esc(t.label)}</div>
          <div class="grd-tmpl-tag">${esc(t.tag)}</div>
        </div>
        <button class="grd-tmpl-copy" data-code="${codeEsc}" title="Copy code">
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <pre class="grd-tmpl-code"><code>${codeEsc}</code></pre>
    </div>`;
  });

  html += `</div></div></div>`;
  return html;
}

function buildHeapTemplates() {
  let html = `<div class="grd-tmpl-wrap">
    <button class="grd-tmpl-toggle" id="heap-tmpl-toggle" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        <path d="M12 4 4 19h16L12 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M7.6 13.5h8.8" stroke="currentColor" stroke-width="2"/>
      </svg>
      <span>Heap Pattern Templates</span>
      <span class="grd-tmpl-count">${HEAP_TEMPLATES.length} patterns</span>
      <svg class="grd-tmpl-chev" viewBox="0 0 24 24" fill="none" width="15" height="15" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="grd-tmpl-body" id="heap-tmpl-body">
      <div class="grd-tmpl-grid">`;

  HEAP_TEMPLATES.forEach(t => {
    const codeEsc = esc(t.code);
    html += `<div class="grd-tmpl-card" style="--tc:${t.color}">
      <div class="grd-tmpl-card-head">
        <span class="grd-tmpl-dot" style="background:${t.color};box-shadow:0 0 8px ${t.color}66"></span>
        <div class="grd-tmpl-meta">
          <div class="grd-tmpl-title">${esc(t.label)}</div>
          <div class="grd-tmpl-tag">${esc(t.tag)}</div>
        </div>
        <button class="grd-tmpl-copy" data-code="${codeEsc}" title="Copy code">
          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
      <pre class="grd-tmpl-code"><code>${codeEsc}</code></pre>
    </div>`;
  });

  html += `</div></div></div>`;
  return html;
}

function buildDetail(sec) {
  let html = '';

  // Inject pattern templates at the top of the relevant sections
  if (sec.id === 'greedy') {
    html += buildGreedyTemplates();
  }
  if (sec.id === 'heap') {
    html += buildHeapTemplates();
  }
  if (sec.id === 'dp-basic') {
    html += buildTemplateSection('dp-basic',
      'DP Basic Pattern Templates',
      '<rect x="4" y="4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="13" y="4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="4" y="13" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="2"/>',
      DP_BASIC_TEMPLATES);
  }
  if (sec.id === 'dp-advanced') {
    html += buildTemplateSection('dp-advanced',
      'DP Advanced Pattern Templates',
      '<rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3.5 9.4h17M3.5 14.8h17M9.4 3.5v17M14.8 3.5v17" stroke="currentColor" stroke-width="2"/>',
      DP_ADVANCED_TEMPLATES);
  }
  if (sec.id === 'graphs') {
    html += buildTemplateSection('graphs',
      'Graph Pattern Templates',
      '<circle cx="6" cy="6" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="7" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="18" r="2.3" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="17" r="2.3" stroke="currentColor" stroke-width="2"/><path d="M8 7 16 6.6M8 16.4 16 8.4M11 17.4 16 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      GRAPHS_TEMPLATES);
  }
  if (sec.id === 'recursion') {
    html += buildTemplateSection('recursion',
      'Backtracking Pattern Templates',
      '<path d="M4 9a8 8 0 0 1 13.5-3.5L20 8M20 4v4h-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 15a8 8 0 0 1-13.5 3.5L4 16M4 20v-4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      RECURSION_TEMPLATES);
  }
  if (sec.id === 'arrays') {
    html += buildTemplateSection('arrays',
      'Arrays & Sliding Window Pattern Templates',
      '<rect x="3" y="9" width="18" height="6" rx="1.6" stroke="currentColor" stroke-width="2"/><path d="M9 9v6M15 9v6" stroke="currentColor" stroke-width="2"/>',
      ARRAYS_TEMPLATES);
  }
  if (sec.id === 'strings') {
    html += buildTemplateSection('strings',
      'String Pattern Templates',
      '<path d="M5 6h14M5 11h10M5 16h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      STRINGS_TEMPLATES);
  }
  if (sec.id === 'trees') {
    html += buildTemplateSection('trees',
      'Tree Pattern Templates',
      '<circle cx="12" cy="5" r="2.4" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="18" r="2.4" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" stroke-width="2"/><path d="M10.4 6.8 7.4 16M13.6 6.8 16.6 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
      TREES_TEMPLATES);
  }
  if (sec.id === 'sorting') {
    html += buildTemplateSection('sorting',
      'Sorting & Binary Search Pattern Templates',
      '<path d="M4 6h13M4 11h9M4 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 7v10m0 0 2.4-2.4M19 17l-2.4-2.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      SORTING_TEMPLATES);
  }

  const multi = sec.cards.length > 1;
  sec.cards.forEach(card => {
    if (multi || (card.title && card.title !== sec.label)) {
      html += `<div class="group-label">${esc(card.title)}</div>`;
    }
    card.sections.forEach(s => {
      html += `<div class="subsection">`;
      if (s.label) html += `<div class="subsection-label">${esc(s.label)}</div>`;
      s.questions.forEach(ref => { if (!HIDDEN_SET.has(ref.id)) html += questionRow(ref); });
      html += `</div>`;
    });
  });
  const added = (state.added || []).filter(a => a.topic === sec.id && !HIDDEN_SET.has(a.id));
  if (added.length) {
    html += `<div class="subsection"><div class="subsection-label">✦ Added by you</div>`;
    added.forEach(a => { html += questionRow({ id: a.id }); });
    html += `</div>`;
  }
  // Inline add button — always shown at bottom of card
  html += `<button class="add-to-topic-btn" data-topic="${esc(sec.id)}">` +
    `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="14" height="14"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>` +
    ` Add question to ${esc(sec.label)}` +
  `</button>`;
  return html;
}

function questionRow(ref) {
  const q = getQ(ref.id) || { name: ref.id, url: '#', source: '' };
  const status = getStatus(ref.id);
  const opt = STATUS_LABEL[status];
  let tags = '';
  if (q.hard) tags += '<span class="tag tag-hard">Hard</span>';
  if (q.source === 'gfg' || /^gfg:/.test(ref.id)) tags += '<span class="tag tag-gfg">GFG</span>';
  if (q.source === 'added') tags += '<span class="tag tag-added">Added</span>';
  
  const hasSol = typeof SOLUTION_MAP !== 'undefined' && !!SOLUTION_MAP[ref.id];
  const solBtnHTML = hasSol ? `<button class="view-sol-btn" data-sol="${esc(ref.id)}" title="View solution approach & code"><svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>` : '';

  return `<div class="q-row" data-qid="${esc(ref.id)}" data-name="${esc((q.name || '').toLowerCase())}">` +
      `<span class="q-status-dot st-${status}" data-dot="${esc(ref.id)}"></span>` +
      `<a class="q-link" href="${esc(q.url || '#')}" target="_blank" rel="noopener">${esc(q.name || ref.id)}<span class="ext">${svg('ext')}</span></a>` +
      (tags ? `<span class="q-tags">${tags}</span>` : '') +
      solBtnHTML +
      `<button class="status-btn" data-status="${esc(ref.id)}">` +
        `<span class="sb-dot st-${status}" data-sbdot="${esc(ref.id)}"></span>` +
        `<span class="sb-label" data-sblabel="${esc(ref.id)}">${opt.short}</span>` +
        `<span class="sb-caret">${svg('caret')}</span>` +
      `</button>` +
    `</div>`;
}

/* ============================================================
   STATS + RING (with count-up)
   ============================================================ */
function renderStats(animate) {
  const g = globalStats();
  const cards = [
    { key: 'solved',  ico: 'target',  c: '#10B981', val: g.solved,        name: 'Questions Solved' },
    { key: 'total',   ico: 'list',    c: '#3B82F6', val: g.total,         name: 'Total Questions' },
    { key: 'streak',  ico: 'flame',   c: '#F59E0B', val: g.streak,        name: 'Day Streak' },
    { key: 'pct',     ico: 'percent', c: '#8B5CF6', val: g.pct, suf: '%', name: 'Completion' },
    { key: 'topics',  ico: 'trophy',  c: '#10B981', val: g.masteredTopics, suf: '/' + g.topics, name: 'Topics Mastered' }
  ];
  const row = $('#stats-row');
  if (!row.children.length) {
    row.innerHTML = cards.map((c, i) =>
      `<div class="stat-card" style="--accent:${c.c}; animation-delay:${i * 70}ms">` +
        `<div class="stat-ico">${svg(c.ico)}</div>` +
        `<div class="stat-num"><span data-stat="${c.key}">0</span>${c.suf ? `<span class="suffix">${c.key === 'topics' ? '' : ''}</span>` : ''}</div>` +
        `<div class="stat-name">${c.name}</div>` +
      `</div>`).join('');
  }
  cards.forEach(c => {
    const el = $(`[data-stat="${c.key}"]`);
    if (!el) return;
    const suffix = c.suf || '';
    if (animate) countUp(el, c.val, suffix);
    else el.textContent = c.val + suffix;
  });
}

function countUp(el, target, suffix) {
  const dur = 1100, start = performance.now();
  const from = 0;
  function frame(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (target - from) * eased) + (suffix || '');
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = target + (suffix || '');
  }
  requestAnimationFrame(frame);
}

function updateRing(animate) {
  const g = globalStats();
  const ring = $('#ring-progress');
  const pctEl = $('#ring-pct');
  const offset = RING_C * (1 - g.pct / 100);
  if (animate) {
    ring.style.strokeDashoffset = RING_C;
    requestAnimationFrame(() => { ring.style.strokeDashoffset = offset; });
    countUp(pctEl, g.pct, '%');
  } else {
    ring.style.strokeDashoffset = offset;
    pctEl.textContent = g.pct + '%';
  }
}

/* ============================================================
   STATUS CHANGE
   ============================================================ */
function setStatus(qid, status) {
  state.status[qid] = status;
  markActiveToday();
  saveState();

  const opt = STATUS_LABEL[status];
  $$(`[data-dot="${cssEsc(qid)}"]`).forEach(d => { d.className = 'q-status-dot st-' + status; });
  $$(`[data-sbdot="${cssEsc(qid)}"]`).forEach(d => { d.className = 'sb-dot st-' + status; });
  $$(`[data-sblabel="${cssEsc(qid)}"]`).forEach(l => { l.textContent = opt.short; });

  // which topics contain this qid
  QBANK.prioritySections.forEach(sec => {
    if (TOPIC_QIDS[sec.id].includes(qid)) updateTopicUI(sec.id);
  });
  updateRing(false);
  renderStats(false);
  applyFilters();
}
function cssEsc(s) { return String(s).replace(/["\\]/g, '\\$&'); }

function updateTopicUI(sectionId) {
  const st = topicStats(sectionId);
  const card = $(`.card[data-id="${cssEsc(sectionId)}"]`);
  if (card) {
    const fill = $(`[data-fill="${cssEsc(sectionId)}"]`, card);
    fill.style.width = st.pct + '%';
    fill.classList.toggle('is-complete', st.pct === 100);
    const count = $(`[data-count="${cssEsc(sectionId)}"]`, card);
    count.innerHTML = `${st.solved}<span class="sep"> / </span>${st.total}`;
    $(`[data-cpleft="${cssEsc(sectionId)}"]`, card).textContent = `${st.solved} of ${st.total} solved`;
    const right = $(`[data-cpright="${cssEsc(sectionId)}"]`, card);
    right.classList.toggle('is-complete', st.pct === 100);
    right.innerHTML = st.pct === 100 ? svg('check') + ' Complete' : st.pct + '%';
    card.dataset.state = st.pct === 100 ? 'completed' : (st.solved > 0 ? 'in-progress' : 'not-started');
  }
  const navfill = $(`[data-navfill="${cssEsc(sectionId)}"]`);
  if (navfill) navfill.style.width = st.pct + '%';
  const navpct = $(`[data-navpct="${cssEsc(sectionId)}"]`);
  if (navpct) navpct.textContent = st.pct + '%';
}

/* ============================================================
   STATUS POPOVER
   ============================================================ */
let openPop = null;
function closePop() { if (openPop) { openPop.remove(); openPop = null; document.removeEventListener('keydown', popKey); } }
function popKey(e) { if (e.key === 'Escape') closePop(); }
function openStatusPop(btn, qid) {
  const cur = getStatus(qid);
  if (openPop && openPop.dataset.qid === qid) { closePop(); return; }
  closePop();
  const pop = document.createElement('div');
  pop.className = 'status-pop';
  pop.dataset.qid = qid;
  pop.innerHTML = STATUS_OPTIONS.map(o =>
    `<button class="status-pop-item ${o.v === cur ? 'is-current' : ''}" data-v="${o.v}">` +
      `<span class="pop-dot st-${o.v}"></span>${o.label}<span class="pop-check">${svg('check')}</span>` +
    `</button>`).join('');
  document.body.appendChild(pop);
  const r = btn.getBoundingClientRect();
  const pw = pop.offsetWidth, ph = pop.offsetHeight;
  let left = Math.min(r.right - pw, window.innerWidth - pw - 10);
  left = Math.max(10, left);
  let top = r.bottom + 8;
  if (top + ph > window.innerHeight - 10) top = r.top - ph - 8;
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
  pop.addEventListener('click', e => {
    const item = e.target.closest('.status-pop-item');
    if (!item) return;
    setStatus(qid, item.dataset.v);
    closePop();
  });
  openPop = pop;
  document.addEventListener('keydown', popKey);
}

/* ============================================================
   CARD EXPAND / NAVIGATION
   ============================================================ */
function toggleCard(card, forceOpen) {
  const open = forceOpen != null ? forceOpen : !card.classList.contains('is-open');
  card.classList.toggle('is-open', open);
}
function goToTopic(id) {
  const card = $(`.card[data-id="${cssEsc(id)}"]`);
  if (!card) return;
  // clear search/filter so the topic is visible
  const search = $('#search-input');
  if (search.value) { search.value = ''; applySearch(''); }
  setFilter('all');
  toggleCard(card, true);
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveNav(id);
  closeDrawer();
}
function setActiveNav(id) {
  $$('.nav-item').forEach(n => n.classList.toggle('is-active', n.dataset.target === id));
}

/* ============================================================
   FILTER + SEARCH
   ============================================================ */
let currentFilter = 'all';
function setFilter(f) {
  currentFilter = f;
  $$('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === f));
  applyFilters();
}
function cardState(card) {
  return card.dataset.state || (() => {
    const st = topicStats(card.dataset.id);
    return st.pct === 100 ? 'completed' : (st.solved > 0 ? 'in-progress' : 'not-started');
  })();
}
function applyFilters() {
  const q = $('#search-input').value.trim().toLowerCase();
  let visible = 0;
  $$('.card').forEach(card => {
    const id = card.dataset.id;
    const label = (QBANK.prioritySections.find(s => s.id === id) || {}).label || '';
    const passFilter = currentFilter === 'all' || cardState(card) === currentFilter;
    let passSearch = true, matchedRows = null;
    if (q) {
      const labelMatch = label.toLowerCase().includes(q) || (META[id] && META[id].d.toLowerCase().includes(q));
      const rows = $$('.q-row', card);
      matchedRows = rows.filter(r => r.dataset.name.includes(q));
      passSearch = labelMatch || matchedRows.length > 0;
      // toggle rows
      rows.forEach(r => r.classList.toggle('is-hidden-search', !(labelMatch || r.dataset.name.includes(q))));
      if (passSearch && !labelMatch) toggleCard(card, true);
    } else {
      $$('.q-row', card).forEach(r => r.classList.remove('is-hidden-search'));
    }
    const show = passFilter && passSearch;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  // hide empty tier bands
  $$('.tier-band').forEach(band => {
    const any = $$('.card', band).some(c => c.style.display !== 'none');
    band.style.display = any ? '' : 'none';
  });
  $('#empty-state').hidden = visible !== 0;
}
function applySearch(q) { applyFilters(); }

/* ============================================================
   SIDEBAR COLLAPSE + MOBILE DRAWER
   ============================================================ */
function setCollapsed(c) {
  document.body.classList.toggle('sidebar-collapsed', c);
  state.ui = state.ui || {}; state.ui.collapsed = c; saveState();
  const tog = $('#sidebar-toggle');
  if (tog) tog.title = c ? 'Open sidebar' : 'Close sidebar';
  // Show peek tab on desktop when sidebar is collapsed
  const peek = $('#sidebar-peek');
  if (peek && window.innerWidth > 900) peek.style.display = c ? 'flex' : 'none';
}
function openDrawer() { $('#sidebar').classList.add('is-open'); const s = $('#scrim'); s.hidden = false; }
function closeDrawer() { $('#sidebar').classList.remove('is-open'); $('#scrim').hidden = true; }

/* ============================================================
   ACTIVE NAV ON SCROLL
   ============================================================ */
function setupObserver() {
  if (typeof IntersectionObserver === 'undefined') return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.dataset.id); });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });
  $$('.card').forEach(c => obs.observe(c));
}

/* ============================================================
   REMOVE STUCK / HIDDEN MANAGEMENT
   ============================================================ */
function removeStuck() {
  // collect all questions currently visible that are marked 'failed'
  const toHide = ALL_QIDS.filter(id => getStatus(id) === 'failed');
  if (!toHide.length) { toast('No stuck questions to remove.'); return; }

  // confirm before acting
  const count = toHide.length;
  openModal('Remove Stuck Questions', `
    <div style="display:flex;flex-direction:column;gap:18px;padding:4px 0">
      <p style="margin:0;font-size:14px;line-height:1.6;color:var(--text)">
        This will hide <strong>${count} stuck question${count > 1 ? 's' : ''}</strong> from your list.<br>
        Your progress data is kept — you can restore them any time.
      </p>
      <div style="display:flex;gap:10px">
        <button class="primary-btn" id="confirm-remove" style="background:var(--red,#EF4444)">Remove ${count} question${count > 1 ? 's' : ''}</button>
        <button class="ghost-btn" id="cancel-remove">Cancel</button>
      </div>
    </div>`, body => {
    body.querySelector('#cancel-remove').addEventListener('click', closeModal);
    body.querySelector('#confirm-remove').addEventListener('click', () => {
      state.hidden = Array.from(new Set([...(state.hidden || []), ...toHide]));
      saveState();
      buildIndices();
      render();
      renderStats(false);
      updateRing(false);
      applyFilters();
      closeModal();
      toast(`Removed ${count} stuck question${count > 1 ? 's' : ''}`);
    });
  });
}

function openHiddenModal() {
  const hidden = state.hidden || [];
  if (!hidden.length) { toast('No hidden questions.'); return; }

  const rows = hidden.map(id => {
    const q = QBANK.questions[id] || ADDED[id] || { name: id, url: '#' };
    return `<div class="hidden-row" data-id="${esc(id)}">
      <span class="hidden-name">${esc(q.name || id)}</span>
      <button class="ghost-btn hidden-restore" data-id="${esc(id)}">Restore</button>
    </div>`;
  }).join('');

  openModal(`Hidden Questions (${hidden.length})`,
    `<div style="display:flex;flex-direction:column;gap:6px">
       <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">These questions are hidden from your list. Restore any to bring them back.</div>
       ${rows}
       <button class="ghost-btn" id="restore-all-hidden" style="margin-top:10px;align-self:flex-start">Restore All</button>
     </div>`,
    body => {
      body.querySelectorAll('.hidden-restore').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          state.hidden = (state.hidden || []).filter(x => x !== id);
          saveState(); buildIndices(); render(); renderStats(false); updateRing(false); applyFilters();
          closeModal();
          toast('Question restored');
        });
      });
      const restoreAll = body.querySelector('#restore-all-hidden');
      if (restoreAll) restoreAll.addEventListener('click', () => {
        state.hidden = [];
        saveState(); buildIndices(); render(); renderStats(false); updateRing(false); applyFilters();
        closeModal();
        toast('All questions restored');
      });
    }
  );
}

function fallbackCopy(txt) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch(e) {} ta.remove(); }

function openSolutionModal(qid) {
  const sol = SOLUTION_MAP[qid];
  if (!sol) return;
  const codeEsc = esc(sol.code || '');
  const title = (getQ(qid) || {}).name || qid;
  const html = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="font-size:14px; color:var(--text); line-height:1.5;">
        <strong style="color:var(--text-3); text-transform:uppercase; font-size:11px; letter-spacing:0.04em; display:block; margin-bottom:4px;">Approach</strong>
        ${esc(sol.approach)}
      </div>
      <div>
        <strong style="color:var(--text-3); text-transform:uppercase; font-size:11px; letter-spacing:0.04em; display:block; margin-bottom:4px;">Complexity</strong>
        <div style="font-size:13px; color:var(--text-2);">${esc(sol.complexity)}</div>
      </div>
      <div style="position:relative; margin-top:8px;">
        <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.4); border:1px solid var(--border); border-bottom:none; border-radius:8px 8px 0 0; padding:8px 12px;">
          <span style="font-size:11px; color:var(--text-3); font-weight:600; font-family:var(--font);">Solution Code</span>
          <button class="ghost-btn" style="height:24px; padding:0 8px; font-size:11px;" onclick="fallbackCopy(this.dataset.val); toast('Code copied');" data-val="${codeEsc}">Copy</button>
        </div>
        <pre style="margin:0; padding:12px; background:rgba(0,0,0,0.25); border:1px solid var(--border); border-radius:0 0 8px 8px; overflow-x:auto; font-family:'JetBrains Mono', monospace; font-size:12px; color:#c8d3e8; line-height:1.6;"><code>${codeEsc}</code></pre>
      </div>
    </div>
  `;
  openModal(title, html);
}

/* ============================================================
   EVENTS
   ============================================================ */
function wire() {
  // status button + popover + inline add-to-topic + greedy templates (delegated)
  document.addEventListener('click', e => {
    const atb = e.target.closest('.add-to-topic-btn');
    if (atb) { e.stopPropagation(); openAddToTopicModal(atb.dataset.topic); return; }
    const sb = e.target.closest('.status-btn');
    if (sb) { e.stopPropagation(); openStatusPop(sb, sb.dataset.status); return; }
    if (openPop && !e.target.closest('.status-pop')) closePop();

    // greedy template toggle
    const gt = e.target.closest('.grd-tmpl-toggle');
    if (gt) {
      e.stopPropagation();
      const body = gt.nextElementSibling;
      const open = gt.getAttribute('aria-expanded') === 'true';
      gt.setAttribute('aria-expanded', open ? 'false' : 'true');
      body.classList.toggle('is-open', !open);
      return;
    }

    // greedy template copy button
    const cp = e.target.closest('.grd-tmpl-copy');
    if (cp) {
      e.stopPropagation();
      const code = cp.dataset.code || '';
      const done = () => { cp.classList.add('ok'); setTimeout(() => cp.classList.remove('ok'), 1400); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(done, () => { fallbackCopy(code); done(); });
      } else { fallbackCopy(code); done(); }
      toast('Code copied!');
      return;
    }
    
    // solution button click
    const vsb = e.target.closest('.view-sol-btn');
    if (vsb) { e.stopPropagation(); openSolutionModal(vsb.dataset.sol); return; }
  });
  window.addEventListener('scroll', closePop, true);
  window.addEventListener('resize', closePop);

  // search
  const search = $('#search-input');
  search.addEventListener('input', () => applyFilters());

  // filter chips
  $('#filter-chips').addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (chip) setFilter(chip.dataset.filter);
  });

  // sidebar collapse (desktop)
  const stog = $('#sidebar-toggle');
  if (stog) stog.addEventListener('click', () => setCollapsed(!document.body.classList.contains('sidebar-collapsed')));
  const peek = $('#sidebar-peek');
  if (peek) peek.addEventListener('click', () => setCollapsed(false));

  // mobile drawer
  $('#fab-topics').addEventListener('click', openDrawer);
  $('#scrim').addEventListener('click', closeDrawer);

  // tools: mock exam + history + find/add + remove stuck + hidden
  const oe = $('#open-exam'); if (oe) oe.addEventListener('click', openExamModal);
  const vhBtn = $('#view-history'); if (vhBtn) vhBtn.addEventListener('click', showMockHistory);
  const of = $('#open-finder'); if (of) of.addEventListener('click', () => openFinderModal());
  const rs = $('#remove-stuck'); if (rs) rs.addEventListener('click', removeStuck);
  const vh = $('#view-hidden'); if (vh) vh.addEventListener('click', openHiddenModal);
  const mc = $('#modal-close'); if (mc) mc.addEventListener('click', closeModal);
  const mr = $('#modal-root');
  if (mr) mr.addEventListener('click', e => { if (e.target.hasAttribute('data-close') || e.target.id === 'modal-root') closeModal(); });

  // keyboard
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== search && (!mr || mr.hidden)) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape') {
      if (openPop) return;
      if (mr && !mr.hidden) { closeModal(); return; }
      if ($('#sidebar').classList.contains('is-open')) { closeDrawer(); return; }
      if (search.value) { search.value = ''; applyFilters(); search.blur(); }
    }
  });
}

/* ============================================================
   MASTER LIST + DIFFICULTY MODEL
   ============================================================ */
function topicTier(topicId) { const s = QBANK.prioritySections.find(x => x.id === topicId); return s ? s.tier : 3; }
function topicLabelOf(topicId) { const s = QBANK.prioritySections.find(x => x.id === topicId); return s ? s.label : null; }
function masterList() {
  const out = [];
  Object.entries(QBANK.questions).forEach(([id, q]) => out.push({ id, name: q.name, url: q.url, hard: !!q.hard, source: q.source, topic: QID_TOPIC[id] || null }));
  (state.added || []).forEach(a => out.push({ id: a.id, name: a.name, url: a.url || '#', hard: !!a.hard, source: 'added', topic: a.topic }));
  return out;
}
function qDifficulty(it) {
  if (it.hard) return 'hard';
  const t = topicTier(it.topic);
  if (t === 4) return 'hard';
  // Use position within topic to spread easy/medium/hard across all tier-1/2/3 topics.
  // rank is 0 (first question) to 1 (last question) within the topic's ordered list.
  const rank = QID_RANK[it.id] != null ? QID_RANK[it.id] : 0.5;
  if (rank < 0.35) return 'easy';
  if (rank < 0.70) return 'medium';
  return 'hard';
}
const DIFF_META = { easy: { label: 'Easy', c: '#10B981' }, medium: { label: 'Medium', c: '#F59E0B' }, hard: { label: 'Hard', c: '#EF4444' } };

/* ============================================================
   MOCK EXAM GENERATOR (balanced: mixed difficulty + distinct topics)
   ============================================================ */
const EXAM_TEMPLATES = { 3: ['easy', 'medium', 'hard'], 4: ['easy', 'medium', 'medium', 'hard'], 5: ['easy', 'easy', 'medium', 'medium', 'hard'] };
const DIFF_TIME = { easy: 20, medium: 35, hard: 45 };
let examTimer = null, examState = null;

function normalizeExamTopicFilter(raw) {
  const text = String(raw == null ? '' : raw).trim();
  if (!text || text === 'all') return null;
  const tiers = new Set();
  const topics = new Set();
  const tokens = text.split(/[\n;,]+/).map(s => s.trim()).filter(Boolean);
  const aliasMap = {
    hash: 'hash-map',
    'hash-map': 'hash-map',
    hashmap: 'hash-map',
    'hash map': 'hash-map',
    dp: 'dp-basic',
    'dynamic programming': 'dp-basic',
    'dynamic-programming': 'dp-basic',
    'linked-list': 'linked-list',
    linkedlist: 'linked-list',
    'linked list': 'linked-list',
    'bit manipulation': 'bit',
    'bit-manipulation': 'bit'
  };
  tokens.forEach(token => {
    const normalized = token.toLowerCase().trim();
    const tierValue = normalized.startsWith('tier:') ? normalized.slice(5).trim() : normalized;
    const rangeMatch = tierValue.match(/^(?:tier|t)?\s*(\d+)\s*(?:\.{2,}|-|to)\s*(\d+)$/);
    if (rangeMatch) {
      const start = +rangeMatch[1], end = +rangeMatch[2];
      if (start <= end) {
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= 4) tiers.add(i);
        }
      }
      return;
    }
    const singleTierMatch = tierValue.match(/^(?:tier|t)?\s*(\d+)$/);
    if (singleTierMatch) {
      const n = +singleTierMatch[1];
      if (n >= 1 && n <= 4) tiers.add(n);
      return;
    }
    const topicId = aliasMap[normalized] || (QBANK.prioritySections.find(s => {
      const id = (s.id || '').toLowerCase();
      const label = (s.label || '').toLowerCase();
      return id === normalized || label === normalized || label.replace(/\s+/g, '-') === normalized || id === token;
    }) || {}).id;
    if (topicId) topics.add(topicId);
  });
  return { tiers: Array.from(tiers).sort(), topics: Array.from(topics) };
}

function generateExam(size, topicFilter) {
  const comp = EXAM_TEMPLATES[size] || EXAM_TEMPLATES[4];
  const filter = normalizeExamTopicFilter(topicFilter);
  const basePool = masterList().filter(x => x.topic).map(x => Object.assign({}, x, { diff: qDifficulty(x), topicLabel: topicLabelOf(x.topic) }));
  const pool = basePool.filter(x => {
    if (!filter) return true;
    const tierMatch = !filter.tiers.length || filter.tiers.includes(topicTier(x.topic));
    const topicMatch = !filter.topics.length || filter.topics.includes(x.topic);
    return tierMatch && topicMatch;
  });
  const activePool = pool.length ? pool : basePool;
  const byDiff = { easy: [], medium: [], hard: [] };
  activePool.forEach(x => byDiff[x.diff].push(x));
  const usedTopics = new Set(), usedIds = new Set(), result = [];
  comp.forEach(level => {
    let cand = byDiff[level].filter(x => !usedTopics.has(x.topic) && !usedIds.has(x.id));      // ideal: right difficulty, new topic
    if (!cand.length) cand = byDiff[level].filter(x => !usedIds.has(x.id));                      // relax topic uniqueness
    if (!cand.length) cand = activePool.filter(x => !usedTopics.has(x.topic) && !usedIds.has(x.id));   // relax difficulty, keep topic variety
    if (!cand.length) cand = activePool.filter(x => !usedIds.has(x.id));                               // last resort
    if (!cand.length) return;
    const pick = cand[Math.floor(Math.random() * cand.length)];
    usedTopics.add(pick.topic); usedIds.add(pick.id); result.push(pick);
  });
  const order = { easy: 0, medium: 1, hard: 2 };
  result.sort((a, b) => order[a.diff] - order[b.diff]);
  return result;
}

function openExamModal() {
  const size = (state.ui && state.ui.examSize) || 4;
  const topicInput = (state.ui && state.ui.examTopics) || '';
  examState = { size, topicInput, questions: generateExam(size, topicInput), remaining: null };
  openModal('Mock Exam', examModalHTML(), wireExamModal);
}
function examModalHTML() {
  const qs = examState.questions;
  const counts = { easy: 0, medium: 0, hard: 0 }; qs.forEach(q => counts[q.diff]++);
  const mins = qs.reduce((m, q) => m + DIFF_TIME[q.diff], 0);
  const sizes = [3, 4, 5].map(n => `<button class="seg ${examState.size === n ? 'is-active' : ''}" data-size="${n}">${n} Q</button>`).join('');
  const summary = ['easy', 'medium', 'hard'].filter(d => counts[d]).map(d => `${counts[d]} ${DIFF_META[d].label}`).join(' · ');
  const list = qs.map((q, i) => examQuestionHTML(q, i)).join('');
  const currentValue = examState.topicInput || '';
  const selected = new Set(currentValue.split(',').map(s => s.trim()).filter(Boolean));
  const topicOptions = ['all', ...[1,2,3,4].map(t => `tier:${t}`), ...(QBANK.prioritySections || []).map(s => s.id)];
  const currentLabel = (() => {
    if (!currentValue || currentValue === 'all') return 'All topics';
    const count = selected.size;
    if (count === 1) {
      const val = Array.from(selected)[0];
      if (val.startsWith('tier:')) return `Tier ${val.split(':')[1]}`;
      const sec = QBANK.prioritySections.find(s => s.id === val);
      return (sec && sec.label) || val;
    }
    return `${count} selected`;
  })();
  const dropdownOptions = topicOptions.map(v => {
    const isSelected = selected.has(v);
    const label = v === 'all' ? 'All topics' : v.startsWith('tier:') ? `Tier ${v.split(':')[1]}` : (QBANK.prioritySections.find(s => s.id === v) || {}).label || v;
    return `<div class="exam-dd-item" data-value="${esc(v)}" ${isSelected ? 'data-selected="true"' : ''}><input type="checkbox" ${isSelected ? 'checked' : ''} style="margin-right:8px;pointer-events:none">${esc(label)}</div>`;
  }).join('');
  return `
    <div class="exam-toolbar">
      <div class="seg-group" id="exam-sizes">${sizes}</div>
      <div class="exam-actions" style="margin-left: auto; display: flex; gap: 8px;">
        <button class="primary-btn" id="exam-accept" style="padding: 0 16px; margin: 0; min-width: max-content;">Accept & Start</button>
        <button class="ghost-btn" id="exam-regen">⟳ Regenerate</button>
        <button class="ghost-btn" id="exam-history-btn">History</button>
      </div>
    </div>
    <div class="exam-topic-filter">
      <label class="exam-topic-label">Topics</label>
      <div class="exam-dd-wrapper">
        <button class="exam-dd-trigger" id="exam-topics">${esc(currentLabel)}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="exam-dd-menu" id="exam-dd-menu">${dropdownOptions}</div>
      </div>
    </div>
    <div class="exam-meta"><strong>${qs.length} questions</strong> · ${summary} · suggested ~${mins} min<br><span class="exam-note">Balanced across ${new Set(qs.map(q => q.topic)).size} topics — picked only from your list.</span></div>
    <div class="exam-list">${list}</div>`;
}
function examQuestionHTML(q, i) {
  const dm = DIFF_META[q.diff];
  const acc = (META[q.topic] && META[q.topic].c) || '#3B82F6';
  return `<div class="exam-q" style="--accent:${acc}">
    <div class="eq-num">Q${i + 1}</div>
    <div class="eq-body">
      <a class="eq-name" href="${esc(q.url || '#')}" target="_blank" rel="noopener">${esc(q.name)}</a>
      <div class="eq-tags">
        <span class="diffchip" style="--dc:${dm.c}">${dm.label}</span>
        <span class="topicchip">${esc(q.topicLabel || '—')}</span>
        ${q.source === 'gfg' ? '<span class="tag tag-gfg">GFG</span>' : ''}${q.source === 'added' ? '<span class="tag tag-added">Added</span>' : ''}
      </div>
    </div>
    <a class="eq-open" href="${esc(q.url || '#')}" target="_blank" rel="noopener" aria-label="Open problem"><svg viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  </div>`;
}
function wireExamModal(body) {
  const trigger = $('#exam-topics', body);
  const menu = $('#exam-dd-menu', body);
  let menuOpen = false;
  if (trigger && menu) {
    const toggleMenu = () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menu.classList.add('is-open');
        trigger.classList.add('is-active');
      } else {
        menu.classList.remove('is-open');
        trigger.classList.remove('is-active');
      }
    };
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    $$('.exam-dd-item', menu).forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.dataset.value;
        const selected = new Set(examState.topicInput.split(',').map(s => s.trim()).filter(Boolean));
        if (value === 'all') {
          examState.topicInput = '';
        } else {
          if (selected.has(value)) {
            selected.delete(value);
          } else {
            selected.delete('all');
            selected.add(value);
          }
          examState.topicInput = Array.from(selected).join(',');
        }
        state.ui = state.ui || {}; state.ui.examTopics = examState.topicInput; saveState();
        examState.questions = generateExam(examState.size, examState.topicInput);
        examState.remaining = null; stopExamTimer(); refreshExamBody();
      });
    });
    document.addEventListener('click', () => {
      menuOpen = false;
      menu.classList.remove('is-open');
      trigger.classList.remove('is-active');
    }, true);
  }
  $('#exam-regen', body).addEventListener('click', () => {
    examState.questions = generateExam(examState.size, examState.topicInput);
    examState.remaining = null; stopExamTimer(); refreshExamBody();
  });
  $('#exam-sizes', body).addEventListener('click', e => {
    const b = e.target.closest('[data-size]'); if (!b) return;
    examState.size = +b.dataset.size; state.ui = state.ui || {}; state.ui.examSize = examState.size; saveState();
    examState.questions = generateExam(examState.size, examState.topicInput); examState.remaining = null; stopExamTimer(); refreshExamBody();
  });
  $('#exam-accept', body).addEventListener('click', startMockSession);
  $('#exam-history-btn', body).addEventListener('click', showMockHistory);
}
function refreshExamBody() { const body = $('#modal-body'); body.innerHTML = examModalHTML(); wireExamModal(body); }
function fmtClock(sec) { const m = Math.floor(sec / 60), s = sec % 60; return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); }
// Timer moved to session logic
function stopExamTimer() { if (examTimer) { clearInterval(examTimer); examTimer = null; } }

/* ============================================================
   MOCK SESSION (FULL SCREEN)
   ============================================================ */
let mockSessionData = null;

function startMockSession() {
  closeModal();
  const initDurationSeconds = examState.questions.reduce((m, q) => m + DIFF_TIME[q.diff], 0) * 60;
  mockSessionData = {
    questions: JSON.parse(JSON.stringify(examState.questions)),
    duration: initDurationSeconds,
    remaining: initDurationSeconds,
    activeIndex: 0,
    answers: {},
    startTime: Date.now()
  };

  $('.app-shell').hidden = true;
  $('#mock-history-screen').hidden = true;
  $('#mock-session-screen').hidden = false;

  renderMockSessionSidebar();
  renderMockSessionDetail();

  $('#mock-timer-display').textContent = fmtClock(mockSessionData.remaining);
  $('#mock-timer-display').classList.remove('time-up', 'running');
  $('#mock-start-btn').textContent = '▶ Start Timer';

  wireMockSession();
}

function renderMockSessionSidebar() {
  const list = $('#mock-questions-list');
  if (!list) return;
  list.innerHTML = mockSessionData.questions.map((q, i) => `
    <div class="mock-q-item ${i === mockSessionData.activeIndex ? 'is-active' : ''} ${mockSessionData.answers[i] ? 'is-answered' : ''}" data-idx="${i}">
      <div class="mock-q-checkbox" data-idx="${i}"><input type="checkbox" ${mockSessionData.answers[i] ? 'checked' : ''} tabindex="-1"></div>
      <div class="mock-q-label">Q${i + 1}. ${esc(q.name)}</div>
      <div class="diffchip" style="--dc:${DIFF_META[q.diff].c}; transform:scale(0.85);">${DIFF_META[q.diff].label[0]}</div>
    </div>
  `).join('');
}

function renderMockSessionDetail() {
  const detail = $('#mock-question-detail');
  if (!detail) return;
  const i = mockSessionData.activeIndex;
  const q = mockSessionData.questions[i];
  if (!q) return;

  const dm = DIFF_META[q.diff];
  const acc = (META[q.topic] && META[q.topic].c) || '#3B82F6';

  detail.innerHTML = `
    <div class="mock-q-number">Question ${i + 1} of ${mockSessionData.questions.length}</div>
    <div class="mock-q-title">${esc(q.name)}</div>
    <div class="mock-q-tags">
      <span class="mock-q-tag mock-q-tag-difficulty" style="color:${dm.c}; background:color-mix(in srgb, ${dm.c} 15%, transparent);">${dm.label}</span>
      <span class="mock-q-tag mock-q-tag-topic" style="border: 1px solid var(--border);">${esc(q.topicLabel || '—')}</span>
    </div>
    <a class="mock-q-link" href="${esc(q.url || '#')}" target="_blank" rel="noopener">
      Open Problem <svg viewBox="0 0 24 24" fill="none"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  `;
}

function wireMockSession() {
  const back = $('#mock-back-btn');
  const startBtn = $('#mock-start-btn');
  const submitBtn = $('#mock-submit-btn');
  const list = $('#mock-questions-list');

  // replace handlers to avoid duplicates
  const cloneBack = back.cloneNode(true); back.parentNode.replaceChild(cloneBack, back);
  const cloneStart = startBtn.cloneNode(true); startBtn.parentNode.replaceChild(cloneStart, startBtn);
  const cloneSubmit = submitBtn.cloneNode(true); submitBtn.parentNode.replaceChild(cloneSubmit, submitBtn);
  const cloneList = list.cloneNode(true); list.parentNode.replaceChild(cloneList, list);

  cloneBack.addEventListener('click', () => {
    if (confirm('Are you sure you want to exit? Progress will not be saved.')) {
      stopExamTimer();
      $('#mock-session-screen').hidden = true;
      $('.app-shell').hidden = false;
    }
  });

  cloneStart.addEventListener('click', () => {
    const tEl = $('#mock-timer-display');
    if (examTimer) {
      stopExamTimer();
      cloneStart.textContent = '▶ Resume Timer';
      tEl.classList.remove('running');
    } else {
      cloneStart.textContent = '❚❚ Pause Timer';
      tEl.classList.add('running');
      examTimer = setInterval(() => {
        mockSessionData.remaining--;
        tEl.textContent = fmtClock(Math.max(0, mockSessionData.remaining));
        if (mockSessionData.remaining <= 0) {
          stopExamTimer();
          tEl.textContent = "Time's up";
          tEl.classList.add('time-up');
        }
      }, 1000);
    }
  });

  cloneSubmit.addEventListener('click', () => {
    stopExamTimer();
    const completed = Object.keys(mockSessionData.answers).filter(k => mockSessionData.answers[k]).length;
    state.mockHistory = state.mockHistory || [];
    state.mockHistory.unshift({
      id: 'mock-' + Date.now(),
      date: new Date().toISOString(),
      score: completed,
      total: mockSessionData.questions.length,
      timeTaken: mockSessionData.duration - Math.max(0, mockSessionData.remaining),
      questions: mockSessionData.questions.map((q, j) => ({
        name: q.name,
        diff: q.diff,
        topic: q.topicLabel,
        solved: !!mockSessionData.answers[j]
      }))
    });
    saveState();
    toast('Mock Session Saved!');
    $('#mock-session-screen').hidden = true;
    showMockHistory();
  });

  cloneList.addEventListener('click', e => {
    const qItem = e.target.closest('.mock-q-item');
    if (!qItem) return;
    const idx = parseInt(qItem.dataset.idx, 10);
    if (e.target.tagName === 'INPUT') {
      mockSessionData.answers[idx] = e.target.checked;
      renderMockSessionSidebar();
    } else {
      mockSessionData.activeIndex = idx;
      renderMockSessionSidebar();
      renderMockSessionDetail();
    }
  });

  // Automatically start the timer when session starts
  cloneStart.click();
}

function showMockHistory() {
  closeModal();
  $('.app-shell').hidden = true;
  $('#mock-session-screen').hidden = true;
  $('#mock-history-screen').hidden = false;

  const back = $('#mock-history-back-btn');
  const cloneBack = back.cloneNode(true); back.parentNode.replaceChild(cloneBack, back);
  cloneBack.addEventListener('click', () => {
    $('#mock-history-screen').hidden = true;
    $('.app-shell').hidden = false;
  });

  const clearBtn = $('#mock-history-clear-btn');
  if (clearBtn) {
    const cloneClear = clearBtn.cloneNode(true); clearBtn.parentNode.replaceChild(cloneClear, clearBtn);
    cloneClear.addEventListener('click', () => {
      if (state.mockHistory && state.mockHistory.length > 0) {
        if (confirm('Are you sure you want to clear your Mock History? This will not affect your main track record.')) {
          state.mockHistory = [];
          saveState();
          renderMockHistory();
          toast('Mock history cleared!');
        }
      } else {
        toast('Mock history is already empty.');
      }
    });
  }

  renderMockHistory();
}

function renderMockHistory() {
  const list = $('#mock-history-list');
  if (!list) return;
  const history = state.mockHistory || [];

  if (!history.length) {
    list.innerHTML = `<div class="empty-state"><p>No mock sessions yet. Create one to get started!</p></div>`;
    return;
  }

  list.innerHTML = history.map(h => {
    const d = new Date(h.date);
    const dateStr = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    return `
      <div class="mock-history-item">
        <div class="mock-history-item-header">
          <div class="mock-history-date">${dateStr}</div>
          <div class="mock-history-stats">
            <div class="mock-history-stat">
              Score: <span class="mock-history-stat-value">${h.score} / ${h.total}</span>
            </div>
            <div class="mock-history-stat">
              Time: <span class="mock-history-stat-value">${fmtClock(h.timeTaken)}</span>
            </div>
          </div>
        </div>
        <div class="mock-history-item-body">
          ${h.questions.map(q => `
            <div class="mock-history-detail">
              <div class="mock-history-detail-label">${q.solved ? '<span style="color:var(--green)">✓</span> ' : ''}${esc(q.topic || 'Unknown')}</div>
              <div class="mock-history-detail-value">${esc(q.name)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}


/* ============================================================
   INLINE ADD-TO-TOPIC
   ============================================================ */
function openAddToTopicModal(topicId) {
  const label = topicLabelOf(topicId) || topicId;
  const html =
    `<div class="ati-panel">` +
      `<div class="ati-hint">Adding to <strong>${esc(label)}</strong></div>` +
      `<div class="ati-fields">` +
        `<input id="ati-name" class="add-input" placeholder="Problem name (e.g. Two Sum)" autocomplete="off" spellcheck="false">` +
        `<input id="ati-url" class="add-input" placeholder="URL — LeetCode, GFG… (optional)" autocomplete="off">` +
      `</div>` +
      `<div class="ati-footer">` +
        `<label class="add-hard"><input type="checkbox" id="ati-hard"> Mark as Hard</label>` +
        `<div style="display:flex;gap:10px;align-items:center">` +
          `<button class="primary-btn" id="ati-submit">Add</button>` +
          `<span class="add-msg" id="ati-msg"></span>` +
        `</div>` +
      `</div>` +
    `</div>`;

  openModal('Add to ' + label, html, body => {
    const nameEl = body.querySelector('#ati-name');
    const urlEl  = body.querySelector('#ati-url');
    const hardEl = body.querySelector('#ati-hard');
    const msgEl  = body.querySelector('#ati-msg');
    const subBtn = body.querySelector('#ati-submit');

    setTimeout(() => nameEl && nameEl.focus(), 30);

    function doAdd() {
      const name = nameEl.value.trim(), url = urlEl.value.trim();
      if (!name) { msgEl.className = 'add-msg is-warn'; msgEl.textContent = 'Enter a problem name.'; nameEl.focus(); return; }
      const r = addQuestion({ name, url, hard: hardEl.checked, topic: topicId });
      if (!r.ok) {
        msgEl.className = 'add-msg is-warn';
        msgEl.textContent = 'Already in list: "' + r.dup.name + '"';
        return;
      }
      toast('Added "' + name + '" to ' + label);
      // clear for next entry without closing
      nameEl.value = ''; urlEl.value = ''; hardEl.checked = false;
      msgEl.className = 'add-msg is-ok'; msgEl.textContent = '"' + name + '" added ✓';
      nameEl.focus();
    }

    subBtn.addEventListener('click', doAdd);
    nameEl.addEventListener('keydown', e => { if (e.key === 'Enter') urlEl.focus(); });
    urlEl.addEventListener('keydown',  e => { if (e.key === 'Enter') doAdd(); });
  });
}

/* ============================================================
   FIND + ADD QUESTION
   ============================================================ */
function normName(s) { return String(s || '').toLowerCase().replace(/^\s*\d+[.)]\s*/, '').replace(/[^a-z0-9]+/g, ''); }
function normUrl(u) { if (!u || u === '#') return ''; return String(u).toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[#?].*$/, '').replace(/\/+$/, ''); }
function findQuestions(query) {
  const q = query.trim().toLowerCase(); if (!q) return [];
  const nq = normName(query), qslug = q.replace(/\s+/g, '-'), out = [];
  masterList().forEach(it => {
    const name = it.name.toLowerCase(), nn = normName(it.name), slug = it.id.toLowerCase();
    let score = -1;
    if (name === q || nn === nq) score = 100;
    else if (name.startsWith(q)) score = 82;
    else if (name.includes(q)) score = 68;
    else if (slug.includes(qslug)) score = 60;
    else if (nq.length >= 2 && nn.includes(nq)) score = 52;
    if (score >= 0) out.push(Object.assign({}, it, { score, exact: score === 100 }));
  });
  out.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return out;
}
function questionExists(name, url) {
  const nn = normName(name), nu = normUrl(url);
  return masterList().find(it => (nn && normName(it.name) === nn) || (nu && normUrl(it.url) === nu)) || null;
}
function addQuestion(d) {
  const dup = questionExists(d.name, d.url); if (dup) return { ok: false, dup };
  const id = 'added:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  state.added = state.added || [];
  state.added.push({ id, name: d.name.trim(), url: (d.url || '').trim() || '#', hard: !!d.hard, topic: d.topic });
  markActiveToday(); saveState(); buildIndices();
  rebuildTopicCard(d.topic); renderStats(false); updateRing(false);
  return { ok: true, id };
}
function rebuildTopicCard(topicId) {
  const sec = QBANK.prioritySections.find(s => s.id === topicId); if (!sec) return;
  const card = $(`.card[data-id="${cssEsc(topicId)}"]`); if (!card) return;
  const detail = $('.card-detail', card); if (detail) detail.innerHTML = buildDetail(sec);
  updateTopicUI(topicId);
}

const SEARCH_SVG = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="m20 20-3.2-3.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
function openFinderModal(prefill) { openModal('Find or add a question', finderHTML(prefill || ''), wireFinder); }
function finderHTML(prefill) {
  return `
    <div class="finder-search">${SEARCH_SVG}
      <input id="finder-input" class="finder-input" type="text" placeholder="Type an exact or partial problem name…" value="${esc(prefill)}" autocomplete="off" spellcheck="false">
    </div>
    <div class="finder-hint">Searches all <strong>${masterList().length}</strong> questions — by name or slug. Numbers match only titles that include them.</div>
    <div class="finder-results" id="finder-results"></div>
    <div id="finder-add"></div>`;
}
function wireFinder(body) {
  const input = $('#finder-input', body);
  input.addEventListener('input', () => renderFinder(input.value));
  renderFinder(input.value);
  setTimeout(() => input.focus(), 30);
}
function renderFinder(query) {
  const res = $('#finder-results'), addEl = $('#finder-add'); if (!res) return;
  const q = query.trim();
  if (!q) { res.innerHTML = `<div class="finder-empty">Start typing to search your list.</div>`; addEl.innerHTML = addFormHTML('', ''); wireAddForm(); return; }
  const matches = findQuestions(q);
  if (!matches.length) {
    res.innerHTML = `<div class="finder-empty"><span class="x-mark">✕</span> <strong>"${esc(q)}"</strong> is not in your list.</div>`;
    addEl.innerHTML = addFormHTML(q, '');
    wireAddForm(); return;
  }
  const exact = matches.some(m => m.exact);
  res.innerHTML =
    (exact ? `<div class="finder-found"><span class="ok-mark">✓</span> Exact match found</div>` : `<div class="finder-count">${matches.length} match${matches.length > 1 ? 'es' : ''}</div>`) +
    matches.slice(0, 40).map(finderRow).join('') +
    (matches.length > 40 ? `<div class="finder-empty">${matches.length - 40} more… refine your query.</div>` : '');
  addEl.innerHTML = addFormHTML(q, '');
  wireAddForm();
}
function finderRow(m) {
  const status = getStatus(m.id), opt = STATUS_LABEL[status];
  const loc = m.topic
    ? `<span class="loc-chip" style="--accent:${(META[m.topic] && META[m.topic].c) || '#3B82F6'}">${esc(topicLabelOf(m.topic))}</span>`
    : `<span class="loc-chip loc-none">Unsorted</span>`;
  return `<a class="finder-row ${m.exact ? 'is-exact' : ''}" href="${esc(m.url || '#')}" target="_blank" rel="noopener">
    <span class="fr-dot st-${status}"></span>
    <span class="fr-name">${esc(m.name)}</span>
    ${loc}
    <span class="fr-status">${opt.short}</span>
    ${m.hard ? '<span class="tag tag-hard">Hard</span>' : ''}${m.source === 'gfg' ? '<span class="tag tag-gfg">GFG</span>' : ''}${m.source === 'added' ? '<span class="tag tag-added">Added</span>' : ''}
  </a>`;
}
function addFormHTML(name, url) {
  const opts = QBANK.prioritySections.map(s => `<option value="${s.id}">${esc(s.label)}</option>`).join('');
  return `<details class="add-wrap"${name ? ' open' : ''}>
    <summary><span class="add-plus">+</span> Add a new question to your list</summary>
    <div class="add-grid">
      <input id="add-name" class="add-input" placeholder="Problem name" value="${esc(name)}">
      <input id="add-url" class="add-input" placeholder="URL (https://…)" value="${esc(url)}">
      <select id="add-topic" class="add-input add-select">${opts}</select>
      <label class="add-hard"><input type="checkbox" id="add-hard"> Mark as Hard</label>
      <button class="primary-btn" id="add-submit">Add question</button>
    </div>
    <div class="add-msg" id="add-msg"></div>
  </details>`;
}
function wireAddForm() {
  const btn = $('#add-submit'); if (!btn) return;
  btn.addEventListener('click', () => {
    const name = $('#add-name').value.trim(), url = $('#add-url').value.trim();
    const topic = $('#add-topic').value, hard = $('#add-hard').checked, msg = $('#add-msg');
    if (!name) { msg.className = 'add-msg is-warn'; msg.textContent = 'Enter a problem name.'; return; }
    const r = addQuestion({ name, url, hard, topic });
    if (!r.ok) {
      msg.className = 'add-msg is-warn';
      msg.textContent = 'Already in your list: "' + r.dup.name + '"' + (r.dup.topic ? ' · ' + topicLabelOf(r.dup.topic) : '');
      return;
    }
    msg.className = 'add-msg is-ok'; msg.textContent = 'Added to ' + topicLabelOf(topic) + ' ✓';
    toast('Added "' + name + '" to ' + topicLabelOf(topic));
    const fi = $('#finder-input'); renderFinder(fi ? fi.value : name);
  });
}

/* ============================================================
   MODAL + TOAST
   ============================================================ */
function openModal(title, html, onMount) {
  const root = $('#modal-root'); if (!root) return;
  $('#modal-title').textContent = title;
  $('#modal-body').innerHTML = html;
  root.hidden = false;
  document.body.style.overflow = 'hidden';
  if (onMount) onMount($('#modal-body'));
}
function closeModal() {
  const root = $('#modal-root'); if (!root) return;
  root.hidden = true; $('#modal-body').innerHTML = '';
  document.body.style.overflow = ''; stopExamTimer();
}
function toast(text) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = text; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  if (typeof QUESTION_BANK === 'undefined') { console.error('questions.js not loaded'); return; }
  QBANK = QUESTION_BANK;
  state = loadState();
  buildIndices();
  markActiveToday();

  // motivational subtitle
  $('#hero-subtitle').textContent = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];

  // collapsed pref (desktop only)
  if (state.ui && state.ui.collapsed && window.innerWidth > 900) {
    document.body.classList.add('sidebar-collapsed');
    const peek = $('#sidebar-peek');
    if (peek) peek.style.display = 'flex';
  }

  render();
  renderStats(false); // build static structure immediately; animated pass runs after load
  // tag each card with its filter state for filtering
  $$('.card').forEach(card => { card.dataset.state = cardState(card); });
  wire();
  setupObserver();
}

document.addEventListener('DOMContentLoaded', init);
