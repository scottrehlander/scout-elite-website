---
layout: post
display_title: "Massachusetts Youth Hockey Teams: EHF Organizations Map and Guide"
title: "Massachusetts Youth Hockey Teams: EHF Guide & Map"
description: "Map and guide to the 21 EHF youth hockey organizations based in Massachusetts. See where each club is located and how they showed up in the 2025-26 statewide rankings."
date: 2026-04-16
categories: [insights]
tags: [EHF hockey, Eastern Hockey Federation, Massachusetts youth hockey, boys hockey, Massachusetts hockey teams, youth hockey teams Massachusetts, youth hockey organizations in MA, youth hockey in New England, EHF map, hockey clubs Massachusetts, youth hockey guide]
author: "Coach Scott"
excerpt: "Map and guide to every EHF youth hockey organization based in Massachusetts, with home bases and a 2025-26 MyHockeyRankings snapshot."
image: "/img/blog/heads-up-nstar.jpg"
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

For families looking at **youth hockey teams in Massachusetts**, the EHF is usually part of the serious-club conversation almost immediately.

The **Eastern Hockey Federation** sits near the top of the [Massachusetts youth hockey structure](/blog/2026/04/14/massachusetts-club-hockey-leagues-e9-ehf-guide/), so this page is built to help you sort through the specific **youth hockey organizations in MA** that compete inside that league.

This post is **Phase 1** of a larger Massachusetts hockey map project. For now, I'm only covering **Massachusetts-based EHF organizations**. That means no [E9](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/), no [PHL](/blog/2026/04/16/massachusetts-phl-hockey-teams-map-guide/), and no VHL in this article, even when an organization also fields teams in one of those leagues.

The goal here is simple: show you **who is in the EHF, where they're based, and what kind of 10U, 12U, and 14U boys presence they showed in the 2025-26 Massachusetts MyHockeyRankings data used for this article**.

> **Important note:** Home locations below are approximate organizational bases, not every rink a club uses. Many EHF programs operate out of multiple facilities.


## Massachusetts EHF Teams Map

<div id="ehf-ma-map" style="height: 520px; width: 100%; border-radius: 8px; margin: 1.5em 0; z-index: 1;"></div>

<script>
(function() {
  var map = L.map('ehf-ma-map').setView([42.23, -71.18], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 13
  }).addTo(map);

  function marker(lat, lng, name, town, note, metrics) {
    return L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: '#0b5cab',
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
    marker(42.1584, -71.1448, 'American Hockey Academy', 'Canton, MA', 'EHF member based in Canton', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.2695, -71.6161, 'AY NorthStars', 'Westborough, MA', 'Westborough-based EHF club', 'Top: 88.10<br>Bottom: 85.94<br>Avg: 87.21'),
    marker(42.0715, -70.8092, 'Bay State Breakers', 'Pembroke, MA', 'One of the stronger Massachusetts EHF brands in the 2025-26 rankings', 'Top: 96.40<br>Bottom: 88.76<br>Avg: 93.73'),
    marker(42.2437, -71.1670, 'Boch Blazers', 'Dedham, MA', 'Dedham-based EHF club with Platinum and Gold teams', 'Top: 88.53<br>Bottom: 84.57<br>Avg: 86.55'),
    marker(42.2529, -71.0023, 'Boston Bulldogs', 'Quincy, MA', 'Quincy-based EHF member', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.3470, -71.1564, 'Boston Jr Eagles', 'Brighton, MA', 'Consistently elite in the 2025-26 10U, 12U, and 14U rankings', 'Top: 97.80<br>Bottom: 96.92<br>Avg: 97.39'),
    marker(42.1584, -71.1448, 'Boston Jr Huskies', 'Canton, MA', 'Canton-based EHF program', 'Top: 86.74<br>Bottom: 86.74<br>Avg: 86.74'),
    marker(42.1301, -70.9162, 'Boston Jr Terriers', 'Rockland, MA', 'Rockland-based EHF organization with strong statewide visibility', 'Top: 94.10<br>Bottom: 92.72<br>Avg: 93.38'),
    marker(42.0654, -71.2478, 'Cape Cod Whalers', 'Foxboro, MA', 'Foxboro-based EHF organization listed on the league page', 'Top: 94.62<br>Bottom: 94.62<br>Avg: 94.62'),
    marker(42.6362, -71.9079, 'Central Mass Penguins', 'Ashburnham, MA', 'Central Massachusetts EHF member', 'No clear 10U / 12U / 14U boys rating surfaced'),
    marker(42.3016, -71.0676, 'GBL Boston Jr Bruins', 'Dorchester, MA', 'MHR rankings also show this org as Greater Boston Jr Bruins', 'Top: 92.33<br>Bottom: 89.27<br>Avg: 90.47'),
    marker(42.4084, -71.0110, 'Greater Boston Vipers', 'Revere, MA', 'Revere-based EHF club', 'Top: 85.56<br>Bottom: 83.91<br>Avg: 84.74'),
    marker(42.6987, -71.1351, 'Middlesex Islanders East', 'North Andover, MA', 'One of the top EHF programs in Massachusetts', 'Top: 97.64<br>Bottom: 96.70<br>Avg: 97.15'),
    marker(42.6768, -71.4245, 'Middlesex Islanders West', 'Tyngsboro, MA', 'Tyngsboro-based EHF member', 'Top: 90.40<br>Bottom: 84.34<br>Avg: 87.37'),
    marker(42.3459, -71.5523, 'Minuteman Flames', 'Marlborough, MA', 'Longstanding EHF club with strong statewide results', 'Top: 95.47<br>Bottom: 93.50<br>Avg: 94.49'),
    marker(42.5584, -71.2689, 'New England Bulldogs', 'Billerica, MA', 'Billerica-based EHF club', 'Top: 91.10<br>Bottom: 86.18<br>Avg: 88.42'),
    marker(42.5465, -71.1737, 'North Shore Shamrocks', 'Wilmington, MA', 'Wilmington-based EHF member', 'Top: 84.99<br>Bottom: 84.99<br>Avg: 84.99'),
    marker(42.5959, -71.0167, 'North Suburban Wings', 'Middleton, MA', 'North Shore-area EHF member', 'Top: 87.10<br>Bottom: 87.10<br>Avg: 87.10'),
    marker(41.9904, -70.9750, 'Northeast Generals', 'Bridgewater, MA', 'Bridgewater-based EHF organization', 'Top: 92.72<br>Bottom: 92.72<br>Avg: 92.72'),
    marker(42.0654, -71.2478, 'South Shore Kings', 'Foxboro, MA', 'One of the most visible EHF brands statewide', 'Top: 95.40<br>Bottom: 88.76<br>Avg: 92.80'),
    marker(42.7587, -70.9506, 'Top Gun', 'Byfield, MA', 'North Shore EHF club with strong younger-age results', 'Top: 98.50<br>Bottom: 91.12<br>Avg: 94.33')
  ];

  teams.forEach(function(team) {
    team.addTo(map);
  });
})();
</script>


## What This Page Covers

There are **21 Massachusetts-based EHF organizations** listed on the official MHR EHF league page for the current season. Some are true headline programs that show up all over statewide rankings. Others are more age-specific, more localized, or more visible in older age groups than in the 10U, 12U, and 14U boys pulls I used here.

That's important, because families often make the mistake of assuming every club should look the same at every age. It doesn't work that way. A program can be very real at 14U and much less visible at 10U, or the other way around.


## Every Massachusetts-Based EHF Organization

The competitive-level numbers below use **MHR Rating** from the boys 10U, 12U, and 14U Massachusetts rankings used in this article. For clubs with multiple visible entries, I list the **top**, **bottom**, and **average** rating from the entries cited here. Where MHR exposed a clean representative `team-info` link, I attached it directly to the organization name.

| Organization | Home Base | 2025-26 Boys Snapshot | Competitive Level |
|---|---|---|---|
| [**American Hockey Academy**](https://myhockeyrankings.com/association_info.php?a=3685) | Canton | Listed as an EHF association, but it did not stand out in the 2025-26 Massachusetts 10U, 12U, and 14U boys rankings the way the larger EHF brands did. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**AY NorthStars**](https://myhockeyrankings.com/association_info.php?a=313) | Westborough | Showed up in the 2025-26 rankings with **AY NorthStars (T1-Platinum) 14U AAA** at **87.59**, **12U AAA** at **85.94**, and **10U AAA** at **88.1**. | **Top:** 88.10 · **Bottom:** 85.94 · **Avg:** 87.21 |
| [**Bay State Breakers**](https://myhockeyrankings.com/association_info.php?a=224) | Pembroke | One of the clearest EHF names in the statewide data: **12U Elite** at **96.04**, **10U Elite** at **96.4**, and **14U T1-Platinum** at **88.76**. | **Top:** 96.40 · **Bottom:** 88.76 · **Avg:** 93.73 |
| [**Boch Blazers**](https://myhockeyrankings.com/association_info.php?a=2058) | Dedham | More visible in the second tier of the rankings cited here, including **12U T1-Upper** at **88.53** and **14U T1-Platinum** at **84.57**. | **Top:** 88.53 · **Bottom:** 84.57 · **Avg:** 86.55 |
| [**Boston Bulldogs**](https://myhockeyrankings.com/association_info.php?a=306) | Quincy | Listed as a Massachusetts EHF association, but not a major presence in the 2025-26 10U, 12U, and 14U boys ranking snapshots. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**Boston Jr Eagles**](https://myhockeyrankings.com/association_info.php?a=223) | Brighton | A true top-end program in the 2025-26 data: **14U Elite** at **96.92**, **12U Elite** at **97.45**, and **10U Elite** at **97.8**. | **Top:** 97.80 · **Bottom:** 96.92 · **Avg:** 97.39 |
| [**Boston Jr Huskies**](https://myhockeyrankings.com/association_info.php?a=3057) | Canton | Appeared in the statewide pulls more as a depth EHF name than a headline one, including **14U T1-Platinum** at **86.74**. | **Top:** 86.74 · **Bottom:** 86.74 · **Avg:** 86.74 |
| [**Boston Jr Terriers**](https://myhockeyrankings.com/association_info.php?a=225) | Rockland | Strong across the main age bands: **14U Elite** at **93.33**, **12U Elite** at **92.72**, and **10U Elite** at **94.1**. | **Top:** 94.10 · **Bottom:** 92.72 · **Avg:** 93.38 |
| [**Cape Cod Whalers**](https://myhockeyrankings.com/association_info.php?a=2110) | Foxboro | One of the highest-performing EHF names at older youth levels in the rankings cited here, with **14U AAA** at **94.62**. | **Top:** 94.62 · **Bottom:** 94.62 · **Avg:** 94.62 |
| [**Central Mass Penguins**](https://myhockeyrankings.com/association_info.php?a=3682) | Ashburnham | EHF member with more limited visibility in the specific 10U, 12U, and 14U Massachusetts boys rankings used for this post. | No clear 10U / 12U / 14U boys rating surfaced in the entries used here. |
| [**GBL Boston Jr Bruins**](https://myhockeyrankings.com/association_info.php?a=2423) | Dorchester | The rankings pulls show this organization under **Greater Boston Jr Bruins**, with **14U AAA** at **89.27**, **12U AAA** at **92.33**, and **10U AAA** at **89.8**. | **Top:** 92.33 · **Bottom:** 89.27 · **Avg:** 90.47 |
| [**Greater Boston Vipers**](https://myhockeyrankings.com/association_info.php?a=290) | Revere | Present in the statewide data, especially in deeper divisions, including **14U AAA** at **83.91** and **12U T1-Upper** at **85.56**. | **Top:** 85.56 · **Bottom:** 83.91 · **Avg:** 84.74 |
| [**Middlesex Islanders East**](https://myhockeyrankings.com/association_info.php?a=227) | North Andover | One of the absolute standard-bearers in Massachusetts EHF hockey: **14U Elite** at **97.10**, **12U Elite** at **97.64**, and **10U Elite** at **96.7**. | **Top:** 97.64 · **Bottom:** 96.70 · **Avg:** 97.15 |
| [**Middlesex Islanders West**](https://myhockeyrankings.com/association_info.php?a=4043) | Tyngsboro | More visible in Platinum and Gold depth than at the very top, including **10U T1-Platinum** at **90.4** and **12U AAA** at **84.34**. | **Top:** 90.40 · **Bottom:** 84.34 · **Avg:** 87.37 |
| [**Minuteman Flames**](https://myhockeyrankings.com/association_info.php?a=228) | Marlborough | Another major statewide EHF name: **12U Elite** at **95.47**, **10U Elite** at **93.5**, and strong 13U/14U-adjacent visibility in the rankings cited here. | **Top:** 95.47 · **Bottom:** 93.50 · **Avg:** 94.49 |
| [**New England Bulldogs**](https://myhockeyrankings.com/association_info.php?a=1400) | Billerica | Showed up across all three core ages in the 2025-26 data: **14U AAA** at **87.99**, **12U AAA** at **86.18**, and **10U AAA** at **91.1**. | **Top:** 91.10 · **Bottom:** 86.18 · **Avg:** 88.42 |
| [**North Shore Shamrocks**](https://myhockeyrankings.com/association_info.php?a=2168) | Wilmington | Appeared mainly as a depth EHF club in the rankings cited here, including **14U T1-Platinum** at **84.99** and additional lower-age AAA entries. | **Top:** 84.99 · **Bottom:** 84.99 · **Avg:** 84.99 |
| [**North Suburban Wings**](https://myhockeyrankings.com/association_info.php?a=311) | Middleton | Most visible at 14U in the 2025-26 statewide rankings, with entries such as **North Suburban Wings (Miller) 14U AAA** at **87.10**. | **Top:** 87.10 · **Bottom:** 87.10 · **Avg:** 87.10 |
| [**Northeast Generals**](https://myhockeyrankings.com/association_info.php?a=226) | Bridgewater | Stronger at the older end of the youth range in the rankings cited here, highlighted by **14U Elite** at **92.72**. | **Top:** 92.72 · **Bottom:** 92.72 · **Avg:** 92.72 |
| [**South Shore Kings**](https://myhockeyrankings.com/association_info.php?a=230) | Foxboro | One of the most recognizable EHF brands in the state, with **12U Elite** at **94.24**, **10U Elite** at **95.4**, and **14U Elite** at **88.76**. | **Top:** 95.40 · **Bottom:** 88.76 · **Avg:** 92.80 |
| [**Top Gun**](https://myhockeyrankings.com/association_info.php?a=229) | Byfield | Particularly strong at the younger ages in the rankings cited here: **10U Elite** at **98.5**, **12U Elite** at **93.37**, and **14U Elite** at **91.12**. | **Top:** 98.50 · **Bottom:** 91.12 · **Avg:** 94.33 |


## The Quick Read on the EHF Landscape

If you're new to Massachusetts boys hockey, here's the shortest honest version:

- **The EHF is deep.** There are a few programs at the very top, but there are also a lot of legitimate clubs in Platinum and Gold who would be considered strong travel programs almost anywhere else.
- **The strongest Massachusetts EHF brands in the 2025-26 statewide rankings were Middlesex Islanders East, Boston Jr Eagles, Bay State Breakers, Minuteman Flames, South Shore Kings, Boston Jr Terriers, and Top Gun.**
- **Location still matters.** The EHF footprint covers the North Shore, South Shore, Boston proper, MetroWest, central Massachusetts, and the Merrimack Valley.
- **A club's story changes by age.** Parents get into trouble when they assume one rating or one team's result tells them everything about an organization.


## Which EHF Programs Jumped Out Most in the 2025-26 Massachusetts Rankings?

### The statewide heavyweights

These were the clearest Massachusetts EHF names across the 10U, 12U, and 14U boys rankings used for this article:

- **Middlesex Islanders East**
- **Boston Jr Eagles**
- **Bay State Breakers**
- **Minuteman Flames**
- **South Shore Kings**
- **Boston Jr Terriers**
- **Top Gun**

Those aren't the only EHF clubs that matter. They're just the ones that were hardest to miss in the specific statewide age-group files used for this post.

### Strong depth programs worth knowing

Several EHF organizations showed up more in the next band down, or were more visible in one age than across all three:

- **New England Bulldogs**
- **Boch Blazers**
- **North Shore Shamrocks**
- **North Suburban Wings**
- **Middlesex Islanders West**
- **Northeast Generals**
- **Greater Boston Jr Bruins**
- **AY NorthStars**

For a lot of families, this is actually the most useful category to understand. Not every decision is about finding the #1 badge on paper. Sometimes it's about fit, geography, coach quality, and whether a specific birth year inside a club is particularly strong.


## A Few Parent-Level Takeaways

**1. The EHF is not just one level.**

When people say a player is "in the EHF," that doesn't tell you enough by itself. You still need to know the **organization**, the **birth year**, and the **division level** within the league.

**2. Massachusetts has multiple legitimate EHF hubs.**

You can find meaningful EHF presence on the South Shore, North Shore, Boston area, MetroWest corridor, and central Massachusetts.

**3. The club name matters less than the age-group reality.**

Families often shop the logo first. That's backwards. Shop the **specific team environment** first.

**4. The top-end EHF programs are genuinely high-level.**

The best EHF organizations in Massachusetts are not just local travel teams with fancy branding. In the 2025-26 MHR data, several sit at clearly elite statewide levels — and [multiple EHF programs appear in the national top 100](/blog/2026/04/15/top-new-england-boys-hockey-programs-ranked/).


## Methodology

This post uses:

- the **official MHR EHF league page** for organization membership
- Massachusetts **10U, 12U, and 14U boys rankings** from the 2025-26 season
- approximate organizational home bases for the map

This is intentionally an **organization guide**, not a claim that every team at every age in every club is equivalent. The **top / bottom / average** numbers above are drawn from the boys entries cited in this post, not every roster that an organization may have fielded that season.


## What Comes Next

Phase 2 added [**E9 organizations**](/blog/2026/04/16/massachusetts-e9-hockey-teams-map-guide/) into the same broader Massachusetts hockey mapping project, and Phase 3 added the [**Massachusetts PHL companion**](/blog/2026/04/16/massachusetts-phl-hockey-teams-map-guide/). I kept both out of this article on purpose so this page stays clean and useful if you're specifically trying to understand the Massachusetts EHF ecosystem first.


## Build Better Hockey Reviews with Scout Elite

If you're coaching one of these teams, or just trying to help your son learn faster, the easiest way to improve teaching is still video.

Scout Elite lets you clip plays, organize teachable moments, and share them with players without needing a full video staff.

<div style="margin: 1.5em 0; text-align: center;">
	<a href="https://xpress.scout-elite.com/" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:1.2em;padding:0.7em 2em;">Sign Up for Scout Elite - Free 14 Day Trial</a>
</div>

---

{% include ma-hockey-guide-series.html current="ehf" %}