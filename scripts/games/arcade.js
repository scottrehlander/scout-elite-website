/* ============================================================
   Scout Elite Arcade — shared helpers for the /games/ prototypes.
   Load before each game's own script. Exposes window.Arcade:

   Arcade.colors            theme colors read from CSS custom props
   Arcade.setupCanvas(c, w, h [, maxCss])
                            DPR-aware canvas that fills its container
                            width while keeping a fixed logical
                            coordinate system (w x h). Returns ctx.
   Arcade.loop(fn)          rAF loop, fn(dtSeconds); dt capped at 50ms.
                            Returns { stop() }.
   Arcade.onTap(el, fn)     unified touch/mouse press. fn(evt, pt)
                            where pt = { nx, ny } normalized 0..1
                            within el. Prevents scroll on el.
   Arcade.onKey(keys, fn)   keydown helper for desktop extras.
   Arcade.best(key)         numeric best score from localStorage.
   Arcade.saveBest(key, s)  stores if s > current best; returns true
                            when a new best was set.
   Arcade.store / recall    tiny JSON localStorage helpers.
   Arcade.seededRand(seed)  deterministic PRNG (mulberry32), 0..1.
   Arcade.dayKey()          integer like 20260812 (local date), for
                            daily-seeded games.
   Arcade.vibrate(ms)       haptic tick on phones, no-op elsewhere.

   Analytics (GA4). gtag only loads on production builds, so all three of
   these are no-ops locally and must never throw:
   Arcade.trackPlay(game)   fires `arcade_play` the FIRST time a visitor
                            actually does something in a game, so a real
                            play is distinguishable from a page view.
                            Call it from the first meaningful input, not
                            from page load or a Start button.
   Arcade.trackDone(game, params)
                            fires `arcade_complete` when a run/level/puzzle
                            is genuinely finished.
   Arcade.track(name, params)
                            any other event.
   ============================================================ */

window.Arcade = (function () {
  'use strict';

  var rootStyle = getComputedStyle(document.documentElement);
  function cssVar(name, fallback) {
    var v = rootStyle.getPropertyValue(name).trim();
    return v || fallback;
  }

  var colors = {
    bg: cssVar('--card-bg', '#2a2a2a'),
    bgDeep: cssVar('--primary-bg', '#0a0a0a'),
    surface: cssVar('--secondary-bg', '#1a1a1a'),
    line: cssVar('--border-color', '#333333'),
    text: cssVar('--text-primary', '#ffffff'),
    dim: cssVar('--text-secondary', '#b3b3b3'),
    muted: cssVar('--text-muted', '#6b8aaa'),
    accent: cssVar('--accent-primary', '#007acc'),
    accentHover: cssVar('--accent-hover', '#0099ff'),
    success: cssVar('--success', '#28a745'),
    warning: cssVar('--warning', '#ffc107'),
    danger: cssVar('--danger', '#dc3545')
  };

  function setupCanvas(canvas, logicalW, logicalH, maxCssWidth) {
    var ctx = canvas.getContext('2d');
    function fit() {
      var parentW = canvas.parentElement.clientWidth || logicalW;
      var cssW = Math.min(parentW, maxCssWidth || 640);
      var cssH = cssW * (logicalH / logicalW);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(canvas.width / logicalW, 0, 0, canvas.height / logicalH, 0, 0);
    }
    fit();
    window.addEventListener('resize', fit);
    return ctx;
  }

  function loop(fn) {
    var last = performance.now();
    var running = true;
    var raf;
    function frame(now) {
      if (!running) return;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      fn(dt);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    document.addEventListener('visibilitychange', function () {
      last = performance.now();
    });
    return {
      stop: function () {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
  }

  function onTap(el, fn) {
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      var r = el.getBoundingClientRect();
      fn(e, {
        nx: (e.clientX - r.left) / r.width,
        ny: (e.clientY - r.top) / r.height
      });
    });
  }

  function onKey(keys, fn) {
    document.addEventListener('keydown', function (e) {
      if (keys.indexOf(e.key) !== -1) {
        e.preventDefault();
        fn(e.key);
      }
    });
  }

  var PREFIX = 'se-arcade-';

  function best(key) {
    return Number(localStorage.getItem(PREFIX + key) || 0);
  }

  function saveBest(key, score) {
    if (score > best(key)) {
      try { localStorage.setItem(PREFIX + key, String(score)); } catch (err) { /* private mode */ }
      return true;
    }
    return false;
  }

  function store(key, obj) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(obj)); } catch (err) { /* private mode */ }
  }

  function recall(key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function seededRand(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function dayKey() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  function vibrate(ms) {
    if (navigator.vibrate) navigator.vibrate(ms);
  }

  /* ---- analytics ---- */
  var playedThisLoad = {};

  function track(name, params) {
    if (typeof window.gtag !== 'function') return; // no analytics off production
    try {
      window.gtag('event', name, params || {});
    } catch (err) {
      /* analytics must never break the game */
    }
  }

  function trackPlay(game, params) {
    if (playedThisLoad[game]) return; // once per page load
    playedThisLoad[game] = true;
    var p = params || {};
    p.game = game;
    track('arcade_play', p);
  }

  function trackDone(game, params) {
    var p = params || {};
    p.game = game;
    track('arcade_complete', p);
  }

  return {
    colors: colors,
    setupCanvas: setupCanvas,
    loop: loop,
    onTap: onTap,
    onKey: onKey,
    best: best,
    saveBest: saveBest,
    store: store,
    recall: recall,
    seededRand: seededRand,
    dayKey: dayKey,
    vibrate: vibrate,
    track: track,
    trackPlay: trackPlay,
    trackDone: trackDone
  };
})();
