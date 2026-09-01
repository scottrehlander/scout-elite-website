# Plan: "The Report That Already Read Your Season" (AI reports with context)

**Status:** scoped 2026-09-01 with Scott, not started. Blocked on one thing only (§6.1).
**Target:** a new post in `_posts/`, permalink `/blog/ai-team-reports/`.
**Why now:** Report Sources + the Team Report type shipped to prod 2026-09-01 (app promotion
`0f3fe14`; every follow-up fix is on `master` too, only the docs commit is staging-only). The site
has never described it. `/features/ai-reports/` still sells the July feature set.

---

## 1. What this post owns

The E9 anti-cannibalization discipline applies to the reports cluster too. Current split:

| URL | Owns |
|---|---|
| `/blog/player-development-loop/` | the loop as a **method**, tool-agnostic |
| `/blog/tracking-youth-hockey-stats/` | **why write reports at all**, versus stat sheets |
| `/features/ai-reports/` | what the feature **is** (stale, see §10) |
| **this post** | **synthesis and communication**: what you say to the group, and how you know it's true |

The idea nothing on the site has yet: *the problem was never writing one report. It's that you
cannot hold eighteen of them in your head at once and see what repeats.* That is a memory problem,
not a blank-page problem. Every existing post solved the blank page. None solved this.

Both existing posts link out to `/features/ai-reports/`. This post should link to both of them and
be linked FROM neither in-prose (per `no-forced-internal-links` memory: only organic cross-links).

## 2. The angle and the emotional core

Scott's brief: coaches should finish this post feeling like they know exactly what it is to
communicate to a team, efficiently, *what is going on, what the plan is, and why*.

So the core feeling is **authority with receipts**: standing in front of the group, or sending one
document to eighteen families on a Sunday night, and saying *here is what we saw, here is how
widely it applies, here is what we're doing Tuesday, and here is why*, with every clause backed by
something real.

The single most persuasive fact in the whole feature, and the post's centerpiece:

> "Puck management under pressure appears in 11 of the 18 reports."
>
> That number is arithmetic over the coach's own reports, not a chatbot's impression.
> `src/app/lib/report-patterns.ts` counts distinct source reports per taxonomy tag, and
> `report-prompt.ts` carries an explicit rule forbidding the model from rounding up or inventing a
> count for a pattern that has none.

Counted, not estimated. That is what makes the document safe to read out loud to a room of parents,
and it is the paragraph a skeptical coach either believes or doesn't.

## 3. Decisions locked with Scott (2026-09-01)

| Question | Decision |
|---|---|
| Narrative spine | **Real session, polished.** Jr Falcons 2013, four small-group Zoom transcripts into one team report. Told as it works today. No bug archaeology, no "it asked me the same question three times." |
| Visuals | **Real screenshots** from the app, not HTML mockups. See §6. |
| Audience | **Team coaches primary**, plus a short skills-coach beat and a short parent beat, as one paragraph each in a single section. Not three mini-posts. |

The confessional voice that opens the stats post still survives, it just points at the coaching
instead of the software. Something in the shape of: *for years the honest answer to "what should he
work on?" was slightly different depending on which parent caught me in the parking lot. Not
because I was hedging. Because I was answering from whichever report I had written most recently.*

## 4. Outline

Roughly 2,300 words with four figures. A little longer than the other Coach Scott essays
(1,650 to 1,950), which is right for a post briefed as comprehensive.

1. **Cold open, the scene.** End of a camp. Eighteen player reports and four small-group meetings.
   You know things. Fifteen separate parking-lot conversations, each a slightly different answer.
2. **The problem isn't writing, it's holding it all at once.** The reframe. Memory quietly ranks by
   recency and volume (the loud kid, the one you talked to last) rather than by what actually repeats.
3. **What "context" actually means here.** Three layers in coach terms: a report from your
   sentences, then a report that read your other reports, then a report that *counted* them.
4. **Why short beats raw.** An hour of Zoom is mostly crosstalk and scheduling. Hand somebody the
   whole recording and the three sentences that mattered get buried. Each source is boiled to a
   brief once, at attach time, and the brief is what the assistant works from. Cost is the smaller
   argument; signal is the real one.
5. **Counted, not estimated.** The centerpiece (§2). Figure 1 lands here.
6. **The thing you would have missed.** The free-text extractor is told, in capitals, to surface
   **anything that contradicts what a written evaluation would say**, because that tension is the
   most valuable thing in a meeting and the first thing a generic summarizer discards as noise.
   Real QA example to paraphrase: the evaluation would mark defense as a strength, and the player
   says in the meeting he is still lost in the D zone. This is a coaching insight, not a feature
   bullet, and it is the section coaches will remember.
7. **Nothing is read until you say go.** Every brief is visible and editable, and one button starts
   it. Control without twenty-five modals. (Honest framing: the review list is offered, never enforced.)
8. **What it feels like to open it.** The synthesis opening instead of "what sport do you coach?"
   Figure 2 lands here. This is the "feel it" section Scott asked for and may be the most important
   one in the post.
9. **Then you talk to it like a coach.** "Make it first person." "Say we." "Take the names out."
   Document rewrites live beside the chat. Figure 3.
10. **What comes out, and who reads it.** The seven sections (§7 for the accurate list). Frame as
    the document that ends the fifteen parking-lot conversations.
11. **Deciding what not to send.** Privacy, as a trust asset rather than a disclaimer. Default is no
    player names at all; Individual Snapshots is opt-in only; the share dialog blocks Share until
    you acknowledge what the report was assembled from. Figure 4.
12. **And then it drafts Tuesday.** Loop closure: tag the reports to a group and the practice
    planner reads the *same cached findings* when it drafts the session. One extraction, two
    consumers. See the §7 guardrail about what NOT to claim here.
13. **"Anyone who keeps reports."** One paragraph each:
    - *Skills coach.* End-of-block summary per client family from that family's own report history.
      This is the persona pitch already in `agents.md`: one organized system per client family, a
      season-long history parents can reference.
    - *Parent.* A season of reports becomes the document you bring to a tryout conversation or hand
      to next year's coach. Both kinds count here: the ones you wrote off your own camera-roll
      clips, and the ones your coach shared with you. That second half is the point, and it is the
      case a parent will actually have. Pricing supports it cleanly, since Solo is the creation
      toolkit that parents buy, not a coach plan.
    - **Shared reports work as context. Say so.** A report someone shared with you is fully
      attachable: `sources/route.ts` reads through `get_user_reports_all` specifically so that
      "reports shared with the user are attachable too", and the brief reaches the assistant like
      any other source. This matters most for the parent beat, where the reports a family has are
      usually the ones a coach shared with them. Do not write around it.
    - **The one real limit, and it is narrow.** `ensureReportFindings` only extracts from reports
      the user **owns**, so a shared report is summarized and used but does not feed the numeric
      pattern counts. The picker badges those rows "not counted" and the panel explains the gap
      (`SourcePickerPanel.tsx`: "It will be summarized and used, but it cannot be included in the
      pattern counts"). This is a footnote about one sentence pattern, not a restriction on the
      feature. If the post mentions it at all, mention it once, in the counted-patterns section,
      not in the audience beats.
14. **The generous close.** Both prior posts end with a version of "the point is the report, not the
    tool." Keep it. Even with a legal pad the move is: read all eighteen in one sitting and write
    down what repeats. That generosity is a voice signature, do not drop it for a harder sell.

## 5. Voice and tone

- Coach Scott, first person, parent coach to parent coach.
- **No em-dashes in site prose.** Commas, periods, parentheses.
- "Minutes, not evenings." **Never** an explicit before/after number ("2 minutes instead of 15").
- Never frame the tools as a required workflow or sequence. Each works standalone, any order.
- Say "development" / "developing your players" when naming the activity the reader does.
  "Coach" is fine when it names a person.
- Work in the "it learns your team / gets sharper as you use it" idea where it is genuinely true,
  which here it is: the findings cache accumulates across the season.
- Never write "Xpress" in prose.

## 6. Visuals

### 6.1 Blocker: QA account needs a Solo license

Report sources are **Solo+ gated** and the e2e QA account is free tier. Phase 2 was verified by
granting it a temporary Solo license and revoking it afterwards (`report-sources-plan.md` §13).
**Scott has to grant that again before any of this can be captured.** This is the only thing
standing between here and starting.

### 6.2 Seed fictional players, not the real team

The narrative is Scott's real session. The screenshots must not be. Putting real kids' names and
real development areas on a public marketing page is not acceptable, and the patterns panel shows
named players per pattern (`MAX_PLAYERS = 6` in `report-patterns.ts`). **Seed a fictional roster.**

Seeding shape, so the counts look honest rather than manufactured:

- ~16 short player reports with deliberately overlapping weaknesses. Aim for a spread like one
  theme at 11, one at 8, one at 7, then a couple of singletons. A panel where everything is 16 of
  16 reads as fake.
- 2 pasted "meeting transcripts", one carrying a planted contradiction (see outline §6) so figure 2
  can show the assistant surfacing it.
- Reports need saved `report_content` or they are listed but disabled in the picker
  ("No saved content yet").
- Then attach as sources, let distillation run (client-driven, 3-wide pool), and run the patterns
  pass. Note `MAX_ANALYZE = 4` per patterns POST, driven in batches 2-wide by the dialog, so
  16 reports is several rounds. Budget one AI message per source distilled plus one per report
  actually extracted.

### 6.3 The four figures, in order of value

1. **The patterns panel with coverage bars.** Real counts, real denominators. The money shot.
2. **The synthesis opening message.** The assistant's first turn naming what it found across the
   sources. Arguably outranks figure 1 for Scott's stated goal, because it is the one that conveys
   the *feeling*.
3. **Split screen mid-rewrite.** Chat left, document right, right after "say we, not they."
4. **The share dialog with the amber privacy notice.** Shows the product refusing to let you send
   something carelessly. Strong trust visual.

### 6.4 Mechanics

- `npm run dev` in `../scout-elite` (hits QA Supabase), drive headless Chromium via
  `playwright-core`. Login mirrors `../scout-elite/tests/e2e/auth.setup.ts`; creds in
  `../scout-elite/.env.local`. Dismiss tour popups before shooting.
- Source PNGs untracked in a new `img/app-screenshots/2026-09-candidates/`.
- Web-ready derivatives into `img/blog/` via jimp (no ImageMagick, sharp or PIL on this box).
- **Hero image:** `img/blog/Conversation-with-Coaches-1.png` is the recommendation, it is literally
  coaches in conversation and the post is about communicating. `on-the-bench.jpg` is the fallback.
  Do **not** use the E9 rink-line-art house style: that treatment belongs to the league-data posts.

## 7. Accuracy guardrails

Verified against `../scout-elite` on 2026-09-01. Re-check before publishing if time passes.

**True, and safe to claim:**
- Sources accept **other reports** and **pasted text** (`.txt` / `.vtt` / `.srt`, timecodes stripped
  before the model sees them).
- Distilled once at attach time into a brief under 180 words. The chat only ever sees briefs.
- Briefs are editable, and a hand-edited brief is never regenerated over (the distill route returns
  409 on `user_edited`).
- Counts are computed from cached `report_findings`, capped at 8 patterns carried into the prompt.
- **Reports shared with you are attachable as sources**, distilled, and used in the report, exactly
  like reports you own. Verified 2026-09-01 in `src/app/api/reports/[id]/sources/route.ts`, which
  reads through `get_user_reports_all` for precisely this reason.
- The prompt forbids rounding up or inventing counts.
- Team Report default voice is the coach's own, first person plural, and it names **no individual
  players by default**. Individual Snapshots is opt-in.
- Sharing a sourced report shows a privacy notice and blocks Share until acknowledged.
- The seven sections: Group Overview, Team Strengths, Development Priorities, Themes from
  Conversations, Individual Snapshots (optional), Plan Going Forward, Notes.
- Sources are **Solo+**. Sharing is **Pro**. Free tier creates 3 reports.
- One AI message per source attached. Solo and Pro get 1,000 a month, free gets 50.
- 60-source cap per report.

**Must NOT be claimed:**
- ❌ **"Build a practice plan from this" as a one-button handoff.** Not built, it is Phase 4. The
  loop closes today via context tags: tag reports to a group, and the practice planner's
  Development Loop reads those same findings. Describe *that*, which is real.
- ❌ Video, Scout Elite Live games, practice plans or clip sessions as source kinds. All Phase 4.
- ❌ That a report shared with you contributes to the **counted patterns**. It is summarized and
  used in the report, it just is not in the numerator or the denominator. Note the shape of this
  one: it is a narrow caveat about the counts, **not** a limit on using shared reports as context.
  An earlier draft of this plan got that backwards (Scott caught it, 2026-09-01). See §4.13.
- ❌ Any explicit before/after time number.
- ❌ Anything implying a required order of operations across features.

## 8. Frontmatter and SEO

```yaml
layout: post
display_title: "The Report That Already Read Your Season"
title: "AI Team Reports for Hockey Coaches: One Plan From Every Player Evaluation"
description: "..."   # specific, keyword-bearing, one or two sentences
date: 2026-09-XX
last_modified_at: 2026-09-XX
categories: [coaching]
tags: [hockey team report, AI hockey reports, youth hockey player development, ...]
author: "Coach Scott"
excerpt: "..."
image:
  path: /img/blog/<hero>.jpg
  alt: "..."
permalink: /blog/ai-team-reports/
```

Evergreen clean slug, no year, per the blog permalink convention. Title alternatives considered and
rejected: "11 of 18" (too cryptic for search), "Say It Once, and Say It Right" (no keywords).

Reminder: when `image` is a `{path, alt}` object, listing templates must read
`{{ post.image.path | default: post.image }}`. `_pages/blog.md` already does.

## 9. Work order

1. **Scott grants QA Solo.** Blocker, nothing starts without it.
2. Seeding script: 16 fictional player reports plus 2 transcripts, assembled into one Team Report.
3. Capture the four figures, downscale with jimp, commit derivatives to `img/blog/`.
4. Draft the post.
5. `bundle exec jekyll build` (Docker, ~1s), then the UTM audit from `agents.md`.
6. Verify the post at 1280px and 375px.
7. Standard blog CTA: `{% include xpress-cta.html placement="blog-post-cta" ... %}`.

## 10. Deliberately out of scope (follow-on work)

- **`/features/ai-reports/` is stale.** It sells the July feature set and says nothing about
  sources, the Team Report type, or counted patterns. Worth its own pass once this post establishes
  the language.
- **Homepage and pricing copy** do not mention that sources are Solo+.
- Do not mint a second reports-cluster URL for either of those. Update in place.

## 11. Open questions

- Publish date: hold for a launch moment, or ship as soon as the screenshots exist?
- Does the post name Jr Falcons 2013 explicitly (there is already a Jr Falcons post on the site to
  link to), or stay at "a team I coach"? Scott chose the real session, but naming the club in the
  same post as a privacy section is worth one deliberate look.
- Whether the four figures should carry captions in the scientific-figure style used by Playbooks,
  or run as plain images.

## 12. Source anchors in `../scout-elite`

For re-verification by whoever picks this up:

| Claim | File |
|---|---|
| Counted patterns, why not `aggregatePriorities()` | `src/app/lib/report-patterns.ts` (header comment) |
| The no-rounding prompt rule, SOURCE MATERIAL block | `src/app/lib/report-prompt.ts` |
| Per-kind extractors, the contradiction instruction | `src/app/lib/source-distiller.ts` |
| Caching, and why charging must check freshness first | `src/app/lib/findings-extractor.ts` |
| Share privacy notice wording | `src/app/lib/report-share-notice.ts` |
| Team Report guidance, voice, the seven sections | `supabase/migrations/20260831120000_team_report_type.sql` |
| Voice and names migration | `supabase/migrations/20260901100000_*.sql` |
| The whole design record, including the first real session | `ai-context/plans/report-sources-plan.md` (§12a) |
| Limits (80k distill, 400k text) | `src/app/lib/report-source-limits.ts` |
