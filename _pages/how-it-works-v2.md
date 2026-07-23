---
layout: default
title: "How Scout Elite Works: For Team Coaches, Skills Coaches & Parents"
description: "Pick your spot at the rink and see what a week with Scout Elite looks like for a team coach, a skills coach, or a hockey parent. AI-assisted video, reports, practice plans, and playbooks."
permalink: /how-it-works-v2/
last_modified_at: 2026-07-23
image: /img/Scout-Elite-how-it-works-hero.png
utm_campaign: how-it-works-v2
sitemap: false
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
</style>

<!-- Hero -->
<section class="hero hero--centered" style="background: var(--primary-bg); padding: var(--space-20) 0 3rem 0;">
    <div class="container" style="max-width: 760px; text-align: center;">
        <p style="color: var(--accent-hover); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 1.1rem;">Review. Plan. Develop. Repeat.</p>
        <h1 class="hero-title" style="font-size: 2.6em; margin-bottom: 0.5em;">The coaching you love, minus the evenings you don't.</h1>
        <p class="hero-subtitle" style="font-size: 1.2em; color: var(--text-secondary); margin: 0 auto 2em auto; max-width: 640px;">Scout Elite is an AI-assisted workspace for youth hockey. It takes the film sessions, player reports, practice plans, and playbook upkeep off your plate. Every tool works on its own, in any order, and the whole thing gets smarter the more you use it.</p>
        {% include xpress-cta.html placement="hiw2-hero" text="Try It Now &rarr; No Signup" class="cta-button" style="display:inline-block; background:var(--accent-primary); color:white; padding:1rem 2rem; border-radius:var(--radius-md); font-weight:600; font-size:1.1rem; text-decoration:none; box-shadow:var(--shadow-sm);" %}
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">No credit card. No upload required. Loads a real game review in your browser in under a minute.</p>
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
                <span class="persona-tab__where">On the ice</span>
                <span class="persona-tab__name">Skills Coach</span>
                <p class="persona-tab__hook">I train players one on one and build my own drills.</p>
            </button>
            <button class="persona-tab" role="tab" aria-selected="false" id="tab-parent" aria-controls="story-parent" onclick="showPersona('parent')">
                <span class="persona-tab__where">In the stands</span>
                <span class="persona-tab__name">Hockey Parent</span>
                <p class="persona-tab__hook">My kid plays. I film the games and want to help at home.</p>
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
            <h3 class="persona-story__title">A week on the ice</h3>
            <p class="persona-story__lede">Your product is progress the athlete can feel and the parent can see. Scout Elite makes both visible, and keeps every client's work in one place.</p>

            <div class="story-step">
                <div class="story-step__day">Before the session</div>
                <p class="story-step__body">A client's parent shares game footage with you, or sends files you drop into your <strong>video library</strong>. You skim and clip the shifts that matter for what you're teaching, and tag them so they're easy to find again.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">In the session</div>
                <p class="story-step__body">Pull the clips up rink-side. Frame by frame, <strong>telestration arrows</strong> over the exact edge work you mean. The athlete sees it instead of just hearing it.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">After the session</div>
                <p class="story-step__body">Ask the AI for a <strong><a href="/features/ai-reports/">player report</a></strong> while it's fresh: what you worked on, what to do at home before next week. Your one hour becomes a week of directed practice, and the parent gets a document worth paying for.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Between clients</div>
                <p class="story-step__body">Your drills live in a <strong><a href="/features/practice-planning/">drill library</a></strong> with proper diagrams, not in a notes app. Import the ones you built in CoachThem or Ice Hockey Systems, browse what other coaches publish, and reuse your best sessions as templates.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Next season</div>
                <p class="story-step__body">Everything compounds. Every client's clips, reviews, and reports stay in one place, so "remember what we fixed last spring" is a link, not a memory.</p>
            </div>

            <div class="persona-story__kicker">Your drills are yours. Scout Elite reads and writes an open drill format, so what you build here is never locked in.</div>
            <div class="persona-story__cta">
                {% include xpress-cta.html placement="hiw2-story-skills" text="Try It Free &rarr; No Signup" %}
            </div>
        </div>

        <!-- Parent story -->
        <div class="persona-story" id="story-parent" role="tabpanel" aria-labelledby="tab-parent">
            <h3 class="persona-story__title">A season from the stands</h3>
            <p class="persona-story__lede">You're at every game anyway. Scout Elite turns the hours you already spend at the rink into something your player can actually use.</p>

            <div class="story-step">
                <div class="story-step__day">Game day</div>
                <p class="story-step__body">Run <strong><a href="/scout-elite-live/">Scout Elite Live</a></strong>, the free mobile app, and tap the moments that matter: shifts, goals, that backcheck nobody else noticed. Publish the game and you've got a <strong>report with stats and a scoring log</strong> to share.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">That night</div>
                <p class="story-step__body">If someone filmed the game, your taps line up with the video and become clips automatically. Your kid's shifts, without scrubbing through the whole game.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">From the coach</div>
                <p class="story-step__body">When the coach shares a <strong>Review</strong>, your player watches focused clips on their phone. It's the coach's voice making the point, which lands better than yours from the front seat.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">At home</div>
                <p class="story-step__body">"What should they work on?" finally has a real answer. An <strong><a href="/features/ai-reports/">AI player development report</a></strong> turns what happened in games into things to practice in the driveway: specific, written down, theirs.</p>
            </div>
            <div class="story-step">
                <div class="story-step__day">Tryout season</div>
                <p class="story-step__body">Compile the best clips from the whole year into a <strong>highlight reel</strong> you can share with anyone.</p>
            </div>

            <div class="persona-story__kicker">Viewing everything your coach shares is free, forever, and a free account includes your first three AI reports. If you want the full creation toolkit, plans start at $4.99 a month.</div>
            <div class="persona-story__cta">
                {% include xpress-cta.html dest="/account/register" placement="hiw2-story-parent" text="Sign Up Free" %}
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
