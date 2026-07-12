/* ============================================================
   DSA Roadmap — Static Notes & Complexity + User Notes
   - Notes button: shows static notes, complexity, and user's own notes
   - Edit button:  lets user write/update their personal notes per problem
   User notes are saved in state.notes[qid] via app.js saveState().
   ============================================================ */
(function () {
  'use strict';

  const esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- helpers to access app.js globals safely ---------- */
  function getState()     { return (typeof state !== 'undefined') ? state : null; }
  function doSaveState()  { if (typeof saveState === 'function') saveState(); }

  /* ---------- user notes storage (piggy-backs on state.notes) --------- */
  function getUserNote(qid) {
    var s = getState();
    return (s && s.notes && s.notes[qid]) ? s.notes[qid] : '';
  }
  function setUserNote(qid, text) {
    var s = getState();
    if (!s) return;
    if (!s.notes) s.notes = {};
    if (text && text.trim()) {
      s.notes[qid] = text.trim();
    } else {
      delete s.notes[qid];
    }
    doSaveState();
  }

  /* ---------- read the question id and name from a .q-row ---------- */
  function rowInfo(row) {
    var link = row.querySelector('.q-link');
    var name = link ? link.textContent.trim() : (row.dataset.name || '').trim();
    return { qid: row.dataset.qid || '', name: name };
  }

  /* ---------- look up static notes by question ID ---------- */
  function getEntry(qid) {
    if (typeof NOTES_DB === 'undefined') return null;
    return NOTES_DB[qid] || null;
  }

  /* ---------- refresh the edit-button indicator after saves ---------- */
  function refreshEditBtn(qid) {
    var hasNote = !!getUserNote(qid);
    document.querySelectorAll('.edit-btn[data-qid="' + qid + '"]').forEach(function (btn) {
      btn.classList.toggle('has-note', hasNote);
      btn.title = hasNote ? 'Edit your notes' : 'Add your notes';
    });
  }

  /* ---------- inject Notes + Edit buttons per row ---------- */
  function decorate(root) {
    (root || document).querySelectorAll('.q-row').forEach(function (row) {
      if (row.querySelector('.notes-btn')) return;
      var info = rowInfo(row);
      var entry = getEntry(info.qid);
      if (!entry) return;

      var hasNote = !!getUserNote(info.qid);

      /* Notes button */
      var notesBtn = document.createElement('button');
      notesBtn.className = 'notes-btn';
      notesBtn.type = 'button';
      notesBtn.title = 'View notes & complexity';
      notesBtn.innerHTML = '<span class="notes-icon">📋</span><span class="notes-label">Notes</span>';
      notesBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openNotesPanel(info, entry);
      });

      /* Edit button */
      var editBtn = document.createElement('button');
      editBtn.className = 'edit-btn' + (hasNote ? ' has-note' : '');
      editBtn.type = 'button';
      editBtn.dataset.qid = info.qid;
      editBtn.title = hasNote ? 'Edit your notes' : 'Add your notes';
      editBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="edit-icon">' +
          '<path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>' +
        '<span class="edit-dot"></span>';
      editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openEditModal(info);
      });

      var statusBtn = row.querySelector('.status-btn');
      row.insertBefore(editBtn, statusBtn || null);
      row.insertBefore(notesBtn, editBtn);
    });
  }

  /* ---------- Notes panel (static + user note) ---------- */
  function openNotesPanel(info, entry) {
    var userNote = getUserNote(info.qid);
    var userSection = '';
    if (userNote) {
      userSection =
        '<div class="notes-section">' +
          '<div class="notes-section-title">' +
            '<span class="notes-section-icon">✏️</span> My Notes' +
          '</div>' +
          '<div class="notes-section-body notes-user-body">' + esc(userNote).replace(/\n/g, '<br>') + '</div>' +
        '</div>';
    }

    var html =
      '<div class="notes-panel">' +
        '<div class="notes-q-name">' + esc(info.name) + '</div>' +

        userSection +

        '<div class="notes-section">' +
          '<div class="notes-section-title">' +
            '<span class="notes-section-icon">📝</span> Notes' +
          '</div>' +
          '<div class="notes-section-body">' + esc(entry.notes) + '</div>' +
        '</div>' +

        '<div class="notes-section">' +
          '<div class="notes-section-title">' +
            '<span class="notes-section-icon">⏱️</span> Complexity' +
          '</div>' +
          '<div class="notes-complexity-grid">' +
            '<div class="notes-complexity-row">' +
              '<span class="notes-complexity-label">Time</span>' +
              '<code class="notes-complexity-value">' + esc(entry.time) + '</code>' +
            '</div>' +
            '<div class="notes-complexity-row">' +
              '<span class="notes-complexity-label">Space</span>' +
              '<code class="notes-complexity-value">' + esc(entry.space) + '</code>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>';

    if (typeof openModal === 'function') openModal('Notes', html, null);
  }

  /* ---------- Edit modal ---------- */
  function openEditModal(info) {
    var current = getUserNote(info.qid);
    var html =
      '<div class="edit-panel">' +
        '<div class="edit-q-name">' + esc(info.name) + '</div>' +
        '<textarea id="user-note-ta" class="user-note-ta" placeholder="Write your approach, key insights, mistakes to avoid…" spellcheck="true">' + esc(current) + '</textarea>' +
        '<div class="edit-actions">' +
          '<button class="edit-save-btn" id="user-note-save">Save</button>' +
          (current ? '<button class="edit-clear-btn" id="user-note-clear">Clear</button>' : '') +
        '</div>' +
        '<div class="edit-hint">Saved to your browser — visible in the Notes panel.</div>' +
      '</div>';

    if (typeof openModal === 'function') {
      openModal('My Notes — ' + info.name, html, function (body) {
        var ta = body.querySelector('#user-note-ta');
        var saveBtn = body.querySelector('#user-note-save');
        var clearBtn = body.querySelector('#user-note-clear');

        /* auto-focus the textarea */
        setTimeout(function () { if (ta) ta.focus(); }, 40);

        /* Ctrl/Cmd + Enter to save */
        if (ta) {
          ta.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              doSave();
            }
          });
        }

        function doSave() {
          var text = ta ? ta.value : '';
          setUserNote(info.qid, text);
          refreshEditBtn(info.qid);
          if (typeof closeModal === 'function') closeModal();
          showToast(text.trim() ? '✓ Notes saved' : 'Notes cleared');
        }

        if (saveBtn) saveBtn.addEventListener('click', doSave);
        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            setUserNote(info.qid, '');
            refreshEditBtn(info.qid);
            if (typeof closeModal === 'function') closeModal();
            showToast('Notes cleared');
          });
        }
      });
    }
  }

  /* ---------- tiny toast (reuses app.js toast if available) ---------- */
  function showToast(text) {
    if (typeof toast === 'function') { toast(text); return; }
    var t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = text; t.classList.add('show');
    clearTimeout(t._timer); t._timer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ---------- observe DOM mutations (cards open dynamically) ---------- */
  function init() {
    decorate();
    var target = document.getElementById('sections-root') || document.body;
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes.length) { decorate(); break; }
      }
    }).observe(target, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
