---
layout: default
title: "Share Reviews & Playbooks with Your Whole Hockey Roster"
description: "Create a team, invite your roster and parents, and share any review, playbook, or report with everyone in one click. Role-based access keeps coaches in control."
permalink: /features/teams/
last_modified_at: 2026-05-28
---

<style>
.teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
}
.teams-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 1.75rem 1.5rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.teams-card:hover {
    border-color: rgba(0, 153, 255, 0.4);
    transform: translateY(-2px);
}
.teams-card__icon {
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
.teams-card h3 {
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}
.teams-card p {
    color: var(--text-secondary);
    line-height: 1.55;
    margin: 0 0 0.85rem 0;
}
.teams-card ul {
    color: var(--text-secondary);
    line-height: 1.55;
    padding-left: 1.1rem;
    margin: 0;
}
.teams-card li {
    margin: 0.3rem 0;
}
.roles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    max-width: 900px;
    margin: 0 auto;
}
.role-card {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 0.85rem;
    padding: 1.25rem;
}
.role-card__label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-hover);
    display: block;
    margin-bottom: 0.5rem;
}
.role-card p {
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0;
    font-size: 0.92rem;
}
</style>

<!-- Hero -->
<section class="hero" style="background: var(--primary-bg);">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Your whole team, on the same page with one click.</h1>
            <p class="hero-subtitle">Scout Elite Teams lets you share any review, playbook, or report with your entire roster &mdash; players and parents &mdash; in a single click. Role-based access keeps everyone in the right lane.</p>
            <div class="hero-cta">
                <a target="_blank" href="https://xpress.scout-elite.com/account/register?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.slug }}&utm_content=feature-teams-hero" class="btn btn-primary" data-try-placement="feature-teams-hero">Start Your Free Trial</a>
                <a href="/#pricing" class="btn btn-secondary">See Pricing</a>
            </div>
        </div>
        <div class="hero-visual">
            <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 12px 36px rgba(0,0,0,0.35); max-width: 480px; width: 100%;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding-bottom:0.85rem; border-bottom:1px solid var(--border-color);">
                    <span style="font-weight:600; color:var(--text-primary); font-size:0.95rem;">Northside U14 &mdash; 2025&ndash;26</span>
                    <span style="font-size:0.7rem; color:var(--accent-hover); background:rgba(0,153,255,0.12); padding:2px 9px; border-radius:999px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">Pro</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem;">
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.55rem 0.75rem; background:var(--secondary-bg); border-radius:0.5rem;">
                        <span style="color:var(--text-primary); font-size:0.88rem;">J. Mitchell</span>
                        <span style="font-size:0.7rem; color:var(--accent-hover); background:rgba(0,153,255,0.12); padding:1px 8px; border-radius:999px; font-weight:600;">Coach</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.55rem 0.75rem; background:var(--secondary-bg); border-radius:0.5rem;">
                        <span style="color:var(--text-primary); font-size:0.88rem;">R. Kowalski</span>
                        <span style="font-size:0.7rem; color:var(--text-secondary); background:var(--primary-bg); padding:1px 8px; border-radius:999px; font-weight:600;">Athlete</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.55rem 0.75rem; background:var(--secondary-bg); border-radius:0.5rem;">
                        <span style="color:var(--text-primary); font-size:0.88rem;">S. Kowalski</span>
                        <span style="font-size:0.7rem; color:var(--text-secondary); background:var(--primary-bg); padding:1px 8px; border-radius:999px; font-weight:600;">Parent</span>
                    </div>
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:0.55rem 0.75rem; background:var(--secondary-bg); border-radius:0.5rem;">
                        <span style="color:var(--text-primary); font-size:0.88rem;">T. Nguyen</span>
                        <span style="font-size:0.7rem; color:var(--text-secondary); background:var(--primary-bg); padding:1px 8px; border-radius:999px; font-weight:600;">Athlete</span>
                    </div>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; padding-top:0.85rem; border-top:1px solid var(--border-color);">
                    <span style="font-size:0.8rem; background:rgba(0,153,255,0.15); color:var(--accent-hover); padding:4px 12px; border-radius:999px; font-weight:600; cursor:default;">Share with Team</span>
                    <span style="font-size:0.8rem; color:var(--text-secondary);">18 members</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Problem -->
<section style="background: var(--secondary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 900px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">A group chat is not a coaching platform.</h2>
            <p class="section-subtitle">Most teams share content the same way they share memes &mdash; and wonder why nobody watches the review.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Sharing is manual</h3>
                <p style="color: var(--text-secondary);">Every review link gets copy-pasted to each parent individually. Forget one family and you hear about it at the next game.</p>
            </div>
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">No role control</h3>
                <p style="color: var(--text-secondary);">Anyone with the link can share it further. You have no way to know who actually has access or to pull it back.</p>
            </div>
            <div style="text-align: center; padding: 1.25rem;">
                <div style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:0.75rem; background:rgba(0,153,255,0.1); margin:0 auto 0.75rem;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hover)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">Content is scattered</h3>
                <p style="color: var(--text-secondary);">The review is in the group chat, the practice plan is in email, the playbook is&hellip; somewhere. There&rsquo;s no single place for the team.</p>
            </div>
        </div>
    </div>
</section>

<!-- Features -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">One team. One click. Everyone&rsquo;s in.</h2>
            <p class="section-subtitle" style="max-width: 700px; margin: 0 auto;">Teams connects your roster to everything you create in Scout Elite &mdash; no link-forwarding, no manual access management.</p>
        </div>
        <div class="teams-grid">
            <div class="teams-card">
                <div class="teams-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3>Team Roster</h3>
                <p>Create a team and build your roster once. Every player, parent, and assistant coach is in one place for the whole season.</p>
                <ul>
                    <li>Invite by email &mdash; recipients create a free Scout Elite account</li>
                    <li>Manage multiple teams from one account</li>
                    <li>Roster carries over to every sharing action automatically</li>
                </ul>
            </div>
            <div class="teams-card">
                <div class="teams-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3>Role-Based Access</h3>
                <p>Every team member has a role that determines what they can see and do. Coaches control the content; athletes and parents get a clean read-only experience.</p>
                <ul>
                    <li><strong style="color:var(--text-primary);">Coach</strong> &mdash; full edit and share access</li>
                    <li><strong style="color:var(--text-primary);">Analyst</strong> &mdash; can edit Clip Projects, view everything</li>
                    <li><strong style="color:var(--text-primary);">Athlete</strong> &mdash; read-only access to shared content</li>
                    <li><strong style="color:var(--text-primary);">Parent</strong> &mdash; read-only access to shared content</li>
                </ul>
            </div>
            <div class="teams-card">
                <div class="teams-card__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </div>
                <h3>One-Click Sharing</h3>
                <p>Share any review, playbook, or AI report with the whole team &mdash; or a specific subset of members &mdash; without touching a single link or DM.</p>
                <ul>
                    <li>Reviews, Playbooks, AI Reports, and Game Reports all shareable</li>
                    <li>Recipients get notified and see content in their Scout Elite account</li>
                    <li>Revoke access at any time from one place</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Roles detail -->
<section style="background: var(--secondary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 940px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Everyone gets the right view.</h2>
            <p class="section-subtitle">Roles aren&rsquo;t just access control &mdash; they shape the experience. Athletes and parents see a clean, focused view. No accidental edits, no admin clutter.</p>
        </div>
        <div class="roles-grid">
            <div class="role-card">
                <span class="role-card__label">Coach</span>
                <p>Creates and edits all content. Manages the team roster. Shares reviews, playbooks, and reports with the group. Full control.</p>
            </div>
            <div class="role-card">
                <span class="role-card__label">Analyst</span>
                <p>Can edit Clip Projects and view all shared content. Great for assistant coaches and video staff who help with prep but don&rsquo;t manage the team.</p>
            </div>
            <div class="role-card">
                <span class="role-card__label">Athlete</span>
                <p>Sees what the coach shares with them &mdash; reviews, playbooks, reports. Read-only. Clean interface focused on learning, not editing.</p>
            </div>
            <div class="role-card">
                <span class="role-card__label">Parent</span>
                <p>Same read-only access as Athlete. Can also upload video to the team&rsquo;s Video Library and contribute game footage from the stands.</p>
            </div>
        </div>
    </div>
</section>

<!-- How it works -->
<section style="background: var(--primary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 940px;">
        <div class="section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 class="section-title">Set it up once. Use it all season.</h2>
        </div>
        <div style="display: grid; gap: 2rem;">
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">1</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Create your team</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Give it a name, set the season, and you&rsquo;re in. One team per season is the typical setup, but you can manage as many teams as you coach from a single account.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">2</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Invite your roster</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Add players, parents, and assistant coaches by email. Each person gets an invitation to create a free Scout Elite account. Scout Elite accounts are always free for athletes and parents &mdash; they never need a paid plan to access content shared with them.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">3</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Share with one click</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Finish a review, playbook, or AI report and hit Share with Team. The whole roster gets access instantly &mdash; players and parents see it in their own Scout Elite accounts, not a shared link they can forward.</p>
                </div>
            </div>
            <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
                <div style="flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; background: var(--accent-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem;">4</div>
                <div>
                    <h3 style="color: var(--text-primary); margin-bottom: 0.4rem;">Everything stays accessible</h3>
                    <p style="color: var(--text-secondary); line-height: 1.55;">Shared reviews and playbooks don&rsquo;t expire. Players can rewatch the October breakout review in February. Parents can pull up the player report before a tryout. It&rsquo;s all there.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA -->
<section style="background: var(--secondary-bg); padding: 80px 0;">
    <div class="container" style="max-width: 720px; text-align: center;">
        <h2 class="section-title">Get your whole team on the same page &mdash; literally.</h2>
        <p class="section-subtitle" style="max-width: 600px; margin: 1rem auto 0;">Start a 14-day free trial of Pro and set up your first team. No credit card required.</p>
        <p style="margin-top: 2rem;">
            <a href="https://xpress.scout-elite.com/account/register?utm_source=scout-elite&utm_medium=website&utm_campaign={{ page.slug }}&utm_content=feature-teams-cta" target="_blank" rel="noopener" class="btn btn-primary" data-try-placement="feature-teams-cta">Start Your Free Trial &rarr;</a>
        </p>
        <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">Athletes and parents always join for free. Only the coach needs a Pro plan.</p>
    </div>
</section>

<!-- Related -->
<section style="background: var(--primary-bg); padding: 64px 0;">
    <div class="container" style="max-width: 900px; text-align: center;">
        <h2 class="section-title" style="margin-bottom: 1.5rem;">What else is in Scout Elite</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; max-width: 960px; margin: 0 auto;">
            <a href="/features/practice-planning/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none; transition: border-color 0.2s ease;">
                <strong style="color: var(--accent-hover);">Practice Planning &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Draft timed practice plans and share them with your staff.</p>
            </a>
            <a href="/features/video/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none; transition: border-color 0.2s ease;">
                <strong style="color: var(--accent-hover);">Video &amp; Reviews &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Upload footage, clip key moments, share focused team reviews.</p>
            </a>
            <a href="/features/playbooks/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none; transition: border-color 0.2s ease;">
                <strong style="color: var(--accent-hover);">Playbooks &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Diagrams, video, and text in one shareable doc.</p>
            </a>
            <a href="/features/ai-reports/" style="display: block; padding: 1.25rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; color: var(--text-primary); text-decoration: none; transition: border-color 0.2s ease;">
                <strong style="color: var(--accent-hover);">AI Reports &rarr;</strong>
                <p style="margin: 0.4rem 0 0 0; color: var(--text-secondary); font-size: 0.9rem;">Chat your way to a game breakdown or player plan.</p>
            </a>
        </div>
    </div>
</section>
