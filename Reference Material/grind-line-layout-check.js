#!/usr/bin/env node
/* Grind Line — layout check.
 * Every player, option spot and option label must sit inside its beat's camera
 * window, and no two labels in a beat may overlap. Cheap, and it catches the
 * things that only show up as a mangled screenshot. Exits nonzero on failure.
 */
'use strict';
var fs = require('fs'), path = require('path');
global.window = {}; global.performance = { now: function () { return 0; } };
new Function('window', fs.readFileSync(
  path.join(__dirname, '..', 'scripts', 'games', 'grind-line', 'render.js'), 'utf8'))(global.window);
var R = global.window.GrindLineRender, VH = R.VH;
var beats = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', '_data', 'gl', 'beats.json'), 'utf8'));

var bad = [];
var ALL = Object.keys(beats).concat(['NZ.loose.battle','OZ.loose.battle']);
ALL.forEach(function (k) {
  var spec = beats[k] || beats['DZ.loose.battle'];
  var Lo = R.LAYOUTS[k];
  if (!Lo) { bad.push('no layout for ' + k); return; }
  var lo = Lo.cam, hi = Lo.cam + VH;
  ['us', 'them'].forEach(function (g) {
    Object.keys(Lo[g]).forEach(function (id) {
      var y = Lo[g][id][1];
      if (y < lo - 2 || y > hi + 2) bad.push(k + ' ' + g + '.' + id + ' y=' + y + ' outside [' + lo + ',' + hi + ']');
    });
  });
  var boxes = [];
  spec.options.forEach(function (o) {
    if (!Lo.opts[o.id]) { bad.push(k + '.' + o.id + ' has no spot'); return; }
    if (!Lo.labels[o.id]) { bad.push(k + '.' + o.id + ' has no label'); return; }
    var sy = Lo.opts[o.id][1], L = Lo.labels[o.id];
    if (sy < lo + 3 || sy > hi - 3) bad.push(k + '.' + o.id + ' spot y=' + sy + ' outside');
    if (L[1] < lo + 10 || L[1] > hi - 10) bad.push(k + '.' + o.id + ' label y=' + L[1] + ' too near edge');
    var w = o.label.length * 2.0 + 5, h = 6.4;          // 3.5px bold Inter, plus plate
    var PAD = 2;                                        // near-misses look like collisions too
    if (L[0] - w / 2 < 1 || L[0] + w / 2 > 95)
      bad.push(k + '.' + o.id + ' label "' + o.label + '" runs off the rink (x=' + L[0] + ', w=' + w.toFixed(0) + ')');
    boxes.push({ id: o.id, x0: L[0] - w / 2 - PAD, x1: L[0] + w / 2 + PAD,
                 y0: L[1] - h / 2 - PAD, y1: L[1] + h / 2 + PAD });
  });
  boxes.forEach(function (a, i) {
    boxes.slice(i + 1).forEach(function (b) {
      if (a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1)
        bad.push(k + ': labels "' + a.id + '" and "' + b.id + '" overlap');
    });
  });
});
/* Zone-generic beats: the engine aliases every loose puck to DZ.loose.battle,
 * so the renderer needs a picture per zone or a rebound in their end gets drawn
 * in yours and the camera flies the length of the sheet and back. */
['loose.battle'].forEach(function (suffix) {
  ['DZ', 'NZ', 'OZ'].forEach(function (z) {
    var k = z + '.' + suffix, Lz = R.LAYOUTS[k];
    if (!Lz) { bad.push('no layout for ' + k + ' (zone-generic beat needs one per zone)'); return; }
    var wantCam = { DZ: 198, NZ: 112, OZ: 8 }[z];
    if (Math.abs(Lz.cam - wantCam) > 30)
      bad.push(k + ' camera is ' + Lz.cam + ', expected near ' + wantCam + ' for ' + z);
  });
});

if (bad.length) { console.log('FAIL\n  ' + bad.join('\n  ')); process.exit(1); }
console.log('PASS  ' + ALL.length + ' layouts: all players, spots and labels inside the camera, no label overlaps');
