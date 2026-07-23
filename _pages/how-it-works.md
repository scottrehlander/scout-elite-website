---
layout: default
title: "How Scout Elite Works: For Team Coaches, Skills Coaches & Parents"
description: "Pick your spot at the rink and see what a week with Scout Elite looks like for a team coach, a skills coach, or a hockey parent. AI-assisted video, reports, practice plans, and playbooks."
permalink: /how-it-works/
last_modified_at: 2026-07-23
image: /img/how-it-works/review-clips-jr-falcons.jpg
---

<style>
/* Persona picker + stories, used only on this page. */
.persona-picker {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
    max-width: 920px;
    margin: 0 auto;
}
.persona-tab {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem 1.4rem;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.persona-tab:hover {
    border-color: rgba(0, 153, 255, 0.4);
    transform: translateY(-2px);
}
.persona-tab.active {
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-sm);
}
.persona-tab__where {
    display: block;
    color: var(--accent-hover);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.45rem;
}
.persona-tab__name {
    display: block;
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1.15rem;
    margin-bottom: 0.4rem;
}
.persona-tab__hook {
    color: var(--text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
    margin: 0;
}
.persona-story {
    display: none;
    max-width: 720px;
    margin: 3rem auto 0 auto;
}
.persona-story.active {
    display: block;
}
.persona-story__title {
    color: var(--text-primary);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
}
.persona-story__lede {
    color: var(--text-secondary);
    text-align: center;
    line-height: 1.6;
    max-width: 560px;
    margin: 0 auto 2.5rem auto;
}
.story-step {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.75rem;
}
.story-step__day {
    flex-shrink: 0;
    width: 120px;
    text-align: right;
    color: var(--accent-hover);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding-top: 0.35rem;
    line-height: 1.4;
}
.story-step__body {
    flex: 1;
    color: var(--text-secondary);
    line-height: 1.65;
    margin: 0;
    border-left: 2px solid var(--border-color);
    padding-left: 1.5rem;
    padding-bottom: 0.25rem;
}
.story-step__body strong {
    color: var(--text-primary);
    font-weight: 600;
}
.story-step__body a {
    color: var(--accent-hover);
}
.persona-story__kicker {
    color: var(--text-secondary);
    line-height: 1.6;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.1rem 1.4rem;
    margin: 2rem 0;
}
.persona-story__cta {
    text-align: center;
    margin-top: 2rem;
}
@media (max-width: 640px) {
    .story-step {
        flex-direction: column;
        gap: 0.4rem;
    }
    .story-step__day {
        width: auto;
        text-align: left;
        padding-top: 0;
    }
}

/* Learns-your-team + toolbox cards */
.learn-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    max-width: 1000px;
    margin: 0 auto;
}
.learn-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.75rem 1.5rem;
}
.learn-card strong {
    color: var(--accent-hover);
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}
.learn-card h3 {
    color: var(--text-primary);
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}
.learn-card p {
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
}
.toolbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}
.toolbox-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.6rem 1.5rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.toolbox-card:hover {
    border-color: rgba(0, 153, 255, 0.4);
    transform: translateY(-2px);
}
.toolbox-card h3 {
    color: var(--text-primary);
    font-size: 1.05rem;
    margin-bottom: 0.45rem;
}
.toolbox-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.55;
    margin: 0 0 0.75rem 0;
}
.toolbox-card a {
    color: var(--accent-hover);
    font-weight: 600;
    font-size: 0.9rem;
}

/* Screenshot figures: one framing language for every product visual. */
.shot {
    margin: 0;
}
.shot img {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
}
.shot figcaption {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--text-secondary);
    font-size: 0.85rem;
    line-height: 1.5;
    margin-top: 0.8rem;
}
.shot figcaption::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent-primary);
    flex-shrink: 0;
}
.story-shot {
    margin: 2rem 0 2.5rem calc(120px + 1.5rem);
}
@media (max-width: 640px) {
    .story-shot {
        margin-left: 0;
    }
}
.learn-shot {
    max-width: 880px;
    margin: 2.75rem auto 0 auto;
}
.learn-shot figcaption {
    justify-content: center;
}

/* Split hero */
.hero-split {
    display: flex;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
}
.hero-split__copy {
    flex: 1 1 360px;
    min-width: 300px;
    max-width: 560px;
    text-align: left;
}
.hero-split__visual {
    flex: 1 1 380px;
    min-width: 280px;
    position: relative;
}
.hero-split__visual::before {
    content: "";
    position: absolute;
    inset: -14%;
    background: radial-gradient(closest-side, rgba(0, 153, 255, 0.14), transparent 72%);
    pointer-events: none;
}
</style>

<!-- Hero -->
<section class="hero" style="background: var(--primary-bg); padding: var(--space-20) 0 3rem 0; overflow: hidden;">
    <div class="container hero-split">
        <div class="hero-split__copy">
            <p style="color: var(--accent-hover); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 1.1rem;">Review. Plan. Develop. Repeat.</p>
            <h1 class="hero-title" style="font-size: 2.5em; margin-bottom: 0.5em;">What a week of coaching looks like with Scout Elite.</h1>
            <p class="hero-subtitle" style="font-size: 1.15em; color: var(--text-secondary); margin: 0 0 2em 0;">Scout Elite is an AI-assisted workspace for youth hockey. It takes the film sessions, player reports, practice plans, and playbook upkeep off your plate. Every tool works on its own, in any order, and the whole thing gets smarter the more you use it.</p>
            {% include xpress-cta.html placement="hiw2-hero" text="Try It Now &rarr; No Signup" class="cta-button" style="display:inline-block; background:var(--accent-primary); color:white; padding:1rem 2rem; border-radius:var(--radius-md); font-weight:600; font-size:1.1rem; text-decoration:none; box-shadow:var(--shadow-sm);" %}
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">No credit card. No upload required. Loads a real game review in your browser in under a minute.</p>
        </div>
        <div class="hero-split__visual">
            <figure class="shot">
                <img src="/img/how-it-works/review-clips-jr-falcons.jpg" alt="A Scout Elite Review: game video beside categorized goal clips, each with the coach's notes and tags" width="1600" height="828" loading="eager">
            </figure>
        </div>
    </div>
</section>

<!-- Persona picker -->
<section id="find-yourself" style="background: var(--secondary-bg); padding: 4rem 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Everyone's at the same rink. Pick your spot.</h2>
            <p class="section-subtitle" style="max-width: 560px; margin: 0 auto;">Scout Elite looks different depending on where you stand on game day. Find yourself, then read what a normal week looks like.</p>
        </div>

        <div class="persona-picker" role="tablist" aria-label="Choose your role">
            <button class="persona-tab active" role="tab" aria-selected="true" id="tab-team-coach" aria-controls="story-team-coach" onclick="showPersona('team-coach')">
                <span class="persona-tab__where">Behind the bench</span>
                <span class="persona-tab__name">Team Coach</span>
                <p class="persona-tab__hook">I run the team. Games, practices, the group chat, all of it.</p>
            </button>
            <button class="persona-tab" role="tab" aria-selected="false" id="tab-skills-coach" aria-controls="story-skills-coach" onclick="showPersona('skills-coach')">
                <span class="persona-tab__where">In the film room</span>
                <span class="persona-tab__name">Skills Coach</span>
                <p class="persona-tab__hook">I develop players one on one: video analysis, training, small groups.</p>
            </button>
            <button class="persona-tab" role="tab" aria-selected="false" id="tab-parent" aria-controls="story-parent" onclick="showPersona('parent')">
                <span class="persona-tab__where">In the stands</span>
                <span class="persona-tab__name">Hockey Parent</span>
                <p class="persona-tab__hook">I'm at every game and want to build on what the coach is teaching.</p>
            </button>
        </div>

        <!-- Team coach story -->
        <div class="persona-story active" id="story-team-coach" role="tabpanel" aria-labelledby="tab-team-coach">
            <h3 class="persona-story__title">A week behind the bench</h3>
            <p class="persona-story__lede">You coach because you love the game. The job, though, is film, reports, plans, and messages, and it all lands on weeknights. Here's the same week with Scout Elite.</p>

            <div class="story-step">
                <div class="story-step__day">Saturday,<br>after the game</div>
                <p class="story-step__body">A parent filmed from the stands, same as always. Your assistant ran <strong><a href="/scout-elite-live/">Scout Elite Live</a></strong> on their phone and tapped moments as they happened: the blown coverage on their second goal, the breakout that finally clicked in the third. Every tap is already attached to the game clock.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Saturday night</div>
                <p class="story-step__body">Upload the video and import the tagged events. <strong>Clips create themselves</strong> at the right moments. You skim them on the couch, trim a couple, and draw an arrow on the play where words won't cut it. No help at the rink that day? Mark moments yourself as you watch, or let AI clip detection find the plays.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Sunday</div>
                <p class="story-step__body">Build the <strong><a href="/features/video/">Review</a></strong>. Defensemen get the defensive-zone clips, forwards get the forecheck, everyone gets the goals. Share it and the team watches on their phones before Monday's skate. Nobody sits through forty minutes of full game.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Monday</div>
                <p class="story-step__body">Ask the AI for the <strong><a href="/features/ai-reports/">game report</a></strong>. You tell it the score and what you saw, it drafts a clean writeup while you chat, and you fix anything in plain English. Parents actually read these.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Tuesday</div>
                <p class="story-step__body">Practice time. The <strong><a href="/features/practice-planning/">practice assistant</a></strong> has read your reports and your tagged clips, so it already knows the breakout keeps dying on the wall. It drafts a timed session that attacks it, with real rink diagrams, and skips the drills you just ran last week. Print the sheet for the bench.</p>
            </div>
            <figure class="shot story-shot">
                <img src="/img/how-it-works/community-drill-library.jpg" alt="The Scout Elite community drill library: hockey drills with hand-drawn rink diagrams, filterable by category and age" width="1600" height="1000" loading="lazy">
                <figcaption>Tuesday's plan pulls from a drill library with real diagrams, your own drills and the community's.</figcaption>
            </figure>

            <div class="story-step">
                <div class="story-step__day">All season</div>
                <p class="story-step__body">Your systems live in a <strong><a href="/features/playbooks/">Playbook</a></strong>: diagrams, real clips from your own games, and notes on one page. Tweak the forecheck in October and the whole team sees the update. No new whiteboard photo in the group chat.</p>
            </div>

            <div class="persona-story__kicker">None of this is a required sequence. Plenty of coaches start with just clips and reviews, or just practice plans. Each tool stands alone. They're simply better together.</div>
            <div class="persona-story__cta">
                {% include xpress-cta.html placement="hiw2-story-coach" text="Run a Week Like This &rarr; No Signup" %}
            </div>
        </div>

        <!-- Skills coach story -->
        <div class="persona-story" id="story-skills-coach" role="tabpanel" aria-labelledby="tab-skills-coach">
            <h3 class="persona-story__title">Every family's data, finally organized.</h3>
            <p class="persona-story__lede">Some weeks you're on the ice, some weeks it's all remote. Either way your product is progress the athlete can feel and the parent can see, and Scout Elite is where all of it lives.</p>

            <div class="story-step">
                <div class="story-step__day">Film arrives</div>
                <p class="story-step__body">A client's parent shares weekend game footage with you, or sends files you drop into your <strong>video library</strong>. You clip the shifts that matter for what you're teaching and tag them by skill, so every clip is findable next month, not just this week.</p>
            </div>

            <figure class="shot story-shot">
                <img src="/img/how-it-works/clip-creator-tag-strip.jpg" alt="The Scout Elite Clip Creator: game video with a strip of hockey event tags and a panel of tagged goal clips" width="1600" height="836" loading="lazy">
                <figcaption>The film, cut into tagged clips you can still find in March.</figcaption>
            </figure>

            <div class="story-step">
                <div class="story-step__day">The breakdown</div>
                <p class="story-step__body">Build the athlete's <strong>Review</strong> from anywhere: frame by frame, <strong>telestration arrows</strong> over the exact edge work you mean, your notes on every clip. Share the link and they watch it with their parents that night. They see it instead of just hearing it.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Session day</div>
                <p class="story-step__body">Rink-side or on a call, you teach straight from the clips. And the Review stays up after the session ends, so the lesson keeps working between visits.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">The report</div>
                <p class="story-step__body">Ask the AI for a <strong><a href="/features/ai-reports/">player report</a></strong> while it's fresh: what you worked on, what to do before next time. Reports build a season-long history of each athlete that parents can look back through, which is exactly the progress they're paying you to show.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">All year</div>
                <p class="story-step__body">Your library compounds. Clips, <strong><a href="/features/practice-planning/">drills</a></strong>, reviews, and reports stay organized in one system and reusable for the next athlete with the same problem. Scout Elite becomes your knowledgebase, and the way your teaching reaches every client.</p>
            </div>

            <div class="persona-story__kicker">One system for every client: the analysis, the drills, the reports. Reusable for the next athlete, referenceable by parents, and always yours. Scout Elite reads and writes an open drill format, so nothing you build is locked in.</div>
            <div class="persona-story__cta">
                {% include xpress-cta.html placement="hiw2-story-skills" text="Try It Free &rarr; No Signup" %}
            </div>
        </div>

        <!-- Parent story -->
        <div class="persona-story" id="story-parent" role="tabpanel" aria-labelledby="tab-parent">
            <h3 class="persona-story__title">A season from the stands</h3>
            <p class="persona-story__lede">Your camera roll tells the story: random short clips of your kid being brilliant, and a few of the moments that drove you crazy. Scout Elite gives all of it somewhere to go.</p>

            <div class="story-step">
                <div class="story-step__day">Game day</div>
                <p class="story-step__body">You come home with a handful of new clips, and you know how it goes: the moment you want to show someone, you can never find them. Upload them instead and they're organized by game and tagged by skill, so the clip you want to send their coach is a search, not a scroll. Want to track moments live? The free <strong><a href="/scout-elite-live/">Scout Elite Live</a></strong> app helps tracks the moments you'll want to remember.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">File it away</div>
                <p class="story-step__body">Drop each clip into a folder: one for the season, one for tryouts, one for each kid if you have a few playing. That's the whole job. No editing, no timeline, nothing to learn. Just a library where the good stuff stays findable for years.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">The record</div>
                <p class="story-step__body">The backbone is the <strong><a href="/features/ai-reports/">player development report</a></strong>. Tell the AI what you saw and "what should they work on?" gets a real answer: specific things to practice in the driveway, written down, theirs. Keep making them and you have a season-long record of progress, and when a report calls out wall battles, the clips you tagged wall battles are sitting right next to it.</p>
            </div>
            <figure class="shot story-shot">
                <img src="/img/how-it-works/ai-player-report-chat.jpg" alt="A Scout Elite AI player report: a parent's plain notes in a chat on the left, a drafted development plan with strengths and areas of focus on the right" width="1600" height="1000" loading="lazy">
                <figcaption>Plain notes go in on the left. A development plan comes out on the right.</figcaption>
            </figure>

            <div class="story-step">
                <div class="story-step__day">From the coach</div>
                <p class="story-step__body">When the coach shares a <strong>Review</strong> or a report, it lands in the same place, free to view. Set the coach's reports beside your own and you're seeing the same player from the bench and the stands.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Tryout season</div>
                <p class="story-step__body">All those saved clips become a <strong>highlight reel</strong> you can compile and share with anyone. A season of evidence, three minutes long.</p>
            </div>

            <div class="persona-story__kicker">None of this depends on your coach using Scout Elite. Viewing everything a coach does share is free, forever, and a free account includes your first three AI reports. The full creation toolkit starts at $4.99 a month.</div>
            <div class="persona-story__cta">
                {% include xpress-cta.html placement="hiw2-story-parent" text="Try It Free &rarr; No Signup" %}
            </div>
        </div>
    </div>
</section>

<!-- Learns your team -->
<section style="background: var(--primary-bg); padding: 4rem 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">It learns your team as you go</h2>
            <p class="section-subtitle" style="max-width: 600px; margin: 0 auto;">No extra data entry. The evidence is the coaching you already did.</p>
        </div>
        <div class="learn-grid">
            <div class="learn-card">
                <strong>You coach normally</strong>
                <h3>Reports and tagged clips pile up</h3>
                <p>Write game reports, tag moments, thumbs-up the drills that worked. That's it. Every one of them is evidence about your team.</p>
            </div>
            <div class="learn-card">
                <strong>Scout Elite keeps score</strong>
                <h3>Recurring problems get ranked</h3>
                <p>It pulls the patterns out of your own reports and clips and ranks them by how often they show up, how recently, and how much they hurt.</p>
            </div>
            <div class="learn-card">
                <strong>Every draft starts closer</strong>
                <h3>Plans target what's real</h3>
                <p>The next practice attacks your top priorities with drills you haven't just run. Reports remember your players. Nothing starts from a blank page.</p>
            </div>
        </div>
        <figure class="shot learn-shot">
            <img src="/img/how-it-works/practice-plan-development-loop.jpg" alt="The Scout Elite practice planner: timed warmup and breakout sections on the left, the Development Loop drafting drill suggestions with rationale on the right" width="1720" height="1075" loading="lazy">
            <figcaption>The Development Loop drafting a practice from one sentence: breakouts keep dying on the wall.</figcaption>
        </figure>
        <p style="text-align: center; color: var(--text-secondary); max-width: 620px; margin: 2.5rem auto 0 auto;">That's the difference between a template and a tool that knows your team: your practices come from your games, not someone else's. Read more about <a href="/blog/player-development-loop/" style="color: var(--accent-hover);">the development loop</a>.</p>
    </div>
</section>

<!-- Toolbox -->
<section style="background: var(--secondary-bg); padding: 4rem 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">The whole toolbox</h2>
            <p class="section-subtitle" style="max-width: 540px; margin: 0 auto;">Six tools, one place. Start with any of them.</p>
        </div>
        <div class="toolbox-grid">
            <div class="toolbox-card">
                <h3>Video, Clips &amp; Reviews</h3>
                <p>Upload film, mark moments as you watch or import them from the rink, and share short, focused reviews.</p>
                <a href="/features/video/">Video &amp; Reviews &rarr;</a>
            </div>
            <div class="toolbox-card">
                <h3>AI Reports</h3>
                <p>Game reports and player development plans drafted in a chat, refined in plain English.</p>
                <a href="/features/ai-reports/">AI Reports &rarr;</a>
            </div>
            <div class="toolbox-card">
                <h3>Practice Plans &amp; Drills</h3>
                <p>Timed sessions with real rink diagrams, drafted from your own game data, printable for the bench.</p>
                <a href="/features/practice-planning/">Practice Planning &rarr;</a>
            </div>
            <div class="toolbox-card">
                <h3>Playbooks</h3>
                <p>Diagrams, real game clips, and coaching notes in one living document the whole team can see.</p>
                <a href="/features/playbooks/">Playbooks &rarr;</a>
            </div>
            <div class="toolbox-card">
                <h3>Scout Elite Live</h3>
                <p>Free mobile app. Tap events at the rink, get stats and a game report, feed clips automatically.</p>
                <a href="/scout-elite-live/">Scout Elite Live &rarr;</a>
            </div>
            <div class="toolbox-card">
                <h3>Teams &amp; Sharing</h3>
                <p>Share to the whole roster in a click. Free for players and parents to view everything.</p>
                <a href="/features/teams/">Teams &rarr;</a>
            </div>
        </div>
    </div>
</section>

<!-- Why + final CTA -->
<section style="background: var(--primary-bg); padding: 4rem 0;">
    <div class="container" style="max-width: 760px;">
        <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center;">
            <h2 style="color: var(--text-primary); font-size: 1.5rem; margin-bottom: 0.75rem;">Built by parent coaches, for parent coaches</h2>
            <p style="color: var(--text-secondary); line-height: 1.65; margin: 0 0 1.75rem 0;">Scout Elite exists because these tools shouldn't be exclusive to programs with video staff and big budgets. It's free for players and parents, coaches start at $4.99 a month, and every paid plan comes with a 14-day free trial.</p>
            {% include xpress-cta.html placement="hiw2-final" text="Try Scout Elite Free &rarr; No Signup" %}
            <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);"><a href="/#pricing" style="color: var(--accent-hover);">See pricing</a></p>
        </div>
    </div>
</section>

<script>
function showPersona(id) {
    document.querySelectorAll('.persona-tab').forEach(function(tab) {
        var active = tab.getAttribute('aria-controls') === 'story-' + id;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('.persona-story').forEach(function(panel) {
        panel.classList.toggle('active', panel.id === 'story-' + id);
    });
    if (history.replaceState) {
        history.replaceState(null, '', '#' + id);
    }
    // On phones the picker cards fill the screen; bring the story into view.
    if (window.matchMedia('(max-width: 700px)').matches) {
        var panel = document.getElementById('story-' + id);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
function applyPersonaHash() {
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('story-' + hash)) {
        showPersona(hash);
    }
}
document.addEventListener('DOMContentLoaded', applyPersonaHash);
window.addEventListener('hashchange', applyPersonaHash);
</script>
