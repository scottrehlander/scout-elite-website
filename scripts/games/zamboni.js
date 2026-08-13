/* Zamboni — ice-slide resurfacing puzzle for the hidden Scout Elite Arcade.
   Pick a direction, the Zamboni glides until it hits something, and every
   tile it crosses comes up clean. Clear the sheet in as few passes as you can.

   Level chars: '#' boards/obstacle, '.' scuffed ice, ' ' or 'o' clean ice,
   'Z' start (on clean ice). Every level below was machine-verified solvable
   (full BFS over position + cleaned-set) before shipping; par is the optimal
   move count from that solve. A lighter coverage check also runs at load. */
(function () {
  'use strict';

  var C = Arcade.colors;
  var COLS = 9, ROWS = 11, T = 40;
  var W = COLS * T, H = ROWS * T;          // 360 x 440
  var SPEED = 14 * T;                      // slide speed, px/s (~14 tiles/s)
  var STORE_KEY = 'zamboni';

  var canvas = document.getElementById('game');
  var ctx = Arcade.setupCanvas(canvas, W, H, 480);

  // 25 levels, difficulty by verified optimal par (4 up to 21). Every level
  // and par below is machine-verified by 'Reference Material/zamboni-solver.js'
  // (exact BFS over position + remaining-scuff state). Run it after ANY level
  // edit: node 'Reference Material/zamboni-solver.js'
  var LEVELS = [
    { par: 4, map: [
      '#########',
      '#Z......#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.......#',
      '#########'
    ] },
    { par: 5, map: [
      '#########',
      '##......#',
      '#   #  .#',
      '#   ....#',
      '#   Z  .#',
      '#      .#',
      '#     #.#',
      '#      ##',
      '##    # #',
      '#       #',
      '#########'
    ] },
    { par: 5, map: [
      '#########',
      '#...Z...#',
      '#.     .#',
      '#.     ##',
      '#.  # # #',
      '#.      #',
      '#.   #  #',
      '#.      #',
      '#.      #',
      '#.#    ##',
      '#########'
    ] },
    { par: 6, map: [
      '#########',
      '#Z......#',
      '#.      #',
      '#.      #',
      '#.      #',
      '#.......#',
      '#.     ##',
      '#.      #',
      '#.      #',
      '#.......#',
      '#########'
    ] },
    { par: 7, map: [
      '#########',
      '#Z     .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.......#',
      '#.     ##',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#########'
    ] },
    { par: 7, map: [
      '#########',
      '#Z      #',
      '#.......#',
      '#      ##',
      '#       #',
      '#.......#',
      '##      #',
      '#       #',
      '#.......#',
      '#      ##',
      '#########'
    ] },
    { par: 7, map: [
      '#########',
      '# #   ###',
      '#      ##',
      '#      ##',
      '#      ##',
      '#   #...#',
      '##     .#',
      '#.......#',
      '#.     .#',
      '#....Z..#',
      '#########'
    ] },
    { par: 8, map: [
      '#########',
      '#...#...#',
      '#.##   .#',
      '#.#    .#',
      '#.     .#',
      '#..Z#  .#',
      '#.     .#',
      '#.     .#',
      '#.     .#',
      '#.......#',
      '#########'
    ] },
    { par: 8, map: [
      '#########',
      '#.  #   #',
      '#.  .   #',
      '#.  Z## #',
      '#.  .####',
      '#.......#',
      '#.  .  .#',
      '#.  .# .#',
      '#.  .  .#',
      '#.......#',
      '#########'
    ] },
    { par: 8, map: [
      '#########',
      '#.......#',
      '#.     .#',
      '#.     .#',
      '#.    #.#',
      '#.....#.#',
      '##   ##.#',
      '#Z...# .#',
      '#   .# .#',
      '#.......#',
      '#########'
    ] },
    { par: 9, map: [
      '#########',
      '#.......#',
      '#.  .  .#',
      '#.  . ###',
      '#...... #',
      '#.  .#Z##',
      '#.  .   #',
      '#.  .   #',
      '#.  .   #',
      '#....#  #',
      '#########'
    ] },
    { par: 10, map: [
      '#########',
      '##.....##',
      '#  .  . #',
      '## .# .##',
      '#...# .##',
      '#.    ..#',
      '#.  Z...#',
      '#.    ..#',
      '#. #  ..#',
      '#.......#',
      '#########'
    ] },
    { par: 11, map: [
      '#########',
      '#..Z....#',
      '#...#. .#',
      '#... .#.#',
      '#... . .#',
      '#... . .#',
      '#.......#',
      '#..# . .#',
      '#.....#.#',
      '##......#',
      '#########'
    ] },
    { par: 11, map: [
      '#########',
      '#.......#',
      '#.#Z....#',
      '#.    ..#',
      '#.  ##..#',
      '#.   # ##',
      '#.  #  .#',
      '#.  ....#',
      '#.  .   #',
      '#....#  #',
      '#########'
    ] },
    { par: 11, map: [
      '#########',
      '## . .  #',
      '# . # . #',
      '# ... . #',
      '#...    #',
      '#   .#. #',
      '#  ..#.##',
      '#..## .##',
      '# ... ..#',
      '# .  .Z #',
      '#########'
    ] },
    { par: 12, map: [
      '#########',
      '#.......#',
      '#..    .#',
      '#.......#',
      '#..    ##',
      '##.     #',
      '##.     #',
      '#.......#',
      '#.Z.....#',
      '##......#',
      '#########'
    ] },
    { par: 12, map: [
      '#########',
      '## .  # #',
      '## . .  #',
      '#   . ..#',
      '#..#Z...#',
      '# .# ...#',
      '#  #. ..#',
      '#    .. #',
      '#..  .. #',
      '#. .   ##',
      '#########'
    ] },
    { par: 13, map: [
      '#########',
      '#..#..#.#',
      '#.. .. .#',
      '#.. .. .#',
      '#.. .. .#',
      '#.. ..#.#',
      '#.......#',
      '#....####',
      '##......#',
      '#Z......#',
      '#########'
    ] },
    { par: 13, map: [
      '#########',
      '##.  .#.#',
      '#  .   .#',
      '#  .#   #',
      '#.  #...#',
      '#... ...#',
      '#    ...#',
      '#.  #  .#',
      '#. Z.. .#',
      '# .  #. #',
      '#########'
    ] },
    { par: 15, map: [
      '#########',
      '#  #. ..#',
      '#...    #',
      '#   .. .#',
      '#. .  ..#',
      '#   ... #',
      '#...  Z.#',
      '#.... ..#',
      '#. .# ..#',
      '#.  #. .#',
      '#########'
    ] },
    { par: 16, map: [
      '#########',
      '#.....###',
      '#.......#',
      '#.......#',
      '#.#. #..#',
      '#. Z  ###',
      '#.    . #',
      '#.    . #',
      '#......##',
      '##    ..#',
      '#########'
    ] },
    { par: 16, map: [
      '#########',
      '##.....##',
      '#..#....#',
      '#.....Z.#',
      '#.......#',
      '#.......#',
      '#.......#',
      '#.......#',
      '#.......#',
      '#...#...#',
      '#########'
    ] },
    { par: 16, map: [
      '#########',
      '#.. . .##',
      '#.. .   #',
      '#   #   #',
      '## #.  .#',
      '#. .Z .##',
      '#  . ..##',
      '###  .  #',
      '#... .  #',
      '#.  ..  #',
      '#########'
    ] },
    { par: 18, map: [
      '#########',
      '#. ##.. #',
      '#. .Z.  #',
      '# ....#.#',
      '### .  .#',
      '#.. ...##',
      '#.#..   #',
      '# #..  .#',
      '#.#. ...#',
      '# . .. .#',
      '#########'
    ] },
    { par: 21, map: [
      '#########',
      '# .  #..#',
      '#.. .. .#',
      '#  .#. .#',
      '#....  .#',
      '# .   .##',
      '### #.  #',
      '# Z.# #.#',
      '#. ... .#',
      '#.#.. ..#',
      '#########'
    ] }
  ];

  // ---- DOM
  var levelEl = document.getElementById('level');
  var movesEl = document.getElementById('moves');
  var parEl = document.getElementById('par');
  var overlay = document.getElementById('overlay');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayMsg = document.getElementById('overlay-msg');
  var overlayBtn = document.getElementById('overlay-btn');
  var overlayBtn2 = document.getElementById('overlay-btn2');
  var resetBtn = document.getElementById('reset');

  // level select buttons are built from LEVELS so the count stays in sync
  var levelSelectEl = document.getElementById('level-select');
  for (var lb = 0; lb < LEVELS.length; lb++) {
    var lbtn = document.createElement('button');
    lbtn.type = 'button';
    lbtn.className = 'game-btn game-btn--ghost zam-level-btn';
    lbtn.setAttribute('data-level', String(lb));
    lbtn.appendChild(document.createTextNode(String(lb + 1)));
    var lstars = document.createElement('span');
    lstars.className = 'zam-stars';
    lstars.setAttribute('aria-hidden', 'true');
    lbtn.appendChild(lstars);
    levelSelectEl.appendChild(lbtn);
  }
  var levelBtns = document.querySelectorAll('.zam-level-btn');

  // ---- persistent progress: { unlocked: n, levels: { "0": { best, stars } } }
  var save = Arcade.recall(STORE_KEY, null) || {};
  if (typeof save.unlocked !== 'number' || save.unlocked < 1) save.unlocked = 1;
  if (save.unlocked > LEVELS.length) save.unlocked = LEVELS.length;
  if (!save.levels) save.levels = {};

  // ---- game state
  var levelIndex = 0;
  var grid = [];          // per cell: 2 wall, 1 clean, 0 scuffed
  var scratches = {};     // "x,y" -> scratch strokes for scuffed tiles
  var flashes = [];       // { x, y, t } sparkle when a tile comes clean
  var zx = 1, zy = 1;     // Zamboni grid position (when not sliding)
  var facing = { x: 1, y: 0 };
  var moves = 0, dirtyLeft = 0;
  var phase = 'idle';     // idle | play | sliding | done
  var slideAnim = null;   // { sx, sy, dx, dy, cells, dist, total, cleaned }
  var shakeT = 0;
  var onPrimary = null, onSecondary = null;

  function isWall(x, y) {
    return x < 0 || x >= COLS || y < 0 || y >= ROWS || grid[y][x] === 2;
  }

  function parseLevel(i) {
    var map = LEVELS[i].map;
    var rand = Arcade.seededRand(9127 + i * 373);
    grid = [];
    scratches = {};
    flashes = [];
    dirtyLeft = 0;
    for (var y = 0; y < ROWS; y++) {
      var row = [];
      for (var x = 0; x < COLS; x++) {
        var ch = map[y].charAt(x) || ' ';
        if (ch === '#') {
          row.push(2);
        } else if (ch === '.') {
          row.push(0);
          dirtyLeft++;
          var strokes = [];
          for (var s = 0; s < 5; s++) {
            var ax = 5 + rand() * (T - 14), ay = 5 + rand() * (T - 14);
            strokes.push([ax, ay, ax + 4 + rand() * (T - 16), ay + (rand() - 0.5) * 12]);
          }
          scratches[x + ',' + y] = strokes;
        } else {
          row.push(1); // ' ', 'o', 'Z' are clean ice
          if (ch === 'Z') { zx = x; zy = y; }
        }
      }
      grid.push(row);
    }
  }

  function updateHud() {
    levelEl.textContent = String(levelIndex + 1);
    movesEl.textContent = String(moves);
    parEl.textContent = String(LEVELS[levelIndex].par);
  }

  function starsFor(m, par) {
    if (m <= par) return 3;
    if (m <= par + 2) return 2;
    return 1;
  }

  function starText(n) {
    var s = '';
    for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆';
    return s;
  }

  function renderLevelButtons() {
    for (var i = 0; i < levelBtns.length; i++) {
      var btn = levelBtns[i];
      var idx = Number(btn.getAttribute('data-level'));
      var locked = idx >= save.unlocked;
      btn.disabled = locked;
      btn.classList.toggle('is-current', idx === levelIndex);
      var rec = save.levels[String(idx)];
      var starEl = btn.querySelector('.zam-stars');
      if (starEl) starEl.textContent = rec ? starText(rec.stars) : '';
      btn.title = locked ? 'Finish the level before it to unlock'
        : rec ? 'Best ' + rec.best + ' moves' : 'Level ' + (idx + 1);
    }
  }

  function loadLevel(i) {
    levelIndex = i;
    parseLevel(i);
    moves = 0;
    slideAnim = null;
    shakeT = 0;
    facing = { x: 1, y: 0 };
    phase = 'play';
    overlay.hidden = true;
    updateHud();
    renderLevelButtons();
  }

  function slideCells(x, y, dx, dy) {
    var cells = [];
    while (!isWall(x + dx, y + dy)) {
      x += dx; y += dy;
      cells.push({ x: x, y: y });
    }
    return cells;
  }

  function tryMove(dx, dy) {
    if (phase !== 'play') return;
    Arcade.trackPlay('zamboni');
    facing = { x: dx, y: dy };
    var cells = slideCells(zx, zy, dx, dy);
    if (!cells.length) { shakeT = 0.12; Arcade.vibrate(8); return; }
    moves++;
    updateHud();
    phase = 'sliding';
    slideAnim = {
      sx: zx, sy: zy, dx: dx, dy: dy,
      cells: cells, dist: 0, total: cells.length * T, cleaned: 0
    };
  }

  function cleanCell(x, y) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
      dirtyLeft--;
      flashes.push({ x: x, y: y, t: 0 });
    }
  }

  function complete() {
    phase = 'done';
    var par = LEVELS[levelIndex].par;
    var stars = starsFor(moves, par);
    var key = String(levelIndex);
    var rec = save.levels[key];
    if (!rec) rec = save.levels[key] = { best: moves, stars: stars };
    if (moves < rec.best) rec.best = moves;
    if (stars > rec.stars) rec.stars = stars;
    Arcade.trackDone('zamboni', { level: levelIndex + 1, moves: moves, par: par, stars: stars });
    var isLast = levelIndex === LEVELS.length - 1;
    if (!isLast && save.unlocked < levelIndex + 2) save.unlocked = levelIndex + 2;
    Arcade.store(STORE_KEY, save);

    overlayTitle.textContent = 'Fresh sheet.';
    overlayMsg.textContent = starText(stars) + '  ' + moves + ' moves, par ' + par + '.' +
      (isLast ? ' That was the last sheet. Chase three stars on the rest.' : '');
    overlayBtn.textContent = isLast ? 'Back to level 1' : 'Next level';
    onPrimary = isLast
      ? function () { loadLevel(0); }
      : function () { loadLevel(levelIndex + 1); };
    overlayBtn2.hidden = false;
    overlayBtn2.textContent = 'Run it back';
    onSecondary = function () { loadLevel(levelIndex); };
    overlay.hidden = false;
    renderLevelButtons();
    Arcade.vibrate(40);
  }

  function finishSlide() {
    var a = slideAnim;
    for (var i = a.cleaned; i < a.cells.length; i++) cleanCell(a.cells[i].x, a.cells[i].y);
    var last = a.cells[a.cells.length - 1];
    zx = last.x; zy = last.y;
    slideAnim = null;
    shakeT = 0.16;
    Arcade.vibrate(12);
    if (dirtyLeft === 0) complete();
    else phase = 'play';
  }

  // ---- level sanity pass at load: from the start, BFS every position a
  // slide can reach and union the tiles those slides cross. Any scuffed tile
  // outside that union can never be cleaned (necessary condition; full
  // solvability was verified offline with a BFS over position + cleaned-set).
  function verifyLevel(map, num) {
    var sx = -1, sy = -1, x, y;
    for (y = 0; y < ROWS; y++) {
      for (x = 0; x < COLS; x++) {
        if (map[y].charAt(x) === 'Z') { sx = x; sy = y; }
      }
    }
    function wallAt(px, py) {
      if (px < 0 || px >= COLS || py < 0 || py >= ROWS) return true;
      return map[py].charAt(px) === '#';
    }
    var dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    var seen = {}, swept = {}, stack = [[sx, sy]];
    seen[sx + ',' + sy] = true;
    while (stack.length) {
      var p = stack.pop();
      for (var d = 0; d < 4; d++) {
        var cx = p[0], cy = p[1], moved = false;
        while (!wallAt(cx + dirs[d][0], cy + dirs[d][1])) {
          cx += dirs[d][0]; cy += dirs[d][1];
          swept[cx + ',' + cy] = true;
          moved = true;
        }
        if (moved && !seen[cx + ',' + cy]) {
          seen[cx + ',' + cy] = true;
          stack.push([cx, cy]);
        }
      }
    }
    var gaps = [];
    for (y = 0; y < ROWS; y++) {
      for (x = 0; x < COLS; x++) {
        if (map[y].charAt(x) === '.' && !swept[x + ',' + y]) gaps.push(x + ',' + y);
      }
    }
    if (sx < 0) console.warn('Zamboni: level ' + num + ' has no Z start tile.');
    if (gaps.length) {
      console.warn('Zamboni: level ' + num + ' has scuffed ice no slide can reach: ' + gaps.join(' '));
    }
  }
  for (var vi = 0; vi < LEVELS.length; vi++) verifyLevel(LEVELS[vi].map, vi + 1);

  // ---- input
  canvas.style.touchAction = 'none';
  var swipe = null;
  canvas.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    if (canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* no-op */ }
    }
    swipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
  });
  canvas.addEventListener('pointerup', function (e) {
    if (!swipe || e.pointerId !== swipe.id) return;
    var dx = e.clientX - swipe.x;
    var dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) >= Math.abs(dy)) tryMove(dx > 0 ? 1 : -1, 0);
    else tryMove(0, dy > 0 ? 1 : -1);
  });
  canvas.addEventListener('pointercancel', function () { swipe = null; });

  Arcade.onKey(['ArrowUp'], function () { tryMove(0, -1); });
  Arcade.onKey(['ArrowDown'], function () { tryMove(0, 1); });
  Arcade.onKey(['ArrowLeft'], function () { tryMove(-1, 0); });
  Arcade.onKey(['ArrowRight'], function () { tryMove(1, 0); });

  function bindDir(id, dx, dy) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', function () { tryMove(dx, dy); });
  }
  bindDir('btn-up', 0, -1);
  bindDir('btn-down', 0, 1);
  bindDir('btn-left', -1, 0);
  bindDir('btn-right', 1, 0);

  resetBtn.addEventListener('click', function () { loadLevel(levelIndex); });
  overlayBtn.addEventListener('click', function () { if (onPrimary) onPrimary(); });
  overlayBtn2.addEventListener('click', function () { if (onSecondary) onSecondary(); });
  for (var bi = 0; bi < levelBtns.length; bi++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        var idx = Number(btn.getAttribute('data-level'));
        if (idx < save.unlocked) loadLevel(idx);
      });
    })(levelBtns[bi]);
  }

  // ---- boot: show the freshest unlocked level behind the start overlay
  var bootLevel = save.unlocked - 1;
  levelIndex = bootLevel;
  parseLevel(bootLevel);
  moves = 0;
  updateHud();
  renderLevelButtons();
  onPrimary = function () { loadLevel(bootLevel); };
  overlayBtn2.hidden = true;
  overlay.hidden = false;

  // ---- update
  function update(dt) {
    if (slideAnim) {
      var a = slideAnim;
      a.dist += SPEED * dt;
      if (a.dist >= a.total) {
        finishSlide();
      } else {
        // a tile counts as resurfaced once the machine is halfway onto it
        while (a.cleaned < a.cells.length && a.dist >= (a.cleaned + 0.5) * T) {
          cleanCell(a.cells[a.cleaned].x, a.cells[a.cleaned].y);
          a.cleaned++;
        }
      }
    }
    if (shakeT > 0) shakeT = Math.max(0, shakeT - dt);
    for (var i = flashes.length - 1; i >= 0; i--) {
      flashes[i].t += dt;
      if (flashes[i].t > 0.4) flashes.splice(i, 1);
    }
  }

  // ---- drawing
  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBoard(x, y) {
    var px = x * T, py = y * T;
    // dasher-board white so blockers can never be missed on the dark ice
    ctx.fillStyle = '#dde5ec';
    ctx.fillRect(px, py, T, T);
    // bevel: light top-left, shaded bottom-right, so it reads as raised
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(px, py, T, 2);
    ctx.fillRect(px, py, 2, T);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fillRect(px, py + T - 2, T, 2);
    ctx.fillRect(px + T - 2, py, 2, T);
    // red kickplate along every edge that faces the ice
    ctx.fillStyle = C.danger;
    if (!isWall(x, y - 1)) ctx.fillRect(px, py, T, 5);
    if (!isWall(x, y + 1)) ctx.fillRect(px, py + T - 5, T, 5);
    if (!isWall(x - 1, y)) ctx.fillRect(px, py, 5, T);
    if (!isWall(x + 1, y)) ctx.fillRect(px + T - 5, py, 5, T);
  }

  function drawTiles() {
    for (var y = 0; y < ROWS; y++) {
      for (var x = 0; x < COLS; x++) {
        var px = x * T, py = y * T;
        var v = grid[y][x];
        if (v === 2) continue; // boards painted last, on top of the grid
        if (v === 0) {
          // scuffed ice
          ctx.fillStyle = C.bgDeep;
          ctx.fillRect(px, py, T, T);
          var strokes = scratches[x + ',' + y];
          if (strokes) {
            ctx.strokeStyle = C.dim;
            ctx.globalAlpha = 0.42;
            ctx.lineWidth = 1;
            for (var s = 0; s < strokes.length; s++) {
              ctx.beginPath();
              ctx.moveTo(px + strokes[s][0], py + strokes[s][1]);
              ctx.lineTo(px + strokes[s][2], py + strokes[s][3]);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
          }
        } else {
          // clean ice: brighter, with a cool gloss and a diagonal sheen
          ctx.fillStyle = C.surface;
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = 'rgba(255,255,255,0.12)';
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = 'rgba(140,200,255,0.07)';
          ctx.fillRect(px, py, T, T);
          ctx.strokeStyle = 'rgba(255,255,255,0.07)';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(px + 7, py + T - 7);
          ctx.lineTo(px + T - 7, py + 7);
          ctx.stroke();
        }
      }
    }
    // faint tile grid over the ice (boards go on top of it)
    ctx.strokeStyle = C.line;
    ctx.globalAlpha = 0.25;
    ctx.lineWidth = 1;
    for (var gx = 1; gx < COLS; gx++) {
      ctx.beginPath(); ctx.moveTo(gx * T, 0); ctx.lineTo(gx * T, H); ctx.stroke();
    }
    for (var gy = 1; gy < ROWS; gy++) {
      ctx.beginPath(); ctx.moveTo(0, gy * T); ctx.lineTo(W, gy * T); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // boards last so nothing draws over them
    for (var by = 0; by < ROWS; by++) {
      for (var bx = 0; bx < COLS; bx++) {
        if (grid[by][bx] === 2) drawBoard(bx, by);
      }
    }
  }

  function drawFlashes() {
    for (var i = 0; i < flashes.length; i++) {
      var f = flashes[i];
      ctx.fillStyle = 'rgba(255,255,255,' + (0.22 * (1 - f.t / 0.4)).toFixed(3) + ')';
      ctx.fillRect(f.x * T, f.y * T, T, T);
    }
  }

  function drawZamboni() {
    var cx, cy;
    if (slideAnim) {
      var a = slideAnim;
      cx = (a.sx + 0.5) * T + a.dx * a.dist;
      cy = (a.sy + 0.5) * T + a.dy * a.dist;
    } else {
      cx = (zx + 0.5) * T;
      cy = (zy + 0.5) * T;
    }
    if (shakeT > 0) {
      var k = Math.sin(shakeT * 55) * 2 * (shakeT / 0.16);
      cx += facing.x * k;
      cy += facing.y * k;
    }
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.atan2(facing.y, facing.x));

    // wet strip behind the machine while it slides
    if (slideAnim) {
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(-T, -T * 0.38, T * 0.6, T * 0.76);
    }

    // body
    roundedRect(-15, -11, 30, 22, 6);
    ctx.fillStyle = C.accent;
    ctx.fill();
    ctx.strokeStyle = C.bgDeep;
    ctx.lineWidth = 2;
    ctx.stroke();

    // rear tank
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    roundedRect(-13, -8, 12, 16, 3);
    ctx.fill();

    // cab up front
    ctx.fillStyle = C.accentHover;
    roundedRect(1, -8, 12, 16, 3);
    ctx.fill();

    // driver
    ctx.fillStyle = C.text;
    ctx.beginPath();
    ctx.arc(6, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawTiles();
    drawFlashes();
    drawZamboni();
  }

  Arcade.loop(function (dt) {
    update(dt);
    draw();
  });
})();
