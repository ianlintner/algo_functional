/* ── app.js — main application logic ── */

// ── State ────────────────────────────────────────────────────────────────────
const state = {
  theme: localStorage.getItem('theme') || 'light',
  activeLang: localStorage.getItem('activeLang') || 'TypeScript',
  diffFilter: 'all',
  langFilter: 'all',
  searchQuery: '',
  currentView: 'list', // 'list' | 'detail' | 'matrix'
  currentProblemId: null,
};

// ── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  populateHeroStats();
  bindNavEvents();
  bindFilterEvents();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);
});

// ── Hero stats (dynamic) ────────────────────────────────────────────────────
function populateHeroStats() {
  const solved = SOLVED_IDS.size;
  let totalSols = 0;
  SOLVED_IDS.forEach(id => {
    const sol = SOLUTIONS[id] || {};
    totalSols += LANGUAGES.filter(l => sol[l]).length;
  });

  const solvedEl = document.getElementById('heroSolved');
  const solutionsEl = document.getElementById('heroSolutions');
  if (solvedEl) solvedEl.querySelector('.stat__num').textContent = solved;
  if (solutionsEl) solutionsEl.querySelector('.stat__num').textContent = totalSols;
}

// ── Routing ──────────────────────────────────────────────────────────────────
function handleRoute() {
  const hash = window.location.hash || '#/';

  if (hash.startsWith('#/problem/')) {
    const id = parseInt(hash.replace('#/problem/', ''), 10);
    if (!isNaN(id)) {
      showDetail(id);
      return;
    }
  }

  if (hash === '#/matrix') {
    showMatrix();
    return;
  }

  showList();
}

function navigate(path) {
  window.location.hash = path;
}

// ── Theme ────────────────────────────────────────────────────────────────────
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
}

// ── Nav events ───────────────────────────────────────────────────────────────
function bindNavEvents() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  document.getElementById('navList').addEventListener('click', () => {
    navigate('#/');
  });

  document.getElementById('navMatrix').addEventListener('click', () => {
    navigate('#/matrix');
  });
}

function setActiveNav(view) {
  document.getElementById('navList').classList.toggle('active', view === 'list');
  document.getElementById('navMatrix').classList.toggle('active', view === 'matrix');
}

// ── View management ──────────────────────────────────────────────────────────
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');
  state.currentView = name;
  setActiveNav(name);
}

// ── List view ────────────────────────────────────────────────────────────────
function showList() {
  showView('list');
  renderList();
}

function bindFilterEvents() {
  document.getElementById('searchInput').addEventListener('input', e => {
    state.searchQuery = e.target.value.toLowerCase();
    renderList();
  });

  document.getElementById('diffFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-diff]');
    if (!btn) return;
    state.diffFilter = btn.dataset.diff;
    updateDiffButtons();
    renderList();
  });

  document.getElementById('langFilters').addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    const lang = btn.dataset.lang;
    state.langFilter = (state.langFilter === lang) ? 'all' : lang;
    updateLangButtons();
    renderList();
  });
}

function updateDiffButtons() {
  document.querySelectorAll('#diffFilters [data-diff]').forEach(btn => {
    const d = btn.dataset.diff;
    btn.className = 'btn-filter ripple';
    if (d === state.diffFilter) btn.classList.add('active-diff-' + d);
  });
}

function updateLangButtons() {
  document.querySelectorAll('#langFilters [data-lang]').forEach(btn => {
    const l = btn.dataset.lang;
    btn.className = 'btn-filter ripple';
    if (l === state.langFilter) btn.classList.add('active-lang');
  });
}

function filteredProblems() {
  return PROBLEMS.filter(p => {
    if (state.diffFilter !== 'all' && p.difficulty !== state.diffFilter) return false;
    if (state.langFilter !== 'all') {
      const sol = SOLUTIONS[p.id];
      if (!sol || !sol[state.langFilter]) return false;
    }
    if (state.searchQuery) {
      const q = state.searchQuery;
      if (!p.title.toLowerCase().includes(q) && !String(p.leetcode).includes(q)) return false;
    }
    return true;
  });
}

function renderList() {
  const problems = filteredProblems();
  const container = document.getElementById('problemList');
  const info = document.getElementById('resultsInfo');

  info.textContent = problems.length === PROBLEMS.length
    ? `Showing all ${PROBLEMS.length} problems`
    : `Showing ${problems.length} of ${PROBLEMS.length} problems`;

  if (problems.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__text">No problems match your filters.</div>
      </div>`;
    return;
  }

  container.innerHTML = problems.map(p => {
    const hasSolution = SOLVED_IDS.has(p.id);
    const langDots = LANGUAGES.map(lang => {
      const solved = SOLUTIONS[p.id] && SOLUTIONS[p.id][lang];
      return `<div class="lang-dot${solved ? ' solved' : ''}" title="${lang}${solved ? ' ✓' : ''}"></div>`;
    }).join('');

    return `
      <a class="problem-card ripple" href="#/problem/${p.id}" onclick="navigate('#/problem/${p.id}'); return false;">
        <span class="problem-num">#${p.id}</span>
        <span class="problem-lc">${p.leetcode}</span>
        <span class="problem-title">${escHtml(p.title)}</span>
        <span class="badge badge-${p.difficulty}">${p.difficulty}</span>
        <div class="problem-langs" title="Language coverage">${langDots}</div>
        <span class="acceptance">${p.acceptance}</span>
      </a>`;
  }).join('');

  addRipples();
}

// ── Detail view ───────────────────────────────────────────────────────────────
function showDetail(id) {
  const problem = PROBLEMS.find(p => p.id === id);
  if (!problem) { navigate('#/'); return; }

  state.currentProblemId = id;
  showView('detail');

  const container = document.getElementById('detailContent');
  const hasSolution = SOLVED_IDS.has(id);

  container.innerHTML = `
    <button class="detail-back" onclick="navigate('#/')">
      ← Back to Problems
    </button>

    <div class="detail-header">
      <div class="detail-meta">
        <span class="detail-num">Grind #${problem.id}</span>
        <h1 class="detail-title">${escHtml(problem.title)}</h1>
        <span class="badge badge-${problem.difficulty}">${problem.difficulty}</span>
      </div>
      <div class="detail-info">
        <span>LeetCode #${problem.leetcode}</span>
        <span>Acceptance: ${problem.acceptance}</span>
        <a href="https://leetcode.com/problems/${slugify(problem.title)}/" target="_blank" rel="noopener">
          Open on LeetCode ↗
        </a>
      </div>
    </div>

    ${hasSolution ? renderCodeTabs(id) : renderNoSolution(problem)}
  `;

  if (hasSolution) {
    setupTabEvents(id);
    // restore preferred language
    activateLangTab(state.activeLang, id);
  }

  addRipples();
}

function renderNoSolution(problem) {
  return `
    <div class="lang-tabs">
      <div class="lang-tabs__header">
        ${LANGUAGES.map(l => `<button class="lang-tab-btn">${l}</button>`).join('')}
      </div>
      <div class="no-solution">
        <div class="no-solution__icon">🚧</div>
        <div class="no-solution__text">
          Solutions for <strong>${escHtml(problem.title)}</strong> are coming soon.<br>
          Currently, functional solutions are available for problems 1–5.
        </div>
      </div>
    </div>`;
}

function renderCodeTabs(id) {
  const sol = SOLUTIONS[id] || {};
  return `
    <div class="lang-tabs" id="langTabs">
      <div class="lang-tabs__header" id="tabHeader">
        ${LANGUAGES.map(lang => `
          <button class="lang-tab-btn" data-lang="${lang}" id="tab-${lang.toLowerCase()}">${lang}</button>
        `).join('')}
      </div>
      <div class="lang-tabs__body">
        ${LANGUAGES.map(lang => {
          const code = sol[lang];
          return `
            <div class="lang-panel" id="panel-${lang.toLowerCase()}">
              ${code
                ? `<div class="code-header">
                     <span class="code-lang-label">${lang}</span>
                     <button class="btn-copy" data-lang="${lang}" onclick="copyCode(this, '${lang}', ${id})">Copy</button>
                   </div>
                   <pre class="code-block">${highlight(escHtml(code), lang)}</pre>`
                : `<div class="no-solution">
                     <div class="no-solution__icon">🚧</div>
                     <div class="no-solution__text">Solution not yet available in ${lang}.</div>
                   </div>`
              }
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

function setupTabEvents(id) {
  const header = document.getElementById('tabHeader');
  if (!header) return;
  header.addEventListener('click', e => {
    const btn = e.target.closest('[data-lang]');
    if (!btn) return;
    const lang = btn.dataset.lang;
    activateLangTab(lang, id);
    state.activeLang = lang;
    localStorage.setItem('activeLang', lang);
  });
}

function activateLangTab(lang, id) {
  // Make sure this lang exists or fall back
  const sol = SOLUTIONS[id];
  const validLang = (sol && sol[lang]) ? lang : (LANGUAGES.find(l => sol && sol[l]) || LANGUAGES[0]);

  document.querySelectorAll('.lang-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.lang-panel').forEach(p => p.classList.remove('active'));

  const tabBtn = document.getElementById('tab-' + validLang.toLowerCase());
  const panel = document.getElementById('panel-' + validLang.toLowerCase());
  if (tabBtn) tabBtn.classList.add('active');
  if (panel) panel.classList.add('active');
}

function copyCode(btn, lang, id) {
  const sol = SOLUTIONS[id];
  if (!sol || !sol[lang]) return;
  navigator.clipboard.writeText(sol[lang]).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = sol[lang];
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

// ── Matrix view ───────────────────────────────────────────────────────────────
function showMatrix() {
  showView('matrix');
  renderMatrix();
}

function renderMatrix() {
  const container = document.getElementById('matrixContent');

  // Stats
  let totalSolved = 0;
  PROBLEMS.forEach(p => {
    if (SOLVED_IDS.has(p.id)) {
      const sol = SOLUTIONS[p.id] || {};
      totalSolved += LANGUAGES.filter(l => sol[l]).length;
    }
  });

  const totalCells = PROBLEMS.length * LANGUAGES.length;
  const pct = ((totalSolved / totalCells) * 100).toFixed(1);

  const statsHtml = `
    <div class="matrix-stats">
      <div class="matrix-stat-card">
        <span class="num">${PROBLEMS.length}</span>
        <span class="lbl">Problems</span>
      </div>
      <div class="matrix-stat-card">
        <span class="num">${LANGUAGES.length}</span>
        <span class="lbl">Languages</span>
      </div>
      <div class="matrix-stat-card">
        <span class="num">${totalSolved}</span>
        <span class="lbl">Solutions</span>
      </div>
      <div class="matrix-stat-card">
        <span class="num">${pct}%</span>
        <span class="lbl">Coverage</span>
      </div>
    </div>`;

  const headerRow = `<tr>
    <th>Problem</th>
    ${LANGUAGES.map(l => `<th>${l.slice(0, 3)}<span class="lang-full">${l.slice(3)}</span></th>`).join('')}
  </tr>`;

  const rows = PROBLEMS.map(p => {
    const sol = SOLUTIONS[p.id] || {};
    const cells = LANGUAGES.map(lang => {
      const has = sol[lang];
      return `<td>${has
        ? `<span class="check-yes" title="${lang} ✓">✓</span>`
        : `<span class="check-no" title="${lang} — not yet">○</span>`
      }</td>`;
    }).join('');

    return `<tr>
      <td>
        <a class="matrix-title-link" href="#/problem/${p.id}" onclick="navigate('#/problem/${p.id}'); return false;">
          <span class="matrix-id">${p.id}</span>
          <span class="badge badge-${p.difficulty}" style="padding:2px 7px;font-size:.65rem">${p.difficulty}</span>
          ${escHtml(p.title)}
        </a>
      </td>
      ${cells}
    </tr>`;
  }).join('');

  container.innerHTML = `
    ${statsHtml}
    <div class="matrix-wrap">
      <table class="matrix-table">
        <thead>${headerRow}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

// ── Syntax highlighting ──────────────────────────────────────────────────────
// Simple keyword-based highlighter (no external deps)
function highlight(code, lang) {
  // language-specific keyword sets
  const langDefs = {
    TypeScript: {
      keywords: /\b(function|return|const|let|var|if|else|new|class|import|from|export|null|undefined|true|false|Math|Map|Array|number|string|boolean|void)\b/g,
      types:     /\b(number|string|boolean|void|null|undefined|Map|Array|Set|Record|Promise|any)\b/g,
      fns:       /\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g,
      strings:   /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
      ops:       /([+\-*/<>=!&|?:]+|=>)/g,
    },
    Haskell: {
      keywords:  /\b(where|let|in|case|of|do|data|type|newtype|module|import|qualified|as|if|then|else|otherwise)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9]*)\b/g,
      fns:       /\b([a-z][a-zA-Z0-9']*)\s*::/g,
      strings:   /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(--[^\n]*|\{-[\s\S]*?-\})/g,
      ops:       /(\||->|<-|::|\$|\.|\+\+|>>=|>>)/g,
    },
    Elixir: {
      keywords:  /\b(def|defp|defmodule|do|end|case|when|if|else|fn|and|or|not|in|receive|after|cond|with|for|reduce|map|filter)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9\.]*)\b/g,
      fns:       /\b([a-z_][a-zA-Z0-9_?!]*)\s*(?=\()/g,
      strings:   /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(#[^\n]*)/g,
      ops:       /(\|>|<>|->|=>|::|\+\+)/g,
    },
    Rust: {
      keywords:  /\b(fn|let|mut|pub|use|struct|enum|impl|match|if|else|while|for|return|Some|None|Ok|Err|true|false|self|Self|as|in|ref|move|where|type|trait|mod)\b/g,
      types:     /\b(i32|i64|u32|u64|usize|f64|f32|bool|String|str|Vec|HashMap|HashSet|Option|Result|Box|Arc|Rc)\b/g,
      fns:       /\b([a-z_][a-zA-Z0-9_]*)\s*(?=\()/g,
      strings:   /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
      ops:       /([+\-*\/<>=!&|?:]+|=>|->|::)/g,
    },
    Scala: {
      keywords:  /\b(def|val|var|class|object|case|match|if|else|for|yield|return|extends|with|new|import|type|trait|sealed|override|lazy|null|true|false)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9]*)\b/g,
      fns:       /\b([a-z][a-zA-Z0-9]*)\s*(?=\()/g,
      strings:   /(["'])(?:(?!\1)[^\\]|\\.)*\1/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
      ops:       /([+\-*\/<>=!&|?:]+|=>|->)/g,
    },
    OCaml: {
      keywords:  /\b(let|rec|in|fun|function|match|with|if|then|else|type|module|open|begin|end|and|or|not|when|for|while|do|done|try|exception|mutable|of|val)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9_]*)\b/g,
      fns:       /\b([a-z_][a-zA-Z0-9_']*)\s*(?=\s)/g,
      strings:   /("(?:[^"\\]|\\.)*")/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(\(\*[\s\S]*?\*\))/g,
      ops:       /(\||->|<-|::|\.\.|:=)/g,
    },
    Clojure: {
      keywords:  /\b(defn|def|let|fn|if|cond|when|do|loop|recur|reduce|map|filter|for|case|and|or|not|nil|true|false)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9-]*)\b/g,
      // Uses a two-group capture (open-paren + name) instead of lookbehind
      // so that the pattern works in older browsers that lack lookbehind support.
      fns:       /(\()([a-z][a-zA-Z0-9-?!]*)/g,
      strings:   /("(?:[^"\\]|\\.)*")/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(;[^\n]*)/g,
      ops:       /([+\-*\/<>=!]+)/g,
    },
    Lisp: {
      keywords:  /\b(defun|let|let\*|labels|loop|when|unless|if|cond|and|or|not|nil|t|setf|defvar|defparameter|do|dotimes|dolist|return|progn|lambda|apply|funcall)\b/g,
      types:     /\b([A-Z][a-zA-Z0-9-]*)\b/g,
      // Uses a two-group capture (open-paren + name) instead of lookbehind
      // so that the pattern works in older browsers that lack lookbehind support.
      fns:       /(\()([a-z][a-zA-Z0-9-?!]*)/g,
      strings:   /("(?:[^"\\]|\\.)*")/g,
      numbers:   /\b\d+(\.\d+)?\b/g,
      comments:  /(;[^\n]*)/g,
      ops:       /([+\-*\/<>=!]+)/g,
    },
  };

  const def = langDefs[lang] || langDefs.TypeScript;

  // We tokenize by replacing non-overlapping patterns.
  // Strategy: mark regions with placeholders to avoid double-replacing.

  let result = code;
  const placeholders = [];

  function protect(str, cls) {
    const idx = placeholders.length;
    placeholders.push(`<span class="${cls}">${str}</span>`);
    return `\x00${idx}\x00`;
  }

  // Order matters: comments first, then strings, then keywords/types/etc.
  if (def.comments) {
    result = result.replace(def.comments, m => protect(m, 'cm'));
  }
  if (def.strings) {
    result = result.replace(def.strings, m => protect(m, 'st'));
  }
  if (def.types) {
    result = result.replace(def.types, m => protect(m, 'ty'));
  }
  if (def.keywords) {
    result = result.replace(def.keywords, m => protect(m, 'kw'));
  }
  if (def.numbers) {
    result = result.replace(def.numbers, m => protect(m, 'nm'));
  }

  // Restore placeholders
  result = result.replace(/\x00(\d+)\x00/g, (_, i) => placeholders[+i]);

  return result;
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function addRipples() {
  document.querySelectorAll('.ripple:not([data-ripple])').forEach(el => {
    el.dataset.ripple = '1';
    el.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
