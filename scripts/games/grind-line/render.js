/* Grind Line — render layer.
 *
 * A CONSUMER of the engine's event stream. It knows where players stand and how
 * a hit looks; it knows nothing about odds, wear maths or matchups. New content
 * therefore needs no new animation code: a new system produces a different
 * stream of the same primitives.
 *
 * World: the full 200ft sheet, your net at the bottom, theirs at the top. The
 * orientation NEVER flips; the camera only pans. Vertical is stretched ~1.35x
 * against horizontal so players stay legible on a phone.
 */
window.GrindLineRender = (function () {
  'use strict';

  var VW = 100, VH = 130;
  var WT = 8, WB = 328;
  var THEIR_GOAL = 26, THEIR_BLUE = 128, CENTRE = 168, OUR_BLUE = 208, OUR_GOAL = 310;
  var RL = 2, RR = 94;

  var C = {
    ice:'#0c0d10', line:'rgba(255,255,255,.10)', blue:'#2f6fb5', red:'#8d3038',
    us:'#0d84d8', usDim:'#0a4a78', them:'#d63b47', themDim:'#7d2830',
    puck:'#e9e9ee', good:'#28a745', warn:'#ffc107', bad:'#d63b47'
  };

  /* ------------------------------------------------------------ layouts
   * Where everyone stands for each beat, plus the spot each option sends the
   * puck to and where its label sits. Presentation only — the engine has no
   * concept of position. */
  function L(us, them, cover, puckAt, cam, opts, labels) {
    return { us:us, them:them, cover:cover, puckAt:puckAt, cam:cam, opts:opts, labels:labels };
  }
  var FC = { F1:{ox:-2,oy:-2,rx:15,ry:13}, F2:{ox:-3,oy:4,rx:11,ry:15},
             F3:{ox:-8,oy:10,rx:17,ry:14}, XD1:{ox:0,oy:0,rx:24,ry:8}, XD2:{ox:0,oy:0,rx:24,ry:8} };
  var LINE = { XD1:{ox:2,oy:-6,rx:19,ry:16}, XD2:{ox:-2,oy:-6,rx:19,ry:16},
               F1:{ox:0,oy:6,rx:12,ry:10}, F2:{ox:0,oy:4,rx:10,ry:9}, F3:{ox:0,oy:4,rx:10,ry:9} };
  var HOUSE = { XD1:{ox:0,oy:0,rx:13,ry:11}, XD2:{ox:0,oy:0,rx:13,ry:11},
                F1:{ox:0,oy:0,rx:12,ry:11}, F2:{ox:0,oy:0,rx:10,ry:10}, F3:{ox:0,oy:0,rx:10,ry:10} };
  var OURHOUSE = { D1:{ox:0,oy:0,rx:13,ry:11}, D2:{ox:0,oy:0,rx:13,ry:11},
                   C:{ox:0,oy:0,rx:12,ry:11}, LW:{ox:0,oy:0,rx:10,ry:10}, RW:{ox:0,oy:0,rx:10,ry:10} };
  /* Our forecheck, seen from their end: what WE are taking away while they try
   * to break out. Without this the forecheck beat had no read at all. */
  var OURFC = { C:{ox:0,oy:-4,rx:14,ry:12}, LW:{ox:2,oy:2,rx:11,ry:13},
                RW:{ox:-2,oy:2,rx:11,ry:13}, D1:{ox:0,oy:0,rx:20,ry:8}, D2:{ox:0,oy:0,rx:20,ry:8} };

  var LAYOUTS = {
   'DZ.us.retrieval': L(
     {D1:[38,312],D2:[66,306],LW:[14,278],C:[48,268],RW:[82,262]},
     {F1:[34,302],F2:[17,266],F3:[58,252],XD1:[30,212],XD2:[66,212]}, FC, 'D1', 198,
     {wall:[14,278],middle:[48,268],weak:[82,262],rim:[70,314]},
     {wall:[17,292],middle:[50,276],weak:[82,274],rim:[74,304]}),
   'DZ.us.established': L(
     {D1:[40,292],D2:[64,290],LW:[18,252],C:[48,246],RW:[78,250]},
     {F1:[44,270],F2:[24,244],F3:[64,240],XD1:[32,206],XD2:[64,206]}, FC, 'D1', 198,
     {dtod:[64,290],quick:[48,246],hold:[34,300]},
     {dtod:[70,278],quick:[48,258],hold:[26,290]}),
   'DZ.them.established': L(
     {D1:[42,296],D2:[56,296],LW:[26,274],C:[48,280],RW:[68,274]},
     {F1:[30,288],F2:[64,286],F3:[48,266],XD1:[34,232],XD2:[62,232]}, OURHOUSE, 'F1', 198,
     {collapse:[48,290],pressure:[30,288],boxout:[48,302]},
     {collapse:[48,262],pressure:[24,276],boxout:[70,300]}),
   'DZ.them.rush': L(
     {D1:[38,286],D2:[58,286],LW:[24,250],C:[48,256],RW:[72,250]},
     {F1:[30,248],F2:[48,240],F3:[68,246],XD1:[36,214],XD2:[62,214]}, OURHOUSE, 'F2', 198,
     {gapup:[48,266],funnel:[24,262],block:[48,280]},
     {gapup:[48,228],funnel:[18,274],block:[70,282]}),
   'DZ.loose.battle': L(
     {D1:[40,294],D2:[60,292],LW:[22,272],C:[48,276],RW:[70,270]},
     {F1:[34,282],F2:[58,280],F3:[48,258],XD1:[32,220],XD2:[64,220]}, OURHOUSE, null, 198,
     {body:[42,284],stick:[52,284],support:[48,262]},
     {body:[20,292],stick:[74,292],support:[48,250]}),
   'NZ.loose.battle': L(
     {D1:[38,200],D2:[60,202],LW:[24,170],C:[46,164],RW:[68,170]},
     {F1:[40,176],F2:[58,178],F3:[48,150],XD1:[34,132],XD2:[62,132]}, OURHOUSE, null, 112,
     {body:[42,172],stick:[52,172],support:[48,150]},
     {body:[20,182],stick:[76,182],support:[48,140]}),
   'OZ.loose.battle': L(
     {D1:[36,110],D2:[62,110],LW:[26,70],C:[46,64],RW:[66,70]},
     {F1:[40,76],F2:[58,78],F3:[48,50],XD1:[38,38],XD2:[58,38]}, OURHOUSE, null, 8,
     {body:[42,72],stick:[52,72],support:[48,50]},
     {body:[20,84],stick:[76,84],support:[48,40]}),
   'NZ.us.rush': L(
     {D1:[40,236],D2:[62,238],LW:[18,200],C:[50,194],RW:[82,206]},
     {F1:[46,230],F2:[26,222],F3:[58,214],XD1:[38,140],XD2:[58,140]}, LINE, 'RW', 112,
     {carry:[48,152],wide:[88,150],chip:[70,120]},
     {carry:[48,164],wide:[80,162],chip:[70,133]}),
   'NZ.them.rush': L(
     {D1:[38,196],D2:[60,196],LW:[26,152],C:[48,146],RW:[70,150]},
     {F1:[30,158],F2:[48,150],F3:[68,156],XD1:[36,120],XD2:[60,120]}, OURHOUSE, 'F2', 120,
     {standup:[48,182],backoff:[48,206],angle:[24,178]},
     {standup:[48,192],backoff:[62,214],angle:[24,204]}),
   'OZ.us.rush': L(
     {D1:[36,120],D2:[62,120],LW:[22,74],C:[48,60],RW:[84,92]},
     {F1:[48,74],F2:[32,66],F3:[64,66],XD1:[40,50],XD2:[56,50]}, HOUSE, 'RW', 8,
     {shoot:[48,34],drive:[58,42],delay:[70,104]},
     {shoot:[22,40],drive:[76,58],delay:[76,116]}),
   'OZ.us.established': L(
     {D1:[36,114],D2:[62,114],LW:[20,72],C:[48,58],RW:[84,92]},
     {F1:[48,72],F2:[30,64],F3:[64,64],XD1:[40,50],XD2:[56,50]}, HOUSE, 'RW', 8,
     {lowhigh:[62,114],slot:[48,58],cycle:[20,72]},
     {lowhigh:[62,126],slot:[22,42],cycle:[19,86]}),
   'OZ.them.retrieval': L(
     {D1:[44,96],D2:[62,92],LW:[26,60],C:[48,52],RW:[70,58]},
     {F1:[48,20],F2:[24,58],F3:[70,54],XD1:[40,34],XD2:[58,34]}, OURFC, 'XD1', 8,
     {press:[40,40],contain:[48,66],lanes:[48,84]},
     {press:[22,30],contain:[24,74],lanes:[72,90]})
  };

  /* -------------------------------------------------------------- audio
   * Synthesised, no assets. The first prototype proved a hit needs a sound;
   * the integrated build shipped without one and felt inert. */
  var AC = null, muted = false;
  function ac(){ if(!AC){ try{ AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
    if(AC&&AC.state==='suspended') AC.resume(); return AC; }
  function noise(d){ var a=ac(); if(!a) return null;
    var n=Math.floor(a.sampleRate*d), b=a.createBuffer(1,n,a.sampleRate), g=b.getChannelData(0), i;
    for(i=0;i<n;i++) g[i]=(Math.random()*2-1)*(1-i/n);
    var s=a.createBufferSource(); s.buffer=b; return s; }
  function thud(pw){ if(muted) return; var a=ac(); if(!a) return; var t=a.currentTime;
    var s=noise(.3); if(s){ var lp=a.createBiquadFilter(); lp.type='lowpass';
      lp.frequency.setValueAtTime(1900*pw,t); lp.frequency.exponentialRampToValueAtTime(180,t+.22);
      var g=a.createGain(); g.gain.setValueAtTime(.5*pw,t); g.gain.exponentialRampToValueAtTime(.001,t+.3);
      s.connect(lp); lp.connect(g); g.connect(a.destination); s.start(t); }
    var o=a.createOscillator(), og=a.createGain(); o.type='sine';
    o.frequency.setValueAtTime(150*pw,t); o.frequency.exponentialRampToValueAtTime(38,t+.2);
    og.gain.setValueAtTime(.65*pw,t); og.gain.exponentialRampToValueAtTime(.001,t+.26);
    o.connect(og); og.connect(a.destination); o.start(t); o.stop(t+.3); }
  function tone(f,v,d,ty){ if(muted) return; var a=ac(); if(!a) return; var t=a.currentTime;
    var o=a.createOscillator(), g=a.createGain(); o.type=ty||'triangle';
    o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(v,t);
    g.gain.exponentialRampToValueAtTime(.001,t+(d||.09));
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t+(d||.09)+.02); }
  function horn(){ if(muted) return; tone(233,.2,.85,'sawtooth'); tone(311,.16,.85,'sawtooth');
    setTimeout(function(){ tone(466,.14,.6,'sawtooth'); },140); }
  function setMuted(m){ muted=!!m; if(!muted) ac(); }

  /* ------------------------------------------------------------- state */
  var cv, ctx, scale = 1, dpr = 1;
  var cam = 168, camTo = 168, shakeX = 0, shakeY = 0;
  var pos = {}, puck = [48, 300], beatKey = null, layout = null;
  var fx = [], flash = null, board = null, stamp = null, floats = [];
  var hitstop = 0, showOpts = false, optList = [];
  var wear = { usF:0, usD:0, themF:0, themD:0 }, score = { us:0, them:0 };
  var tl = null;                                   // active event timeline

  function clamp(v,a,b){ return v<a?a:v>b?b:v; }
  function easeOut(u){ return 1-Math.pow(1-u,3); }
  function easeIO(u){ return u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2; }
  function LP(a,b,u){ return [a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u]; }

  function init(canvas) {
    cv = canvas; ctx = cv.getContext('2d');
    fit();
    window.addEventListener('resize', fit);
  }
  function fit() {
    /* Arcade convention (see Arcade.setupCanvas): the canvas sizes off parent
     * WIDTH and the page scrolls. Every other arcade game sits below the fold
     * on a phone; clamping to the viewport here just made this one tiny. */
    var parentW = cv.parentNode.clientWidth || 320;
    var w = Math.max(240, Math.min(parentW, 420));
    var h = w * (VH/VW);
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    cv.style.width = w+'px'; cv.style.height = h+'px';
    cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr);
    scale = w/VW; ctx.setTransform(dpr*scale,0,0,dpr*scale,0,0);
  }

  /* Move everyone to this beat's layout.
   *
   * Tweening each player straight to his new spot made a zone change look like
   * ten men teleporting: the neutral-zone and o-zone formations are entirely
   * different arrangements, so everybody slid 100+ world units at once. Instead
   * the move happens in two overlapping parts — the whole formation TRANSLATES
   * up ice behind the puck carrier first (which reads as skating over the
   * line), then settles into the new shape. Duration scales with the distance
   * travelled, so crossing a line takes longer than shuffling inside a zone.
   * Returns that duration so the caller can wait for it. */
  var ZONE_KEY = ['DZ', 'NZ', 'OZ'];
  /* The engine aliases zone-generic beats (a loose puck plays the same
   * anywhere), so resolve the picture against the zone the puck is really in
   * before falling back to the beat's own key. */
  function layoutFor(key, state) {
    if (state && typeof state.zone === 'number') {
      var zoned = ZONE_KEY[state.zone] + '.' + key.split('.').slice(1).join('.');
      if (LAYOUTS[zoned]) return LAYOUTS[zoned];
    }
    return LAYOUTS[key] || LAYOUTS['DZ.loose.battle'];
  }
  function setBeat(key, state, animate) {
    beatKey = key; layout = layoutFor(key, state);
    var target = {}, k;
    for (k in layout.us) target[k] = layout.us[k].slice();
    for (k in layout.them) target[k] = layout.them[k].slice();
    var from = animate ? pos : null;
    pos = {};
    for (k in target) pos[k] = (from && from[k]) ? from[k].slice() : target[k].slice();
    optList = [];
    wear = state.wear; score = state.score;

    if (!animate) {
      puck = layout.puckAt ? target[layout.puckAt].slice() : [48, layout.cam + 70];
      camTo = layout.cam; tl = null;
      return 0;
    }
    var to = layout.puckAt ? target[layout.puckAt] : [48, layout.cam + 70];
    var delta = [to[0] - puck[0], to[1] - puck[1]];
    var dur = Math.max(380, Math.min(1150, 380 + Math.abs(delta[1]) * 4.8));
    tl = { kind:'pan', t:0, dur:dur, from:from, to:target, delta:delta, puckFrom:puck.slice() };
    return dur;
  }
  function setOptions(list, on) {
    optList = list || []; showOpts = !!on;
    if (on) stamp = null;          // never leave a result banner over the choices
  }

  /* Play one beat's event stream. onDone fires when the last event has run. */
  function playEvents(events, meta, onDone) {
    tl = { kind:'events', t:0, i:0, events:events.slice(), meta:meta, onDone:onDone,
           startPuck: puck.slice(), dur: (events.length ? events[events.length-1].t : 0) + 700 };
    showOpts = false;
  }
  function addFx(x,y,n,spd,col,life,rad){
    for (var i=0;i<n;i++){ var a=Math.random()*6.283, s=spd*(.3+Math.random());
      fx.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:life*(.45+Math.random()*.85),
               m:life,col:col,r:(rad||1)*(.35+Math.random()*.85)}); }
  }
  function banner(txt, sub, col){ stamp = { txt:txt, sub:sub, col:col, t:0 }; }

  /* A faceoff has to LOOK like a faceoff. Relocating the puck silently is what
   * read as the puck teleporting between zones. */
  var dim = 0, drop = null;
  function whistleBreak(reason) {
    dim = 1; banner('WHISTLE', reason || 'stoppage', '#b3b3b3');
    tone(1180, .12, .10); setTimeout(function(){ tone(1180, .10, .16); }, 130);
  }
  function puckDrop() {
    dim = 0; drop = { t: 0 };
    flash = { x: puck[0], y: puck[1], t: 0, max: 7 };
    tone(880, .08, .06);
  }

  /* The dot the draw is taken at, from where the camera is sitting. */
  function dotFor(centre) {
    if (!layout) return [48, 168];
    if (layout.cam >= 190) return [23, 278];        // d-zone circle
    if (layout.cam >= 100) return centre ? [48, 168] : [23, 160];
    return [23, 58];                                // their end
  }

  /* A draw: both centres come to the dot, the puck is dropped, and whoever won
   * it sweeps it back. Relocating the puck without this read as teleporting. */
  function faceoff(opts, onDone) {
    var dot = dotFor(!!(opts && opts.centre));
    var carrier = layout && layout.puckAt && pos[layout.puckAt] ? pos[layout.puckAt].slice() : dot;
    dim = 0;
    tl = { kind: 'faceoff', t: 0, dur: 1150, dot: dot, carrier: carrier, onDone: onDone,
           puckFrom: puck.slice(),                 // skated to the dot, never snapped
           fromUs: pos.C ? pos.C.slice() : dot, fromThem: pos.F1 ? pos.F1.slice() : dot };
  }
  function drawDim(){ if (dim <= 0.01) return;
    ctx.fillStyle = 'rgba(6,7,10,' + (dim * 0.55) + ')';
    ctx.fillRect(0, cam, VW, VH); }
  function drawDrop(dt){ if (!drop) return; drop.t += dt;
    if (drop.t > 420) { drop = null; return; }
    var u = drop.t / 420;
    ctx.save(); ctx.globalAlpha = (1 - u) * .8; ctx.strokeStyle = '#e8edf4'; ctx.lineWidth = .8;
    ctx.beginPath(); ctx.arc(puck[0], puck[1], 3 + 9 * (1 - u), 0, 6.283); ctx.stroke(); ctx.restore(); }
  function floater(txt, x, y, col){ floats.push({ txt:txt, x:x, y:y, col:col, t:0 }); }

  /* Whoever is nearest the spot the puck is going closes on it. Generic, so a
   * new beat needs no new animation: the defence always converges on the play. */
  function closeOn(target, byThem, t0) {
    if (!layout) return;
    var pool = byThem ? layout.us : layout.them, k, best = null, bd = 1e9;
    for (k in pool) { if (!pos[k]) continue;
      var d = Math.hypot(pos[k][0]-target[0], pos[k][1]-target[1]);
      if (d < bd && d > 1) { bd = d; best = k; } }
    if (!best || bd > 60) return;
    var from = pos[best].slice();
    var u = [target[0]-from[0], target[1]-from[1]], len = Math.hypot(u[0],u[1]) || 1;
    tl.closer = { key: best, from: from,
                  to: [target[0]-u[0]/len*5.4, target[1]-u[1]/len*5.4],
                  t0: t0, t1: t0 + 520 };
  }
  function fireEvent(e, meta) {
    var target = meta && meta.spot ? meta.spot : puck;
    if (e.type === 'PASS' || e.type === 'CARRY') {
      var dump = !!e.dump;
      tl.puckFrom = puck.slice(); tl.puckTo = target.slice();
      var dist = Math.hypot(target[0]-puck[0], target[1]-puck[1]);
      var travel = Math.max(200, Math.min(760, 170 + dist * (dump ? 2.6 : 3.4)));
      tl.puckT0 = e.t; tl.puckT1 = e.t + travel;               // flung, not carried
      if (!dump) closeOn(target, !!(meta && meta.byThem), e.t + 60);
      tone(dump ? 300 : (e.type === 'PASS' ? 760 : 520), dump ? .1 : .07, dump ? .12 : .05);
      if (dump) banner('DUMPED IN', 'no possession, go win it back', C.warn);
    } else if (e.type === 'HIT') {
      flash = { x:puck[0], y:puck[1], t:0, max:(e.power||1)*15 };
      hitstop = (e.power||1)*100; shakeX = 7*(e.power||1); shakeY = 4*(e.power||1); thud(e.power||1);
      addFx(puck[0], puck[1], Math.round(13*(e.power||1)), .115, '#ffffff', 360, .62);
      if (puck[0] < 22) board = { y:puck[1], t:0 };
      banner(e.clean ? 'BIG HIT' : 'PENALTY', e.clean ? 'clean, into the wall' : 'that one costs you',
             e.clean ? C.warn : C.bad);
    } else if (e.type === 'SHOT') {
      tl.puckFrom = puck.slice(); tl.puckTo = [48, 23];
      var sd = Math.hypot(48-puck[0], 23-puck[1]);
      tl.puckT0 = e.t; tl.puckT1 = e.t + Math.max(220, Math.min(620, 150 + sd * 3.0));
    } else if (e.type === 'GOAL') {
      banner('GOAL', 'that is how you build a shift', C.good); horn();
      flash = { x:48, y:23, t:0, max:16 }; addFx(48,23,24,.09,C.good,800,.9);
    } else if (e.type === 'SAVE') {
      banner('SAVE', 'goalie had it all the way', C.warn); tone(300,.12,.14);
    } else if (e.type === 'BLOCK') {
      banner('BLOCKED', 'body in the lane', C.them);
    } else if (e.type === 'TURNOVER') {
      banner('TURNOVER', 'other way', C.bad);
    } else if (e.type === 'WHISTLE') {
      banner('WHISTLE', e.reason || 'stoppage', '#b3b3b3');
    }
  }

  /* -------------------------------------------------------------- draw */
  function rr(x,y,w,h,r){ ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath(); }
  function rink(){ rr(RL,WT,RR-RL,WB-WT,14); }
  function drawRink(){
    ctx.fillStyle=C.ice; rink(); ctx.fill();
    ctx.save(); rink(); ctx.clip();
    ctx.globalAlpha=.55; ctx.lineWidth=1.7; ctx.strokeStyle=C.blue;
    [THEIR_BLUE,OUR_BLUE].forEach(function(y){ ctx.beginPath(); ctx.moveTo(RL,y); ctx.lineTo(RR,y); ctx.stroke(); });
    ctx.strokeStyle=C.red; ctx.beginPath(); ctx.moveTo(RL,CENTRE); ctx.lineTo(RR,CENTRE); ctx.stroke();
    ctx.lineWidth=1.0;
    [THEIR_GOAL,OUR_GOAL].forEach(function(y){ ctx.beginPath(); ctx.moveTo(RL,y); ctx.lineTo(RR,y); ctx.stroke(); });
    ctx.globalAlpha=1; ctx.strokeStyle=C.line; ctx.lineWidth=.7;
    var s=[[23,58],[73,58],[23,278],[73,278]], i;
    for(i=0;i<s.length;i++){ ctx.beginPath(); ctx.arc(s[i][0],s[i][1],12,0,6.283); ctx.stroke();
      ctx.fillStyle=C.line; ctx.beginPath(); ctx.arc(s[i][0],s[i][1],1,0,6.283); ctx.fill(); }
    [[23,160],[73,160],[23,176],[73,176]].forEach(function(p){
      ctx.fillStyle=C.line; ctx.beginPath(); ctx.arc(p[0],p[1],1.1,0,6.283); ctx.fill(); });
    ctx.beginPath(); ctx.arc(48,CENTRE,12,0,6.283); ctx.stroke();
    ctx.strokeStyle='rgba(47,111,181,.45)'; ctx.lineWidth=.8;
    ctx.beginPath(); ctx.arc(48,THEIR_GOAL,8,0,Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(48,OUR_GOAL,8,Math.PI,0); ctx.stroke();
    ctx.strokeStyle='rgba(214,59,71,.85)'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.rect(43.5,THEIR_GOAL-5.5,9,5.5); ctx.stroke();
    ctx.beginPath(); ctx.rect(43.5,OUR_GOAL,9,5.5); ctx.stroke();
    ctx.restore();
    ctx.strokeStyle='rgba(255,255,255,.17)'; ctx.lineWidth=1.1; rink(); ctx.stroke();
  }
  function blob(cx,cy,rx,ry,a,rgb){
    ctx.save(); ctx.translate(cx,cy); ctx.scale(rx/ry,1);
    var g=ctx.createRadialGradient(0,0,0,0,0,ry);
    g.addColorStop(0,'rgba('+rgb+','+a+')');
    g.addColorStop(.62,'rgba('+rgb+','+(a*.82)+')');
    g.addColorStop(.88,'rgba('+rgb+','+(a*.34)+')');
    g.addColorStop(1,'rgba('+rgb+',0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,ry,0,6.283); ctx.fill(); ctx.restore();
  }
  /* Shade the ice held by whoever does NOT have the puck. That is the read. */
  function drawCover(mul, weHaveIt){
    if (!layout || !layout.cover) return;
    var rgb = weHaveIt ? '214,59,71' : '13,132,216', k;
    ctx.save(); rink(); ctx.clip();
    for (k in layout.cover){ var c=layout.cover[k], p=pos[k]; if(!p) continue;
      blob(p[0]+c.ox, p[1]+c.oy, c.rx, c.ry, .5*mul, rgb); }
    ctx.restore();
  }
  function plate(x,y,w,h,r,a){ ctx.fillStyle='rgba(6,7,10,'+(a||.82)+')'; rr(x-w/2,y-h/2,w,h,r||1.6); ctx.fill(); }
  function drawPlayer(p,col,dim,lab){
    ctx.fillStyle=dim; ctx.beginPath(); ctx.arc(p[0],p[1]+.8,4.2,0,6.283); ctx.fill();
    ctx.fillStyle=col; ctx.beginPath(); ctx.arc(p[0],p[1],4.0,0,6.283); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.95)'; ctx.font='700 3.2px Inter,sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(lab,p[0],p[1]+.2);
  }
  function drawOpts(t){
    if (!showOpts || !layout) return;
    var pu=.5+.5*Math.sin(t/260), i;
    for(i=0;i<optList.length;i++){
      var o=optList[i], spot=layout.opts[o.id], lab=layout.labels[o.id];
      if(!spot) continue;
      ctx.save(); ctx.globalAlpha=.22+.12*pu; ctx.strokeStyle='#cfd6e0'; ctx.lineWidth=.8;
      ctx.setLineDash([2.4,2.4]); ctx.beginPath();
      ctx.moveTo(puck[0],puck[1]); ctx.lineTo(spot[0],spot[1]); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha=.75; ctx.strokeStyle='#e8edf4'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.arc(spot[0],spot[1],7.4+pu,0,6.283); ctx.stroke(); ctx.restore();
      ctx.font='800 3.5px Inter,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      plate(lab[0],lab[1],ctx.measureText(o.label).width+5,5.8,1.6,.86);
      ctx.fillStyle='rgba(255,255,255,.93)'; ctx.fillText(o.label,lab[0],lab[1]);
    }
  }
  function bar(x,y,w,h,v,col){
    ctx.fillStyle='rgba(255,255,255,.10)'; rr(x,y,w,h,h/2); ctx.fill();
    var f=Math.max(0,Math.min(1,v/100));
    if(f>0.01){ ctx.fillStyle=col; rr(x,y,Math.max(h,w*f),h,h/2); ctx.fill(); }
  }
  function wearCol(v){ return v>78?C.bad : v>50?C.warn : C.good; }
  /* Viewport-pinned: bars and banners must not scroll away with the ice. */
  function drawHud(dt){
    var top = cam + 4, bot = cam + VH - 8;
    /* Backing strips: without them a blue line under the bars reads as a full
     * wear bar, which is exactly the wrong thing to misread. */
    var g1 = ctx.createLinearGradient(0, cam, 0, cam + 14);
    g1.addColorStop(0, 'rgba(8,9,12,.92)'); g1.addColorStop(1, 'rgba(8,9,12,0)');
    ctx.fillStyle = g1; ctx.fillRect(0, cam, VW, 14);
    var g2 = ctx.createLinearGradient(0, cam + VH, 0, cam + VH - 14);
    g2.addColorStop(0, 'rgba(8,9,12,.92)'); g2.addColorStop(1, 'rgba(8,9,12,0)');
    ctx.fillStyle = g2; ctx.fillRect(0, cam + VH - 14, VW, 14);
    ctx.font='700 3px Inter,sans-serif'; ctx.textBaseline='middle';
    ctx.textAlign='left';
    ctx.fillStyle='rgba(214,59,71,.9)'; ctx.fillText('THEM', 5, top+2.4);
    bar(17, top+1, 30, 2.6, wear.themF, wearCol(wear.themF));
    bar(17, top+4.4, 30, 2.6, wear.themD, wearCol(wear.themD));
    ctx.fillStyle='rgba(179,179,179,.7)'; ctx.font='600 2.4px Inter,sans-serif';
    ctx.fillText('F', 48.5, top+2.3); ctx.fillText('D', 48.5, top+5.7);
    ctx.textAlign='right'; ctx.font='800 4.4px Inter,sans-serif'; ctx.fillStyle='#fff';
    ctx.fillText(score.us + ' - ' + score.them, 92, top+4);

    ctx.textAlign='left'; ctx.font='700 3px Inter,sans-serif';
    ctx.fillStyle='rgba(13,132,216,.95)'; ctx.fillText('YOU', 5, bot-2.4);
    bar(17, bot-5.6, 30, 2.6, wear.usF, wearCol(wear.usF));
    bar(17, bot-2.2, 30, 2.6, wear.usD, wearCol(wear.usD));
    ctx.fillStyle='rgba(179,179,179,.7)'; ctx.font='600 2.4px Inter,sans-serif';
    ctx.fillText('F', 48.5, bot-4.3); ctx.fillText('D', 48.5, bot-.9);
  }
  function drawStamp(dt){
    if(!stamp) return; stamp.t+=dt;
    var u=easeOut(clamp(stamp.t/190,0,1)), sc=1.45+(1-1.45)*u;
    var a=clamp(stamp.t/90,0,1)*clamp(2.6-stamp.t/1200,0,1);
    if(a<=0){ stamp=null; return; }
    ctx.save(); ctx.globalAlpha=a; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.font='900 7px Inter,sans-serif';
    var y=cam+28, tw=ctx.measureText(stamp.txt).width*sc;
    plate(48,y,Math.max(tw,50)+11,15,2.5,.88);
    ctx.save(); ctx.translate(48,y-2.4); ctx.scale(sc,sc);
    ctx.fillStyle=stamp.col; ctx.fillText(stamp.txt,0,0); ctx.restore();
    ctx.fillStyle='rgba(255,255,255,.78)'; ctx.font='600 3px Inter,sans-serif';
    ctx.fillText(stamp.sub,48,y+4.2); ctx.restore();
  }
  function drawFloats(dt){
    for(var i=floats.length-1;i>=0;i--){ var f=floats[i]; f.t+=dt;
      if(f.t>1200){ floats.splice(i,1); continue; }
      ctx.save(); ctx.globalAlpha=clamp(1-f.t/1200,0,1)*clamp(f.t/120,0,1);
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font='800 3.8px Inter,sans-serif';
      var y=f.y-(f.t/1200)*10;
      plate(f.x,y,ctx.measureText(f.txt).width+4,5.4,1.6,.72);
      ctx.fillStyle=f.col; ctx.fillText(f.txt,f.x,y); ctx.restore(); }
  }
  function drawFx(dt){
    for(var i=fx.length-1;i>=0;i--){ var f=fx[i]; f.l-=dt;
      if(f.l<=0){ fx.splice(i,1); continue; }
      f.x+=f.vx*dt; f.y+=f.vy*dt; f.vx*=.962; f.vy*=.962;
      ctx.globalAlpha=clamp(f.l/f.m,0,1)*.85; ctx.fillStyle=f.col;
      ctx.beginPath(); ctx.arc(f.x,f.y,f.r*(f.l/f.m),0,6.283); ctx.fill(); }
    ctx.globalAlpha=1;
  }
  function drawFlash(dt){ if(!flash) return; flash.t+=dt;
    if(flash.t>200){ flash=null; return; } var u=flash.t/200;
    ctx.save(); ctx.globalAlpha=(1-u)*(1-u); ctx.strokeStyle='#fff'; ctx.lineWidth=3.4*(1-u)+.3;
    ctx.beginPath(); ctx.arc(flash.x,flash.y,2+flash.max*easeOut(u),0,6.283); ctx.stroke();
    ctx.strokeStyle=C.warn; ctx.lineWidth=1.6*(1-u);
    ctx.beginPath(); ctx.arc(flash.x,flash.y,1+flash.max*.55*easeOut(u),0,6.283); ctx.stroke(); ctx.restore(); }
  function drawBoard(dt){ if(!board) return; board.t+=dt;
    if(board.t>420){ board=null; return; } var u=board.t/420;
    ctx.save(); ctx.globalAlpha=(1-u)*.7; ctx.strokeStyle='#fff'; ctx.lineWidth=.5+1.5*(1-u);
    ctx.beginPath(); ctx.arc(RL,board.y,5+u*9,-1.15,1.15); ctx.stroke(); ctx.restore(); }

  /* -------------------------------------------------------------- tick */
  function tick(dt, weHaveIt) {
    var cd = camTo - cam, move = cd * Math.min(dt / 140, 1), capm = dt * 0.40;
    if (Math.abs(move) > capm) move = move < 0 ? -capm : capm;   // ~475ms end to end
    cam += move;
    var frozen = hitstop > 0;
    if (frozen) hitstop -= dt;

    if (tl && !frozen) {
      tl.t += dt;
      if (tl.kind === 'faceoff') {
        /* Everyone skates to the dot, the puck is carried there with them, it
         * is dropped, and the winner sweeps it back. Snapping the puck to the
         * dot was a 78-unit teleport, a quarter of the sheet in one frame. */
        var fu = easeIO(clamp(tl.t / 480, 0, 1));
        if (pos.C)  pos.C  = LP(tl.fromUs,   [tl.dot[0] - 4.5, tl.dot[1] + 2], fu);
        if (pos.F1) pos.F1 = LP(tl.fromThem, [tl.dot[0] + 4.5, tl.dot[1] - 2], fu);
        if (tl.t <= 520) puck = LP(tl.puckFrom, tl.dot, easeIO(clamp(tl.t / 520, 0, 1)));
        else if (tl.t <= 700) {
          puck = tl.dot.slice();
          if (!tl.dropped) { tl.dropped = true; drop = { t: 0 };
            flash = { x: tl.dot[0], y: tl.dot[1], t: 0, max: 7 }; tone(880, .08, .06); }
        } else {
          var wu = easeOut(clamp((tl.t - 700) / 400, 0, 1));
          puck = LP(tl.dot, tl.carrier, wu);
          if (!tl.won) { tl.won = true; tone(620, .08, .06); }
        }
        var fcam = clamp(puck[1] - VH*0.55, 0, WB - VH);
        camTo = fcam + (layout.cam - fcam) * clamp((tl.t - 700) / 400, 0, 1);
        if (tl.t >= tl.dur) { camTo = layout.cam; var fd = tl.onDone; tl = null; if (fd) fd(); }
      } else if (tl.kind === 'pan') {
        var u = clamp(tl.t/tl.dur, 0, 1), k;
        var carry  = easeIO(clamp(u / 0.72, 0, 1));          // the skate up ice
        var settle = easeIO(clamp((u - 0.30) / 0.70, 0, 1));  // taking your spot
        for (k in tl.to) {
          var o = (tl.from && tl.from[k]) || tl.to[k];
          pos[k] = LP([o[0] + tl.delta[0]*carry, o[1] + tl.delta[1]*carry], tl.to[k], settle);
        }
        /* Ride the puck ONTO the new carrier rather than snapping to him. He
         * starts at his previous-beat position, which can be most of a zone
         * away, so assigning the puck to him teleported it on frame one. */
        var cp = (layout.puckAt && pos[layout.puckAt]) ? pos[layout.puckAt]
               : [tl.puckFrom[0] + tl.delta[0]*carry, tl.puckFrom[1] + tl.delta[1]*carry];
        puck = LP(tl.puckFrom, cp, easeIO(clamp(u / 0.45, 0, 1)));
        /* The camera rides the puck across the line and only then settles on
         * the beat's framing, so it never arrives before the players do. */
        var follow = clamp(puck[1] - VH*0.55, 0, WB - VH);
        camTo = follow + (layout.cam - follow) * settle;
        if (tl.t >= tl.dur) { camTo = layout.cam; tl = null; }
      } else {
        while (tl.i < tl.events.length && tl.events[tl.i].t <= tl.t) fireEvent(tl.events[tl.i++], tl.meta);
        if (tl.puckFrom && tl.t >= tl.puckT0) {
          var pu = easeIO(clamp((tl.t - tl.puckT0)/(tl.puckT1 - tl.puckT0),0,1));
          puck = LP(tl.puckFrom, tl.puckTo, pu);
        }
        if (tl.closer && tl.t >= tl.closer.t0) {
          var cu = clamp((tl.t - tl.closer.t0)/(tl.closer.t1 - tl.closer.t0),0,1);
          pos[tl.closer.key] = LP(tl.closer.from, tl.closer.to, cu*cu);   // accelerates in
        }
        if (tl.t >= tl.dur) { var d = tl.onDone; tl = null; if (d) d(); }
      }
    }
    draw(dt, weHaveIt);
  }

  function draw(dt, weHaveIt) {
    ctx.save();
    if (shakeX>.05||shakeY>.05){ ctx.translate((Math.random()-.5)*shakeX,(Math.random()-.5)*shakeY);
      shakeX*=.86; shakeY*=.86; }
    ctx.clearRect(-12,-12,VW+24,VH+24);
    ctx.translate(0,-cam);
    drawRink();
    drawCover(tl && tl.kind==='events' ? .45 : 1, weHaveIt);
    drawOpts(performance.now ? performance.now() : Date.now());
    drawBoard(dt);
    var k;
    if (layout) {
      for (k in layout.them) if (pos[k]) drawPlayer(pos[k], C.them, C.themDim, k.charAt(0)==='X'?'D':k);
      for (k in layout.us) if (pos[k]) drawPlayer(pos[k], C.us, C.usDim, (k==='D1'||k==='D2')?'D':k);
    }
    ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(puck[0],puck[1],2.1,0,6.283); ctx.fill();
    ctx.fillStyle=C.puck; ctx.beginPath(); ctx.arc(puck[0],puck[1],1.5,0,6.283); ctx.fill();
    drawFlash(dt); drawFx(dt); drawDrop(dt); drawDim(); drawFloats(dt); drawHud(dt); drawStamp(dt);
    ctx.restore();
  }

  /* Which option did that tap hit? Generous radius; labels are targets too. */
  function hitTest(clientX, clientY) {
    if (!showOpts || !layout) return null;
    var r = cv.getBoundingClientRect();
    var x = (clientX - r.left)/r.width*VW, y = (clientY - r.top)/r.height*VH + cam;
    var bestId = null, bd = 1e9, i;
    for (i=0;i<optList.length;i++){
      var o=optList[i], s=layout.opts[o.id], l=layout.labels[o.id]; if(!s) continue;
      var d=Math.min(Math.hypot(s[0]-x,s[1]-y), Math.hypot(l[0]-x,l[1]-y));
      if(d<bd){ bd=d; bestId=o.id; }
    }
    return bd < 15 ? bestId : null;
  }
  function spotOf(id){ return layout && layout.opts[id] ? layout.opts[id].slice() : puck.slice(); }

  /* For the smoothness harness: per-frame camera/puck/player positions. */
  function debug(){ var out={}, k; for(k in pos) out[k]=pos[k].slice();
    return { cam:cam, puck:puck.slice(), pos:out, beat:beatKey }; }

  return { VH:VH, setMuted:setMuted, audio:ac, whistleBreak:whistleBreak, puckDrop:puckDrop, debug:debug,
           faceoff:faceoff, init:init, fit:fit, setBeat:setBeat, setOptions:setOptions, playEvents:playEvents,
           tick:tick, hitTest:hitTest, spotOf:spotOf, banner:banner, floater:floater,
           LAYOUTS:LAYOUTS, colors:C };
})();
