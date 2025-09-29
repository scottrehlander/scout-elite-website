---
description: "Stay updated with the latest in youth and minor hockey video analysis, features, tutorials, and tips from Scout Elite."
layout: default
title: Blog
permalink: /blog/
---

<!-- Blog Hero Section -->
<section class="blog-hero">
  <div class="container">
    <div class="blog-hero-content">
      <h1 class="blog-title">Scout Elite Blog</h1>
      <p class="blog-subtitle">Stay updated with the latest features, tutorials, and insights to help you get the most out of Scout Elite.</p>
      <div class="blog-categories">
        <button class="category-btn active" data-category="all">All Posts</button>
        <button class="category-btn" data-category="features">New Features</button>
        <button class="category-btn" data-category="tutorials">Tutorials</button>
        <button class="category-btn" data-category="tips">Tips & Tricks</button>
        <button class="category-btn" data-category="updates">Updates</button>
      </div>
    </div>
  </div>

<script src="/scripts/blog.js"></script>
</section>

<!-- Featured Post -->
<section class="featured-post">
  <div class="container">
    <div class="featured-post-card">
      <div class="featured-post-content">
        <div class="post-meta">
          <span class="post-date">December 8, 2024</span>
        </div>
        <a href="/blog/2024/12/08/the-scout-elite-manifesto/"><h2 class="featured-post-title">Why I’m Building Scout Elite: Leveling the Playing Field in Youth Hockey</h2></a>
        <p class="featured-post-excerpt">This isn’t just about hockey. It’s about fairness. It’s about giving every kid, regardless of the patch on their jersey, the chance to learn from their mistakes, celebrate their progress, and grow as players and people.</p>
        <a href="/blog/2024/12/08/the-scout-elite-manifesto/" class="read-more-btn">Read More</a>
      </div>
        <div class="featured-post-image" style="padding: 25px">
          <div class="post-image-placeholder" style="width:100%;height:100%;overflow:hidden;">
            <a href="/blog/2024/12/08/the-scout-elite-manifesto/"><img src="/img/beach-maddie.jpg" style="width:100%;height:100%;object-fit:cover;display:block;"></a>
          </div>
        </div>
    </div>
  </div>
</section>

<!-- Blog Posts Grid -->
<section class="blog-posts">
  <div class="container">
    <div class="posts-grid" id="posts-grid">
      {% assign posts = site.posts %}
      {% for post in posts %}
        <div class="post-card category-{{ post.categories | join: ' category-' }}">
          <a href="{{ post.url | relative_url }}" class="post-card-link">
            {% if post.image %}
              <div class="post-card-bgimg" style="background-image:url('{{ post.image }}');">
                <div class="post-card-overlay">
                  <div class="post-meta">
                    <span class="post-category">{{ post.categories[0] | capitalize }}</span>
                  </div>
                  <h3 class="post-card-title">{{ post.title }}</h3>
                  <p class="post-card-excerpt">{{ post.excerpt }}</p>
                  <span class="post-date">{{ post.date | date: '%B %d, %Y' }}</span>
                </div>
              </div>
            {% else %}
              <div class="post-image-placeholder"></div>
            {% endif %}
          </a>
        </div>
      {% endfor %}
    </div>
    <div class="load-more-container">
      <button class="btn btn-secondary" id="load-more-btn">Load More Posts</button>
    </div>
  </div>
</section>

<!-- Newsletter Signup -->
<section class="newsletter-signup">
  <div class="container">
    <div class="newsletter-content">
  <!-- Begin Brevo Form (newsletter, support-style) -->
  <h2 class="newsletter-title">Stay Updated</h2>
  <p class="newsletter-subtitle">Get the latest Scout Elite news, feature updates, and tips delivered to your inbox.</p>
      <style>
        /* Only keep Brevo's font-face and message panel styles, override the rest to match the old newsletter style */
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff");
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff");
        }
        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff");
        }
        /* Brevo message panel styles (keep as is) */
        #sib-form-container #success-message.sib-form-message-panel {
          margin-top: 25px;
          background: #173d2b;
          color: #d2ffe0;
          border: 1.5px solid #13ce66;
          border-radius: 8px;
          padding: 18px 24px;
          margin-bottom: 24px;
          font-size: 1.1rem;
          box-shadow: 0 2px 12px rgba(19,206,102,0.08);
        }
        #sib-form-container #error-message.sib-form-message-panel {
          margin-top: 25px;
          background: #3d1a1a;
          color: #ffd2d2;
          border: 1.5px solid #ff4949;
          border-radius: 8px;
          padding: 18px 24px;
          margin-bottom: 24px;
          font-size: 1.1rem;
          box-shadow: 0 2px 12px rgba(255,73,73,0.08);
        }
        #sib-form-container .sib-form-message-panel__text {
          color: inherit !important;
          font-family: var(--font-family, 'Inter', sans-serif);
          font-size: 1.1rem;
          text-align: left;
        }
        #sib-form-container .sib-form-message-panel__inner-text {
          color: inherit !important;
          font-size: inherit;
        }
        /* Newsletter form overrides to match old style */
        #sib-form-container {
          background: none;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        #sib-form {
          margin: 0 auto;
          max-width: 540px;
          background: none;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        #sib-form .form-group {
          margin-bottom: 0;
        }
        #sib-form label {
          display: none;
        }
        #sib-form .input {
          width: 100%;
          padding: 0.75em 1em;
          border-radius: 6px;
          border: 1px solid #333;
          background: #222;
          color: #fff;
          font-size: 1em;
          margin-bottom: 0;
        }
        #sib-form .form-group {
          margin-bottom: 0;
        }
        #sib-form .btn-primary {
          display: inline-block;
          margin-top: 1em;
          min-width: 120px;
          background-color: var(--accent-primary, #007acc);
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.75em 2em;
          font-size: 1em;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        #sib-form .btn-primary:hover {
          background-color: var(--accent-hover, #0099ff);
        }
        #sib-form .btn-loading {
          margin-left: 0.5em;
        }
        #sib-form .error-message {
          display: none;
        }
        .contact-form-container .form-group {
          margin-bottom: 0;
        }
        .contact-form-container {
          background: none;
          border: none;
          box-shadow: none;
          padding: 0;
        }
        .newsletter-privacy {
          color: #b3b3b3;
          font-size: 0.95em;
          margin-top: 1.5em;
          text-align: center;
        }
      </style>
      <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">
      <div class="contact-form-container" id="sib-form-container">
        <div class="contact-form">
          <form id="sib-form" method="POST" action="https://a8bb84e7.sibforms.com/serve/MUIFAGYFNDV_hqpCnyJ12iUYVpviVy4ayKM_PEUcrpWskBav5MYLXpS8vuTqTKXifCXPnNJAzChe0hg8Dbl1aKUsoMdN1RIO_2aDQEj05L9wOo38Nwzl2zizgvIii2cE-KwMhkDB3qsr1wMPv59FOJ_TxcZvewVuDy2sRJTxT8rwceMxvKBUZLgLPh-ZvNGjGa72sTlzDhKZ3rhe" data-type="subscription">
            <div class="form-group">
              <label for="EMAIL" data-required="*">Email *</label>
              <input class="input" type="email" id="EMAIL" name="EMAIL" autocomplete="off" data-required="true" required placeholder="Enter your email address" />
              <span class="error-message"></span>
            </div>
            <div style="padding: 8px 0;">
              <div class="g-recaptcha-v3" data-sitekey="6LcL6MYrAAAAADjA0jj8hMyGQff3J6OSSBXWooBG" style="display: none"></div>
            </div>
            <div class="form-group" style="text-align:center;">
              <button class="btn btn-primary submit-btn sib-form-block__button sib-form-block__button-with-loader" type="submit" style="margin:0 auto;display:inline-block;">
                <span class="btn-text">Subscribe</span>
                <span class="btn-loading" style="display:none;">
                  <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                    <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" opacity="0.75"/>
                  </svg>
                  Subscribing...
                </span>
              </button>
            </div>
            <div id="error-message" class="sib-form-message-panel">
              <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
                  <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                </svg>
                <span class="sib-form-message-panel__inner-text">
                  Your subscription could not be sent. Please try again.
                </span>
              </div>
            </div>
            <div id="success-message" class="sib-form-message-panel">
              <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
                <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                </svg>
                <span class="sib-form-message-panel__inner-text">
                  Thank you for subscribing!
                </span>
              </div>
            </div>
            <input type="text" name="email_address_check" value="" class="input--hidden">
            <input type="hidden" name="locale" value="en">
          </form>
        </div>
      </div>
      <script>
        window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
        window.LOCALE = 'en';
        window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
        window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
        window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
        window.translation = {
          common: {
            selectedList: '{quantity} list selected',
            selectedLists: '{quantity} lists selected',
            selectedOption: '{quantity} selected',
            selectedOptions: '{quantity} selected',
          }
        };
        var AUTOHIDE = Boolean(0);
      </script>
      <script defer src="https://sibforms.com/forms/end-form/build/main.js"></script>
      <script src="https://www.google.com/recaptcha/api.js?render=6LcL6MYrAAAAADjA0jj8hMyGQff3J6OSSBXWooBG&hl=en" async defer></script>
      <!-- End Brevo Form -->
    </div>
  </div>
</section>
