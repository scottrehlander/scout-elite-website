/* Zamboni level verifier — proves every level in scripts/games/zamboni.js is
   solvable and that its `par` equals the true optimal move count.

   Usage:  node 'Reference Material/zamboni-solver.js'
   Exits nonzero on any unsolvable level or par mismatch. Run this after ANY
   change to the LEVELS array. ("Reference Material" is excluded from the
   Jekyll build, so this never ships.)

   Method: exact breadth-first search over (position, remaining-scuffed-tiles
   bitmask), using the same slide rules as the game: a move slides until the
   next cell is a wall, must travel at least one cell, and cleans every cell
   entered including the last. */
'use strict';

var fs = require('fs');
var path = require('path');

var GAME = path.join(__dirname, '..', 'scripts', 'games', 'zamboni.js');
var src = fs.readFileSync(GAME, 'utf8');

// pull the LEVELS array out of the game source
var startIdx = src.indexOf('var LEVELS = [');
var endIdx = src.indexOf('];', startIdx);
if (startIdx < 0 || endIdx < 0) {
  console.error('could not find LEVELS array in ' + GAME);
  process.exit(1);
}
var levelsSrc = src.slice(startIdx + 'var LEVELS ='.length, endIdx + 2);
var LEVELS;
try {
  LEVELS = new Function('return ' + levelsSrc.replace(/;\s*$/, ''))();
} catch (e) {
  console.error('could not parse LEVELS: ' + e.message);
  process.exit(1);
}

var COLS = 9, ROWS = 11;
var DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function solve(map, maxDepth, maxStates) {
  maxDepth = maxDepth || 30;
  maxStates = maxStates || 2000000;
  var walls = {}, scuffBit = {}, start = null, nScuff = 0;
  var x, y;
  for (y = 0; y < ROWS; y++) {
    for (x = 0; x < COLS; x++) {
      var ch = map[y].charAt(x) || ' ';
      if (ch === '#') walls[x + ',' + y] = true;
      else if (ch === '.') scuffBit[x + ',' + y] = nScuff++;
      else if (ch === 'Z') start = x + ',' + y;
    }
  }
  if (!start) return { par: null, reason: 'no Z start tile' };
  function isWall(px, py) {
    return px < 0 || px >= COLS || py < 0 || py >= ROWS || walls[px + ',' + py];
  }

  var full = 0n;
  for (var i = 0; i < nScuff; i++) full |= 1n << BigInt(i);
  if (full === 0n) return { par: 0 };

  // precompute every slide from every open cell
  var slides = {};
  for (y = 0; y < ROWS; y++) {
    for (x = 0; x < COLS; x++) {
      if (isWall(x, y)) continue;
      var opts = [];
      for (var d = 0; d < 4; d++) {
        var cx = x, cy = y, clear = 0n, moved = false;
        while (!isWall(cx + DIRS[d][0], cy + DIRS[d][1])) {
          cx += DIRS[d][0]; cy += DIRS[d][1]; moved = true;
          var b = scuffBit[cx + ',' + cy];
          if (b !== undefined) clear |= 1n << BigInt(b);
        }
        if (moved) opts.push({ end: cx + ',' + cy, clear: clear });
      }
      slides[x + ',' + y] = opts;
    }
  }

  var frontier = [[start, full]];
  var seen = {};
  seen[start + '|' + full.toString(36)] = true;
  var states = 1;
  for (var depth = 1; depth <= maxDepth; depth++) {
    var next = [];
    for (var f = 0; f < frontier.length; f++) {
      var pos = frontier[f][0], mask = frontier[f][1];
      var opts2 = slides[pos];
      for (var o = 0; o < opts2.length; o++) {
        var m2 = mask & ~opts2[o].clear;
        if (m2 === 0n) return { par: depth, states: states };
        var key = opts2[o].end + '|' + m2.toString(36);
        if (!seen[key]) {
          seen[key] = true;
          if (++states > maxStates) return { par: null, reason: 'state cap hit' };
          next.push([opts2[o].end, m2]);
        }
      }
    }
    if (!next.length) return { par: null, reason: 'search exhausted: unsolvable' };
    frontier = next;
  }
  return { par: null, reason: 'depth cap hit' };
}

var failed = 0;
console.log('verifying ' + LEVELS.length + ' levels from ' + GAME + '\n');
for (var li = 0; li < LEVELS.length; li++) {
  var lv = LEVELS[li];
  var bad = lv.map.length !== ROWS || lv.map.some(function (r) { return r.length !== COLS; });
  if (bad) {
    console.log('L' + (li + 1) + '  FAIL: map is not ' + COLS + 'x' + ROWS);
    failed++;
    continue;
  }
  var r = solve(lv.map);
  if (r.par === null) {
    console.log('L' + (li + 1) + '  FAIL: ' + r.reason);
    failed++;
  } else if (r.par !== lv.par) {
    console.log('L' + (li + 1) + '  FAIL: par says ' + lv.par + ' but optimal is ' + r.par);
    failed++;
  } else {
    console.log('L' + (li + 1) + '  ok   par ' + lv.par + '  (' + r.states + ' states searched)');
  }
}
console.log(failed ? '\n' + failed + ' level(s) FAILED' : '\nall ' + LEVELS.length + ' levels solvable, all pars optimal');
process.exit(failed ? 1 : 0);
