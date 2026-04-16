---
layout: post
display_title: "Massachusetts Youth Hockey Teams: PHL Organizations Map and Guide"
title: "Youth Hockey Teams Massachusetts: PHL Guide & Map"
description: "A parent-friendly guide to the 21 PHL youth hockey teams in Massachusetts. Interactive map, home bases, and a look at how each club showed up in the 2025-26 statewide snapshot."
date: 2026-04-16
categories: [insights]
tags: [PHL hockey, Premier Hockey League, Massachusetts youth hockey, boys hockey, Massachusetts hockey teams, youth hockey teams Massachusetts, youth hockey organizations in MA, youth hockey in New England, PHL map, hockey clubs Massachusetts, youth hockey guide]
author: "Coach Scott"
excerpt: "Parent-friendly guide to the 21 PHL youth hockey organizations in Massachusetts, with an interactive map and 2025-26 competitive snapshots."
image: "/img/blog/the-little-one.jpg"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

If you're trying to map the broader middle of **youth hockey teams in Massachusetts**, the PHL is one of the leagues worth understanding.

The **Premier Hockey League** covers a wider spread of **youth hockey organizations in MA** than the EHF or E9, so this page is meant to give families a faster read on where those clubs are and how they show up in the current snapshot.

This post is **Phase 3** of the broader Massachusetts hockey map project. Like the [EHF guide](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) and the [E9 guide](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/), I kept the scope tight on purpose: **Massachusetts-based PHL organizations only**. If you want the higher-level explanation of where the PHL sits relative to the EHF, E9, and VHL, start with the broader [Massachusetts youth hockey league guide](/blog/2026/04/14/massachusetts-club-hockey-leagues-e9-ehf-guide/).

The goal here is simple: show you **who is in the PHL, where they're based, and what kind of 10U, 12U, and 14U boys presence they showed in the 2025-26 Massachusetts MyHockeyRankings views used for this article**.

> **Important note:** Home locations below are approximate organizational bases, not every rink a club uses.

## Massachusetts PHL Teams Map

<div id="phl-ma-map" style="height: 520px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
  var map = L.map('phl-ma-map').setView([42.16, -71.21], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 13
  }).addTo(map);

  function marker(lat, lng, name, town, note, metrics) {
    return L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#0f766e',
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
    marker(42.3459, -71.5523, '495 Stars', 'Marlborough, MA', 'Listed on the PHL league page, but not a major 10U, 12U, or 14U boys presence in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(41.6525, -70.2884, 'Barnstable Red Raiders', 'Hyannis, MA', 'Cape-based PHL organization with no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(41.5784, -70.5536, 'Cape Cod Lightning', 'East Falmouth, MA', 'Cape-based PHL organization with no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.3459, -71.5523, 'Central Mass Outlaws', 'Marlborough, MA', 'Central Massachusetts PHL club with its clearest visible number at 14U', 'Top: 83.12<br>Bottom: 83.12<br>Avg: 83.12'),
    marker(42.1584, -71.1448, 'Crimson HC', 'Canton, MA', 'Visible mostly through White-level 12U and 14U entries in the snapshot used here', 'Top: 85.66<br>Bottom: 84.71<br>Avg: 85.17'),
    marker(42.1626, -71.0412, 'East Coast Militia', 'Randolph, MA', 'One of the clearest top-end PHL names in the statewide snapshot, especially at 14U', 'Top: 92.51<br>Bottom: 83.46<br>Avg: 87.78'),
    marker(41.6525, -70.2884, 'East Coast Thunder', 'Hyannis, MA', 'Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.4084, -71.0537, 'Eastern Mass Senators', 'Everett, MA', 'More visible at 10U than in the older age-band views used here', 'Top: 83.30<br>Bottom: 83.30<br>Avg: 83.30'),
    marker(41.9445, -71.2856, 'Mass Admirals', 'Attleboro, MA', 'PHL member with visible Premier-level 12U and 14U entries in the snapshot used here', 'Top: 84.29<br>Bottom: 84.04<br>Avg: 84.16'),
    marker(42.5279, -70.9287, 'Mass Bay Chiefs', 'Peabody, MA', 'One of the more visible Massachusetts PHL organizations across the core views, especially at 10U and 12U', 'Top: 89.40<br>Bottom: 84.50<br>Avg: 87.12'),
    marker(42.3334, -71.0495, 'Mass Bay Shamrocks', 'South Boston, MA', 'Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.1626, -71.0412, 'Mass Vikings', 'Randolph, MA', 'More visible at 10U than in the older age bands used for this article', 'Top: 83.30<br>Bottom: 83.30<br>Avg: 83.30'),
    marker(42.7762, -71.0773, 'New England Predators', 'Haverhill, MA', 'Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.6768, -71.4245, 'New England Stars', 'Tyngsboro, MA', 'More visible in AA and mixed-age depth than at the very top of the statewide snapshot', 'Top: 84.92<br>Bottom: 83.20<br>Avg: 84.06'),
    marker(42.5959, -71.0167, 'North Suburban Wings', 'Middleton, MA', 'Cross-league brand that showed its clearest PHL visibility at 14U in the statewide snapshot', 'Top: 87.10<br>Bottom: 84.81<br>Avg: 85.96'),
    marker(42.2529, -71.0023, 'Quincy 67\'s', 'Quincy, MA', 'South Shore PHL club with its clearest visible number at 14U', 'Top: 82.19<br>Bottom: 82.19<br>Avg: 82.19'),
    marker(41.9001, -71.0898, 'Tri-County Saints', 'Taunton, MA', 'More visible through 14U A results than the higher-end AAA-style snapshot', 'Top: 82.13<br>Bottom: 82.13<br>Avg: 82.13'),
    marker(42.6362, -71.9079, 'Wachusett Wolf Pack', 'Ashburnham, MA', 'Central Massachusetts PHL organization with a visible 14U AA entry in the statewide snapshot', 'Top: 83.16<br>Bottom: 83.16<br>Avg: 83.16'),
    marker(42.1418, -71.2495, 'Walpole Express', 'Walpole, MA', 'Cross-league club with one of the strongest visible PHL snapshots among these organizations', 'Top: 89.51<br>Bottom: 81.97<br>Avg: 85.54'),
    marker(42.2668, -72.6687, 'Western Mass Vipers', 'Easthampton, MA', 'Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.2626, -71.8023, 'Worcester Jr Crusaders', 'Worcester, MA', 'Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here', 'No clear 10U / 12U / 14U boys rating surfaced')
  ];

  teams.forEach(function(team) {
    team.addTo(map);
  });
})();
</script>

## Every Massachusetts-Based PHL Organization

There are **21 Massachusetts-based organizations** on the current MHR PHL league page. Compared with the [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) and [E9](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/) snapshots, the PHL picture looked broader, more uneven, and much less top-loaded around a handful of AAA-style teams.

That matters. The PHL includes organizations operating across a wider mix of levels, so some clubs show up clearly in the statewide rankings while others are either deeper in the table or simply do not surface in the visible 10U, 12U, and 14U entries I used here.

The competitive-level numbers below use **MHR Rating** from the boys 10U, 12U, and 14U Massachusetts ranking views used in this article. Just like the E9 post, I also counted clearly related **9U, 11U, and 13U** entries when those were part of the visible current-season snapshot for a club.

| Organization | Home Base | 2025-26 Boys Snapshot | Competitive Level |
|---|---|---|---|
| [**495 Stars**](https://myhockeyrankings.com/association_info.php?a=305) | Marlborough | Listed on the PHL league page, but it did not stand out in the 2025-26 Massachusetts 10U, 12U, and 14U boys ranking entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Barnstable Red Raiders**](https://myhockeyrankings.com/association_info.php?a=1225) | Hyannis | Cape-based PHL organization, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Cape Cod Lightning**](https://myhockeyrankings.com/association_info.php?a=3426) | East Falmouth | Listed on the current PHL page, but not a major visible presence in the 10U, 12U, and 14U boys ranking entries used here. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Central Mass Outlaws**](https://myhockeyrankings.com/association_info.php?a=303) | Marlborough | The clearest visible number here was **Central Mass Outlaws (OMalley) 14U AA** at **83.12**. | **Top:** 83.12 · **Bottom:** 83.12 · **Avg:** 83.12 |
| [**Crimson HC**](https://myhockeyrankings.com/association_info.php?a=1619) | Canton | More visible through White-level 12U and 14U entries than through a top-end AAA profile in the statewide snapshot used here. | **Top:** 85.66 · **Bottom:** 84.71 · **Avg:** 85.17 |
| [**East Coast Militia**](https://myhockeyrankings.com/association_info.php?a=3216) | Randolph | One of the clearest PHL names in the statewide snapshot, especially at 14U, with **National 14U AAA** at **92.51** and multiple additional 13U / 14U entries behind it. | **Top:** 92.51 · **Bottom:** 83.46 · **Avg:** 87.78 |
| [**East Coast Thunder**](https://myhockeyrankings.com/association_info.php?a=2280) | Hyannis | Listed on the PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used here. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Eastern Mass Senators**](https://myhockeyrankings.com/association_info.php?a=1761) | Everett | Most visible at 10U in the statewide snapshot, with **10U AA** at **83.3**. | **Top:** 83.30 · **Bottom:** 83.30 · **Avg:** 83.30 |
| [**Mass Admirals**](https://myhockeyrankings.com/association_info.php?a=4108) | Attleboro | Showed up through **Premier 14U AA** at **84.29** and **Premier 12U AA** at **84.04** in the entries used here. | **Top:** 84.29 · **Bottom:** 84.04 · **Avg:** 84.16 |
| [**Mass Bay Chiefs**](https://myhockeyrankings.com/association_info.php?a=3217) | Peabody | One of the more visible PHL clubs in the snapshot used here, with **10U (Indep) AAA** at **89.4**, **12U AAA** at **87.47**, and additional 10U Premier depth. | **Top:** 89.40 · **Bottom:** 84.50 · **Avg:** 87.12 |
| [**Mass Bay Shamrocks**](https://myhockeyrankings.com/association_info.php?a=3485) | South Boston | Listed on the current PHL league page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Mass Vikings**](https://myhockeyrankings.com/association_info.php?a=3424) | Randolph | More visible at 10U than in the older age-band views used here, with **Premier 10U AA** at **83.3**. | **Top:** 83.30 · **Bottom:** 83.30 · **Avg:** 83.30 |
| [**New England Predators**](https://myhockeyrankings.com/association_info.php?a=1759) | Haverhill | Listed on the PHL page, but it did not stand out in the visible 10U, 12U, and 14U boys ranking entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**New England Stars**](https://myhockeyrankings.com/association_info.php?a=1414) | Tyngsboro | More visible through AA and mixed-age depth than through a top-end AAA statewide profile in the views used here. | **Top:** 84.92 · **Bottom:** 83.20 · **Avg:** 84.06 |
| [**North Suburban Wings**](https://myhockeyrankings.com/association_info.php?a=311) | Middleton | Cross-league brand that showed its clearest PHL visibility at 14U, including **14U AAA** at **87.10** and **14U AA** at **84.81**. | **Top:** 87.10 · **Bottom:** 84.81 · **Avg:** 85.96 |
| [**Quincy 67's**](https://myhockeyrankings.com/association_info.php?a=1220) | Quincy | The clearest visible number here was **14U AA** at **82.19**. | **Top:** 82.19 · **Bottom:** 82.19 · **Avg:** 82.19 |
| [**Tri-County Saints**](https://myhockeyrankings.com/association_info.php?a=1224) | Taunton | More visible through **14U A** results than through higher-level AAA entries in the statewide snapshot. | **Top:** 82.13 · **Bottom:** 82.13 · **Avg:** 82.13 |
| [**Wachusett Wolf Pack**](https://myhockeyrankings.com/association_info.php?a=3460) | Ashburnham | The clearest visible number here was **14U AA** at **83.16**. | **Top:** 83.16 · **Bottom:** 83.16 · **Avg:** 83.16 |
| [**Walpole Express**](https://myhockeyrankings.com/association_info.php?a=1620) | Walpole | One of the strongest visible PHL snapshots in this group, led by **14U Elite** at **89.51** with additional 14U Select, 12U Elite, and 10U Elite entries behind it. | **Top:** 89.51 · **Bottom:** 81.97 · **Avg:** 85.54 |
| [**Western Mass Vipers**](https://myhockeyrankings.com/association_info.php?a=3463) | Easthampton | Listed on the PHL page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Worcester Jr Crusaders**](https://myhockeyrankings.com/association_info.php?a=1202) | Worcester | Listed on the PHL page, but no clear 10U, 12U, or 14U boys rating surfaced in the entries used for this article. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |


## The Quick Read on the PHL Landscape

If you're new to Massachusetts boys hockey, here is the shortest honest version:

- **The PHL is broader and more uneven than the [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) or [E9](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/).** That is not automatically bad. It just means league membership tells you even less by itself.
- **The clearest Massachusetts PHL names in the visible statewide snapshot were East Coast Militia, Mass Bay Chiefs, Walpole Express, North Suburban Wings, and Crimson HC.** East Coast Militia also reached [#57 nationally at 14U](/blog/2026/04/15/top-new-england-boys-hockey-programs-ranked/), the PHL's strongest crossover into the national picture.
- **A lot of PHL clubs live in AA, A, Premier, or mixed-depth territory rather than pure top-end AAA visibility.** That's part of the league's actual role in the market.
- **Geography still matters.** The Massachusetts PHL footprint reaches the South Shore, Boston area, the North Shore, the Cape, central Massachusetts, and Western Massachusetts.


## Which PHL Programs Jumped Out Most in the 2025-26 Massachusetts Rankings?

### The clearest statewide PHL names

These were the organizations that stood out most in the visible 10U, 12U, and 14U ranking entries used for this post:

- **East Coast Militia**
- **Mass Bay Chiefs**
- **Walpole Express**
- **North Suburban Wings**
- **Crimson HC**

That does not mean the rest of the PHL is irrelevant. It means these were the easiest PHL organizations to find in the statewide ranking views used here.

### The more localized or level-specific PHL profiles

Several organizations looked more tied to one age band, one level, or one local competitive lane:

- **Mass Admirals**
- **New England Stars**
- **Central Mass Outlaws**
- **Quincy 67's**
- **Tri-County Saints**
- **Wachusett Wolf Pack**
- **Eastern Mass Senators**
- **Mass Vikings**

For parents, this is often the real work. In the PHL especially, the useful decision is not "is this league good" but "what does this exact team environment look like for this birth year, at this level, with this commute?"


## A Few Parent-Level Takeaways

**1. The PHL covers a wider competitive spread.**

You can see that directly in the visible ratings. Some clubs touched strong statewide numbers, while others surfaced mainly through AA or A-level entries.

**2. This is a league where birth-year reality matters even more than the badge.**

Families can get misled when they compare logos instead of comparing actual team environments.

**3. Cross-league organizations add noise.**

Clubs like [North Suburban Wings](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/) and [Walpole Express](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/) operate in more than one league environment, so you need to know which exact team and league track you're evaluating.

**4. Some PHL organizations simply will not show strongly in a top-slice statewide ranking view.**

That does not automatically mean they are bad fits. It means you should read this page as an orientation tool, not as the whole answer.


## Methodology

This post uses:

- the **official MHR PHL league page** for organization membership
- Massachusetts **10U, 12U, and 14U boys rankings** from the 2025-26 season
- approximate organizational home bases for the map

Important caveat: the current MHR age-band views also surface some **9U, 11U, and 13U** entries inside those 10U, 12U, and 14U pages. Where those entries were clearly part of the same organization's visible current-season snapshot, I included them in the top / bottom / average numbers above.

Another important caveat: several Massachusetts PHL clubs did **not** appear in the visible ranking rows recovered for this post. For those organizations, I marked the snapshot as having no clear 10U / 12U / 14U boys rating surfaced in the entries used here rather than pretending the data was cleaner than it was.

This is intentionally an **organization guide**, not a claim that every team at every age in every club is equivalent.


## What Comes Next

The remaining big league bucket is **VHL**, but I am still treating that as optional because it is much broader and the earlier guidance was to avoid it unless specifically requested. Short of that, the cleaner next step is probably a combined Massachusetts map experience built from the league-specific pages, with the [EHF](/blog/2026/04/16/massachusetts-ehf-hockey-teams-map-guide/), [E9](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/), and PHL breakdowns acting as the core building blocks.


## Build Better Hockey Reviews with Scout Elite

If you're coaching one of these teams, or just trying to help your son learn faster, the easiest way to improve teaching is still video.

Scout Elite lets you clip plays, organize teachable moments, and share them with players without needing a full video staff.

<div style="margin: 1.5em 0; text-align: center;">
	<a href="https://xpress.scout-elite.com/" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:1.2em;padding:0.7em 2em;">Sign Up for Scout Elite - Free 14 Day Trial</a>
</div>

---

{% include ma-hockey-guide-series.html current="phl" %}