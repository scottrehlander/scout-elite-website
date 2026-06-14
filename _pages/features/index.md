---
layout: default
title: Scout Elite Features for Youth & Minor Hockey Coaches
description: "Everything in Scout Elite — AI Reports, Playbooks, Scout Elite Live, and the full video review workflow. Built for youth and minor hockey."
permalink: /features/
last_modified_at: 2026-05-28
utm_campaign: features-index
---

<style>
.features-index-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
}
.features-index-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: var(--text-primary);
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.features-index-card:hover {
    border-color: rgba(0, 153, 255, 0.45);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    color: var(--text-primary);
}
.features-index-card__badge {
    display: inline-block;
    align-self: flex-start;
    font-size: 0.65rem;
    background: rgba(0, 153, 255, 0.15);
    color: var(--accent-hover);
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
}
.features-index-card h2 {
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
    font-size: 1.4rem;
}
.features-index-card p {
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0 0 1.25rem 0;
    flex-grow: 1;
}
.features-index-card__link {
    color: var(--accent-hover);
    font-weight: 600;
    font-size: 0.95rem;
}
</style>

<!-- Hero -->
<section class="hero hero--centered" style="background: var(--primary-bg); min-height: auto; padding: var(--space-12) 0;">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Everything in Scout Elite.</h1>
            <p class="hero-subtitle">From live game tagging to AI-built game reports, from practice plans and interactive playbooks to focused team reviews &mdash; here&rsquo;s what coaches actually use.</p>
            <div class="hero-cta">
                <a target="_blank" href="https://xpress.scout-elite.com/try?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.utm_campaign }}&utm_content=features-index-hero" class="btn btn-primary" data-try-placement="features-index-hero">Try It Free &rarr; No Signup</a>
                <a href="/#pricing" class="btn btn-secondary">See Pricing</a>
            </div>
        </div>
    </div>
</section>

<!-- Feature cards -->
<section style="background: var(--secondary-bg); padding: 64px 0;">
    <div class="container">
        <div class="features-index-grid">
            <a href="/features/practice-planning/" class="features-index-card">
                <span class="features-index-card__badge">New</span>
                <h2>Practice Planning</h2>
                <p>Turn your games, reviews, and reports into an intentional, timed practice &mdash; every drill with a purpose, from a drill library with real rink diagrams. Print it, run it live, share it with the staff.</p>
                <span class="features-index-card__link">Explore Practice Planning &rarr;</span>
            </a>
            <a href="/features/ai-reports/" class="features-index-card">
                <span class="features-index-card__badge">New</span>
                <h2>AI Game &amp; Player Reports</h2>
                <p>Chat your way to a polished post-game breakdown or a personal player development plan &mdash; in the time it takes to pour a coffee.</p>
                <span class="features-index-card__link">Explore AI Reports &rarr;</span>
            </a>
            <a href="/features/playbooks/" class="features-index-card">
                <span class="features-index-card__badge">New</span>
                <h2>Interactive Playbooks</h2>
                <p>Diagrams, embedded video, and rich text in one document. Build your team&rsquo;s system once, share it with everyone, update it whenever it evolves.</p>
                <span class="features-index-card__link">Explore Playbooks &rarr;</span>
            </a>
            <a href="/scout-elite-live/" class="features-index-card">
                <h2>Scout Elite Live</h2>
                <p>The free mobile app for tagging events as they happen. Auto-clip your game video by importing the live-tagged moments. iOS and Android.</p>
                <span class="features-index-card__link">Explore Scout Elite Live &rarr;</span>
            </a>
            <a href="/features/video/" class="features-index-card">
                <h2>Video Library, Clips &amp; Reviews</h2>
                <p>Upload game footage, create clips with intuitive tools, and organize them into focused team Reviews. The core video workflow Scout Elite was built on.</p>
                <span class="features-index-card__link">Explore Video Tools &rarr;</span>
            </a>
            <a href="/features/teams/" class="features-index-card">
                <h2>Teams &amp; Sharing</h2>
                <p>Create a team, invite your roster and parents, and share any review, playbook, or report with everyone in one click. Role-based access included.</p>
                <span class="features-index-card__link">Explore Teams &rarr;</span>
            </a>
        </div>
    </div>
</section>

<!-- Final CTA -->
<section style="background: var(--primary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 720px; text-align: center;">
        <h2 class="section-title">See it before you sign up.</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 1rem auto 0;">The Try Scout Elite flow drops you into a working app in your browser with a real game, a real review, and live AI report tools &mdash; no signup, no credit card.</p>
        <p style="margin-top: 2rem;">
            <a href="https://xpress.scout-elite.com/try?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.utm_campaign }}&utm_content=features-index-cta" target="_blank" rel="noopener" class="btn btn-primary" data-try-placement="features-index-cta">Try Scout Elite Free &rarr;</a>
        </p>
    </div>
</section>
