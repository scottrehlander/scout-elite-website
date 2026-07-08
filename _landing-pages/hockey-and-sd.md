---
layout: default
title: "From Scott, the Hockey Dad with the App"
description: "If we met at Hockey & Daughters or Hockey & Sons at Gustavus, this is the page I mentioned. Try the app I built in your browser, and use the camp code for 90 days of Pro, free."
permalink: /lp/hockey-and-sd/
sitemap: false
utm_campaign: hockey-and-sd-2026
last_modified_at: 2026-07-08
---

<style>
/* AI practice-assistant hero mockup — adapted from /features/practice-planning/ */
.chat-mock {
    max-width: 480px;
    width: 100%;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
    text-align: left;
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
    max-width: 82%;
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
.chat-mock__doc {
    margin-top: 1.1rem;
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
.chat-mock__caption {
    margin-top: 0.85rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-align: center;
}
</style>

<!-- Hero -->
<section class="hero" style="background: var(--primary-bg); padding: 72px 0 48px 0;">
    <div class="container" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:48px;">
        <div class="hero-content" style="flex:1 1 360px; min-width:280px; max-width:600px; text-align: left;">
            <h1 class="hero-title" style="margin-bottom: 1rem;">Hi, I'm Scott. The hockey dad with the app.</h1>
            <p style="color: var(--text-secondary); font-size: 1.15rem; line-height: 1.75; margin-bottom: 1.25rem;">If we met at <strong style="color:var(--text-primary);">Hockey &amp; Daughters</strong> or <strong style="color:var(--text-primary);">Hockey &amp; Sons</strong> at Gustavus, this is the page I mentioned. My kids and I did the camp too. We're a hockey family from Massachusetts, and I coach my kids' teams back home.</p>
            <p style="color: var(--text-secondary); font-size: 1.15rem; line-height: 1.75; margin-bottom: 1.75rem;">I built Scout Elite because my coaching life was scattered across five tools: film in one place, practice plans in CoachThem, and a playbook that was an emailed PDF. I've been building this app to manage player development for almost 5 years now: film, clips, team reviews, practice plans, playbooks, player reports. Now I'm ready to share it.</p>
            <div class="hero-cta">
                {% include xpress-cta.html dest="/account/register?promo=GUSTAVUS-26-HOCKEY" placement="camp-hero" text="Claim Your 90 Days of Pro &rarr;" %}
            </div>
            <p style="margin-top:1rem; font-size:0.9rem; color: var(--text-secondary);">No credit card, nothing to cancel. The code applies automatically when you sign up from this page. Or {% include xpress-cta.html placement="camp-hero-try" text="poke around first, no account needed" class="camp-try-link" style="color: var(--accent-hover); text-decoration: underline;" %}.</p>
        </div>
        <div class="hero-visual" style="flex:1 1 340px; min-width:280px; max-width:480px; display:flex; flex-direction:column; align-items:center;">
            <div class="chat-mock">
                <div class="chat-mock__header">
                    <span class="chat-mock__title">Practice Assistant</span>
                    <span class="chat-mock__badge">AI</span>
                </div>
                <div class="chat-msg chat-msg--user">
                    <div class="chat-msg__bubble">Saturday's game report is in. Breakouts fell apart under the forecheck. 60 minutes, full ice Tuesday, 14 skaters.</div>
                </div>
                <div class="chat-msg">
                    <div class="chat-msg__bubble">On it. Here's a 60-minute skate built from that report: breakout-heavy, with a competitive finish.</div>
                </div>
                <div class="chat-mock__doc">
                    <div class="chat-mock__doc-head">
                        <h4>Tuesday Practice: Breakouts</h4>
                        <span>60 min</span>
                    </div>
                    <div class="plan-row">
                        <span class="plan-row__time">0&ndash;10</span>
                        <span class="plan-row__body"><strong>Warmup</strong>: edges &amp; puck touches</span>
                    </div>
                    <div class="plan-row">
                        <span class="plan-row__time">10&ndash;25</span>
                        <span class="plan-row__body"><strong>D-to-D breakout reps</strong>: both ends</span>
                    </div>
                    <div class="plan-row">
                        <span class="plan-row__time">25&ndash;40</span>
                        <span class="plan-row__body"><strong>Breakout vs 1-2-2 forecheck</strong>: live pressure</span>
                    </div>
                    <div class="plan-row">
                        <span class="plan-row__time">40&ndash;60</span>
                        <span class="plan-row__body"><strong>Small-area game</strong>: breakout to score</span>
                    </div>
                </div>
            </div>
            <p class="chat-mock__caption">This is how I build Tuesday's skate.</p>
        </div>
    </div>
</section>

<!-- What it does + reading list -->
<section style="background: var(--secondary-bg); padding: 56px 0;">
    <div class="container" style="max-width: 640px; margin: 0 auto;">
        <h2 class="section-title" style="margin-bottom: 1.5rem;">What Scout Elite actually does</h2>
        <div style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8; display: flex; flex-direction: column; gap: 1rem;">
            <p>It turns the coaching busywork that eats your evenings into minutes. Game film becomes clips, clips become team reviews the kids watch on their phones, and the AI assistant drafts your game reports, player development plans, and practice plans from a few sentences in plain English. It learns your team as the season goes, so what it drafts sounds like your bench, not a template.</p>
            <p>Every piece works on its own, in any order. Use what fits your season and skip the rest. Wondering how it stacks up against HUDL? <a href="/hudl-alternative/" style="color: var(--accent-hover);">Here's my honest take.</a></p>
            <p style="margin-top: 0.5rem;"><strong style="color:var(--text-primary);">If you'd rather read the thinking behind it, start with these:</strong></p>
        </div>
        <ul style="list-style: none; padding: 0; margin: 1.25rem 0 0 0; display: flex; flex-direction: column; gap: 1rem;">
            <li style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1rem 1.25rem;">
                <a href="/blog/tracking-youth-hockey-stats/" style="color: var(--accent-hover); font-weight: 600;">Stop Tracking Stats. Start Writing Game Reports.</a>
                <p style="margin: 0.35rem 0 0 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">Why a short game report beats a season of spreadsheets for developing players.</p>
            </li>
            <li style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1rem 1.25rem;">
                <a href="/blog/player-development-loop/" style="color: var(--accent-hover); font-weight: 600;">The Player Development Loop</a>
                <p style="margin: 0.35rem 0 0 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">The weekly cycle that turns games from tests into teachers, with or without software.</p>
            </li>
            <li style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1rem 1.25rem;">
                <a href="/blog/2026/04/13/high-school-hockey-webinar-recap-coach-greg-capello/" style="color: var(--accent-hover); font-weight: 600;">What High School Coaches Actually Look For</a>
                <p style="margin: 0.35rem 0 0 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">Recording and recap of our webinar with Coach Greg Capello on tryouts and development.</p>
            </li>
            <li style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1rem 1.25rem;">
                <a href="/blog/2024/12/08/the-scout-elite-manifesto/" style="color: var(--accent-hover); font-weight: 600;">The Scout Elite Manifesto</a>
                <p style="margin: 0.35rem 0 0 0; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">Why I'm building this: leveling the playing field in youth hockey.</p>
            </li>
        </ul>
    </div>
</section>

<!-- Camp code -->
<section style="background: var(--primary-bg); padding: 56px 0;">
    <div class="container" style="max-width: 720px; margin: 0 auto;">
        <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 1.25rem; padding: 2.5rem 2rem; text-align: center;">
            <p style="font-size:0.85rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.75rem;">For camp families</p>
            <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 2.4rem; font-weight: 700; letter-spacing: 0.18em; color: var(--accent-hover); margin-bottom: 0.75rem;">GUSTAVUS-26-HOCKEY</div>
            <p style="color: var(--text-primary); font-size: 1.15rem; font-weight: 600; margin-bottom: 0.75rem;">90 days of Pro, on me. No credit card.</p>
            <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.65; max-width: 480px; margin: 0 auto 1.25rem auto;">No catch. Honest feedback from coaches like you is worth more to me than $13 a month. Tell me what's broken and what's missing.</p>
            <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.65; max-width: 480px; margin: 0 auto 1.75rem auto;">One click below and the code applies automatically when you create your account. Signing up on a different device? Enter the code under <strong style="color:var(--text-primary);">Account &rarr; Subscription</strong>.</p>
            {% include xpress-cta.html dest="/account/register?promo=GUSTAVUS-26-HOCKEY" placement="camp-code" text="Claim Your 90 Days of Pro &rarr;" %}
        </div>
    </div>
</section>

<!-- Video -->
<section style="background: var(--secondary-bg); padding: 56px 0;">
    <div class="container" style="max-width: 860px; margin: 0 auto;">
        <h2 class="section-title" style="text-align:center; margin-bottom: 2rem;">Three minutes, if you'd rather watch</h2>
        <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius: 1rem; box-shadow: 0 8px 32px rgba(0,0,0,0.25); background: var(--card-bg);">
            <iframe src="https://www.youtube.com/embed/XkhwIlIs-ss" title="Coach Smarter: Scout Elite for Youth &amp; Minor Hockey Player Development" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:1rem;"></iframe>
        </div>
    </div>
</section>

<!-- Founding coaches -->
<section style="background: var(--primary-bg); padding: 56px 0;">
    <div class="container" style="max-width: 640px; margin: 0 auto;">
        <h2 class="section-title" style="margin-bottom: 1rem;">One more thing, if you coach</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.75; margin-bottom: 1.5rem;">I'm taking on <strong style="color:var(--text-primary);">five founding coaches</strong> this season, and I mean five. You get Pro free through the whole season and a direct line to me. In return: a 15-minute call once a month telling me what's broken, and, if you end up loving it, a testimonial and a couple of your drills shared to the community library. That's the whole deal.</p>
        <!-- TODO(GTM plan §4 Sunday): add the Calendly "15-min setup call" link here once created. -->
        <a href="/support/" class="btn btn-secondary">Get in Touch</a>
    </div>
</section>

<!-- Sign-off + footer CTA -->
<section style="background: var(--secondary-bg); padding: 48px 0;">
    <div class="container" style="max-width: 640px; margin: 0 auto; text-align:center;">
        <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.75; margin-bottom: 1.5rem;">Thanks for a great week at Gustavus. See you at the rink,<br><strong style="color:var(--text-primary);">Scott</strong></p>
        {% include xpress-cta.html placement="camp-footer" text="Try Scout Elite Free &rarr;" %}
    </div>
</section>
