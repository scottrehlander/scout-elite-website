---
layout: kb-article
title: "Setting Up Tag Libraries"
description: "Create tag libraries in Scout Elite with your own coaching vocabulary: short codes, sections, spreadsheet import, and default capture windows for quick clipping."
permalink: /help/tag-libraries/
category: tagging
order: 2
tier: solo
last_updated: 2026-07-16
---

Tag Libraries define the vocabulary you use to mark and organize clips. Set one up once and it works across every Clip Project, the clip editor, Clip Search, and Quick Clipping.

> **This feature requires a Solo subscription.** [Learn about our plans](/help/subscription-plans/).

## Your language, not ours

Scout Elite ships with a built-in hockey tag library (Shot on Goal, Turnover, Faceoff, and so on). It works out of the box and is a good starting point.

But most coaching staffs already have their own language. If your bench says "BOT" for a breakout turnover and "DZC" for defensive zone coverage, you can build a library around exactly those terms. Every tag has:

- **Name**, the full term ("Breakout Turnover")
- **Short code** (optional), the acronym your staff actually says ("BOT"). When a tag has a code, buttons and chips show the code and the full name appears on hover.
- **Section** (optional), a group heading that organizes related tags ("55-44 Offense", "Special Teams Defense")

## Creating a library

1. Go to **Account** in the sidebar and find the **Tag Libraries** section
2. Click **New Library** and name it (for example, "Dragons System Language")
3. Select the new library to open its tag editor

## Adding and editing tags

The editor shows your tags as pills, grouped by section.

- **Add a tag** with the add button in any section (or the quick add for ungrouped tags)
- **Click a pill** to edit it: name, short code, capture window, section, or delete
- **Drag pills** to reorder them or move them between sections
- Edits save automatically when you close the pill editor

## Importing from a spreadsheet

Already have your system language in Excel or Google Sheets? Don't retype it.

1. In your spreadsheet, arrange three columns in this order: **code, name, section** (no header row)
2. Select the cells and copy
3. In your library, click **Paste Import** and paste
4. Review the preview and click **Import**

Rows with only one value become a tag name with no code. Sections are created automatically from the third column.

## Choosing which libraries are active

The **Enabled** toggles control which libraries appear in your tag pickers. You can enable more than one at a time (for example, your own system language plus the built-in library) and reorder them; pickers list tags in that order, with each library and section as its own heading.

## Default capture windows

Each library can set a default **capture window** for [Quick Clipping](/help/quick-clipping/): how many seconds before and after the moment you mark get captured into the clip.

- Set the library default in the **Quick Clip capture window** row above the tag editor
- Override it per tag in the pill editor (a faceoff tag might need 3 seconds back, a breakout tag 15)
- Leave either blank to inherit: a tag falls back to its library, and the library falls back to the app default (10 back, 5 forward)

## Managing libraries

- **Duplicate** copies a library with all its tags, sections, and capture windows (handy for building next season's language from this season's)
- **Rename** and **Delete** work from the library list; a tag that's already on clips can't be deleted until it's removed from them
- **Share** sends a library to teammates (requires Pro)
- The built-in Scout Elite library is read-only; duplicate it if you want to customize it

## Tips

- **Start from your whiteboard.** The tags that work best are the terms your team already uses.
- **Codes make keyboard marking fast.** In Quick Clipping you can type a code (like "BOT") to mark a moment without touching the mouse.
- **Use sections for game phases.** Offense, defense, special teams. Sections also color-code the Quick Clip buttons so they read at a glance.

<div class="kb-related">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="/help/quick-clipping/">Quick Clipping: Mark Moments as You Watch</a></li>
    <li><a href="/help/tagging-clips/">Tagging and Annotating Clips</a></li>
    <li><a href="/help/creating-clip-projects/">Creating a Clip Project</a></li>
  </ul>
</div>
