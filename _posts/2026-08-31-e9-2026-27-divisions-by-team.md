---
layout: post
display_title: "E9 2026-27 Divisions: Where Every Team Landed"
title: "E9 2026-27 Divisions: Every Team, by Birth Year"
description: "The full E9 2026-27 division list: all 29 boys groups and 5 girls groups from the parity round, every team, plus a map of the league's six-state footprint."
date: 2026-08-31
last_modified_at: 2026-08-31
categories: [insights]
tags: [E9 hockey, Elite 9 Hockey League, E9 divisions, E9 2026-27, E9 teams, E9 Elite division, E9 parity, Massachusetts youth hockey, youth hockey in New England, boys hockey, girls hockey, youth hockey parent guide]
author: "Coach Scott"
excerpt: "Every E9 team, sorted into its 2026-27 division. 29 boys groups, 5 girls groups, and a map showing how far outside Massachusetts the league now reaches."
image:
  path: /img/blog/e9-divisions-2026-27.jpg
  alt: "E9 Divisions 2026-27: a grid of birth years from 2012 to Mite, each row showing its Elite, White, Blue and Red divisions as colored chips, over rink line art"
permalink: /blog/e9-divisions-by-team/
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

The May parity round decided it, and the league has now posted it: every E9 team is sorted into its division for 2026-27. This page is the list, in one place, so you don't have to scroll a standings widget on your phone in a rink parking lot.

If you want the explanation of what the divisions *mean*, and why the structure changed this year, read the [E9 season guide](/blog/e9-hockey-season-guide/) first. The short version: **there's a new Elite tier above White, and the number of tiers now depends on your birth year.** This page is just the placements.

> **What this is.** A snapshot of the division groupings as the league published them for 2026-27, taken 2026-08-31. Records are all 0-0-0 right now because the season hasn't started. For live standings once games are being played, use the league's own [boys](https://www.elite9hockey.com/pages/standings/boys-2026-27/){:target="_blank" rel="noopener"} and [girls](https://www.elite9hockey.com/pages/standings/girls-2026-27/){:target="_blank" rel="noopener"} pages.

## The E9 Footprint Is Bigger Than "Massachusetts Hockey"

Most parents think of the E9 as a Massachusetts league with a few neighbors attached. For 2026-27 it spans **six states**: Massachusetts, New Hampshire, Vermont, Rhode Island, Maine, and New York.

That matters for one practical reason. Your division's team list is your travel schedule. A 2013 team in Elite is sharing a division with programs from Vermont and New York. A 2016 team in Red is playing a much tighter geographic loop. Check the list before you assume.

Use the toggle to separate the Massachusetts clubs from the out-of-state ones. Click any marker for what that organization is called in the standings.

<div id="e9-footprint-map" style="height: 560px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('e9-footprint-map').setView([43.0, -71.6], 7);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 13
	}).addTo(map);

	function marker(lat, lng, color, name, town, note) {
		return L.circleMarker([lat, lng], {
			radius: 8,
			fillColor: color,
			color: '#ffffff',
			weight: 2,
			opacity: 1,
			fillOpacity: 0.9
		}).bindPopup(
			'<strong>' + name + '</strong><br>' + town +
			'<br><span style="font-size:0.92em">' + note + '</span>'
		);
	}

	var MA = '#a51c30';
	var OUT = '#0ca678';

	var massachusetts = L.layerGroup([
		marker(42.2418, -70.8898, MA, 'Boston Advantage', 'Hingham, MA', 'Appears as <strong>Advantage</strong> in the standings. Present at nearly every birth year.'),
		marker(42.4648, -71.0101, MA, 'Boston Americans', 'Saugus, MA', 'Appears as <strong>Americans</strong>.'),
		marker(42.6106, -71.2342, MA, 'Boston Junior Rangers', 'Tewksbury, MA', 'Appears as <strong>Jr. Rangers</strong>.'),
		marker(41.6525, -70.2884, MA, 'Cape Cod Seahawks', 'Hyannis, MA', 'Appears as <strong>Seahawks</strong>.'),
		marker(42.4906, -71.2767, MA, 'East Coast Wizards', 'Bedford, MA', 'Appears as <strong>Wizards</strong>. An E9 charter organization.'),
		marker(41.9445, -71.2856, MA, '95 Giants', 'Attleboro, MA', 'Appears as <strong>Giants - West</strong> and <strong>Giants East</strong>. Both are branches of the same Attleboro club, not separate organizations.'),
		marker(42.3470, -71.1564, MA, 'Greater Boston Jr Bruins', 'Brighton, MA', 'Appears as <strong>Jr. Bruins</strong>.'),
		marker(42.3889, -71.2203, MA, 'Jr. Falcons Hockey Club', 'Waltham, MA', 'Appears as <strong>Junior Falcons</strong>. New to the E9 for 2026-27, playing out of Bentley Arena.'),
		marker(42.2300, -70.9100, MA, 'Lovell Winter Club', 'Hingham, MA', 'Appears as <strong>Winter Club</strong>.'),
		marker(42.3702, -71.0395, MA, 'Middlesex Icemen', 'East Boston, MA', 'Appears as <strong>Icemen</strong>.'),
		marker(41.9484, -71.0481, MA, 'New England Knights', 'Raynham, MA', 'Appears as <strong>NE Knights</strong>. Expanded its South Shore footprint for this season.'),
		marker(42.2968, -71.2924, MA, 'North American Hockey Academy', 'Wellesley, MA', 'Appears as <strong>NAHA Jr. Hawks</strong>, on the girls side.'),
		marker(42.4584, -71.3956, MA, 'Assabet Valley Patriots', 'West Concord, MA', 'Appears as <strong>Patriots</strong>.'),
		marker(42.1070, -72.6204, MA, 'Springfield Jr Thunderbirds', 'West Springfield, MA', 'Appears as <strong>Thunderbirds</strong>. The Western Massachusetts entry.'),
		marker(42.7762, -71.0773, MA, 'Valley Jr Warriors', 'Haverhill, MA', 'Appears as <strong>Warriors</strong>. An E9 charter organization.'),
		marker(42.1418, -71.2495, MA, 'Walpole Express', 'Walpole, MA', 'Appears as <strong>Express</strong>. Not to be confused with Westchester Express.'),
		marker(42.2626, -71.8023, MA, 'Worcester Jr Railers', 'Worcester, MA', 'Appears as <strong>Railers</strong>.')
	]);

	var outOfState = L.layerGroup([
		marker(43.0906, -71.4653, OUT, 'NH Avalanche', 'Hooksett, NH', 'Appears as <strong>Avalanche</strong>. An E9 charter organization, based at the Ice Den Arena.'),
		marker(42.7648, -71.4162, OUT, 'Northern Cyclones', 'Hudson, NH', 'Appears as <strong>Cyclones</strong>, on the girls side.'),
		marker(44.4436, -73.1879, OUT, 'Vermont Jr. Catamounts', 'Essex Junction / S. Burlington, VT', 'Appears as <strong>VT Jr. Catamounts</strong>. Skates out of Cairns Arena in South Burlington.'),
		marker(41.6970, -71.5228, OUT, 'Rhode Island Saints', 'West Warwick, RI', 'Appears as <strong>Saints</strong>.'),
		marker(43.7259, -70.2420, OUT, 'Casco Bay Hockey', 'Falmouth, ME', 'Appears as <strong>Casco Bay</strong>. The northernmost club in the league and the largest youth organization in Maine.'),
		marker(41.3976, -73.6179, OUT, 'Westchester Express', 'Brewster, NY', 'Appears as <strong>Westchester Express</strong>. The only New York club, and the longest trip on most schedules.')
	]);

	massachusetts.addTo(map);
	outOfState.addTo(map);

	L.control.layers(null, {
		'Massachusetts clubs': massachusetts,
		'Out-of-state clubs': outOfState
	}, { collapsed: false }).addTo(map);

	var legend = L.control({position: 'bottomright'});
	legend.onAdd = function() {
		var div = L.DomUtil.create('div', '');
		div.style.cssText = 'background:white;padding:10px 14px;border-radius:6px;font-size:0.82em;line-height:1.7;box-shadow:0 1px 5px rgba(0,0,0,0.2)';
		div.innerHTML =
			'<strong style="display:block;margin-bottom:4px;color:#222">E9 Organizations</strong>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#a51c30;margin-right:6px;vertical-align:middle"></span><span style="color:#222">Massachusetts</span><br>' +
			'<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#0ca678;margin-right:6px;vertical-align:middle"></span><span style="color:#222">NH, VT, RI, ME, NY</span>';
		return div;
	};
	legend.addTo(map);
})();
</script>

> **Important note:** Markers are approximate organizational home bases, not every rink a club uses. Several of these programs skate out of multiple facilities.

If you want the deeper competitive picture on the Massachusetts organizations specifically, with MyHockeyRankings snapshots, that lives in the [E9 map and organization guide](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/).

## How to Read the Team Names

The league's team names carry information most parents never get told. Decoding them saves a lot of confusion:

| What you see | What it means |
|---|---|
| **`- E`** | The organization's **Elite** team at that age. These dominate the Elite and White divisions. |
| **`- S`** | The organization's **Select** team, a tier below Elite inside the same club. These fill the Blue and Red divisions. |
| **`- E 1`, `- S 2`** | A club fielding more than one team at that level. Advantage carries two Select teams at 2013, so they're numbered. |
| **`T1` / `T2`** | The girls-side equivalent of Elite / Select. `Advantage U14 - T1` and `Advantage U14 - T2` are two different teams at the same club and age. |
| **`Major` / `Minor`** | Used by a few girls programs in place of T1 / T2. |
| **`Giants - West`, `Giants East`** | Branches of the 95 Giants club in Attleboro, not separate organizations. |
| **`U14F` / `U14H`** | Appears at the 2012 birth year only, a holdover from the league's age-group labeling. Treat it as part of the team name. |

Two names that catch people out: **Express** is Walpole Express in Massachusetts, while **Westchester Express** is a different club entirely, in Brewster, New York. And **Winter Club** is Lovell Winter Club in Hingham, which is distinct from Lovell Academy.

{% include map-cta.html %}

## Boys Divisions, 2026-27

Twenty-nine groups across eight birth-year bands. Find your birth year, then your club.

Remember that the tier ladder runs **Elite, White, Blue, Red**, and that not every birth year uses all four. Where a tier is split North and South, those are the stronger and weaker halves of that tier, decided by parity results, not geography.

#### 2012 birth year

| Division | Teams |
|---|---|
| **Elite** (8) | Advantage U14F - E 1, Americans U14H - E, Railers U14F - E, Saints U14H - E, Thunderbirds U14F - E, VT Jr. Catamounts U14H - E, Warriors U14H - E, Wizards U14H - E |
| **White** (9) | Casco Bay U14H - E, Giants - West U14F - E, Icemen U14F - E, Jr. Bruins U14F - E, Jr. Rangers U14F - E, Junior Falcons 12 - E, Patriots U14F - S, Patriots U14H - E, Railers U14F - S |
| **Blue** (9) | Advantage U14F - S, Express U14F - E, Giants - West U14F - S, NE Knights U14F - E, Saints U14H - S, Thunderbirds U14H - E, Warriors U14F - E, Winter Club U14F - S, Wizards U14H - S |

#### 2013 birth year

The most finely split age group in the league, with five separate divisions.

| Division | Teams |
|---|---|
| **Elite** (11) | Advantage 13 - E, Americans 13 - E, Icemen 13 - E, Jr. Bruins 13 - E, Patriots 13 - E, Railers 13 - E, Seahawks 13 - E, Thunderbirds 13 - E 1, VT Jr. Catamounts 13 - E, Westchester Express 13 - E, Wizards 13 - E |
| **White North** (6) | Avalanche 13 - E, Casco Bay 13 - E, Giants - West 13 - E, Junior Falcons 13 - E, Saints 13 - E, Warriors 13 - E |
| **White South** (7) | Express 13 - E, Jr. Rangers 13 - E, Patriots 13 - S, VT Jr. Catamounts 13 - S, Warriors 13 - S, Westchester Express 13 - S, Winter Club 13 - S |
| **Blue North** (6) | Avalanche 13 - S, Express 13 - S, Icemen 13 - S, Railers 13 - S 1, Thunderbirds 13 - E 2, Wizards 13 - S |
| **Blue South** (6) | Advantage 13 - S 1, Advantage 13 - S 2, Giants - West 13 - S, Railers 13 - S 2, Saints 13 - S, Thunderbirds 13 - S |

#### 2014 birth year

| Division | Teams |
|---|---|
| **Elite** (9) | Casco Bay 14 - E, Junior Falcons 14 - E, Patriots 14 - E, Thunderbirds 14 - E, VT Jr. Catamounts 14 - E, Warriors 14 - E, Winter Club 14 - E, Winter Club 15 - E, Wizards 14 - E |
| **White** (10) | Advantage 14 - S 1, Americans 14 - E, Avalanche 14 - E, Express 14 - E, Giants - West 14 - E, Jr. Bruins 14 - E, Jr. Rangers 14 - E, Patriots 14 - S, Seahawks 14 - E, Winter Club 14 - S 1 |
| **Blue** (9) | Express 14 - S, Giants - West 14 - S 1, Icemen 14 - E, NE Knights 14 - E, Railers 14 - S 1, VT Jr. Catamounts 14 - S, Warriors 14 - S, Westchester Express 14 - E, Wizards 14 - S |
| **Red** (8) | Advantage 14 - S 2, Giants - West 14 - S 2, Giants - West 14 - S 3, NE Knights 14 - S, Railers 14 - S 2, Saints 14 - E, Thunderbirds 14 - S, Winter Club 14 - S 2 |

#### 2015 birth year

The only age group where the **Elite** tier itself is split North and South.

| Division | Teams |
|---|---|
| **Elite North** (8) | Advantage 15 - E, Casco Bay 15 - E, Jr. Bruins 15 - E, Jr. Rangers 15 - E, Thunderbirds 15 - E 1, Warriors 15 - E, Westchester Express 15 - E, Wizards 15 - E |
| **Elite South** (6) | Americans 15 - E, Icemen 15 - E, Junior Falcons 15 - E, Patriots 15 - E, Saints 15 - E, Seahawks 15 - E |
| **White** (9) | Advantage 15 - S, Avalanche 15 - E, Express 15 - E, NE Knights 15 - E, Railers 15 - E, Railers 15 - S, Westchester Express 15 - S, Winter Club 15 - S, Wizards 15 - S |
| **Blue** (8) | Avalanche 15 - S, Icemen 15 - S, NE Knights 15 - S, Patriots 15 - S, Saints 15 - S, Thunderbirds 15 - E 2, Thunderbirds 15 - S, Warriors 15 - S |

#### 2016 birth year

| Division | Teams |
|---|---|
| **Elite** (9) | Advantage 16 - E, Americans 16 - E, Avalanche 16 - E 1, Casco Bay 16 - E, Junior Falcons 16 - E, Patriots 16 - E, Railers 16 - E, VT Jr. Catamounts 16 - E, Warriors 16 - E |
| **White** (6) | Avalanche 16 - E 2, Icemen 16 - E, Jr. Bruins 16 - E, Jr. Rangers 16 - E, Railers 16 - S 1, Winter Club 16 - E |
| **Blue** (8) | Advantage 16 - S, Giants - West 16 - E, Icemen 16 - S, Patriots 16 - S, Seahawks 16 - E, Thunderbirds 16 - E, Winter Club 16 - S 1, Wizards 16 - E |
| **Red** (6) | Express 16 - E, NE Knights 16 - E, Railers 16 - S 2, Thunderbirds 16 - S, Winter Club 16 - S 2, Wizards 16 - S |

#### 2017 birth year

| Division | Teams |
|---|---|
| **Elite** (7) | Advantage 17 - E, Americans 17 - E, Jr. Rangers 17 - E, Junior Falcons 17 - E, Railers 17 - E, Winter Club 17 - E, Wizards 17 - E |
| **White** (10) | Casco Bay 17 - E, Giants - West 17 - E, Icemen 17 - E, Jr. Bruins 17 - E, NE Knights 17 - E, Patriots 17 - E, Seahawks 17 - E, VT Jr. Catamounts 17 - E, Warriors 17 - E, Westchester Express 17 - E |
| **Blue** (9) | Advantage 17 - S, Avalanche 17 - E, Express 17 - E, Patriots 17 - S, Railers 17 - S 1, Warriors 17 - S, Winter Club 17 - S 1, Winter Club 17 - S 2, Wizards 17 - S |

#### 2018 birth year

| Division | Teams |
|---|---|
| **Elite** (8) | Advantage 18 - E, Americans 18 - E, Casco Bay 18 - E, Junior Falcons 18 - E, Patriots 18 - E, Railers 18 - E, Warriors 18 - E, Winter Club 18 - E |
| **White** (7) | Avalanche 18 - E, Icemen 18 - E, Jr. Bruins 18 - E, Seahawks 18 - E, Thunderbirds 18 - E, Westchester Express 18 - E, Wizards 18 - E |

#### Mite divisions

The Mite groups sit alongside the birth-year groups rather than underneath them, and they mix 2018, 2019, and 2020 teams. If your 2018 isn't in the list above, check here.

| Division | Teams |
|---|---|
| **Mite Elite** (7) | Advantage 19 - E, Americans 19 - E, Express 18 - E, Junior Falcons 19 - E, Railers 18 - S, Railers 19 - E, Westchester Express 19 - E |
| **Mite White** (7) | Advantage 18 - S, Avalanche 18 - S, Giants - West 18 - E, Jr. Rangers 18 - E, NE Knights 18 - E, Patriots 18 - S, Patriots 19 - E |
| **Mite Blue** (8) | Advantage 20 - E 1, Americans U8 Girls - T1, Jr. Bruins 19 - E, Railers 19 - S, Thunderbirds 18 - S, Warriors 19 - E, Winter Club 19 - E, Wizards 18 - S |
| **Mite Red** (9) | Advantage 19 - S, Avalanche 19 - E, Icemen 19 - E, Junior Falcons U8 Girls - T1, NE Knights 19 - E, Thunderbirds 19 - E, Winter Club 18 - S, Winter Club 19 - S, Wizards 19 - E |

Worth noting: two U8 girls teams (Americans and Junior Falcons) are placed in the Mite divisions rather than in the girls structure.

## Girls Divisions, 2026-27

The girls side doesn't use the color tiers at all. It runs by age group with a North and South split, and the tier within a club is carried by the T1 / T2 designation on the team name.

| Division | Teams |
|---|---|
| **U14 North** (6) | Advantage U14 - T1, Americans U14 Girls - Major, NAHA Jr. Hawks U14 - T1, VT Jr. Catamounts U14 - T1, Warriors U13 Girls - T1, Warriors U14 Girls - T1 |
| **U14 South** (7) | Advantage U14 - T2, Americans U14 Girls - Minor, Cyclones U14 - T1, Giants East U14 - T1, NAHA Jr. Hawks U14 - T2, Warriors U14 Girls - T2, Winter Club U14 - T2 |
| **U12 North** (6) | Advantage U12 - T 1, Americans U12 Girls - Major 1, NAHA Jr. Hawks U12 - T1, Warriors U12 Girls - T1, Warriors U12 Girls - T2, Winter Club U12 - T2 |
| **U12 South** (6) | Advantage U12 - T2, Americans U12 Girls - Major 2, Junior Falcons U12 Girls - T1, NAHA Jr. Hawks U12 - T2, VT Jr. Catamounts U12 - T2, Warriors U12 Girls - T2 |
| **U10 North** (7) | Advantage U10 - T1, Americans U10 Girls - Major, Americans U10 Girls - Major 2, Junior Falcons U10 Girls - T1, NAHA Jr. Hawks U10 - T2, Warriors U10 Girls - T1, Warriors U10 Girls - T2 |

**U10 is published with a North group only.** If a South group gets added before the season opens, it will show up on the league's girls standings page.

The girls side is also the part of the E9 that gets the least attention relative to its results: E9 girls teams took 4 of the 7 Massachusetts bids to the USA Hockey Tier I and Tier II National Championships in 2025-26.

## What This List Can and Can't Tell You

**It tells you who you're playing.** That's the real value. Your division list is your season, your travel, and your competition level in one place.

**It doesn't tell you how good your team is.** Divisions are built to be internally even, so a first-place record in Blue and a last-place record in Elite can describe very similar teams. For cross-division comparison you want ratings, not standings. [MyHockeyRankings' E9 page](https://myhockeyrankings.com/league-info?l=567){:target="_blank" rel="noopener"} is the tool for that, and we used it to build the [New England program rankings](/blog/2026/04/15/top-new-england-boys-hockey-programs-ranked/).

**It's a placement snapshot, not a live document.** Leagues move teams. If something here doesn't match what your coach told you, the league's pages are the authority, and I'd appreciate the correction.

## Make the Season Count

You now know who your player is playing for the next six months. The part that's easy to lose is what actually happened in those games.

Thirty-plus games go by, and by March most of them have blurred together. The families and coaches who get the most out of a season are the ones who keep a little of it: clips of the shifts worth talking about, notes on what's improving, moments a kid can look at and learn from.

That's what we built Scout Elite for. Parents and coaches in exactly these divisions, turning game video into development in minutes, without a video staff.

<div style="margin: 1.5em 0; text-align: center;">
{% include xpress-cta.html placement="blog-post-cta" text="Try Scout Elite Free &rarr; No Signup" style="font-size:1.2em;padding:0.7em 2em;" %}
</div>

*Division placements captured from the league's published 2026-27 standings pages on 2026-08-31. Spot something wrong or out of date? Reach out.*

---

{% include ma-hockey-guide-series.html current="divisions" %}
