/* Round-trip test for coach-sync.js — no browser needed.
 *
 * Shims just enough DOM + File System Access to exercise the parts that can
 * corrupt data: applyCoach (idempotency, patches, added questions), the
 * progress.json snapshot, and the LOG.md append.
 *
 *     node coach/test-sync.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.dirname(__dirname);
let pass = 0, fail = 0;
const ok = (name, cond, extra) => {
  if (cond) { pass++; console.log('  \x1b[32m✓\x1b[0m ' + name); }
  else { fail++; console.log('  \x1b[31m✗\x1b[0m ' + name + (extra ? '\n      ' + extra : '')); }
};

/* ---------- in-memory folder standing in for the real one ---------- */
const disk = { 'LOG.md': '# LOG\n\n---\n' };
function fileHandle(name) {
  return {
    getFile: async () => ({ text: async () => {
      if (!(name in disk)) throw new Error('ENOENT');
      return disk[name];
    } }),
    createWritable: async () => ({
      write: async (t) => { disk[name] = t; },
      close: async () => {}
    })
  };
}
const dirHandle = {
  getFileHandle: async (name, opts) => {
    if (!(name in disk) && !(opts && opts.create)) throw new Error('ENOENT');
    return fileHandle(name);
  },
  queryPermission: async () => 'granted',
  requestPermission: async () => 'granted'
};

/* ---------- minimal DOM ---------- */
const noop = () => {};
function el() {
  const e = {
    _html: '', className: '', textContent: '', style: {}, dataset: {}, id: '',
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, removeChild: noop, remove: noop,
    addEventListener: noop, removeEventListener: noop,
    querySelector: () => null, querySelectorAll: () => [],
    insertBefore: noop, focus: noop, parentNode: null
  };
  Object.defineProperty(e, 'innerHTML', { get: () => e._html, set: (v) => { e._html = v; } });
  return e;
}
const head = el(), bodyEl = el(), shell = el();
const doc = {
  readyState: 'complete',
  head, body: bodyEl,
  createElement: () => el(),
  getElementById: (id) => (id === 'coach-panel' ? doc._panel : null),
  querySelector: (s) => (s === '.app-shell' ? shell : null),
  querySelectorAll: () => [],
  addEventListener: noop,
  _panel: null
};

/* ---------- app.js stand-ins ---------- */
const qbankSrc = fs.readFileSync(path.join(ROOT, 'questions.js'), 'utf8');
const sandbox = {
  console, setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,
  document: doc,
  // file:// — no proxy reachable, so the LeetCode auto-sync stays out of the way
  // and reconcile() gets tested directly against fixtures instead
  location: { protocol: 'file:', href: 'file:///dsa/index.html' },
  // no IndexedDB in node — connecting must still work, just without a remembered handle
  indexedDB: { open: () => { const r = {}; setTimeout(() => r.onerror && r.onerror(new Error('no idb')), 0); return r; } }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(qbankSrc, sandbox);

vm.runInContext(`
  var QBANK = QUESTION_BANK;
  var state = { status:{}, notes:{}, hidden:[], custom:{}, activity:[], ui:{}, added:[] };
  var TOPIC_QIDS = {}, ALL_QIDS = [], SAVES = 0;
  (function build(){
    TOPIC_QIDS = {}; ALL_QIDS = [];
    var seen = new Set();
    QBANK.prioritySections.forEach(function(sec){
      var list = [];
      sec.cards.forEach(function(c){ c.sections.forEach(function(s){ s.questions.forEach(function(r){
        if (list.indexOf(r.id) < 0) list.push(r.id);
        if (!seen.has(r.id)) { seen.add(r.id); ALL_QIDS.push(r.id); }
      }); }); });
      TOPIC_QIDS[sec.id] = list;
    });
    (state.added||[]).forEach(function(a){
      if (TOPIC_QIDS[a.topic] && TOPIC_QIDS[a.topic].indexOf(a.id) < 0) TOPIC_QIDS[a.topic].push(a.id);
      if (!seen.has(a.id)) { seen.add(a.id); ALL_QIDS.push(a.id); }
    });
  })();
  function buildIndices(){}
  function render(){}
  function renderStats(){}
  function updateRing(){}
  function applyFilters(){}
  function getQ(id){ return QBANK.questions[id] || null; }
  function getStatus(id){ return state.status[id] || 'not-attempted'; }
  function todayStr(){ return '2026-08-13'; }
  function setStatus(qid, st){ state.status[qid] = st; saveState(); }
  function saveState(){ SAVES++; }
  window.saveState = saveState;
`, sandbox);

// no picker restore path; drive connect() manually
sandbox.showDirectoryPicker = async () => dirHandle;

vm.runInContext(fs.readFileSync(path.join(ROOT, 'coach-sync.js'), 'utf8'), sandbox);

/* ---------- run ---------- */
(async () => {
  const W = sandbox;
  console.log('\ncoach-sync round trip\n');

  ok('boots and exposes COACH', typeof W.COACH === 'object');

  // link the folder
  await W.COACH.connect();
  ok('progress.json written on connect', typeof disk['progress.json'] === 'string');

  let p = JSON.parse(disk['progress.json']);
  ok('snapshot has schema + summary', p.schema === 1 && !!p.summary);
  ok('summary counts every question', p.summary.total === W.ALL_QIDS.length && p.summary.total > 300,
     'total=' + p.summary.total);
  ok('byTopic covers all 17 topics', Object.keys(p.summary.byTopic).length === 17);
  ok('weakest is sorted ascending by pct',
     p.summary.weakest.every((w, i, a) => i === 0 || a[i - 1].pct <= w.pct));

  // ---- apply a coach.json
  const realQid = W.ALL_QIDS.find(id => id.startsWith('lc:'));
  disk['coach.json'] = JSON.stringify({
    schema: 1, id: 'test-day1', day: 1, setLabel: 'Day 1', blind: true,
    addQuestions: [{ id: 'added:coach-x1', name: 'Sum of Subarray Minimums',
                     url: 'https://leetcode.com/problems/sum-of-subarray-minimums/',
                     topic: 'stack', hard: true }],
    assign: [
      { slot: 'D1-P1', qid: realQid, capMin: 25 },
      { slot: 'D1-P2', qid: 'added:coach-x1', capMin: 25 }
    ],
    setStatus: { [realQid]: 'revision' },
    setNotes: { [realQid]: 'capped on D0' },
    resolveQueue: [realQid]
  });
  await W.COACH.pollCoach();

  let S = W.COACH.state();
  ok('assignment loaded', !!S.assignment && S.assignment.items.length === 2);
  ok('slots preserved', S.assignment.items[0].slot === 'D1-P1');
  ok('outside question appended to state.added',
     W.state.added.length === 1 && W.state.added[0].id === 'added:coach-x1');
  ok('status patch applied', W.state.status[realQid] === 'revision');
  ok('note patch applied', W.state.notes[realQid] === 'capped on D0');
  ok('resolve queue owned by coach', S.resolveQueue.length === 1 && S.resolveQueue[0] === realQid);
  ok('applied id recorded', S.appliedIds.includes('test-day1'));

  // ---- idempotency: same file again must not duplicate
  const addedBefore = W.state.added.length;
  W.COACH.state().assignment.items[0].done = true;   // simulate progress
  await W.COACH.pollCoach();                          // unchanged raw -> skipped
  W.COACH.state();
  ok('unchanged coach.json is a no-op', W.state.added.length === addedBefore);

  // force a re-read of the same id
  disk['coach.json'] = disk['coach.json'] + ' ';
  await W.COACH.pollCoach();
  ok('replayed id does not duplicate added questions', W.state.added.length === addedBefore);
  ok('replayed id does not reset in-flight progress',
     W.COACH.state().assignment.items[0].done === true);

  // ---- a new id does replace the set
  disk['coach.json'] = JSON.stringify({
    schema: 1, id: 'test-day2', day: 2, setLabel: 'Day 2',
    assign: [{ slot: 'D2-P1', qid: realQid, capMin: 25 }]
  });
  await W.COACH.pollCoach();
  S = W.COACH.state();
  ok('new id swaps in the new set', S.assignment.id === 'test-day2' && S.assignment.items.length === 1);
  ok('day advanced', S.day === 2);
  ok('resolve queue survives a set with no queue key', S.resolveQueue.length === 1);

  // ---- malformed input must not throw or wipe state
  disk['coach.json'] = '{ this is not json';
  await W.COACH.pollCoach();
  ok('malformed coach.json is survivable', W.COACH.state().assignment.id === 'test-day2');

  // ---- snapshot reflects patches
  await W.COACH.writeProgress();
  p = JSON.parse(disk['progress.json']);
  ok('snapshot carries status patch', p.state.status[realQid] === 'revision');
  ok('snapshot carries resolve queue', p.resolveQueue.includes(realQid));
  ok('snapshot carries added questions', p.state.added.some(a => a.id === 'added:coach-x1'));
  ok('revision counted as solved, not stuck',
     p.summary.needsRevision.includes(realQid) && !p.summary.stuck.includes(realQid));

  // ---- LOG.md append shape
  const before = disk['LOG.md'];
  await vm.runInContext('(async()=>{})()', sandbox); // flush
  const appendLog = W.COACH.__appendLog;
  if (appendLog) {
    await appendLog('D1-P3 | Longest Substring Without Repeating | 25min CAP HIT\nBucket: 2 (pattern known, implementation failed)\nNote: left pointer\n');
    ok('LOG.md appends without truncating', disk['LOG.md'].startsWith(before.replace(/\s*$/, '')));
    ok('LOG.md entry matches the agreed format',
       /D1-P3 \| .+ \| 25min CAP HIT\nBucket: 2 \(.+\)\nNote: /.test(disk['LOG.md']));
  }

  // ---- saveState hook still persists
  const saves = W.SAVES;
  W.saveState();
  ok('saveState hook calls through to the original', W.SAVES === saves + 1);

  /* ================= LeetCode reconcile ================= */
  console.log('\nleetcode reconcile\n');
  const rec = W.COACH.__reconcile;
  const lcIds = W.ALL_QIDS.filter(id => id.startsWith('lc:'));
  ok('sheet has a large LeetCode surface', lcIds.length > 300, lcIds.length + ' lc: ids');

  const slug = (i) => lcIds[i].slice(3);

  // set up four distinct sheet states against the same LeetCode answer
  W.state.status = {};
  W.state.status[lcIds[1]] = 'failed';     // capped in a session
  W.state.status[lcIds[2]] = 'revision';   // weak solve
  W.state.status[lcIds[3]] = 'mastered';   // already clean
  W.state.status[lcIds[4]] = 'mastered';   // but LeetCode has no accept for it

  const solvedFixture = {
    counts: {},
    accepted: [
      { slug: slug(0), title: 'A', diff: 'easy' },    // untouched in sheet -> promote
      { slug: slug(1), title: 'B', diff: 'medium' },  // failed  -> conflict
      { slug: slug(2), title: 'C', diff: 'medium' },  // revision -> conflict
      { slug: slug(3), title: 'D', diff: 'hard' },    // mastered -> agree, no-op
      { slug: 'some-problem-not-in-his-sheet', title: 'Z', diff: 'hard' }
    ],
    attempted: [{ slug: slug(5), title: 'E', diff: 'medium' }]
  };

  const r = rec(solvedFixture);

  ok('promotes only not-attempted', r.applied.length === 1 && r.applied[0].qid === lcIds[0]);
  ok('promotion writes mastered into state', W.state.status[lcIds[0]] === 'mastered');
  ok('never overwrites a capped "failed"', W.state.status[lcIds[1]] === 'failed');
  ok('never overwrites a weak "revision"', W.state.status[lcIds[2]] === 'revision');
  ok('surfaces both as conflicts', r.conflicts.length === 2 &&
     r.conflicts.every(c => ['failed', 'revision'].includes(c.sheet)));
  ok('agreeing mastered is a no-op', !r.applied.some(a => a.qid === lcIds[3]));
  ok('flags sheet-mastered with no LeetCode accept',
     r.unverified.some(u => u.qid === lcIds[4]));
  ok('records attempted-but-unsolved', r.attemptedOnly.some(a => a.qid === lcIds[5]));
  ok('separates problems outside the sheet',
     r.outsideBank.length === 1 && r.outsideBank[0].slug === 'some-problem-not-in-his-sheet');
  ok('coverage is a sane percentage', r.coverage >= 0 && r.coverage <= 100);

  // idempotency: running the same reconcile twice must change nothing more
  const before2 = JSON.stringify(W.state.status);
  const r2 = rec(solvedFixture);
  ok('second reconcile applies nothing new', r2.applied.length === 0);
  ok('second reconcile leaves state identical', JSON.stringify(W.state.status) === before2);
  ok('conflicts persist across runs', r2.conflicts.length === 2);

  // GFG questions must be untouched by any LeetCode reconcile
  const gfg = W.ALL_QIDS.filter(id => id.startsWith('gfg:'));
  ok('leaves non-LeetCode questions alone',
     gfg.length > 0 && gfg.every(id => !(id in W.state.status)), gfg.length + ' gfg: ids');

  console.log('\n' + pass + ' passed, ' + fail + ' failed\n');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
