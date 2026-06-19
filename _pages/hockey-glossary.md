---
layout: default
title: "Hockey Glossary: 50+ Terms & Definitions for Parents"
description: "A free, searchable hockey glossary for parents: 50+ terms coaches use - gap control, forecheck, breakout, cycling, zone entry and more - defined in plain language."
permalink: /hockey-glossary/
utm_campaign: hockey-glossary
last_modified_at: 2026-06-18
image:
  path: /img/blog/hockey-sticks-ice.jpg
  alt: "A row of taped youth hockey sticks lined up on the ice"
---

{%- assign site_base = site.url | append: site.baseurl -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Hockey Glossary",
  "description": "Plain-language definitions of the hockey terms coaches use, for parents and new coaches.",
  "url": "{{ site_base }}/hockey-glossary/",
  "hasDefinedTerm": [
    {%- for term in site.data.hockey_glossary -%}
    {
      "@type": "DefinedTerm",
      "name": {{ term.t | strip_html | jsonify }},
      "description": {{ term.d | strip_html | jsonify }},
      "inDefinedTermSet": "{{ site_base }}/hockey-glossary/",
      "url": "{{ site_base }}/hockey-glossary/#term-{{ term.t | slugify }}"
    }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
  ]
}
</script>

<article class="blog-post-article">
  <div class="container">
    <div class="blog-post-content">

<h1>Hockey Glossary: Terms &amp; Definitions for Parents</h1>

<p style="font-size:1.1em;color:var(--text-secondary);">Every term the coach uses, in plain language. Type a word, tap a category, and share the definition with the parent next to you. Built for parents and new coaches who never grew up in the game.</p>

{% include hockey-glossary.html %}

<p><em>Tip: every term has its own link — tap the 🔗 on any card to copy it (for example <code>/hockey-glossary/#term-gap-control</code>). Handy for texting a definition to another parent.</em></p>

<h2>How to use this glossary</h2>

<ul>
  <li><strong>Search</strong> by term name in the box — start typing "gap," "fore," or "zone" and the list narrows as you go.</li>
  <li><strong>Filter</strong> by category to browse a group at once — skating, puck skills, shooting, team play, defense, game situations, special teams, or goaltending.</li>
  <li><strong>Follow the related chips</strong> on each card to jump to the terms most often confused with it.</li>
</ul>

<h2>Want the strategy behind the words?</h2>

<p>The glossary covers the vocabulary. If you want the <em>ideas</em> behind it — why "offense" means your team has the puck and not just your forwards, what a defender is really doing when a coach yells "tighten your gap," and why coaches obsess over keeping possession on a zone entry — read the companion guide:</p>

<p><a href="/blog/2026/06/18/hockey-concepts-for-parents/"><strong>10 Strategic Hockey Concepts That Change How You Watch the Game &rarr;</strong></a></p>

<div style="background:var(--secondary-bg);border:1px solid var(--border-color);border-left:3px solid var(--accent-primary);padding:1.25em 1.5em;margin:2.5em 0;border-radius:0 var(--radius-md) var(--radius-md) 0;">
  <p style="margin:0 0 0.35em;font-size:0.75em;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent-primary);">From knowing the word to seeing the play</p>
  <p style="margin:0 0 0.6em;font-size:1.05em;font-weight:600;color:var(--text-primary);line-height:1.4;">Reading a definition is step one. Watching it happen on your kid's own game film is what makes it stick.</p>
  <p style="margin:0 0 1em;color:var(--text-secondary);line-height:1.6;font-size:0.95em;">Scout Elite is video analysis built for youth hockey families and coaches. Upload the game, clip the exact moment a gap collapsed or a backcheck saved a goal, and show your kid what the coach was talking about — in plain language, with the picture right there.</p>
  {% include xpress-cta.html placement="glossary-page-cta" text="Try Scout Elite Free &rarr; No Account Needed" style="font-size:0.95em;" %}
</div>

<h2>Further reading</h2>

<p>Authoritative sources for hockey terminology, rules, and development:</p>

<ul>
  <li><a href="https://www.admkids.com/" target="_blank" rel="noopener">USA Hockey's American Development Model (ADM)</a> — the framework behind most "age-appropriate" language you'll hear.</li>
  <li><a href="https://www.usahockey.com/playingrules" target="_blank" rel="noopener">USA Hockey Official Playing Rules</a> — the rulebook and its glossary of rule terms.</li>
  <li><a href="https://www.hockeycanada.ca/en-ca/hockey-programs/coaching" target="_blank" rel="noopener">Hockey Canada Skills Development</a> — free coaching and skill resources.</li>
</ul>

    </div>
  </div>
</article>
