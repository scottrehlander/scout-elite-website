---
layout: default
title: Blog
permalink: /blog.html
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
          <span class="post-category">New Features</span>
          <span class="post-date">December 8, 2024</span>
        </div>
        <h2 class="featured-post-title">Introducing Advanced Analytics Dashboard</h2>
        <p class="featured-post-excerpt">Our new analytics dashboard provides deeper insights into your scouting data with interactive charts, custom reports, and real-time statistics. Learn how to leverage these powerful new features.</p>
        <a href="#" class="read-more-btn">Read More</a>
      </div>
      <div class="featured-post-image">
        <div class="post-image-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
      <h2 class="newsletter-title">Stay Updated</h2>
      <p class="newsletter-subtitle">Get the latest Scout Elite news, feature updates, and tips delivered to your inbox.</p>
      <form class="newsletter-form" id="newsletter-form">
        <div class="newsletter-input-group">
          <input type="email" id="newsletter-email" placeholder="Enter your email address" required>
          <button type="submit" class="btn btn-primary">Subscribe</button>
        </div>
        <p class="newsletter-privacy">We respect your privacy. Unsubscribe at any time.</p>
      </form>
    </div>
  </div>
</section>
