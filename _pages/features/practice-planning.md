---
layout: default
title: "Youth & Minor Hockey Practice Planning: AI Plans & Drills"
description: "Build hockey practice plans in minutes. AI drafts a plan from your game analysis, pull from a drill library with rink diagrams, time every block, and share with your staff. Built for youth hockey coaches."
permalink: /features/practice-planning/
last_modified_at: 2026-06-13
---

<style>
.pp-loop {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
    max-width: 1000px;
    margin: 0 auto;
    align-items: stretch;
}
.pp-loop__step {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.75rem 1.5rem;
    text-align: center;
}
.pp-loop__step strong {
    color: var(--accent-hover);
    display: block;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
}
.pp-loop__step p {
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
}
.pp-block-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}
.pp-block {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.75rem 1.5rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.pp-block:hover {
    border-color: rgba(0, 153, 255, 0.4);
    transform: translateY(-2px);
}
.pp-block__icon {
    width: 44px;
    height: 44px;
    border-radius: 0.65rem;
    background: rgba(0, 153, 255, 0.12);
    color: var(--accent-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}
.pp-block h3 { color: var(--text-primary); margin-bottom: 0.5rem; }
.pp-block p { color: var(--text-secondary); line-height: 1.55; }
.pp-who {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    max-width: 1000px;
    margin: 0 auto;
}
.pp-who__card {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.85rem;
    padding: 1.5rem 1.25rem;
}
.pp-who__card strong {
    color: var(--accent-hover);
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
.pp-who__card p { color: var(--text-secondary); line-height: 1.55; margin: 0; }

/* AI practice-assistant mockup — used only on this page. */
.chat-mock {
    max-width: 560px;
    margin: 2rem auto 0 auto;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
}
.chat-mock__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.85rem;
    margin-bottom: 0.85rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.chat-mock__title { font-weight: 600; color: var(--text-primary); font-size: 0.95rem; }
.chat-mock__badge {
    font-size: 0.7rem;
    color: var(--accent-hover);
    background: rgba(0, 153, 255, 0.12);
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.chat-msg { display: flex; gap: 0.6rem; margin: 0.6rem 0; line-height: 1.45; font-size: 0.92rem; }
.chat-msg--user { flex-direction: row-reverse; text-align: right; }
.chat-msg__bubble {
    max-width: 78%;
    padding: 0.6rem 0.85rem;
    border-radius: 0.85rem;
    background: var(--secondary-bg);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}
.chat-msg--user .chat-msg__bubble {
    background: var(--accent-primary);
    border-color: var(--accent-primary);
    color: #ffffff;
}
.chat-msg__author {
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 600;
}
.chat-mock__doc {
    margin-top: 1.25rem;
    background: var(--primary-bg);
    border: 1px dashed var(--border-color);
    border-radius: 0.75rem;
    padding: 1rem 1.1rem;
    text-align: left;
}
.chat-mock__doc-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 0.6rem;
}
.chat-mock__doc-head h4 { margin: 0; color: var(--text-primary); font-size: 0.95rem; }
.chat-mock__doc-head span { color: var(--accent-hover); font-size: 0.78rem; font-weight: 700; }
.plan-row {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    padding: 0.4rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.plan-row__time {
    flex-shrink: 0;
    width: 52px;
    color: var(--accent-hover);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.03em;
}
.plan-row__body { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.4; }
.plan-row__body strong { color: var(--text-primary); font-weight: 600; }
.plan-row__tag {
    display: inline-block;
    font-size: 0.62rem;
    color: var(--accent-hover);
    background: rgba(0, 153, 255, 0.12);
    padding: 1px 6px;
    border-radius: 999px;
    margin-left: 0.4rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 700;
}
</style>

<!-- Hero -->
<section class="hero" style="background: var(--primary-bg);">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">From games, reviews, and reports directly into practice.</h1>
            <p class="hero-subtitle">Scout Elite&rsquo;s AI-powered feedback loop turns everything you already track into an intentional practice session, shaped around your team and each player. Every drill has a purpose, pulled from a configurable drill library. The whole plan comes together in minutes. Print a clean sheet for the bench, share it with your team, or run it live from your phone.</p>
            <div class="hero-cta">
                {% include xpress-cta.html placement="feature-practice-hero" text="Try It Free &rarr; No Signup" %}
                <a href="/#pricing" class="btn btn-secondary">See Pricing</a>
            </div>
            <p style="margin-top:1rem; font-size:0.9rem; color: var(--text-secondary);">Free tier: build 3 full practice plans and 10 of your own drills. Unlimited on Solo ($4.99/mo).</p>
        </div>
        <div class="hero-visual">
            <div class="chat-mock">
                <div class="chat-mock__header">
                    <div class="chat-mock__title">U12 Tuesday Practice</div>
                    <div class="chat-mock__badge">Practice Assistant</div>
                </div>
                <div class="chat-msg chat-msg--user">
                    <div>
                        <div class="chat-msg__author">You</div>
                        <div class="chat-msg__bubble">60 minutes, full ice, 14 skaters. Breakouts fell apart Saturday &mdash; let&rsquo;s work on those.</div>
                    </div>
                </div>
                <div class="chat-msg">
                    <div>
                        <div class="chat-msg__author">Scout Elite</div>
                        <div class="chat-msg__bubble">On it. Here&rsquo;s a 60-minute plan built around breakouts, with a warmup and a small-area game to finish.</div>
                    </div>
                </div>
                <div class="chat-mock__doc">
                    <div class="chat-mock__doc-head">
                        <h4>Tuesday Practice &mdash; Breakouts</h4>
                        <span>60 min</span>
                    </div>
                    <div class="plan-row">
                        <div class="plan-row__time">0:00</div>
                        <div class="plan-row__body"><strong>Edgework warmup</strong> &mdash; full ice <span class="plan-row__tag">10 min</span></div>
                    </div>
                    <div class="plan-row">
                        <div class="plan-row__time">0:10</div>
                        <div class="plan-row__body"><strong>D-to-D breakout reps</strong> &mdash; both ends <span class="plan-row__tag">15 min</span></div>
                    </div>
                    <div class="plan-row">
                        <div class="plan-row__time">0:25</div>
                        <div class="plan-row__body"><strong>Breakout under forecheck pressure</strong> <span class="plan-row__tag">15 min</span></div>
                    </div>
                    <div class="plan-row">
                        <div class="plan-row__time">0:40</div>
                        <div class="plan-row__body"><strong>3-zone regroup flow</strong> <span class="plan-row__tag">10 min</span></div>
                    </div>
                    <div class="plan-row">
                        <div class="plan-row__time">0:50</div>
                        <div class="plan-row__body"><strong>2v2 small-area game</strong> &mdash; corners <span class="plan-row__tag">10 min</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- The loop -->
<section style="background: var(--secondary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 1000px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Your game review becomes your next practice.</h2>
            <p class="section-subtitle" style="max-width: 720px; margin: 0 auto;">This is what makes Scout Elite different. The work you already do reviewing a game flows straight into the plan for the next practice &mdash; so you practice exactly what the game showed you.</p>
        </div>
        <div class="pp-loop">
            <div class="pp-loop__step">
                <strong>1 &middot; Review</strong>
                <p>Clip the game and build a focused team review, the way you already do in Scout Elite.</p>
            </div>
            <div class="pp-loop__step">
                <strong>2 &middot; Report</strong>
                <p>An <a href="/features/ai-reports/" style="color:var(--accent-hover);">AI Report</a> turns the review into clear takeaways &mdash; the patterns worth working on.</p>
            </div>
            <div class="pp-loop__step">
                <strong>3 &middot; Plan</strong>
                <p>The practice assistant reads those takeaways and drafts a session that targets them, drill by drill.</p>
            </div>
        </div>
    </div>
</section>

<!-- Capability blocks -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Everything a practice plan needs, in one place.</h2>
            <p class="section-subtitle" style="max-width: 700px; margin: 0 auto;">Built for the reality of youth and minor hockey: limited ice, mixed levels, and not a lot of time to plan.</p>
        </div>
        <div class="pp-block-grid">
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h3>AI-drafted plans</h3>
                <p>Tell Scout Elite AI your focus and how much ice time you have. It drafts a complete, timed plan in a live preview &mdash; pulling from your drills and your game takeaways. Refine it in plain English.</p>
            </div>
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/></svg>
                </div>
                <h3>A real drill library</h3>
                <p>Browse community drills with rink diagrams, coaching points, and coach ratings &mdash; or build your own. Every drill carries its category, age level, ice usage, and equipment, so the right one is easy to find.</p>
            </div>
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>
                </div>
                <h3>Timed blocks &amp; station rotations</h3>
                <p>Give every block a duration and watch the total update as you go. Group drills into stations with rotation timing, so a busy ice sheet runs itself.</p>
            </div>
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                </div>
                <h3>Print it or run it live</h3>
                <p>Print a clean one-page sheet for the clipboard, or open the Run Practice view on your phone at the rink to move through the plan block by block, timer and all.</p>
            </div>
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <h3>Diagrams that teach</h3>
                <p>Each drill and plan item gets the same rink canvas as <a href="/features/playbooks/" style="color:var(--accent-hover);">Playbooks</a> &mdash; players, pucks, lines, and arrows &mdash; so players can see the drill, not just read it.</p>
            </div>
            <div class="pp-block">
                <div class="pp-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </div>
                <h3>Share with the staff <span style="font-size: 0.7rem; background: rgba(0,153,255,0.15); color: var(--accent-hover); padding: 2px 8px; border-radius: 999px; vertical-align: middle; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-left: 0.4rem;">Pro</span></h3>
                <p>Send the plan to your assistant coaches or the whole team so everyone shows up knowing the flow. They get a clean, read-only view of the session.</p>
            </div>
        </div>
    </div>
</section>

<!-- How it works -->
<section style="background: var(--secondary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 940px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">How it works</h2>
        </div>
        <div style="display: grid; gap: 2rem;">
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">1</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Set the focus</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Start a new plan, set your date, ice time, and what you want this practice to accomplish. Save group profiles for a team or a player so the basics fill in next time.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">2</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Let Scout Elite AI draft it</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">The practice assistant builds a complete, timed plan in a live preview &mdash; drawing on your drill library and the takeaways from your recent game reports. Keep what fits, swap what doesn&rsquo;t.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">3</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Fine-tune the flow</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Reorder drills, adjust the timing, add your own notes and diagrams, and group drills into stations. The running total keeps your plan inside your ice time.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">4</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Take it to the rink <span style="font-size: 0.7rem; background: rgba(0,153,255,0.15); color: var(--accent-hover); padding: 2px 8px; border-radius: 999px; vertical-align: middle; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-left: 0.5rem;">Pro share</span></h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Print the one-page sheet, run the live view on your phone, and share the plan with your staff so the whole bench is on the same page.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Who it's for -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">What coaches actually use it for</h2>
        </div>
        <div class="pp-who">
            <div class="pp-who__card">
                <strong>Weekly practices</strong>
                <p>A fresh, timed plan for every skate &mdash; drafted in minutes, tuned to what your team needs this week.</p>
            </div>
            <div class="pp-who__card">
                <strong>Targeted skill work</strong>
                <p>Saw breakouts struggle on Saturday? Build Tuesday&rsquo;s practice straight from the game takeaways.</p>
            </div>
            <div class="pp-who__card">
                <strong>Station days</strong>
                <p>Group drills into rotating stations with their own timing, so a full sheet of kids stays busy and moving.</p>
            </div>
            <div class="pp-who__card">
                <strong>A drill bank you keep</strong>
                <p>Save the drills that work, rate the community ones worth running again, and reuse them all season.</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section style="background: var(--secondary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 720px; text-align: center;">
        <h2 class="section-title">Build your first plan before you sign up.</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 1rem auto 0;">The Try Scout Elite flow drops you into a working practice planner in your browser. Draft a plan, browse the drills, and see how it builds around what your team needs.</p>
        <p style="margin-top: 2rem;">
            {% include xpress-cta.html placement="feature-practice-cta" text="Try Scout Elite Free &rarr;" %}
        </p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">No signup. No credit card. Loads in your browser in under a minute.</p>
    </div>
</section>

<!-- Related -->
<section style="background: var(--primary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 900px; text-align: center;">
        <h2 class="section-title" style="margin-bottom: 1.5rem;">What else is in Scout Elite</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; max-width: 960px; margin: 0 auto;">
            <a href="/features/ai-reports/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">AI Reports &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Chat your way to a game breakdown or player plan.</p>
            </a>
            <a href="/features/playbooks/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Playbooks &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Diagrams, video, and text in one living document.</p>
            </a>
            <a href="/features/video/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Video &amp; Reviews &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Upload footage, clip key moments, share focused reviews.</p>
            </a>
            <a href="/features/teams/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Teams &amp; Sharing &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Invite your roster, share everything with one click.</p>
            </a>
        </div>
    </div>
</section>
