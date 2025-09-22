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
        <a href="/updates/2024/12/08/the-scout-elite-manifesto.html"><h2 class="featured-post-title">Why I’m Building Scout Elite: Leveling the Playing Field in Youth Hockey</h2></a>
        <p class="featured-post-excerpt">This isn’t just about hockey. It’s about fairness. It’s about giving every kid, regardless of the patch on their jersey, the chance to learn from their mistakes, celebrate their progress, and grow as players and people.</p>
        <a href="/updates/2024/12/08/the-scout-elite-manifesto.html" class="read-more-btn">Read More</a>
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
