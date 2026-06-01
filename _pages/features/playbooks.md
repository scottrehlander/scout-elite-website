---
layout: default
title: Hockey Playbooks with Video, Diagrams & Text
description: "Build structured playbooks combining sport-specific diagrams, embedded video clips, and rich text. Share with your team in one click. Built for youth hockey coaches."
permalink: /features/playbooks/
last_modified_at: 2026-05-28
---

<style>
.pb-block-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}
.pb-block {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.75rem 1.5rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.pb-block:hover {
    border-color: rgba(0, 153, 255, 0.4);
    transform: translateY(-2px);
}
.pb-block__icon {
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
.pb-block h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}
.pb-block p {
    color: var(--text-secondary);
    line-height: 1.55;
}

.pb-who {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    max-width: 1000px;
    margin: 0 auto;
}
.pb-who__card {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.85rem;
    padding: 1.5rem 1.25rem;
}
.pb-who__card strong {
    color: var(--accent-hover);
    display: block;
    margin-bottom: 0.4rem;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
.pb-who__card p {
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0;
}
</style>

<!-- Hero -->
<section class="hero" style="background: var(--primary-bg);">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Your team&rsquo;s playbook shouldn&rsquo;t live on a whiteboard photo.</h1>
            <p class="hero-subtitle">Scout Elite Playbooks combine sport-specific diagrams, embedded video, and rich text into a single living document. Build it once, share it with the team, update it whenever your system evolves.</p>
            <div class="hero-cta">
                <a target="_blank" href="https://xpress.scout-elite.com/try?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.slug }}&utm_content=feature-playbooks-hero" class="btn btn-primary" data-try-placement="feature-playbooks-hero">Try It Free &rarr; No Signup</a>
                <a href="/#pricing" class="btn btn-secondary">See Pricing</a>
            </div>
            <p style="margin-top:1rem; font-size:0.9rem; color: var(--text-secondary);">Free tier: 1 playbook, 3 sections. Unlimited on Solo ($4.99/mo).</p>
        </div>
        <div class="hero-visual">
            <img src="/img/blog/playbook-1.png" alt="Scout Elite Playbook editor with hockey rink diagram" style="max-width: 540px; width: 100%; border-radius: 1rem; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35); border: 1px solid var(--border-color);">
        </div>
    </div>
</section>

<!-- Problem -->
<section style="background: var(--secondary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 900px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">A whiteboard photo isn&rsquo;t a system.</h2>
            <p class="section-subtitle">Most youth teams "have a playbook" that exists as a few iPhone photos in a group chat from October. By February nobody remembers what the arrows meant.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Photos lose context</h3>
                <p style="color: var(--text-secondary);">A diagram alone doesn&rsquo;t explain the read. Without a coach next to it, players forget half the message.</p>
            </div>
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">PDFs feel dead</h3>
                <p style="color: var(--text-secondary);">Static documents can&rsquo;t show a real-game clip of the system working &mdash; the thing that actually makes it click.</p>
            </div>
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Updates get lost</h3>
                <p style="color: var(--text-secondary);">When you tweak the breakout in November, the photo from October is still the one in the group chat.</p>
            </div>
        </div>
    </div>
</section>

<!-- Three block types -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Three block types. One continuous document.</h2>
            <p class="section-subtitle" style="max-width: 700px; margin: 0 auto;">Playbooks read like a Google Doc, but with the right tools built in for actually teaching hockey systems.</p>
        </div>
        <div class="pb-block-grid">
            <div class="pb-block">
                <div class="pb-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <ellipse cx="12" cy="12" rx="10" ry="6"/>
                        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                    </svg>
                </div>
                <h3>Sport-specific diagrams</h3>
                <p>A real rink canvas with players, pucks, lines, arrows, shapes, and freehand drawing. Snap pieces into place, then expand to fullscreen for detail work.</p>
            </div>
            <div class="pb-block">
                <div class="pb-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <polygon points="10 9 16 12 10 15" fill="currentColor"/>
                    </svg>
                </div>
                <h3>Embedded video clips</h3>
                <p>Drop in a YouTube link or a clip from your Scout Elite video library. Show players a real-game example of the system in action, right next to the diagram explaining it.</p>
            </div>
            <div class="pb-block">
                <div class="pb-block__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" y1="7" x2="20" y2="7"/>
                        <line x1="4" y1="12" x2="20" y2="12"/>
                        <line x1="4" y1="17" x2="14" y2="17"/>
                    </svg>
                </div>
                <h3>Rich text</h3>
                <p>Markdown-style editor for coaching points, reads, common mistakes, and personnel notes. Every block also takes a title and caption, so it reads cleanly in the published view.</p>
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
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Build it in sections</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Each section is a continuous sequence of blocks &mdash; text, diagram, video, in any order. Hover between blocks to insert a new one. Drafts auto-save as you work.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">2</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Publish when ready</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Playbooks default to Draft so you can iterate privately. Hit Publish when it&rsquo;s ready for the team to see &mdash; the shared view stays on the published revision, not your in-progress edits.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">3</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Share with the team <span style="font-size: 0.7rem; background: rgba(0,153,255,0.15); color: var(--accent-hover); padding: 2px 8px; border-radius: 999px; vertical-align: middle; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-left: 0.5rem;">Pro</span></h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">One click to share with individual players, parents, or your full team. They see a clean, document-style read-only view &mdash; no editing access required.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">4</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Revise without losing history</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Automatic checkpoints and manual save points let you tweak the breakout in November without losing what worked in October. View or revert to any past revision.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Who it's for -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">What coaches actually use them for</h2>
        </div>
        <div class="pb-who">
            <div class="pb-who__card">
                <strong>Team systems</strong>
                <p>D-zone coverage, forecheck variants, neutral-zone regroups &mdash; documented with the diagram, the coaching points, and a real clip of it working.</p>
            </div>
            <div class="pb-who__card">
                <strong>Special teams</strong>
                <p>Power play entries, breakouts, and forecheck. Different sections per opponent type, all in the same playbook.</p>
            </div>
            <div class="pb-who__card">
                <strong>Opponent scout</strong>
                <p>Before a big game, pull together the other team&rsquo;s tendencies &mdash; with clips &mdash; so your players walk in knowing what to expect.</p>
            </div>
            <div class="pb-who__card">
                <strong>Fundamentals library</strong>
                <p>One reusable playbook your players can come back to all season: stance, edge work, passing reads. Update it when their level changes.</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section style="background: var(--secondary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 720px; text-align: center;">
        <h2 class="section-title">Try the editor before you commit.</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 1rem auto 0;">The Try Scout Elite flow drops you into a working playbook in your browser. Move the players around, add a clip, see how it feels.</p>
        <p style="margin-top: 2rem;">
            <a href="https://xpress.scout-elite.com/try?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.slug }}&utm_content=feature-playbooks-cta" target="_blank" rel="noopener" class="btn btn-primary" data-try-placement="feature-playbooks-cta">Try Scout Elite Free &rarr;</a>
        </p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">No signup. No credit card. Loads a real playbook in your browser in under a minute.</p>
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
            <a href="/scout-elite-live/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Scout Elite Live &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Tag events on your phone, auto-clip the game video.</p>
            </a>
            <a href="/features/video/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Video &amp; Reviews &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Upload footage, clip key moments, share focused team reviews.</p>
            </a>
            <a href="/features/teams/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none;">
                <strong style="color: var(--accent-hover);">Teams &amp; Sharing &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Invite your roster, share everything with one click.</p>
            </a>
        </div>
    </div>
</section>
