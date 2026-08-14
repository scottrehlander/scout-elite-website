/* Rink Crossword — daily criss-cross puzzle generated from the hockey
   glossary. Deterministic per day (seeded by the local date), so everyone
   gets the same sheet. Prototype for the hidden Scout Elite Arcade. */
(function () {
  'use strict';

  var GLOSSARY = window.HOCKEY_GLOSSARY || [];
  var SIZE = 20;          // generator workspace
  var TARGET_WORDS = 8;
  var MIN_WORDS = 6;
  var MAX_TERM = 14;      // longest answer we will use
  // Cropped board must stay phone friendly. Width drives cell size, so it is
  // the tight one; height just costs a little scrolling. The generator honours
  // both DURING placement, so no puzzle can ever exceed them.
  var MAX_W = 12, MAX_H = 14;
  var EPOCH = new Date(2026, 7, 13); // puzzle #1
  var STORE_KEY = 'crossword';

  // ---- term pool
  var TERMS = [];
  GLOSSARY.forEach(function (e) {
    if (/[0-9]/.test(e.t)) return;
    var letters = e.t.toUpperCase().replace(/[^A-Z]/g, '');
    if (letters.length < 3 || letters.length > MAX_TERM) return;
    TERMS.push({ term: e.t, letters: letters, def: e.d, rel: e.r || [] });
  });

  function enumeration(term) {
    var groups = term.split(/([\s-]+)/);
    var out = '';
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      if (/^[\s-]+$/.test(g)) out += g.indexOf('-') >= 0 ? '-' : ',';
      else if (g) out += g.replace(/[^A-Za-z]/g, '').length;
    }
    return out;
  }

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  var STOPWORDS = ['and', 'the', 'off', 'for', 'out', 'own'];

  function redact(def, term) {
    var out = def.replace(new RegExp(escapeRe(term), 'gi'), '___');
    term.split(/[\s-]+/).forEach(function (w) {
      var clean = w.replace(/[^A-Za-z]/g, '');
      if (clean.length >= 3 && STOPWORDS.indexOf(clean.toLowerCase()) === -1) {
        out = out.replace(new RegExp('\\b' + escapeRe(clean) + '[a-z]*', 'gi'), '___');
      }
    });
    return out;
  }

  // ---- criss-cross generator
  function shuffle(arr, rand) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  /* Retry for a good puzzle, never for a smaller cap: the grid size limits are
     enforced inside tryGenerate, so the only thing we relax here is how many
     words we will settle for. */
  function generate(seed) {
    var p, a;
    for (a = 0; a < 80; a++) {
      p = tryGenerate(seed + a * 7919, MIN_WORDS);
      if (p) return p;
    }
    for (a = 0; a < 80; a++) {
      p = tryGenerate(seed + 104729 + a * 7919, 4);
      if (p) return p;
    }
    for (a = 0; a < 40; a++) {
      p = tryGenerate(seed + 611953 + a * 7919, 2);
      if (p) return p;
    }
    return null;
  }

  function tryGenerate(seed, minWords) {
    var rand = Arcade.seededRand(seed);
    var pool = shuffle(TERMS.slice(), rand);
    var grid = {}; // "x,y" -> letter
    var placements = [];
    var box = null; // running bounding box of everything placed so far

    function at(x, y) { return grid[x + ',' + y]; }

    // would adding this word keep the board inside the phone-sized cap?
    function boxFits(sx, sy, dx, dy, len) {
      var ex = sx + dx * (len - 1), ey = sy + dy * (len - 1);
      var minX = box ? Math.min(box.minX, sx) : sx;
      var maxX = box ? Math.max(box.maxX, ex) : ex;
      var minY = box ? Math.min(box.minY, sy) : sy;
      var maxY = box ? Math.max(box.maxY, ey) : ey;
      return (maxX - minX + 1) <= MAX_W && (maxY - minY + 1) <= MAX_H;
    }

    function canPlace(letters, sx, sy, dx, dy) {
      if (at(sx - dx, sy - dy)) return false;
      if (at(sx + dx * letters.length, sy + dy * letters.length)) return false;
      var crossings = 0;
      for (var i = 0; i < letters.length; i++) {
        var x = sx + dx * i, y = sy + dy * i;
        if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) return false;
        var existing = at(x, y);
        if (existing) {
          if (existing !== letters[i]) return false;
          crossings++;
        } else if (at(x + dy, y + dx) || at(x - dy, y - dx)) {
          return false; // would butt up against a parallel word
        }
      }
      return crossings > 0;
    }

    function place(entry, sx, sy, dx, dy) {
      var cells = [];
      for (var i = 0; i < entry.letters.length; i++) {
        var x = sx + dx * i, y = sy + dy * i;
        grid[x + ',' + y] = entry.letters[i];
        cells.push({ x: x, y: y });
      }
      placements.push({ entry: entry, cells: cells, dx: dx, dy: dy });
      var ex = sx + dx * (entry.letters.length - 1), ey = sy + dy * (entry.letters.length - 1);
      box = box ? {
        minX: Math.min(box.minX, sx), maxX: Math.max(box.maxX, ex),
        minY: Math.min(box.minY, sy), maxY: Math.max(box.maxY, ey)
      } : { minX: sx, maxX: ex, minY: sy, maxY: ey };
    }

    // seed word: something medium-long, across the middle
    var first = null;
    for (var f = 0; f < pool.length; f++) {
      if (pool[f].letters.length >= 6 && pool[f].letters.length <= 10) { first = pool.splice(f, 1)[0]; break; }
    }
    if (!first) first = pool.shift();
    var fx = Math.floor((SIZE - first.letters.length) / 2);
    place(first, fx, Math.floor(SIZE / 2), 1, 0);

    for (var p = 0; p < pool.length && placements.length < TARGET_WORDS; p++) {
      var cand = pool[p];
      var spots = [];
      for (var w = 0; w < placements.length; w++) {
        var word = placements[w];
        for (var c = 0; c < word.cells.length; c++) {
          var cell = word.cells[c];
          var hostLetter = at(cell.x, cell.y);
          for (var li = 0; li < cand.letters.length; li++) {
            if (cand.letters[li] !== hostLetter) continue;
            var dx = word.dy, dy = word.dx; // perpendicular
            var sx = cell.x - dx * li, sy = cell.y - dy * li;
            if (canPlace(cand.letters, sx, sy, dx, dy) &&
                boxFits(sx, sy, dx, dy, cand.letters.length)) {
              spots.push({ sx: sx, sy: sy, dx: dx, dy: dy });
            }
          }
        }
      }
      if (spots.length) {
        var pick = spots[Math.floor(rand() * spots.length)];
        place(cand, pick.sx, pick.sy, pick.dx, pick.dy);
      }
    }

    if (placements.length < minWords) return null;

    // crop to bounding box
    var minX = SIZE, minY = SIZE, maxX = 0, maxY = 0;
    Object.keys(grid).forEach(function (key) {
      var xy = key.split(',');
      var x = Number(xy[0]), y = Number(xy[1]);
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    });
    var wOut = maxX - minX + 1, hOut = maxY - minY + 1;
    if (wOut > MAX_W || hOut > MAX_H) return null; // safety net, placement already caps this

    placements.forEach(function (word) {
      word.cells.forEach(function (cell) { cell.x -= minX; cell.y -= minY; });
    });

    // standard crossword numbering on the cropped board
    var letterAt = {};
    placements.forEach(function (word) {
      word.cells.forEach(function (cell, i) {
        letterAt[cell.x + ',' + cell.y] = word.entry.letters[i];
      });
    });
    var numbers = {}, n = 0, words = [];
    for (var y = 0; y < hOut; y++) {
      for (var x = 0; x < wOut; x++) {
        if (!letterAt[x + ',' + y]) continue;
        var startsAcross = !letterAt[(x - 1) + ',' + y] && letterAt[(x + 1) + ',' + y];
        var startsDown = !letterAt[x + ',' + (y - 1)] && letterAt[x + ',' + (y + 1)];
        if (startsAcross || startsDown) numbers[x + ',' + y] = ++n;
      }
    }
    placements.forEach(function (word) {
      var start = word.cells[0];
      words.push({
        num: numbers[start.x + ',' + start.y],
        dir: word.dx === 1 ? 'across' : 'down',
        cells: word.cells,
        answer: word.entry.letters,
        term: word.entry.term,
        clue: redact(word.entry.def, word.entry.term),
        enumeration: enumeration(word.entry.term)
      });
    });
    // a definition may name another term that is also in this puzzle:
    // blank those out too so one clue never hands over another answer
    words.forEach(function (word) {
      words.forEach(function (other) {
        if (other === word) return;
        word.clue = word.clue.replace(new RegExp(escapeRe(other.term) + '[a-z]*', 'gi'), '___');
      });
    });
    words.sort(function (a, b) { return a.num - b.num; });
    return { w: wOut, h: hOut, letterAt: letterAt, numbers: numbers, words: words };
  }

  // ---- daily bookkeeping
  function daysSinceEpoch() {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((today - EPOCH) / 864e5);
  }

  // ---- DOM
  var boardEl = document.getElementById('cw-board');
  var clueBarEl = document.getElementById('cw-cluetext');
  var keyboardEl = document.getElementById('cw-keyboard');
  var numEl = document.getElementById('cw-num');
  var labelEl = document.getElementById('cw-label');
  var timeEl = document.getElementById('cw-time');
  var progressEl = document.getElementById('cw-progress');
  var acrossEl = document.getElementById('cw-across');
  var downEl = document.getElementById('cw-down');
  var doneEl = document.getElementById('cw-done');
  var doneTitleEl = document.getElementById('cw-done-title');
  var doneMsgEl = document.getElementById('cw-done-msg');

  var puzzle, mode, puzzleNum, fill, marks, sel, seconds, timerOn, finished, cellEls, clueEls;
  var lastCell = 0; // last fitted cell size, so refits are idempotent

  /* A stored puzzle has to be self-contained: the glossary it was built from
     can change under us at any deploy. */
  function usablePuzzle(p) {
    return !!(p && p.w && p.h && p.letterAt && p.numbers &&
      p.words && p.words.length && p.words[0].cells && p.words[0].answer);
  }

  function startDaily() {
    var day = daysSinceEpoch();
    puzzleNum = day + 1;
    mode = 'daily';
    var saved = Arcade.recall(STORE_KEY, null);
    var resume = saved && saved.day === day ? saved : null;
    // Reuse the exact grid this device was already shown today. Regenerating
    // would rebuild the board from the current glossary, and a term added by a
    // deploy would rearrange the squares under a half-finished solve.
    var reused = resume && usablePuzzle(resume.puzzle);
    boot(reused ? resume.puzzle : generate(20260800 + day * 131), resume);
    labelEl.firstChild.textContent = 'Daily ';
    numEl.textContent = '#' + puzzleNum;
    // Freeze a newly generated grid right away, so it survives a deploy even
    // if the player has not typed anything yet.
    if (!reused && puzzle) persist(false);
  }

  function startPractice() {
    mode = 'practice';
    boot(generate(Math.floor(Math.random() * 1e9)), null);
    labelEl.firstChild.textContent = 'Practice ';
    numEl.textContent = '∞';
  }

  function boot(p, resume) {
    if (!p) { // never seen in practice; better than a blank board
      clueBarEl.textContent = 'Could not build a puzzle from the glossary. Try Random puzzle.';
      return;
    }
    puzzle = p;
    fill = (resume && resume.fill) || {};
    marks = {};
    if (resume && resume.revealed) marks = markAll('revealed');
    sel = null;
    seconds = (resume && resume.seconds) || 0;
    finished = !!(resume && resume.done);
    timerOn = false;
    doneEl.hidden = true;
    keyboardEl.hidden = false;
    buildBoard();
    buildClues();
    renderAll();
    if (finished) showDone(resume.revealed);
  }

  function markAll(kind) {
    var m = {};
    Object.keys(puzzle.letterAt).forEach(function (k) { m[k] = kind; });
    return m;
  }

  function persist(revealedAll) {
    if (mode !== 'daily' || !puzzle) return;
    Arcade.store(STORE_KEY, {
      day: daysSinceEpoch(), puzzle: puzzle, fill: fill, seconds: seconds,
      done: finished, revealed: !!revealedAll
    });
  }

  // ---- board / keyboard construction
  /* Size cells to fit BOTH axes. On a phone the board lives in a flex row that
     owns the leftover height between the HUD and the clue bar, so height is
     usually the binding constraint, not width. */
  function cellSize() {
    var wrap = boardEl.parentElement;
    var availW = Math.min(wrap.clientWidth, 480) - (puzzle.w - 1) * 2;
    var byW = Math.floor(availW / puzzle.w);
    var byH = 44;

    /* On a phone, work out the height left for the board by subtracting its
       siblings from the play screen, rather than reading the wrapper. The
       wrapper is a flex child that an oversized board inflates, so measuring
       it just feeds the board's own size back in and it never shrinks. */
    if (screenEl && window.innerWidth <= 768) {
      var used = 0;
      var kids = screenEl.children;
      for (var i = 0; i < kids.length; i++) {
        if (kids[i] === wrap || kids[i].hidden) continue;
        used += kids[i].getBoundingClientRect().height + 10;
      }
      var avail = screenEl.clientHeight - used - 4;
      byH = Math.floor((avail - (puzzle.h - 1) * 2) / puzzle.h);
    }
    return Math.max(14, Math.min(44, byW, byH));
  }

  function buildBoard() {
    boardEl.innerHTML = '';
    cellEls = {};
    var s = cellSize();
    lastCell = s;
    boardEl.style.gridTemplateColumns = 'repeat(' + puzzle.w + ', ' + s + 'px)';
    for (var y = 0; y < puzzle.h; y++) {
      for (var x = 0; x < puzzle.w; x++) {
        var key = x + ',' + y;
        var cell = document.createElement('div');
        cell.style.width = s + 'px';
        cell.style.height = s + 'px';
        cell.style.fontSize = Math.floor(s * 0.52) + 'px';
        if (!puzzle.letterAt[key]) {
          cell.className = 'cw-cell cw-cell--void';
        } else {
          cell.className = 'cw-cell is-word';
          if (puzzle.numbers[key]) {
            var num = document.createElement('span');
            num.className = 'cw-num';
            num.textContent = puzzle.numbers[key];
            cell.appendChild(num);
          }
          var letter = document.createElement('span');
          letter.className = 'cw-letter';
          cell.appendChild(letter);
          (function (cx, cy) {
            cell.addEventListener('pointerdown', function (e) {
              e.preventDefault();
              selectCell(cx, cy);
            });
          })(x, y);
          cellEls[key] = cell;
        }
        boardEl.appendChild(cell);
      }
    }
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = '';
    ['QWERTYUIOP', 'ASDFGHJKL', '*ZXCVBNM<'].forEach(function (rowStr) {
      var row = document.createElement('div');
      row.className = 'cw-krow';
      rowStr.split('').forEach(function (ch) {
        var key = document.createElement('button');
        key.type = 'button';
        key.className = 'cw-key' + (ch === '*' || ch === '<' ? ' cw-key--wide' : '');
        key.textContent = ch === '<' ? '⌫' : ch === '*' ? '⇆' : ch;
        key.addEventListener('pointerdown', function (e) {
          e.preventDefault();
          if (ch === '<') backspace();
          else if (ch === '*') toggleDir();
          else typeLetter(ch);
        });
        row.appendChild(key);
      });
      keyboardEl.appendChild(row);
    });
  }

  function buildClues() {
    acrossEl.innerHTML = '';
    downEl.innerHTML = '';
    clueEls = [];
    puzzle.words.forEach(function (word, wi) {
      var li = document.createElement('li');
      var strongNum = document.createElement('strong');
      strongNum.textContent = word.num + '. ';
      li.appendChild(strongNum);
      li.appendChild(document.createTextNode(word.clue + ' (' + word.enumeration + ')'));
      li.addEventListener('click', function () {
        sel = { x: word.cells[0].x, y: word.cells[0].y, dir: word.dir };
        startTimer();
        renderAll();
      });
      (word.dir === 'across' ? acrossEl : downEl).appendChild(li);
      clueEls[wi] = li;
    });
  }

  // ---- selection and input
  function wordAt(x, y, dir) {
    for (var i = 0; i < puzzle.words.length; i++) {
      var word = puzzle.words[i];
      if (word.dir !== dir) continue;
      for (var c = 0; c < word.cells.length; c++) {
        if (word.cells[c].x === x && word.cells[c].y === y) return word;
      }
    }
    return null;
  }

  function selectCell(x, y) {
    startTimer();
    if (sel && sel.x === x && sel.y === y) { toggleDir(); return; }
    var dir = sel ? sel.dir : 'across';
    if (!wordAt(x, y, dir)) dir = dir === 'across' ? 'down' : 'across';
    sel = { x: x, y: y, dir: dir };
    renderAll();
  }

  /* Clue bar arrows. Prefer the next clue you have not finished, so the arrows
     walk you through the work rather than parking on solved entries. */
  function gotoWord(step) {
    if (!puzzle || finished) return;
    var n = puzzle.words.length;
    var cur = sel ? wordAt(sel.x, sel.y, sel.dir) : null;
    var idx = cur ? puzzle.words.indexOf(cur) : (step > 0 ? -1 : 0);
    var pick = null;
    for (var i = 1; i <= n && !pick; i++) {
      var w = puzzle.words[((idx + step * i) % n + n) % n];
      if (!wordCorrect(w)) pick = w;
    }
    if (!pick) pick = puzzle.words[((idx + step) % n + n) % n];
    // Land on the entry's first EMPTY square. Its opening square is often
    // already filled by a crossing, and landing there means a keystroke that
    // was already in flight overwrites a letter you had right.
    var at = 0;
    for (var c = 0; c < pick.cells.length; c++) {
      if (!fill[pick.cells[c].x + ',' + pick.cells[c].y]) { at = c; break; }
    }
    sel = { x: pick.cells[at].x, y: pick.cells[at].y, dir: pick.dir };
    startTimer();
    renderAll();
  }

  function toggleDir() {
    if (!sel) return;
    var other = sel.dir === 'across' ? 'down' : 'across';
    if (wordAt(sel.x, sel.y, other)) sel.dir = other;
    renderAll();
  }

  function wordFull(word) {
    for (var i = 0; i < word.cells.length; i++) {
      if (!fill[word.cells[i].x + ',' + word.cells[i].y]) return false;
    }
    return true;
  }

  function typeLetter(ch) {
    if (!sel || finished) return;
    Arcade.trackPlay('crossword');
    var key = sel.x + ',' + sel.y;
    fill[key] = ch;
    delete marks[key];
    // Finished the entry? Move on to the next clue that still needs work,
    // rather than parking on the last square and overwriting it.
    var word = wordAt(sel.x, sel.y, sel.dir);
    if (word && wordFull(word)) gotoWord(1);
    else advance(1, true);
    afterInput();
  }

  function backspace() {
    if (!sel || finished) return;
    var key = sel.x + ',' + sel.y;
    if (fill[key]) {
      delete fill[key];
      delete marks[key];
    } else {
      advance(-1, false);
      delete fill[sel.x + ',' + sel.y];
      delete marks[sel.x + ',' + sel.y];
    }
    afterInput();
  }

  function advance(step, skipFilled) {
    var word = wordAt(sel.x, sel.y, sel.dir);
    if (!word) return;
    var idx = -1;
    for (var i = 0; i < word.cells.length; i++) {
      if (word.cells[i].x === sel.x && word.cells[i].y === sel.y) { idx = i; break; }
    }
    var j = idx + step;
    if (skipFilled) {
      while (j < word.cells.length && fill[word.cells[j].x + ',' + word.cells[j].y]) j++;
      // Nothing empty left ahead: fall back to a plain step so the cursor
      // always moves instead of sticking on the square you just typed.
      if (j >= word.cells.length) j = idx + step;
    }
    if (j >= 0 && j < word.cells.length) {
      sel = { x: word.cells[j].x, y: word.cells[j].y, dir: sel.dir };
    }
  }

  function afterInput() {
    persist(false);
    renderAll();
    checkComplete();
  }

  // ---- helpers
  function startTimer() {
    if (timerOn || finished) return;
    timerOn = true;
  }

  setInterval(function () {
    if (timerOn && !finished && !document.hidden) {
      seconds++;
      timeEl.textContent = fmtTime(seconds);
      if (mode === 'daily' && seconds % 5 === 0) persist(false);
    }
  }, 1000);

  function fmtTime(s) {
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }

  function wordCorrect(word) {
    for (var i = 0; i < word.cells.length; i++) {
      if (fill[word.cells[i].x + ',' + word.cells[i].y] !== word.answer[i]) return false;
    }
    return true;
  }

  function checkComplete() {
    var allFilled = Object.keys(puzzle.letterAt).every(function (k) { return fill[k]; });
    if (!allFilled) return;
    var allCorrect = Object.keys(puzzle.letterAt).every(function (k) { return fill[k] === puzzle.letterAt[k]; });
    if (allCorrect) {
      finished = true;
      persist(false);
      showDone(false);
      var revealedCount = 0;
      Object.keys(marks).forEach(function (k) { if (marks[k] === 'revealed') revealedCount++; });
      Arcade.trackDone('crossword', {
        mode: mode,               // daily | practice
        puzzle: puzzleNum,
        seconds: seconds,
        words: puzzle.words.length,
        revealed: revealedCount   // 0 means solved without help
      });
      Arcade.vibrate(60);
    } else {
      clueBarEl.textContent = 'Every square is filled, but something is off. The green entries are the ones you have right.';
    }
  }

  function showDone(revealedAll) {
    keyboardEl.hidden = true; // the keys have no job once the grid is done
    doneEl.hidden = false;
    doneTitleEl.textContent = revealedAll ? 'Revealed' : 'Solved!';
    doneMsgEl.textContent = revealedAll
      ? 'The full sheet is on the board. A new one drops at midnight.'
      : (mode === 'daily' ? 'Daily #' + puzzleNum : 'Practice puzzle') + ' in ' + fmtTime(seconds) + '.';
    document.getElementById('cw-share').hidden = revealedAll || mode !== 'daily';
  }

  // ---- render
  function renderAll() {
    var activeWord = sel ? wordAt(sel.x, sel.y, sel.dir) : null;

    // any cell in a fully correct word shades green
    var solvedCells = {}, doneCount = 0, solvedWords = [];
    puzzle.words.forEach(function (word) {
      var ok = wordCorrect(word);
      solvedWords.push(ok);
      if (!ok) return;
      doneCount++;
      word.cells.forEach(function (cell) { solvedCells[cell.x + ',' + cell.y] = true; });
    });

    Object.keys(cellEls).forEach(function (key) {
      var cell = cellEls[key];
      cell.querySelector('.cw-letter').textContent = fill[key] || '';
      cell.classList.toggle('is-revealed', marks[key] === 'revealed');
      cell.classList.toggle('is-solved', !!solvedCells[key]);
      cell.classList.toggle('is-selected', !!(sel && key === sel.x + ',' + sel.y));
      var inWord = false;
      if (activeWord) {
        for (var i = 0; i < activeWord.cells.length; i++) {
          if (activeWord.cells[i].x + ',' + activeWord.cells[i].y === key) { inWord = true; break; }
        }
      }
      cell.classList.toggle('is-active-word', inWord);
    });

    puzzle.words.forEach(function (word, wi) {
      clueEls[wi].classList.toggle('is-done', solvedWords[wi]);
      clueEls[wi].classList.toggle('is-active', word === activeWord);
    });
    progressEl.textContent = doneCount + '/' + puzzle.words.length;
    timeEl.textContent = fmtTime(seconds);

    if (activeWord) {
      clueBarEl.textContent = activeWord.num + ' ' + (activeWord.dir === 'across' ? '→' : '↓') +
        '  ' + activeWord.clue + ' (' + activeWord.enumeration + ')';
    } else if (!finished) {
      clueBarEl.textContent = 'Tap a square to start.';
    }
  }

  // ---- buttons
  document.getElementById('cw-reveal-cell').addEventListener('click', function () {
    if (!sel || finished) return;
    var key = sel.x + ',' + sel.y;
    fill[key] = puzzle.letterAt[key];
    marks[key] = 'revealed';
    advance(1, false); // plain step: never teleport across the grid
    afterInput();
  });

  document.getElementById('cw-reveal-all').addEventListener('click', function () {
    if (finished) return;
    fill = {};
    Object.keys(puzzle.letterAt).forEach(function (k) { fill[k] = puzzle.letterAt[k]; });
    marks = markAll('revealed');
    finished = true;
    persist(true);
    renderAll();
    showDone(true);
  });

  document.getElementById('cw-share').addEventListener('click', function () {
    var text = 'Rink Crossword #' + puzzleNum + ': ' + fmtTime(seconds) + ' 🏒';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (err) { /* ignore */ }
      document.body.removeChild(ta);
    }
    this.textContent = 'Copied!';
  });

  document.getElementById('cw-practice').addEventListener('click', startPractice);
  document.getElementById('cw-prev').addEventListener('click', function () { gotoWord(-1); });
  document.getElementById('cw-next').addEventListener('click', function () { gotoWord(1); });

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); typeLetter(e.key.toUpperCase()); }
    else if (e.key === 'Backspace') { e.preventDefault(); backspace(); }
    else if (e.key === ' ') { e.preventDefault(); toggleDir(); }
    else if (e.key === 'Tab') { e.preventDefault(); gotoWord(e.shiftKey ? -1 : 1); }
  });

  /* Rebuild only when the fitted cell size actually changes, so rotation, the
     dvh shuffle when mobile browser chrome hides, and a clue bar growing a
     line all reflow the board without looping. */
  /* Size the play screen from the real distance to the bottom of the viewport
     rather than a dvh calc with a magic offset: dvh does not always match the
     actual viewport, and the offset had to be re-guessed every time anything
     above the board changed height. */
  var screenEl = document.querySelector('.cw-screen');
  function fitScreen() {
    if (!screenEl) return;
    if (window.innerWidth > 768) { screenEl.style.height = ''; return; }
    var top = screenEl.getBoundingClientRect().top + (window.scrollY || 0);
    screenEl.style.height = Math.max(300, window.innerHeight - top - 6) + 'px';
  }

  function refitBoard() {
    fitScreen();
    if (!puzzle) return;
    var s = cellSize();
    if (s === lastCell) return;
    lastCell = s;
    buildBoard();
    renderAll();
  }

  window.addEventListener('resize', refitBoard);
  window.addEventListener('orientationchange', function () { setTimeout(refitBoard, 250); });
  if (window.ResizeObserver) {
    new ResizeObserver(refitBoard).observe(boardEl.parentElement);
  }

  // ---- go
  buildKeyboard();
  startDaily();
})();
