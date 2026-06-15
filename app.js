/* ============================================================
   DSA Master Sheets — app logic
   Fully offline. Progress stored in localStorage + export/import.
   ============================================================ */

const STORAGE_KEY = 'dsa-tracker-state-v1';

const STATUS_OPTIONS = [
  { value: 'not-attempted', emoji: '⚪', label: 'Not attempted' },
  { value: 'mastered', emoji: '🟢', label: 'Mastered' },
  { value: 'revision', emoji: '🟡', label: 'Needs revision' },
  { value: 'failed', emoji: '🔴', label: "Couldn't solve" }
];

const DAILY_COUNT = 3;

let QBANK = null;
let state = null;
let ALL_QUESTIONS = {};      // id -> {name, url, source, hard}
let QUESTION_LOCATIONS = {}; // id -> {card, section}
let FIRST_REF = {};          // id -> ref (for initialStatus)
let currentTab = 'priority';

const noteSaveTimers = {};

/* ---------------------------------------------------------- */
/* Helpers                                                      */
/* ---------------------------------------------------------- */

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getStatus(id, initialStatus) {
  return state.status[id] || initialStatus || 'not-attempted';
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------------------------------------------------- */
/* State persistence                                            */
/* ---------------------------------------------------------- */

function defaultState() {
  return {
    status: {},
    notes: {},
    hidden: [],
    custom: {},
    dailyPicker: { date: '', ids: [], usedIds: [] },
    theme: 'dark'
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

/* ---------------------------------------------------------- */
/* Question bank loading + indices                              */
/* ---------------------------------------------------------- */

function loadQuestionBank() {
  if (typeof QUESTION_BANK === 'undefined') {
    throw new Error('Question bank data missing (questions.js not loaded)');
  }
  return QUESTION_BANK;
}

function buildIndices() {
  ALL_QUESTIONS = {};
  QUESTION_LOCATIONS = {};
  FIRST_REF = {};

  Object.entries(QBANK.questions).forEach(([id, q]) => {
    ALL_QUESTIONS[id] = q;
  });

  QBANK.prioritySections.forEach(section => {
    section.cards.forEach(card => {
      card.sections.forEach((sec, secIdx) => {
        sec.questions.forEach(ref => {
          if (!QUESTION_LOCATIONS[ref.id]) {
            QUESTION_LOCATIONS[ref.id] = { card: card.title, section: sec.label };
          }
          if (!(ref.id in FIRST_REF)) FIRST_REF[ref.id] = ref;
        });
        const key = card.id + '::' + secIdx;
        (state.custom[key] || []).forEach(c => {
          ALL_QUESTIONS[c.id] = { name: c.name, url: c.url, source: 'other', hard: !!c.hard };
          QUESTION_LOCATIONS[c.id] = { card: card.title, section: sec.label };
        });
      });
    });
  });
}

/* ---------------------------------------------------------- */
/* Priority Sheet rendering                                     */
/* ---------------------------------------------------------- */

function renderPrioritySheet() {
  const root = document.getElementById('priority-sections');
  const indexRoot = document.getElementById('topic-index');
  root.innerHTML = '';
  indexRoot.innerHTML = '';

  QBANK.tiers.forEach(tier => {
    const sections = QBANK.prioritySections.filter(s => s.tier === tier.id);
    if (!sections.length) return;

    const tierBlock = document.createElement('div');
    tierBlock.className = 'tier-block';
    tierBlock.dataset.tier = tier.id;
    tierBlock.innerHTML =
      '<div class="tier-header">' +
        '<div class="tier-label"><span class="tier-dot"></span>' + esc(tier.title) + '</div>' +
        '<div class="tier-note">' + esc(tier.note) + '</div>' +
      '</div>' +
      '<div class="tier-body"></div>';

    const body = tierBlock.querySelector('.tier-body');
    sections.forEach(section => {
      body.appendChild(renderTopicSection(section, tier));
      const a = document.createElement('a');
      a.href = '#section-' + section.id;
      a.dataset.tier = tier.id;
      a.textContent = section.label;
      indexRoot.appendChild(a);
    });

    root.appendChild(tierBlock);
  });

  updatePriorityTotal();
}

function renderTopicSection(section, tier) {
  const wrap = document.createElement('div');
  wrap.className = 'topic-section';
  wrap.id = 'section-' + section.id;
  wrap.innerHTML =
    '<div class="topic-section-header"><span class="topic-section-title">' + esc(section.label) + '</span></div>' +
    '<div class="topic-section-body"></div>';

  const body = wrap.querySelector('.topic-section-body');
  let lastGroup = null;
  section.cards.forEach(card => {
    if (card.group && card.group !== lastGroup) {
      const gl = document.createElement('div');
      gl.className = 'group-label';
      gl.textContent = card.group;
      body.appendChild(gl);
    }
    if (card.group) lastGroup = card.group;
    body.appendChild(renderCard(card, section));
  });

  return wrap;
}

function renderCard(card, section) {
  const topic = document.createElement('div');
  topic.className = 'topic';
  topic.dataset.cardId = card.id;

  const header = document.createElement('div');
  header.className = 'topic-header';
  header.innerHTML =
    '<div class="topic-title"><span class="topic-dot" style="background:' + esc(card.color || '#5aa3ff') + '"></span>' + esc(card.title) + '</div>' +
    '<div class="topic-meta">' +
      '<span class="prog-text"></span>' +
      '<div class="prog-bar"><div class="prog-fill"></div></div>' +
      '<span class="chevron open">▾</span>' +
    '</div>';
  topic.appendChild(header);

  const body = document.createElement('div');
  body.className = 'topic-body';

  card.sections.forEach((sec, secIdx) => {
    if (sec.label) {
      const lbl = document.createElement('div');
      lbl.className = 'section-label';
      lbl.textContent = sec.label;
      body.appendChild(lbl);
    }

    sec.questions.forEach(ref => body.appendChild(renderQuestionRow(ref, card.id, secIdx, false)));

    const customKey = card.id + '::' + secIdx;
    (state.custom[customKey] || []).forEach(c => {
      body.appendChild(renderQuestionRow({ id: c.id, name: c.name, url: c.url, hard: !!c.hard }, card.id, secIdx, true));
    });

    body.appendChild(renderRestoreRow(card.id, secIdx));
    body.appendChild(renderAddCustomArea(card.id, secIdx));
  });

  topic.appendChild(body);

  header.addEventListener('click', () => {
    body.classList.toggle('collapsed');
    header.querySelector('.chevron').classList.toggle('open');
  });

  updateCardProgress(topic);
  return topic;
}

function renderQuestionRow(ref, cardId, secIdx, isCustom) {
  const qInfo = isCustom ? ref : QBANK.questions[ref.id];
  const id = ref.id;
  const status = getStatus(id, ref.initialStatus);

  const row = document.createElement('div');
  row.className = 'q-row status-' + status;
  row.dataset.qid = id;
  row.dataset.card = cardId;
  row.dataset.section = secIdx;
  if (isCustom) row.classList.add('q-row-deletable');

  const hiddenKey = cardId + '::' + secIdx + '::' + id;
  if (state.hidden.includes(hiddenKey)) row.classList.add('hidden-row');

  let badges = '';
  if (qInfo.hard) badges += '<span class="badge b-h">hard</span>';
  if (qInfo.source === 'gfg') badges += '<span class="badge b-gfg">GFG</span>';
  if (ref.add && !isCustom) badges += '<span class="badge badge-add">added</span>';
  if (isCustom) badges += '<span class="badge b-custom">custom</span>';

  const delBtn = isCustom
    ? '<button class="custom-del-btn" title="Remove custom problem">✕</button>'
    : '<button class="q-del-btn" data-hidekey="' + esc(hiddenKey) + '" title="Remove from sheet">✕</button>';

  row.innerHTML =
    '<a class="q-link" href="' + esc(qInfo.url) + '" target="_blank" rel="noopener">' + esc(qInfo.name) + '</a>' +
    badges +
    '<select class="status-select status-' + status + '" data-qid="' + esc(id) + '">' +
      STATUS_OPTIONS.map(o => '<option value="' + o.value + '"' + (o.value === status ? ' selected' : '') + '>' + o.emoji + ' ' + o.label + '</option>').join('') +
    '</select>' +
    '<button class="note-btn ' + (state.notes[id] ? 'has-note' : '') + '" data-qid="' + esc(id) + '" title="Mistake / observation notes">📝</button>' +
    delBtn +
    '<div class="note-box hidden" data-qid="' + esc(id) + '">' +
      '<textarea placeholder="Mistake / observation notes...">' + esc(state.notes[id] || '') + '</textarea>' +
      '<span class="note-saved"></span>' +
    '</div>';

  return row;
}

function renderRestoreRow(cardId, secIdx) {
  const prefix = cardId + '::' + secIdx + '::';
  const div = document.createElement('div');
  div.className = 'restore-row';
  div.dataset.restoreFor = prefix;
  updateRestoreRow(div, prefix);
  return div;
}

function updateRestoreRow(div, prefix) {
  const count = state.hidden.filter(k => k.startsWith(prefix)).length;
  if (count === 0) {
    div.style.display = 'none';
    div.innerHTML = '';
    return;
  }
  div.style.display = 'flex';
  div.innerHTML = '<span class="restore-icon">🗑️</span> ' + count + ' hidden &nbsp;<button class="restore-btn" data-restoreprefix="' + esc(prefix) + '">restore</button>';
}

function renderAddCustomArea(cardId, secIdx) {
  const div = document.createElement('div');
  div.className = 'add-custom-wrap';
  div.innerHTML = '<button class="add-custom-btn" data-card="' + esc(cardId) + '" data-section="' + secIdx + '" title="Add custom problem">+</button>';
  return div;
}

function updateCardProgress(topic) {
  const rows = Array.from(topic.querySelectorAll('.q-row')).filter(r => !r.classList.contains('hidden-row'));
  const total = rows.length;
  const mastered = rows.filter(r => r.classList.contains('status-mastered')).length;
  const pct = total ? Math.round((mastered / total) * 100) : 0;
  const progText = topic.querySelector('.prog-text');
  const progFill = topic.querySelector('.prog-fill');
  if (progText) progText.textContent = mastered + '/' + total;
  if (progFill) {
    progFill.style.width = pct + '%';
    progFill.style.background = pct === 100 ? 'var(--accent-2)' : 'var(--accent)';
  }
}

function updatePriorityTotal() {
  const counts = computeStats();
  const total = Object.keys(ALL_QUESTIONS).length;
  const el = document.getElementById('priority-total');
  if (el) el.textContent = counts.mastered + ' / ' + total + ' mastered';
}

/* ---------------------------------------------------------- */
/* Status + notes (shared between Priority and Practice)       */
/* ---------------------------------------------------------- */

function setStatus(id, status) {
  state.status[id] = status;
  saveState();

  document.querySelectorAll('[data-qid="' + id + '"]').forEach(el => {
    if (el.classList.contains('status-select')) {
      STATUS_OPTIONS.forEach(o => el.classList.remove('status-' + o.value));
      el.classList.add('status-' + status);
      el.value = status;
    }
    if (el.classList.contains('q-row') || el.classList.contains('search-result-row')) {
      STATUS_OPTIONS.forEach(o => el.classList.remove('status-' + o.value));
      el.classList.add('status-' + status);
    }
  });

  document.querySelectorAll('.q-row[data-qid="' + id + '"]').forEach(row => {
    const topic = row.closest('.topic');
    if (topic) updateCardProgress(topic);
  });

  updatePriorityTotal();
  if (currentTab === 'practice') renderStats();
}

function handleNoteInput(textarea) {
  const box = textarea.closest('.note-box');
  const id = box.dataset.qid;
  const val = textarea.value;

  clearTimeout(noteSaveTimers[id]);
  noteSaveTimers[id] = setTimeout(() => {
    if (val.trim()) state.notes[id] = val; else delete state.notes[id];
    saveState();

    document.querySelectorAll('.note-btn[data-qid="' + id + '"]').forEach(b => b.classList.toggle('has-note', !!val.trim()));
    document.querySelectorAll('.note-box[data-qid="' + id + '"] textarea').forEach(t => { if (t !== textarea) t.value = val; });
    document.querySelectorAll('.note-box[data-qid="' + id + '"] .note-saved').forEach(s => {
      s.textContent = 'Saved';
      setTimeout(() => { s.textContent = ''; }, 1200);
    });
  }, 400);
}

/* ---------------------------------------------------------- */
/* Hide / restore / custom problems                             */
/* ---------------------------------------------------------- */

function handleHideRow(btn) {
  const row = btn.closest('.q-row');
  const key = btn.dataset.hidekey;
  if (!state.hidden.includes(key)) state.hidden.push(key);
  saveState();

  row.classList.add('hidden-row');
  const topic = row.closest('.topic');
  updateCardProgress(topic);
  updatePriorityTotal();

  const prefix = row.dataset.card + '::' + row.dataset.section + '::';
  const restoreDiv = topic.querySelector('.restore-row[data-restore-for="' + prefix + '"]');
  if (restoreDiv) updateRestoreRow(restoreDiv, prefix);
}

function handleRestore(btn) {
  const prefix = btn.dataset.restoreprefix;
  state.hidden = state.hidden.filter(k => !k.startsWith(prefix));
  saveState();

  const restoreDiv = btn.closest('.restore-row');
  const topic = restoreDiv.closest('.topic');
  topic.querySelectorAll('.q-row.hidden-row').forEach(r => {
    const k = r.dataset.card + '::' + r.dataset.section + '::' + r.dataset.qid;
    if (k.startsWith(prefix)) r.classList.remove('hidden-row');
  });
  updateCardProgress(topic);
  updatePriorityTotal();
  updateRestoreRow(restoreDiv, prefix);
}

function handleCustomDelete(btn) {
  const row = btn.closest('.q-row');
  const key = row.dataset.card + '::' + row.dataset.section;
  const id = row.dataset.qid;

  if (state.custom[key]) {
    state.custom[key] = state.custom[key].filter(c => c.id !== id);
    if (!state.custom[key].length) delete state.custom[key];
  }
  delete state.status[id];
  delete state.notes[id];
  saveState();

  const topic = row.closest('.topic');
  row.remove();
  updateCardProgress(topic);
  updatePriorityTotal();
  buildIndices();
}

function handleAddCustomClick(btn) {
  const wrap = btn.parentElement;
  let form = wrap.querySelector('.custom-add-form');
  if (form) { form.remove(); return; }

  form = document.createElement('div');
  form.className = 'custom-add-form';
  form.innerHTML =
    '<input class="custom-input" type="text" placeholder="Problem name" data-field="name">' +
    '<input class="custom-input" type="text" placeholder="URL (https://...)" data-field="url">' +
    '<div style="display:flex;gap:8px;">' +
      '<button class="custom-save-btn">Add</button>' +
      '<button class="custom-cancel-btn">Cancel</button>' +
    '</div>';
  wrap.appendChild(form);

  form.querySelector('.custom-cancel-btn').addEventListener('click', () => form.remove());
  form.querySelector('.custom-save-btn').addEventListener('click', () => {
    const name = form.querySelector('[data-field="name"]').value.trim();
    const url = form.querySelector('[data-field="url"]').value.trim();
    if (!name) return;

    const cardId = btn.dataset.card, secIdx = btn.dataset.section;
    const id = 'custom:' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    const key = cardId + '::' + secIdx;
    if (!state.custom[key]) state.custom[key] = [];
    state.custom[key].push({ id, name, url: url || '#' });
    saveState();
    buildIndices();

    const row = renderQuestionRow({ id, name, url: url || '#', hard: false }, cardId, secIdx, true);
    wrap.parentElement.insertBefore(row, wrap);
    form.remove();
    updateCardProgress(wrap.closest('.topic'));
    updatePriorityTotal();
  });

  form.querySelector('[data-field="name"]').focus();
}

/* ---------------------------------------------------------- */
/* Practice tab                                                 */
/* ---------------------------------------------------------- */

function computeStats() {
  const counts = { mastered: 0, revision: 0, failed: 0, 'not-attempted': 0 };
  Object.keys(ALL_QUESTIONS).forEach(id => {
    const ref = FIRST_REF[id];
    const st = getStatus(id, ref && ref.initialStatus);
    counts[st] = (counts[st] || 0) + 1;
  });
  return counts;
}

function renderStats() {
  const counts = computeStats();
  const total = Object.keys(ALL_QUESTIONS).length;
  const el = document.getElementById('stat-cards');
  el.innerHTML =
    '<div class="stat-card"><div class="stat-num">' + total + '</div><div class="stat-label">Total</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + counts.mastered + '</div><div class="stat-label">🟢 Mastered</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + counts.revision + '</div><div class="stat-label">🟡 Revision</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + counts.failed + '</div><div class="stat-label">🔴 Couldn\'t solve</div></div>' +
    '<div class="stat-card"><div class="stat-num">' + counts['not-attempted'] + '</div><div class="stat-label">⚪ Not attempted</div></div>';
}

function renderPracticeRow(id) {
  const info = ALL_QUESTIONS[id];
  const status = getStatus(id, FIRST_REF[id] && FIRST_REF[id].initialStatus);
  const loc = QUESTION_LOCATIONS[id];

  let badges = '';
  if (info.hard) badges += '<span class="badge b-h">hard</span>';
  if (info.source === 'gfg') badges += '<span class="badge b-gfg">GFG</span>';

  const row = document.createElement('div');
  row.className = 'search-result-row q-row status-' + status;
  row.dataset.qid = id;
  row.innerHTML =
    '<a class="q-link" href="' + esc(info.url) + '" target="_blank" rel="noopener">' + esc(info.name) + '</a>' +
    badges +
    '<select class="status-select status-' + status + '" data-qid="' + esc(id) + '">' +
      STATUS_OPTIONS.map(o => '<option value="' + o.value + '"' + (o.value === status ? ' selected' : '') + '>' + o.emoji + ' ' + o.label + '</option>').join('') +
    '</select>' +
    '<button class="note-btn ' + (state.notes[id] ? 'has-note' : '') + '" data-qid="' + esc(id) + '" title="Mistake / observation notes">📝</button>' +
    '<div class="note-box hidden" data-qid="' + esc(id) + '">' +
      '<textarea placeholder="Mistake / observation notes...">' + esc(state.notes[id] || '') + '</textarea>' +
      '<span class="note-saved"></span>' +
    '</div>' +
    (loc ? '<div class="q-meta-path">' + esc(loc.card) + (loc.section ? ' · ' + esc(loc.section) : '') + '</div>' : '');

  return row;
}

function renderSearch() {
  const q = document.getElementById('search-input').value.trim().toLowerCase();
  const statusFilter = document.getElementById('search-status-filter').value;
  const resultsEl = document.getElementById('search-results');

  let entries = Object.keys(ALL_QUESTIONS);
  if (q) entries = entries.filter(id => ALL_QUESTIONS[id].name.toLowerCase().includes(q));
  if (statusFilter !== 'all') {
    entries = entries.filter(id => getStatus(id, FIRST_REF[id] && FIRST_REF[id].initialStatus) === statusFilter);
  }
  entries.sort((a, b) => ALL_QUESTIONS[a].name.localeCompare(ALL_QUESTIONS[b].name));

  resultsEl.innerHTML = '';
  if (!entries.length) {
    resultsEl.innerHTML = '<div class="no-results">No questions match your search.</div>';
    return;
  }

  const limited = entries.slice(0, 200);
  limited.forEach(id => resultsEl.appendChild(renderPracticeRow(id)));

  if (entries.length > limited.length) {
    const more = document.createElement('div');
    more.className = 'no-results';
    more.textContent = (entries.length - limited.length) + ' more results — refine your search to narrow down.';
    resultsEl.appendChild(more);
  }
}

function pickRandom() {
  const statusFilter = document.getElementById('random-filter').value;
  const resultEl = document.getElementById('random-result');

  let pool = Object.keys(ALL_QUESTIONS);
  if (statusFilter !== 'all') {
    pool = pool.filter(id => getStatus(id, FIRST_REF[id] && FIRST_REF[id].initialStatus) === statusFilter);
  }

  resultEl.innerHTML = '';
  if (!pool.length) {
    resultEl.innerHTML = '<div class="picker-empty">No questions match this filter.</div>';
    return;
  }

  const id = pool[Math.floor(Math.random() * pool.length)];
  resultEl.appendChild(renderPracticeRow(id));
}

function ensureDailyPicks() {
  const today = getTodayStr();
  if (state.dailyPicker.date === today && state.dailyPicker.ids && state.dailyPicker.ids.length) return;

  const attemptedPool = Object.keys(ALL_QUESTIONS).filter(id => {
    const st = getStatus(id, FIRST_REF[id] && FIRST_REF[id].initialStatus);
    return st !== 'not-attempted';
  });

  if (!attemptedPool.length) {
    state.dailyPicker = { date: today, ids: [], usedIds: state.dailyPicker.usedIds || [] };
    saveState();
    return;
  }

  let used = state.dailyPicker.usedIds || [];
  let available = attemptedPool.filter(id => !used.includes(id));
  if (available.length < DAILY_COUNT) {
    used = [];
    available = attemptedPool.slice();
  }

  const picks = shuffle(available).slice(0, Math.min(DAILY_COUNT, available.length));
  used = used.concat(picks);

  state.dailyPicker = { date: today, ids: picks, usedIds: used };
  saveState();
}

function renderDailyPicker() {
  ensureDailyPicks();
  const listEl = document.getElementById('daily-list');
  listEl.innerHTML = '';

  if (!state.dailyPicker.ids.length) {
    listEl.innerHTML = '<div class="picker-empty">Mark a few questions as Mastered, Needs Revision, or Couldn\'t Solve in the Priority Sheet to unlock your daily review set.</div>';
    return;
  }

  state.dailyPicker.ids.forEach(id => {
    if (ALL_QUESTIONS[id]) listEl.appendChild(renderPracticeRow(id));
  });
}

/* ---------------------------------------------------------- */
/* Export / Import                                              */
/* ---------------------------------------------------------- */

function exportProgress() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dsa-progress-' + getTodayStr() + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      const merged = defaultState();
      merged.status = data.status || {};
      merged.notes = data.notes || {};
      merged.hidden = data.hidden || [];
      merged.custom = data.custom || {};
      merged.dailyPicker = data.dailyPicker || { date: '', ids: [], usedIds: [] };
      merged.theme = data.theme || state.theme;
      state = merged;
      saveState();
      location.reload();
    } catch (err) {
      alert('Invalid progress file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

/* ---------------------------------------------------------- */
/* Theme + tabs + wiring                                        */
/* ---------------------------------------------------------- */

function applyTheme() {
  document.body.classList.toggle('theme-light', state.theme === 'light');
  const btn = document.getElementById('theme-toggle');
  btn.textContent = state.theme === 'light' ? '🌙 Dark' : '☀️ Light';
}

function setupEventDelegation() {
  document.addEventListener('change', e => {
    if (e.target.matches('.status-select')) {
      setStatus(e.target.dataset.qid, e.target.value);
    }
  });

  document.addEventListener('click', e => {
    const noteBtn = e.target.closest('.note-btn');
    if (noteBtn) {
      const row = noteBtn.closest('.q-row, .search-result-row');
      const box = row && row.querySelector('.note-box');
      if (box) box.classList.toggle('hidden');
      return;
    }
    const delBtn = e.target.closest('.q-del-btn');
    if (delBtn) { handleHideRow(delBtn); return; }

    const customDel = e.target.closest('.custom-del-btn');
    if (customDel) { handleCustomDelete(customDel); return; }

    const restoreBtn = e.target.closest('.restore-btn');
    if (restoreBtn) { handleRestore(restoreBtn); return; }

    const addBtn = e.target.closest('.add-custom-btn');
    if (addBtn) { handleAddCustomClick(addBtn); return; }
  });

  document.addEventListener('input', e => {
    if (e.target.matches('.note-box textarea')) handleNoteInput(e.target);
  });
}

function setupControls() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    saveState();
    applyTheme();
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');
      currentTab = btn.dataset.tab;
      if (currentTab === 'practice') {
        renderStats();
        renderDailyPicker();
        renderSearch();
      }
    });
  });

  document.getElementById('export-btn').addEventListener('click', exportProgress);
  document.getElementById('import-btn').addEventListener('click', () => {
    document.getElementById('import-file').click();
  });
  document.getElementById('import-file').addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) importProgress(e.target.files[0]);
  });

  document.getElementById('random-btn').addEventListener('click', pickRandom);
  document.getElementById('random-filter').addEventListener('change', () => {
    document.getElementById('random-result').innerHTML = '';
  });

  document.getElementById('search-input').addEventListener('input', renderSearch);
  document.getElementById('search-status-filter').addEventListener('change', renderSearch);
}

/* ---------------------------------------------------------- */
/* Init                                                         */
/* ---------------------------------------------------------- */

function init() {
  QBANK = loadQuestionBank();
  state = loadState();
  applyTheme();
  buildIndices();
  renderPrioritySheet();
  setupEventDelegation();
  setupControls();
}

document.addEventListener('DOMContentLoaded', init);
