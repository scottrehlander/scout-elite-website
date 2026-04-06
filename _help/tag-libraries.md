---
layout: kb-article
title: "Setting Up Tag Libraries"
description: "Learn how to create and configure tag libraries in Scout Elite to build sport-specific tagging taxonomies for your clips."
permalink: /help/tag-libraries/
category: tagging
order: 2
tier: solo
last_updated: 2026-04-06
---

Tag Libraries define the vocabulary you use to annotate clips. Set them up once, and they're available across all your Clip Projects.

> **This feature requires a Solo subscription.** [Learn about our plans](/help/subscription-plans/).

## What's a Tag Library?

A Tag Library is a collection of tags scoped to a sport. It contains:

- **Tags** — the play types or events you want to track (e.g., "Shot on Goal", "Turnover", "Faceoff Win")
- **Fields** — additional detail dimensions that can be applied to tags (e.g., "Team", "Player", "Outcome")
- **Field mappings** — which fields apply to which tags

This structure lets you capture rich, structured data about every clip.

## Creating a Tag Library

1. Go to **Account** in the sidebar
2. Scroll to the **Tag Libraries** section
3. Click **Create Tag Library**
4. Name your library and select the sport
5. Click **Create**

## Adding Tags

Within your library:

1. Click **Add Tag**
2. Enter the tag name (e.g., "Zone Entry")
3. Save

Repeat for each play type you want to track. Start with 5-8 tags covering the most common events in your sport.

## Adding Fields

Fields add structured details to your tags:

1. Click **Add Field**
2. Enter the field name (e.g., "Team", "Player", "Outcome")
3. Choose the field type (text, dropdown, etc.)
4. Save

## Mapping Fields to Tags

Not every field applies to every tag. You map specific fields to specific tags:

1. Select a tag
2. Choose which fields should appear when this tag is applied
3. Save the mapping

### Example Setup (Hockey)

| Tag | Fields |
|---|---|
| Shot on Goal | Team, Player, Outcome (Save/Goal/Miss) |
| Faceoff | Team, Player, Outcome (Win/Loss) |
| Penalty | Team, Player, Penalty Type |
| Zone Entry | Team, Entry Type (Carry/Dump/Pass) |
| Turnover | Team, Zone (Offensive/Neutral/Defensive) |

## Tips

- **Start simple** — you can always add more tags and fields later
- **Be consistent with naming** — "SOG" vs. "Shot on Goal" will cause confusion across projects
- **Use dropdown fields** where possible — they're faster to fill in and keep data consistent
- **One library per sport** — if you coach multiple sports, create a separate library for each

<div class="kb-related">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="/help/tagging-clips/">Tagging and Annotating Clips</a></li>
    <li><a href="/help/creating-clip-projects/">Creating a Clip Project</a></li>
    <li><a href="/help/creating-clips/">Creating Clips from Video</a></li>
  </ul>
</div>
