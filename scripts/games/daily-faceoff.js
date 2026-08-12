/* ============================================================
   The Daily Faceoff — guess the daily glossary term from its
   redacted definition. Scout Elite Arcade prototype.
   Depends on /scripts/games/arcade.js (window.Arcade) and the
   glossary injected on the page as window.HOCKEY_GLOSSARY.
   ============================================================ */

(function () {
  'use strict';

  var GLOSSARY = window.HOCKEY_GLOSSARY;
  var Arcade = window.Arcade;
  if (!GLOSSARY || !GLOSSARY.length || !Arcade) return;

  var MAX_GUESSES = 5;
  var SCHEDULE_SEED = 20260801; /* fixed seed: stable daily schedule */
  var STATS_KEY = 'daily-faceoff';
  var RUN_KEY = 'daily-faceoff-run';
  var GREEN = '🟩';  /* green square */
  var YELLOW = '🟨'; /* yellow square */
  var BLACK = '⬛';        /* black square */

  function $(id) { return document.getElementById(id); }

  var els = {
    puzzle: $('df-puzzle'),
    category: $('df-category'),
    stats: $('df-stats'),
    def: $('df-def'),
    hints: $('df-hints'),
    guesses: $('df-guesses'),
    form: $('df-form'),
    input: $('df-input'),
    datalist: $('df-terms'),
    left: $('df-left'),
    result: $('df-result'),
    resultTitle: $('df-result-title'),
    resultAnswer: $('df-result-answer'),
    resultDef: $('df-result-def'),
    shareLine: $('df-share-line'),
    copyBtn: $('df-copy'),
    practiceBtn: $('df-practice'),
    countdown: $('df-countdown'),
    glossLink: $('df-gloss-link')
  };

  /* ---------- small helpers ---------- */

  function norm(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/^ +| +$/g, '');
  }

  function escRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function hashStr(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
    return h >>> 0;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function textNode(s) { return document.createTextNode(s); }

  function monoSpan(s) {
    var span = document.createElement('span');
    span.className = 'df-mono';
    span.textContent = s;
    return span;
  }

  function daysSinceEpoch() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var epoch = new Date(2026, 7, 1); /* 2026-08-01, local */
    return Math.round((today.getTime() - epoch.getTime()) / 86400000);
  }

  function yesterdayKey() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  /* ---------- daily schedule ---------- */

  function shuffledGlossary() {
    var rand = Arcade.seededRand(SCHEDULE_SEED);
    var list = GLOSSARY.slice();
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    }
    return list;
  }

  var schedule = shuffledGlossary();
  var days = daysSinceEpoch();
  var dailyIndex = ((days % schedule.length) + schedule.length) % schedule.length;
  var dailyEntry = schedule[dailyIndex];
  var puzzleNo = days + 1;

  /* ---------- state ---------- */

  var stats = Arcade.recall(STATS_KEY, { lastDay: 0, streak: 0, played: 0, wins: 0 });

  var state = {
    mode: 'daily', /* 'daily' | 'practice' */
    entry: dailyEntry,
    guesses: [],   /* { text, mark } */
    done: false,
    won: false
  };

  var countdownTimer = null;

  /* ---------- redaction ---------- */

  function termWords(term) {
    return term.match(/[a-z0-9]+/gi) || [];
  }

  /* Ranges of the definition to black out. Full term always; each
     individual word of the term when it is 5+ letters (with common
     stems like "forechecking" swallowed), unless fullOnly is set. */
  function collectRanges(def, term, fullOnly) {
    var ranges = [];
    function grab(re) {
      var m;
      while ((m = re.exec(def)) !== null) {
        if (m[0].length) ranges.push([m.index, m.index + m[0].length]);
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    }
    grab(new RegExp('\\b' + escRe(term) + '[a-z]*', 'gi'));
    if (!fullOnly) {
      var words = termWords(term);
      for (var i = 0; i < words.length; i++) {
        if (words[i].length >= 5) {
          /* Stem to the first 5 letters so variants leak nothing:
             "defensive" also blacks out "defending", "defense". */
          grab(new RegExp('\\b' + escRe(words[i].slice(0, 5)) + '[a-z]*', 'gi'));
        }
      }
    }
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var merged = [];
    for (var k = 0; k < ranges.length; k++) {
      var r = ranges[k];
      if (merged.length && r[0] <= merged[merged.length - 1][1]) {
        if (r[1] > merged[merged.length - 1][1]) merged[merged.length - 1][1] = r[1];
      } else {
        merged.push([r[0], r[1]]);
      }
    }
    return merged;
  }

  function renderRedacted(container, def, ranges) {
    container.textContent = '';
    var pos = 0;
    for (var i = 0; i < ranges.length; i++) {
      var r = ranges[i];
      if (r[0] > pos) container.appendChild(textNode(def.slice(pos, r[0])));
      var seg = def.slice(r[0], r[1]);
      var blocks = '';
      for (var k = 0; k < seg.length; k++) {
        blocks += (seg.charAt(k) === ' ') ? ' ' : '█';
      }
      var span = document.createElement('span');
      span.className = 'df-redact';
      span.textContent = blocks;
      container.appendChild(span);
      pos = r[1];
    }
    if (pos < def.length) container.appendChild(textNode(def.slice(pos)));
  }

  /* ---------- guess checking ---------- */

  /* "defense (on/off the puck)" also answers to plain "defense" */
  function baseTerm(t) {
    return norm(t.replace(/\s*\([^)]*\)\s*/g, ' '));
  }

  function findEntry(text) {
    var n = norm(text);
    if (!n) return null;
    var i;
    for (i = 0; i < GLOSSARY.length; i++) {
      if (norm(GLOSSARY[i].t) === n) return GLOSSARY[i];
    }
    for (i = 0; i < GLOSSARY.length; i++) {
      if (baseTerm(GLOSSARY[i].t) === n) return GLOSSARY[i];
    }
    return null;
  }

  function isCorrect(text) {
    var n = norm(text);
    return n === norm(state.entry.t) || n === baseTerm(state.entry.t);
  }

  function sharesLink(a, b) {
    if (a.c === b.c) return true;
    var set = {};
    var i;
    set[norm(b.t)] = true;
    for (i = 0; i < (b.r || []).length; i++) set[norm(b.r[i])] = true;
    if (set[norm(a.t)]) return true;
    for (i = 0; i < (a.r || []).length; i++) {
      if (set[norm(a.r[i])] || norm(a.r[i]) === norm(b.t)) return true;
    }
    return false;
  }

  function markFor(text) {
    if (isCorrect(text)) return GREEN;
    var g = findEntry(text);
    if (g && sharesLink(g, state.entry)) return YELLOW;
    return BLACK;
  }

  function noteFor(text, mark) {
    if (mark === GREEN) return 'correct';
    if (mark === YELLOW) return 'close, related';
    return findEntry(text) ? 'no connection' : 'not in glossary';
  }

  /* ---------- hint ladder ---------- */

  function patternOf(term) {
    var words = term.split(' ');
    var out = [];
    for (var w = 0; w < words.length; w++) {
      var s = '';
      var first = true;
      for (var i = 0; i < words[w].length; i++) {
        var ch = words[w].charAt(i);
        if (/[a-z0-9]/i.test(ch)) {
          s += first ? ch : '_';
          first = false;
        } else {
          s += ch;
        }
      }
      out.push(s);
    }
    return out.join(' ');
  }

  /* Reveal ~40% of the letters, first letter of each word always in,
     the rest picked deterministically per term. */
  function lettersHint(term) {
    var rand = Arcade.seededRand(hashStr(term) ^ SCHEDULE_SEED);
    var chars = term.split('');
    var letterIdx = [];
    var show = {};
    var shown = 0;
    var i;
    var newWord = true;
    for (i = 0; i < chars.length; i++) {
      if (/[a-z0-9]/i.test(chars[i])) {
        letterIdx.push(i);
        if (newWord) { show[i] = true; shown++; }
        newWord = false;
      } else if (chars[i] === ' ') {
        newWord = true;
      }
    }
    var target = Math.max(shown, Math.ceil(letterIdx.length * 0.4));
    var order = letterIdx.slice();
    for (i = order.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }
    for (i = 0; i < order.length && shown < target; i++) {
      if (!show[order[i]]) { show[order[i]] = true; shown++; }
    }
    var out = '';
    for (i = 0; i < chars.length; i++) {
      if (/[a-z0-9]/i.test(chars[i])) out += show[i] ? chars[i] : '_';
      else out += chars[i];
    }
    return out;
  }

  function hintItem(n) {
    var li = document.createElement('li');
    var t = state.entry.t;
    if (n === 0) {
      li.appendChild(textNode('Shape: '));
      li.appendChild(monoSpan(patternOf(t)));
    } else if (n === 1) {
      var r = state.entry.r || [];
      if (r.length) {
        li.appendChild(textNode('Runs with: ' + r.join(', ')));
      } else {
        var lead = (termWords(t)[0] || t).slice(0, 2);
        li.appendChild(textNode('No linked terms for this one. It starts with '));
        li.appendChild(monoSpan(lead));
      }
    } else if (n === 2) {
      li.appendChild(textNode('More letters: '));
      li.appendChild(monoSpan(lettersHint(t)));
    } else {
      li.appendChild(textNode('Definition opened up above. Only the answer stays blacked out.'));
    }
    return li;
  }

  /* ---------- stats & persistence ---------- */

  function updateStats(won) {
    var today = Arcade.dayKey();
    if (stats.lastDay === today) return; /* already recorded (e.g. restore) */
    stats.played += 1;
    if (won) {
      stats.wins += 1;
      stats.streak = (stats.lastDay === yesterdayKey()) ? stats.streak + 1 : 1;
    } else {
      stats.streak = 0;
    }
    stats.lastDay = today;
    Arcade.store(STATS_KEY, stats);
  }

  function persistRun() {
    if (state.mode !== 'daily') return;
    var texts = [];
    for (var i = 0; i < state.guesses.length; i++) texts.push(state.guesses[i].text);
    Arcade.store(RUN_KEY, {
      day: Arcade.dayKey(),
      guesses: texts,
      done: state.done,
      won: state.won
    });
  }

  /* ---------- game flow ---------- */

  function finish(won) {
    state.done = true;
    state.won = won;
    if (state.mode === 'daily') updateStats(won);
  }

  function applyGuess(text) {
    var mark = markFor(text);
    state.guesses.push({ text: text, mark: mark });
    if (mark === GREEN) {
      finish(true);
    } else if (state.guesses.length >= MAX_GUESSES) {
      finish(false);
    }
  }

  function wrongCount() {
    var n = 0;
    for (var i = 0; i < state.guesses.length; i++) {
      if (state.guesses[i].mark !== GREEN) n++;
    }
    return n;
  }

  function shareText() {
    var line = '';
    for (var i = 0; i < state.guesses.length; i++) line += state.guesses[i].mark;
    var score = state.won ? String(state.guesses.length) : 'X';
    return 'The Daily Faceoff #' + puzzleNo + ': ' + score + '/' + MAX_GUESSES + ' ' + line;
  }

  /* ---------- rendering ---------- */

  function renderMeta() {
    els.puzzle.textContent = state.mode === 'daily' ? 'Faceoff #' + puzzleNo : 'Practice';
    els.category.textContent = state.entry.c;
    els.stats.textContent = 'Streak ' + stats.streak + ' · Played ' + stats.played + ' · Won ' + stats.wins;
  }

  function renderBoard() {
    if (state.done) {
      els.def.textContent = state.entry.d;
      return;
    }
    var fullOnly = wrongCount() >= 4;
    renderRedacted(els.def, state.entry.d, collectRanges(state.entry.d, state.entry.t, fullOnly));
  }

  function renderHints() {
    els.hints.textContent = '';
    var n = Math.min(wrongCount(), 4);
    if (!n) { els.hints.hidden = true; return; }
    els.hints.hidden = false;
    for (var i = 0; i < n; i++) els.hints.appendChild(hintItem(i));
  }

  function renderGuesses() {
    els.guesses.textContent = '';
    for (var i = 0; i < state.guesses.length; i++) {
      var g = state.guesses[i];
      var li = document.createElement('li');
      var chip = document.createElement('span');
      chip.textContent = g.mark;
      var txt = document.createElement('span');
      txt.textContent = g.text;
      var note = document.createElement('span');
      note.className = 'df-note';
      note.textContent = noteFor(g.text, g.mark);
      li.appendChild(chip);
      li.appendChild(txt);
      li.appendChild(note);
      els.guesses.appendChild(li);
    }
  }

  function renderForm() {
    if (state.done) {
      els.form.hidden = true;
      els.left.hidden = true;
      return;
    }
    els.form.hidden = false;
    els.left.hidden = false;
    var left = MAX_GUESSES - state.guesses.length;
    els.left.textContent = left + (left === 1 ? ' guess left.' : ' guesses left.');
  }

  function startCountdown() {
    if (countdownTimer) return;
    function tick() {
      var now = new Date();
      var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      var ms = next.getTime() - now.getTime();
      if (ms < 0) ms = 0;
      var h = Math.floor(ms / 3600000);
      var m = Math.floor(ms / 60000) % 60;
      var s = Math.floor(ms / 1000) % 60;
      els.countdown.textContent = 'Next faceoff in ' + h + ':' + pad2(m) + ':' + pad2(s) + '.';
    }
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  function renderResult() {
    if (!state.done) {
      els.result.hidden = true;
      return;
    }
    els.result.hidden = false;
    var n = state.guesses.length;
    els.resultTitle.textContent = state.won ? 'Got it in ' + n + '.' : 'Out of guesses.';

    els.resultAnswer.textContent = '';
    els.resultAnswer.appendChild(textNode('The term was '));
    var strong = document.createElement('strong');
    strong.className = 'df-answer';
    strong.textContent = state.entry.t;
    els.resultAnswer.appendChild(strong);
    els.resultAnswer.appendChild(textNode('.'));
    els.resultDef.textContent = state.entry.d;

    var daily = state.mode === 'daily';
    var showShare = daily && state.won;
    els.shareLine.hidden = !showShare;
    els.copyBtn.hidden = !showShare;
    if (showShare) els.shareLine.textContent = shareText();

    els.glossLink.hidden = state.won;

    els.practiceBtn.hidden = false;
    els.practiceBtn.textContent = daily ? 'Practice a random term' : 'Another practice term';

    if (daily) {
      els.countdown.hidden = false;
      startCountdown();
    } else {
      els.countdown.hidden = true;
    }
  }

  function renderAll() {
    renderMeta();
    renderBoard();
    renderHints();
    renderGuesses();
    renderForm();
    renderResult();
  }

  /* ---------- events ---------- */

  els.form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.done) return;
    var text = els.input.value.replace(/^\s+|\s+$/g, '');
    if (!text) return;
    applyGuess(text);
    els.input.value = '';
    if (!state.done) {
      Arcade.vibrate(25);
      els.input.focus();
    }
    persistRun();
    renderAll();
  });

  els.copyBtn.addEventListener('click', function () {
    var text = shareText();
    function flash() {
      els.copyBtn.textContent = 'Copied';
      setTimeout(function () { els.copyBtn.textContent = 'Copy result'; }, 1200);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) { /* no-op */ }
      document.body.removeChild(ta);
      flash();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(flash, fallback);
    } else {
      fallback();
    }
  });

  els.practiceBtn.addEventListener('click', function () {
    var pick = state.entry;
    if (GLOSSARY.length > 1) {
      var tries = 0;
      do {
        pick = GLOSSARY[Math.floor(Math.random() * GLOSSARY.length)];
        tries++;
      } while (tries < 25 && (pick === dailyEntry || pick === state.entry));
    }
    state = { mode: 'practice', entry: pick, guesses: [], done: false, won: false };
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    renderAll();
    els.input.focus();
  });

  /* ---------- init ---------- */

  (function fillDatalist() {
    var terms = [];
    var i;
    for (i = 0; i < GLOSSARY.length; i++) terms.push(GLOSSARY[i].t);
    terms.sort();
    for (i = 0; i < terms.length; i++) {
      var opt = document.createElement('option');
      opt.value = terms[i];
      els.datalist.appendChild(opt);
    }
  })();

  (function restoreRun() {
    var run = Arcade.recall(RUN_KEY, null);
    if (run && run.day === Arcade.dayKey() && run.guesses && run.guesses.length) {
      for (var i = 0; i < run.guesses.length && !state.done; i++) {
        applyGuess(String(run.guesses[i]));
      }
    }
  })();

  renderAll();
})();
