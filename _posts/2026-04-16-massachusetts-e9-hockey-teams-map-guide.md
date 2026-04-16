---
layout: post
display_title: "Massachusetts Youth Hockey Teams: E9 Organizations Map and Guide"
title: "Youth Hockey Organizations in MA: E9 Guide & Map"
description: "Interactive map and parent guide to the 17 E9 youth hockey organizations in Massachusetts. Home bases, competitive snapshots, and what the E9 landscape actually looks like."
date: 2026-04-16
categories: [insights]
tags: [E9 hockey, Elite 9 Hockey League, Massachusetts youth hockey, boys hockey, Massachusetts hockey teams, youth hockey teams Massachusetts, youth hockey organizations in MA, youth hockey in New England, E9 map, hockey clubs Massachusetts, youth hockey guide]
author: "Coach Scott"
excerpt: "Interactive map and parent guide to the 17 E9 youth hockey organizations in Massachusetts, with competitive snapshots from the 2025-26 season."
image: "/img/blog/finding-the-pass.jpg"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

If you're comparing **youth hockey organizations in MA** and keep hearing about the E9, this is the page meant to make that picture simpler.

The **Elite 9 Hockey League** is one of the more recognizable brands in **youth hockey in New England**, but the useful question for most families is which Massachusetts organizations are actually in it and where they are based.

This post is **Phase 2** of the larger Massachusetts hockey map project. Like the [EHF version](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/), I kept the scope tight on purpose: **Massachusetts-based E9 organizations only**. No [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/), no [PHL](/blog/2026/04/16/massachusetts-phl-hockey-teams-map-guide/), and no VHL mixed into this page. If you want the broader picture of how the E9 fits alongside those leagues, start with the [Massachusetts youth hockey leagues overview](/blog/2026/04/14/massachusetts-club-hockey-leagues-e9-ehf-guide/).

The goal here is simple: show you **who is in the E9, where they're based, and what kind of 10U, 12U, and 14U boys presence they showed in the 2025-26 Massachusetts MyHockeyRankings views used for this article**.

> **Important note:** Home locations below are approximate organizational bases, not every rink a club uses.

## Massachusetts E9 Teams Map

<div id="e9-ma-map" style="height: 520px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
	var map = L.map('e9-ma-map').setView([42.19, -71.13], 8);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		maxZoom: 13
	}).addTo(map);

	function marker(lat, lng, name, town, note, metrics) {
		return L.circleMarker([lat, lng], {
			radius: 8,
			fillColor: '#a51c30',
			color: '#ffffff',
			weight: 2,
			opacity: 1,
			fillOpacity: 0.9
		}).bindPopup(
			'<strong>' + name + '</strong><br>' + town + '<br><span style="font-size:0.92em">' + note + '</span>' +
			(metrics ? '<br><div style="margin-top:6px;font-size:0.9em"><strong>MHR Rating</strong><br>' + metrics + '</div>' : '')
		);
	}

	var teams = [
		marker(41.9445, -71.2856, '95 Giants', 'Attleboro, MA', 'South Coast E9 organization', 'Top: 88.35<br>Bottom: 87.28<br>Avg: 87.82'),
		marker(42.4584, -71.3956, 'Assabet Valley Patriots', 'West Concord, MA', 'Longstanding MetroWest E9 program with depth across the age bands', 'Top: 90.08<br>Bottom: 83.80<br>Avg: 86.90'),
		marker(42.2418, -70.8898, 'Boston Advantage', 'Hingham, MA', 'One of the clearest E9 headline brands in the rankings used here', 'Top: 95.63<br>Bottom: 84.30<br>Avg: 88.92'),
		marker(42.4648, -71.0101, 'Boston Americans', 'Saugus, MA', 'North Shore E9 club with strong 12U and 14U visibility', 'Top: 92.57<br>Bottom: 85.68<br>Avg: 89.80'),
		marker(42.6106, -71.2342, 'Boston Junior Rangers', 'Tewksbury, MA', 'More visible at 10U than at the older ages in the ranking views used here', 'Top: 91.00<br>Bottom: 84.00<br>Avg: 86.71'),
		marker(41.6525, -70.2884, 'Cape Cod Seahawks', 'Hyannis, MA', 'Cape-based E9 organization; rankings also surface them as Cape Cod TA Seahawks', 'Top: 90.65<br>Bottom: 87.60<br>Avg: 89.12'),
		marker(42.4906, -71.2767, 'East Coast Wizards', 'Bedford, MA', 'Visible across 10U, 12U, and 14U with several Elite and Select entries', 'Top: 92.80<br>Bottom: 84.56<br>Avg: 87.72'),
		marker(42.3470, -71.1564, 'Greater Boston Jr Bruins', 'Brighton, MA', 'Balanced E9 presence across multiple age groups', 'Top: 92.33<br>Bottom: 83.20<br>Avg: 87.34'),
		marker(42.1301, -70.9162, 'Lovell Academy Lions', 'Rockland, MA', 'Listed on the E9 league page, but not a major 10U, 12U, or 14U boys presence in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
		marker(42.2418, -70.8898, 'Lovell Winter Club', 'Hingham, MA', 'Interesting profile with a very high 10U peak and a wider spread underneath it', 'Top: 99.20<br>Bottom: 83.08<br>Avg: 86.96'),
		marker(42.3702, -71.0395, 'Middlesex Icemen', 'East Boston, MA', 'Boston-based E9 organization with its clearest number at 12U', 'Top: 91.64<br>Bottom: 83.70<br>Avg: 87.65'),
		marker(41.9484, -71.0481, 'New England Knights', 'Raynham, MA', 'South Shore E9 member with more limited 10U, 12U, and 14U visibility in the ranking views used here', 'Top: 85.20<br>Bottom: 82.77<br>Avg: 83.98'),
		marker(42.2968, -71.2924, 'North American Hockey Academy', 'Wellesley, MA', 'Listed on the E9 league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
		marker(42.1070, -72.6204, 'Springfield Jr Thunderbirds', 'West Springfield, MA', 'Western Massachusetts E9 brand with strong spread across the age bands', 'Top: 93.08<br>Bottom: 81.68<br>Avg: 88.20'),
		marker(42.7762, -71.0773, 'Valley Jr Warriors', 'Haverhill, MA', 'Merrimack Valley club with strong 10U and solid depth behind it', 'Top: 92.50<br>Bottom: 83.66<br>Avg: 87.09'),
		marker(42.1418, -71.2495, 'Walpole Express', 'Walpole, MA', 'Multi-league brand with an E9 presence that showed best at 14U in the entries used here', 'Top: 89.51<br>Bottom: 81.97<br>Avg: 85.54'),
		marker(42.2626, -71.8023, 'Worcester Jr Railers', 'Worcester, MA', 'Central Massachusetts E9 organization with steady visibility across the core ages', 'Top: 89.70<br>Bottom: 84.16<br>Avg: 86.96')
	];

	teams.forEach(function(team) {
		team.addTo(map);
	});
})();
</script>

## Every Massachusetts-Based E9 Organization

There are **17 Massachusetts-based organizations** on the current MHR E9 league page. Some look like true statewide headliners in the rankings. Others feel more birth-year specific, more regional, or more visible in one band than across all three of the 10U, 12U, and 14U views.

That distinction matters. Families often treat league membership like it tells the full story. It doesn't. The useful question is always what a **specific birth year inside a specific club** looks like.

The competitive-level numbers below use **MHR Rating** from the boys 10U, 12U, and 14U Massachusetts ranking views used in this article. Because those MHR views also surface some 9U, 11U, and 13U AAA entries inside the same age-band pages, I included those entries when they were part of the visible organization snapshot and clearly tied to the same current-season structure.

| Organization | Home Base | 2025-26 Boys Snapshot | Competitive Level |
|---|---|---|---|
| [**95 Giants**](https://myhockeyrankings.com/association_info.php?a=3047) | Attleboro | Showed up in the older half of the E9 snapshot used here, with **12U Elite** at **88.35** and **14U Elite** at **87.28**. | **Top:** 88.35 · **Bottom:** 87.28 · **Avg:** 87.82 |
| [**Assabet Valley Patriots**](https://myhockeyrankings.com/association_info.php?a=238) | West Concord | One of the deeper E9 organizations in the rankings used here, with **14U Elite** at **90.08**, **12U Elite** at **90.05**, **10U Elite** at **89.6**, plus visible Select depth behind those teams. | **Top:** 90.08 · **Bottom:** 83.80 · **Avg:** 86.90 |
| [**Boston Advantage**](https://myhockeyrankings.com/association_info.php?a=1963) | Hingham | One of the clearest E9 headline programs in the statewide snapshot, led by **11U Elite** at **95.63**, **12U Elite** at **91.84**, and **10U Elite** at **90.5**. | **Top:** 95.63 · **Bottom:** 84.30 · **Avg:** 88.92 |
| [**Boston Americans**](https://myhockeyrankings.com/association_info.php?a=3350) | Saugus | Strongest in the older and middle age bands in the rankings used here, with **12U** at **92.57**, **14U** at **92.22**, and **10U** at **89.7**. | **Top:** 92.57 · **Bottom:** 85.68 · **Avg:** 89.80 |
| [**Boston Junior Rangers**](https://myhockeyrankings.com/association_info.php?a=1959) | Tewksbury | More visible at the younger end of the snapshot, highlighted by **10U AAA** at **91.0**, with lower 12U and 14U entries also appearing. | **Top:** 91.00 · **Bottom:** 84.00 · **Avg:** 86.71 |
| [**Cape Cod Seahawks**](https://myhockeyrankings.com/association_info.php?a=3215) | Hyannis | The rankings surface this club as **Cape Cod TA Seahawks**, with **12U AAA** at **90.65** and **10U AAA** at **87.6** in the views used here. | **Top:** 90.65 · **Bottom:** 87.60 · **Avg:** 89.12 |
| [**East Coast Wizards**](https://myhockeyrankings.com/association_info.php?a=2030) | Bedford | One of the more visible E9 organizations across all three core views, including **10U Elite** at **92.8**, **12U Elite** at **89.23**, and **14U Elite** at **88.63**, with added Select depth behind them. | **Top:** 92.80 · **Bottom:** 84.56 · **Avg:** 87.72 |
| [**Greater Boston Jr Bruins**](https://myhockeyrankings.com/association_info.php?a=308) | Brighton | A steady E9 presence in every band used here, led by **12U AAA** at **92.33**, **14U AAA** at **89.27**, and **10U AAA** at **89.8**. | **Top:** 92.33 · **Bottom:** 83.20 · **Avg:** 87.34 |
| [**Lovell Academy Lions**](https://myhockeyrankings.com/association_info.php?a=3750) | Rockland | Listed on the E9 league page, but it did not stand out in the 2025-26 Massachusetts 10U, 12U, and 14U boys ranking entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Lovell Winter Club**](https://myhockeyrankings.com/association_info.php?a=3724) | Hingham | One of the more unusual E9 profiles in the snapshot: **10U Elite** reached **99.2**, while the club also showed a much wider spread across **12U** and **14U** entries. | **Top:** 99.20 · **Bottom:** 83.08 · **Avg:** 86.96 |
| [**Middlesex Icemen**](https://myhockeyrankings.com/association_info.php?a=309) | East Boston | The clearest number here was **12U Elite** at **91.64**, with lower but still relevant 10U visibility behind it. | **Top:** 91.64 · **Bottom:** 83.70 · **Avg:** 87.65 |
| [**New England Knights**](https://myhockeyrankings.com/association_info.php?a=2635) | Raynham | More limited presence in the 10U, 12U, and 14U snapshot used here, with visible entries landing in the mid-80s rather than at the top of the statewide table. | **Top:** 85.20 · **Bottom:** 82.77 · **Avg:** 83.98 |
| [**North American Hockey Academy**](https://myhockeyrankings.com/association_info.php?a=4060) | Wellesley | Listed on the current E9 league page, but not a major 10U, 12U, or 14U boys presence in the ranking entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Springfield Jr Thunderbirds**](https://myhockeyrankings.com/association_info.php?a=2279) | West Springfield | A strong Western Massachusetts E9 name in the statewide snapshot, led by **12U Elite** at **93.08**, **10U Elite** at **90.7**, and solid 13U / 14U visibility. | **Top:** 93.08 · **Bottom:** 81.68 · **Avg:** 88.20 |
| [**Valley Jr Warriors**](https://myhockeyrankings.com/association_info.php?a=222) | Haverhill | Better at the younger end of the E9 snapshot, with **10U Elite** at **92.5**, plus good 12U and 13U visibility and a lower 14U mark. | **Top:** 92.50 · **Bottom:** 83.66 · **Avg:** 87.09 |
| [**Walpole Express**](https://myhockeyrankings.com/association_info.php?a=1620) | Walpole | Their strongest visible number in the snapshot was **14U Elite** at **89.51**, with lower but still present 12U and 10U E9 entries behind it. | **Top:** 89.51 · **Bottom:** 81.97 · **Avg:** 85.54 |
| [**Worcester Jr Railers**](https://myhockeyrankings.com/association_info.php?a=240) | Worcester | Consistent presence across the visible age bands, with **10U Elite** at **89.7**, **12U Elite** at **89.51**, and **14U** at **86.01**. | **Top:** 89.70 · **Bottom:** 84.16 · **Avg:** 86.96 |


## The Quick Read on the E9 Landscape

If you're new to Massachusetts boys hockey, here is the shortest honest version:

- **The E9 feels more concentrated than the EHF.** There are fewer Massachusetts organizations on the league page, and the statewide snapshot felt more top-heavy around a smaller group of clubs.
- **The clearest E9 names in the 2025-26 snapshot were Boston Advantage, Boston Americans, East Coast Wizards, Springfield Jr Thunderbirds, Assabet Valley Patriots, Greater Boston Jr Bruins, and Valley Jr Warriors.** Several of these also appear in the [national top 100 for New England](/blog/2026/04/15/top-new-england-boys-hockey-programs-ranked/).
- **There is still real geographic spread.** The E9 footprint covers the South Shore, North Shore, MetroWest, Boston area, Worcester area, the Merrimack Valley, Cape access, and Western Massachusetts.
- **Some E9 clubs were clearly stronger in one band than across all three.** That's exactly why league label alone is not enough.


## Which E9 Programs Jumped Out Most in the 2025-26 Massachusetts Rankings?

### The clearest statewide E9 names

These were the organizations that were hardest to miss in the 10U, 12U, and 14U ranking views used for this post:

- **Boston Advantage**
- **Boston Americans**
- **East Coast Wizards**
- **Springfield Jr Thunderbirds**
- **Assabet Valley Patriots**
- **Greater Boston Jr Bruins**
- **Valley Jr Warriors**

That doesn't mean they are the only E9 clubs worth looking at. It means they were the most obvious in the specific statewide views used for this page.

### The clubs with more age-specific or uneven profiles

Several organizations showed a more selective pattern in the visible rankings:

- **Lovell Winter Club**
- **Middlesex Icemen**
- **Boston Junior Rangers**
- **Walpole Express**
- **95 Giants**
- **Cape Cod Seahawks**
- **Worcester Jr Railers**
- **New England Knights**

For parents, this category matters a lot. Some of these clubs may be a very real fit for one birth year and much less compelling for another.


## A Few Parent-Level Takeaways

**1. E9 membership does not tell you enough by itself.**

You still need to know the **specific birth year**, the **team tier**, and how stable that team's environment is.

**2. Several E9 organizations had strong top-end teams, but the depth profiles varied a lot.**

Some clubs stayed fairly consistent across the visible entries. Others had one standout number and a much wider spread underneath it.

**3. Geography still narrows the real choice set.**

Even if a badge looks attractive on paper, commute and rink mix still shape the day-to-day experience more than families like to admit.

**4. You should read the rating snapshots as direction, not destiny.**

The table helps you orient quickly, but it should always be followed by a closer look at coaches, roster stability, development fit, and what that exact birth year looks like right now.


## Methodology

This post uses:

- the **official MHR E9 league page** for organization membership
- Massachusetts **10U, 12U, and 14U boys rankings** from the 2025-26 season
- approximate organizational home bases for the map

Important caveat: the current MHR age-band views also surface some **9U, 11U, and 13U AAA** entries inside those 10U, 12U, and 14U pages. Where those entries were clearly part of the same organization's visible current-season snapshot, I included them in the top / bottom / average numbers above rather than pretending the pages were perfectly age-isolated.

This is intentionally an **organization guide**, not a claim that every team at every age in every club is equivalent.


## What Comes Next

The next logical phase was the [**PHL companion post**](/blog/2026/04/16/massachusetts-phl-hockey-teams-map-guide/), and from here the cleaner next move is probably a broader combined Massachusetts map experience if the standalone league pages are strong enough to stitch together.


## Build Better Hockey Reviews with Scout Elite

If you're coaching one of these teams, or just trying to help your son learn faster, the easiest way to improve teaching is still video.

Scout Elite lets you clip plays, organize teachable moments, and share them with players without needing a full video staff.

<div style="margin: 1.5em 0; text-align: center;">
	<a href="https://xpress.scout-elite.com/" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:1.2em;padding:0.7em 2em;">Sign Up for Scout Elite - Free 14 Day Trial</a>
</div>

---

{% include ma-hockey-guide-series.html current="e9" %}
