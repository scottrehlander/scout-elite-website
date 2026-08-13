/* Arcade card thumbnails — captures a real, mid-play frame of every game and
   writes it to img/arcade/<slug>.jpg.

   Screenshots go stale the moment a game is retuned, so this is a script
   rather than a pile of hand-captured PNGs: after any visual change, re-run it
   and commit the result.

   Requires a local preview at http://localhost:4000 (see "Running locally" in
   agents.md) and playwright-core, which is NOT a repo dependency. From a
   scratch directory:

     npm i playwright-core
     NODE_PATH="$PWD/node_modules" node '<repo>/Reference Material/capture-arcade-thumbs.js'

   Optional args:  --base=http://localhost:4000   --only=breakaway,zamboni
*/
'use strict';

var fs = require('fs');
var path = require('path');

var chromium;
try {
  chromium = require('playwright-core').chromium;
} catch (err) {
  console.error('playwright-core not found. Install it in a scratch dir and set NODE_PATH:\n' +
    '  npm i playwright-core\n' +
    '  NODE_PATH="$PWD/node_modules" node "' + __filename + '"');
  process.exit(1);
}

var arg = function (name, fallback) {
  var hit = process.argv.find(function (a) { return a.indexOf('--' + name + '=') === 0; });
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};

var BASE = arg('base', 'http://localhost:4000');
var ONLY = arg('only', '').split(',').filter(Boolean);
var OUT_DIR = path.join(__dirname, '..', 'img', 'arcade');
var RATIO = 8 / 5;          // card image band
var SCALE = 1.5;            // 480 CSS px wide canvas -> 720 px output
var QUALITY = 82;

/* fit 'cover'   = fill the band with the widest slice (action games read well
                   zoomed in on the play)
   fit 'contain' = fit the whole board in and let dark page background pad the
                   sides (puzzles need to be legible as a grid) */

function findChrome() {
  var base = path.join(process.env.HOME, '.cache', 'ms-playwright');
  var dir = fs.readdirSync(base).filter(function (d) { return /^chromium-\d+$/.test(d); }).sort().pop();
  return path.join(base, dir, 'chrome-linux', 'chrome');
}

var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

// Tap a canvas at fractional coordinates.
async function tap(page, fx, fy) {
  var box = await page.locator('canvas').first().boundingBox();
  await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy);
}

async function start(page) {
  var btn = page.locator('#overlay-btn');
  if (await btn.count() && await btn.isVisible().catch(function () { return false; })) {
    await btn.click();
    await sleep(250);
  }
}

/* Each game plays to a frame worth showing: action on screen, not a start
   overlay. `focus` is where the interesting band sits vertically, 0 = top. */
var SHOTS = [
  {
    slug: 'breakaway', url: 'arcade/breakaway/', focus: 0.62,
    play: async function (page) {
      await start(page);
      await sleep(2100);            // let backcheckers close and rings light up
      await tap(page, 0.25, 0.7);
      await sleep(650);
    }
  },
  {
    slug: 'zamboni', url: 'arcade/zamboni/', focus: 0.5, fit: 'contain',
    play: async function (page) {
      await start(page);
      await page.locator('#btn-right').click(); await sleep(500);
      await page.locator('#btn-down').click(); await sleep(500);
    }
  },
  {
    slug: 'crossword', url: 'arcade/crossword/', focus: 0.5, fit: 'contain', target: '.cw-board',
    play: async function (page) {
      // fill a couple of entries so some squares are shaded solved
      var letters = await page.evaluate(function () {
        var raw = JSON.parse(localStorage.getItem('se-arcade-crossword') || 'null');
        if (!raw || !raw.puzzle) return null;
        var w = raw.puzzle.words[0];
        return { cells: w.cells, answer: w.answer, gw: raw.puzzle.w };
      });
      if (!letters) return;
      for (var i = 0; i < letters.cells.length; i++) {
        var c = letters.cells[i];
        await page.evaluate(function (a) {
          var cells = document.querySelectorAll('.cw-cell');
          cells[a.y * a.gw + a.x].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
        }, { x: c.x, y: c.y, gw: letters.gw });
        await page.keyboard.press(letters.answer[i]);
      }
      await sleep(400);
    }
  },
  {
    slug: 'keep-it-in', url: 'arcade/keep-it-in/', focus: 0.8,
    play: async function (page) { await start(page); await sleep(3100); }
  },
  {
    slug: 'shootout', url: 'arcade/shootout/', focus: 0.45,
    play: async function (page) { await start(page); await sleep(1300); }
  },
  {
    slug: 'coaches-challenge', url: 'arcade/coaches-challenge/', focus: 0.45,
    play: async function (page) { await start(page); await sleep(1600); }
  },
  {
    slug: 'telestrator', url: 'arcade/telestrator/', focus: 0.5,
    play: async function (page) {
      await start(page);
      await sleep(500);
      var box = await page.locator('canvas').first().boundingBox();
      var at = function (fx, fy) { return [box.x + box.width * fx, box.y + box.height * fy]; };
      var p0 = at(0.5, 0.88);
      await page.mouse.move(p0[0], p0[1]);
      await page.mouse.down();
      await sleep(80);
      for (var i = 1; i <= 14; i++) {
        var pt = at(0.5 + Math.sin(i / 4) * 0.18, 0.88 - i * 0.045);
        await page.mouse.move(pt[0], pt[1]);
        await sleep(45);
      }
      await page.mouse.up();
      await sleep(500);
    }
  }
];

(async function () {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  var browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] });
  var failures = 0;

  for (var i = 0; i < SHOTS.length; i++) {
    var shot = SHOTS[i];
    if (ONLY.length && ONLY.indexOf(shot.slug) === -1) continue;

    var ctx = await browser.newContext({
      viewport: { width: 900, height: 1000 },
      deviceScaleFactor: SCALE
    });
    var page = await ctx.newPage();
    var errs = [];
    page.on('pageerror', function (e) { errs.push(e.message); });

    try {
      await page.goto(BASE + '/' + shot.url, { waitUntil: 'load' });
      await sleep(500);
      await shot.play(page);

      var sel = shot.target || 'canvas';
      await page.locator(sel).first().scrollIntoViewIfNeeded();
      await sleep(150);
      var box = await page.locator(sel).first().boundingBox();

      var cw, ch;
      if (shot.fit === 'contain') {
        ch = box.height; cw = ch * RATIO;          // whole board, padded sides
      } else {
        cw = box.width; ch = cw / RATIO;           // widest slice of the play
        if (ch > box.height) { ch = box.height; cw = ch * RATIO; }
      }
      var clip = {
        x: box.x + (box.width - cw) / 2,
        y: box.y + (box.height - ch) * shot.focus,
        width: cw,
        height: ch
      };

      var out = path.join(OUT_DIR, shot.slug + '.jpg');
      await page.screenshot({ clip: clip, path: out, type: 'jpeg', quality: QUALITY });
      var kb = (fs.statSync(out).size / 1024).toFixed(0);
      console.log('  ok  ' + shot.slug + '.jpg  ' + Math.round(cw * SCALE) + 'x' + Math.round(ch * SCALE) + '  ' + kb + 'kb' +
        (errs.length ? '  [page errors: ' + errs.join('; ') + ']' : ''));
    } catch (e) {
      failures++;
      console.error('  FAIL ' + shot.slug + ': ' + e.message);
    }
    await ctx.close();
  }

  await browser.close();
  console.log(failures ? failures + ' capture(s) failed' : 'all thumbnails captured');
  process.exit(failures ? 1 : 0);
})();
