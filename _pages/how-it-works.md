---
layout: default
title: How it Works
description: Discover the Scout Elite workflow from capturing video to sharing focused reviews with your team.
permalink: /how-it-works/
---


<script>
    function startTeamCoachTour() {
        introJs().setOptions({
            steps: [
            {
                title: 'Step 1 - Video Upload',
                element: document.querySelector('[data-intro="video-sharing"]'),
                intro: "<strong>Start with Live Game Videos</strong><br /> Upload game video to your Video Library or ask others to upload and share it with you. You can include both full game videos and shorter individual clips."
            },
            { 
                title: 'Step 2 - Create a Clip Session',
                element: document.querySelector('[data-intro="clip-sessions"]'),
                intro: "<strong>Create the Clips</strong><br /> For any videos that have the potential for more than just a single clip, add them to a Clip Session. Use this session to annotate and tag new clips."
            },
            { 
                title: 'Step 3 - Create Your Clips',
                element: document.querySelector('[data-intro="manual-clipping"]'),
                intro: "<strong>Find Key Moments</strong><br /> Use advanced clipping tools to find important moments and annotate them by adding a description and tags."
            },
            { 
                title: 'Step 4 <small>(optional)</small> - Automatic Clipping',
                element: document.querySelector('[data-intro="automatic-clipping"]'),
                intro: "<strong>Scout Elite Live</strong><br /> If <a target=\"_blank\" href=\"/scout-elite-live/\">Scout Elite Live</a> was used to track game events, ask your helpers to publish the game from their mobile devices and share it with you. Import the game events and notes into a Clip Session to automatically create clips for your game video."
            },
            { 
                title: 'Step 5 - Organize Clips for Review',
                element: document.querySelector('[data-intro="review-sessions"]'),
                intro: "<strong>Prepare for Review</strong><br /> Once you have all your clips, add them to a Review. Use this Review as a guide for live presentation or share it for the team to review on their own time. Reviews remain accessible forever and can be used as a tool to direct learning in the future."
            },
            ]
        }).oncomplete(function() {
            setTimeout(showTrialModal, 500);
        }).start();
    }

    function startParentTour() {
        introJs().setOptions({
            steps: [
            {
                title: 'Video Upload',
                element: document.querySelector('[data-intro="video-sharing"]'),
                intro: "<strong>Start with Live Game Videos or Clips</strong><br /> Upload video to your Video Library and share it with others. You can include both full game videos and shorter individual clips."
            },
            { 
                title: 'Clip Sessions',
                element: document.querySelector('[data-intro="clip-sessions"]'),
                intro: "<strong>Create Clips</strong><br /> For any videos that have the potential for more than just a single clip, add them to a Clip Session. Use this session to create your clips that can be used to direct the learning of your athlete or build comprehensive highlight reels."
            },
            { 
                title: 'Scout Elite Live',
                element: document.querySelector('[data-intro="sel-game-reports"]'),
                intro: "<strong>Track Important Moments</strong><br /> Use <a target=\"_blank\" href=\"/scout-elite-live/\">Scout Elite Live</a>, a free mobile app, to track your team and athlete's performance. Take notes on key moments.<br/><br/> Publish the game to view and share the game report and use it to automatically import clips."
            },
            { 
                title: 'Reviews',
                element: document.querySelector('[data-intro="review-sessions"]'),
                intro: "<strong>Organize Your Clips</strong><br /> Reviews organize oyur clips and can act as an anchor for discussion with your athlete. Use it as a tool to positively reinforce good behaviors and direct their learning. Capture the important team dynamics and share these moments with the rest of our team to help build a positive team culture."
            }
            ]
        }).oncomplete(function() {
            setTimeout(showTrialModal, 500);
        }).start();
    }
    function startSkillsCoachTour() {
        introJs().setOptions({
            steps: [
            {
                title: 'Step 1 - Video Upload',
                element: document.querySelector('[data-intro="video-sharing"]'),
                intro: "<strong>Start with Live Game Videos</strong><br /> Ask your client to sign up for Scout Elite to share their videos with you, or have them send you the videos for you to add to your personal Video Library."
            },
            { 
                title: 'Step 2 - Create a Clip Session',
                element: document.querySelector('[data-intro="clip-sessions"]'),
                intro: "<strong>Create the Clips</strong><br /> For any videos that have the potential for more than just a single clip, add them to a Clip Session. Use this session to annotate and tag new clips."
            },
            { 
                title: 'Step 3 - Organize Clips for Review',
                element: document.querySelector('[data-intro="review-sessions"]'),
                intro: "<strong>Prepare for Review</strong><br /> Once you have all your clips, add them to a Review and share it with your client. Use this Review as a guide for your live presentation. Reviews remain accessible forever, so your clients can review it themselves later and you can reference them in future discussions."
            }
            ]
        }).oncomplete(function() {
            setTimeout(showTrialModal, 500);
        }).start();
    }

    // Modal functions
    function showTrialModal() {
        const modal = document.getElementById('trial-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideTrialModal() {
        const modal = document.getElementById('trial-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add event listeners when page loads
    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('trial-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', hideTrialModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideTrialModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideTrialModal();
            }
        });
    });
</script>

<!-- Trial Modal -->
<div id="trial-modal" class="modal-overlay">
    <div class="modal-content">
        <button class="modal-close" onclick="hideTrialModal()">&times;</button>
        <h2 class="modal-title">Ready to Start Your Scout Elite Journey?</h2>
        <p>Scout Elite gives you everything you need to easily capture game moments, create focused analysis sessions, and share professional video reviews with your team. All in a straight-forward easy-to-use package.</p>
        <p>Whether you're coaching individual athletes or managing an entire squad, Scout Elite makes video analysis simple and effective.</p>
        
        <div class="modal-features">
            <div class="modal-feature">
                <span>🎯</span>
                <div><strong>14-day free trial</strong></div>
            </div>
            <div class="modal-feature">
                <span>📹</span>
                <div><strong>Video uploads</strong> - Full game footage and clips</div>
            </div>
            <div class="modal-feature">
                <span>✂️</span>
                <div><strong>Clip creation & organization</strong> - Build focused sessions</div>
            </div>
            <div class="modal-feature">
                <span>📋</span>
                <div><strong>Reviews</strong> - Direct your team&apos;s learning</div>
            </div>
            <div class="modal-feature">
                <span>🚀</span>
                <div><strong>Advanced sharing tools</strong> - Share your work</div>
            </div>
            <div class="modal-feature">
                <span>📱</span>
                <div><strong>Mobile app included</strong> - Scout Elite Live for iOS & Android</div>
            </div>
        </div>
        
        <div class="modal-cta">
            <a href="https://xpress.scout-elite.com" target="_blank" class="cta-button" onclick="hideTrialModal()" style="display:inline-block; background:var(--accent-primary); color:white; padding:1rem 2rem; border-radius:var(--radius-md); font-weight:600; font-size:1.1rem; text-decoration:none; transition:all 0.3s ease; box-shadow:var(--shadow-sm);">Start Your 14 Day Free Trial</a>
        </div>
    </div>
</div>

<!-- Hero Section -->
<section class="hero" style="background: var(--primary-bg); padding: var(--space-20) 0 0 0 !important;">
    <div class="container" style="display:flex; flex-wrap:wrap; align-items:center; gap:48px;">
        <div class="hero-content" style="flex:1 1 340px; min-width:260px; max-width:540px; text-align:left;" data-intro="call-to-action">
            <h1 class="hero-title" style="font-size:2.5em; margin-bottom:0.5em; color:var(--text-primary);">Simple, Collaborative Video Review</h1>
            <p class="hero-subtitle" style="font-size:1.25em; margin-bottom:2em; color:var(--text-secondary); max-width:540px;">See how Scout Elite takes you from capturing moments in the game to sharing focused reviews with your team. Each step is designed to make learning and improvement easy for coaches, skills analysts, athletes, and parents.</p>
            <a href="https://xpress.scout-elite.com" target="_blank" class="cta-button" style="display:inline-block; background:var(--accent-primary); color:white; padding:1rem 2rem; border-radius:var(--radius-md); font-weight:600; font-size:1.1rem; text-decoration:none; transition:all 0.3s ease; box-shadow:var(--shadow-sm);">Start Your Trial Today</a>
        </div>
        <div class="hero-visual" style="flex:1 1 340px; min-width:220px; max-width:540px; text-align:center;">
            <img src="/img/Scout-Elite-how-it-works-hero.png"
                 alt="Scout Elite Video Analysis Workflow"
                 style="width:100%; max-width:480px; height:auto; border-radius:1rem; padding:0.5rem; margin:0 auto; display:block;">
        </div>
    </div>
</section>

<!-- Role Tour Icons -->
<section style="padding: 4rem 0; background: var(--secondary-bg);">
    <div class="container">
        <div class="section-header" style="text-align:center; margin-bottom:3rem;">
            <h2 class="section-title">How Scout Elite Works</h2>
            <p class="section-subtitle" style="max-width:540px; margin:0 auto;">Choose your role to explore features designed for you by parent coaches with a step-by-step walkthrough.</p>
        </div>
        
        <div style="display:flex; justify-content:center; align-items:stretch; gap:2rem; flex-wrap:wrap; max-width:800px; margin:0 auto;">
            <button class="tour-btn" onclick="startTeamCoachTour()" style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); cursor:pointer; transition:all 0.3s ease; flex:1; min-width:200px; max-width:240px; box-shadow:var(--shadow-sm); height:200px;">
                <div class="tour-btn-inner">
                    <div class="tour-btn-front">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span style="color:var(--text-primary); font-weight:600; font-size:1.1rem; text-align:center;">Team Coach</span>
                    </div>
                    <div class="tour-btn-back">
                        <h3>Team Coach</h3>
                        <p>Manage team-wide video reviews, coordinate with assistants, and create comprehensive game analysis for the entire squad.</p>
                    </div>
                </div>
            </button>

            <button class="tour-btn" onclick="startSkillsCoachTour()" style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); cursor:pointer; transition:all 0.3s ease; flex:1; min-width:200px; max-width:240px; box-shadow:var(--shadow-sm); height:200px;">
                <div class="tour-btn-inner">
                    <div class="tour-btn-front">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span style="color:var(--text-primary); font-weight:600; font-size:1.1rem; text-align:center;">Skills Coach</span>
                    </div>
                    <div class="tour-btn-back">
                        <h3>Skills Coach</h3>
                        <p>Work one-on-one with athletes to analyze technique, create focused clip sessions, and track individual skill development progress.</p>
                    </div>
                </div>
            </button>
                        
            <button class="tour-btn" onclick="startParentTour()" style="background:var(--card-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); cursor:pointer; transition:all 0.3s ease; flex:1; min-width:200px; max-width:240px; box-shadow:var(--shadow-sm); height:200px;">
                <div class="tour-btn-inner">
                    <div class="tour-btn-front">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="var(--text-primary)" class="bi bi-people" viewBox="0 0 16 16">
                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                        </svg>
                        <span style="color:var(--text-primary); font-weight:600; font-size:1.1rem; text-align:center;">Parent</span>
                    </div>
                    <div class="tour-btn-back">
                        <h3>Parent</h3>
                        <p>Stay connected with your team's progress, contribute by sharing moments, and maintain personal highlight reels for your athletes.</p>
                    </div>
                </div>
            </button>
        </div>
    </div>
</section>

<section class="explore-process" style="padding: 4rem 0; margin-bottom:2.5rem;">
    <div class="container">
        <div class="section-header" style="text-align:center;">
            <h2 class="section-title">An End-to-End Solution</h2>
            <p class="section-subtitle" style="max-width:540px; margin:0 auto;">Event capture can be a collaborative effort, allowing anyone to contribute valuable footage. All data is seamlessly shared with the coaching staff, who review key clips and moments, then approve a final Review for distribution to the team.</p>
        </div>
        <div class="analysis-method-img-container" style="width:100%; max-width:940px; margin:0 auto; text-align:center;">
            <img src="/img/Scout-Elite-video-analysis-workflow.png"
                alt="Scout Elite Video Analysis Workflow"
                style="width:100%; max-width:900px; height:auto; border-radius:1rem; padding:0.5rem; margin:0 auto; display:block;">
        </div>
    </div>
</section>

<!-- Capture Events Section -->
<section class="capture-events" style="background: var(--primary-bg); padding: 2rem 0; margin-bottom:2.5rem;">
    <div class="container" style="max-width:900px; margin:0 auto;">
        <div class="section-header" style="text-align:center; margin-bottom:3rem;">
            <h2 class="section-title">Capture Events</h2>
            <p class="section-subtitle" style="max-width:540px; margin:0 auto;">Flexible options to prepare for review</p>
        </div>
        
        <!-- Mobile App Option -->
        <div style="display:flex; align-items:flex-start; gap:24px; margin-bottom:3rem; flex-wrap:wrap;" data-intro="automatic-clipping">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
                <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Automatic Collaborative Clipping</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Use <a href="/scout-elite-live/">Scout Elite Live</a>, our free mobile app for iOS and Android, to log events and custom notes as the game unfolds. Event markers are shared with coaches and automatically linked to video clips, which can later be edited and annotated by analysts or coaching staff. Events captured by anyone can be combined into a single clip session for review.</p>
            </div>
        </div>

        <!-- Video Clip Sessions Option -->
        <div style="display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap;" data-intro="manual-clipping">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-video3" viewBox="0 0 16 16">
                    <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Manual Video Clipping</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Work directly with game video using intuitive playback controls. Jump to key moments in 5 and 30 second increments, to create clips from a full game in just minutes. Clips are always editable, and the original footage remains intact in case you missed the tail end or lead-up to a play.</p>
            </div>
        </div>
    </div>
</section>

<!-- Review and Organize Section -->
<section class="review-organize" style="background: var(--primary-bg); padding: 1rem 0; margin-bottom:2.5rem;">
    <div class="container" style="max-width:900px; margin:0 auto;">
        <div class="section-header" style="text-align:center; margin-bottom:3rem;">
            <h2 class="section-title">Review and Organize</h2>
            <p class="section-subtitle" style="max-width:540px; margin:0 auto;">Use the Analysis Hub to create and organize clips</p>
        </div>
        
        <!-- Clip Sessions -->
        <div style="display:flex; align-items:flex-start; gap:24px; margin-bottom:3rem; flex-wrap:wrap;" data-intro="clip-sessions">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="2" fill="white"/>
                    <circle cx="8" cy="12" r="2" fill="#3B82F6"/>
                    <rect x="12" y="10" width="6" height="1" rx="0.5" fill="#3B82F6"/>
                    <rect x="12" y="12" width="8" height="1" rx="0.5" fill="#3B82F6"/>
                    <rect x="12" y="14" width="4" height="1" rx="0.5" fill="#3B82F6"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Clip Sessions</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Create clips from full or partial game videos. Tag clips, add notes and telestrations, trim start and end times, and organize your content. Videos from your library can be combined into a single session, and sessions can be shared with other coaches for collaborative editing.</p>
            </div>
        </div>

        <!-- Reviews -->
        <div style="display:flex; align-items:flex-start; gap:24px; margin-bottom:3rem; flex-wrap:wrap;" data-intro="review-sessions">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="18" height="14" rx="2" fill="white"/>
                    <rect x="6" y="8" width="4" height="1" rx="0.5" fill="#3B82F6"/>
                    <rect x="6" y="10" width="8" height="1" rx="0.5" fill="#3B82F6"/>
                    <rect x="6" y="12" width="6" height="1" rx="0.5" fill="#3B82F6"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Reviews</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Coaches compile clips into focused Reviews for team viewing. Only the selected clips are included to maintain focus. Add supplementary videos from skills coaches or professionals, categorize content, and order your clips for clear flow.</p>
            </div>
        </div>
    </div>
</section>

<!-- Share your Review Section -->
<section class="share-review" style="background: var(--primary-bg); padding: 1rem 0; margin-bottom:2.5rem;">
    <div class="container" style="max-width:900px; margin:0 auto;">
        <div class="section-header" style="text-align:center; margin-bottom:3rem;">
            <h2 class="section-title">Share with Your Team</h2>
            <p class="section-subtitle" style="max-width:540px; margin:0 auto;">Collaborate and share with your team to direct learning</p>
        </div>
        
        <!-- Session Sharing -->
        <div style="display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap;">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Sessions</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Clip sessions can be shared to anyone in the analyst role. Some teams stop here and just share the Clip Sessions with their team live and in-person or via a screen sharing app.  Reviews can be shared and viewed by anyone, and are locked from editing by anyone in the athlete role.</p>
            </div>
        </div>

        <!-- Scout Elite Live Report Sharing -->
        <div style="display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap; margin-top:3rem;" data-intro="sel-game-reports">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="14" rx="2" fill="white"/>
                    <rect x="5" y="7" width="3" height="6" rx="0.5" fill="#3B82F6"/>
                    <rect x="9" y="9" width="3" height="4" rx="0.5" fill="#3B82F6"/>
                    <rect x="13" y="6" width="3" height="7" rx="0.5" fill="#3B82F6"/>
                    <circle cx="18" cy="8" r="1" fill="#3B82F6"/>
                    <rect x="5" y="15" width="14" height="0.5" fill="#3B82F6"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Game Reports and Live Events</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Share published games tracked with the <a href="/scout-elite-live/">Scout Elite Live</a> mobile app. Each shared game includes a comprehensive report with stats and analytics that recipients can view. Shared game events can also be used to automatically generate video clips from the corresponding game footage.</p>
            </div>
        </div>

        <!-- Video Sharing -->
        <div style="display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap; margin-top:3rem;"  data-intro="video-sharing">
            <div style="flex-shrink:0; width:64px; height:64px; background:#3B82F6; border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:4px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="2" fill="white"/>
                    <polygon points="9,10 9,14 13,12" fill="#3B82F6"/>
                    <circle cx="17" cy="9" r="1.5" fill="#3B82F6"/>
                    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#3B82F6"/>
                    <rect x="8" y="16" width="5" height="1" rx="0.5" fill="#3B82F6"/>
                </svg>
            </div>
            <div style="flex:1; min-width:280px;">
                <h3 style="color:var(--text-primary); font-size:1.3em; margin-bottom:0.5em; font-weight:600;">Videos</h3>
                <p style="color:var(--text-secondary); font-size:1.1em; line-height:1.6; margin:0;">Share uploaded videos directly with your team or specific individuals. These shared videos serve as the foundation for clipping and review activities, allowing recipients to create their own clips and analysis sessions from the shared content.</p>
            </div>
        </div>
    </div>
</section>