---
layout: default
title: "Knowledge Base — Scout Elite Help Center"
description: "Learn how to use Scout Elite for sports video analysis. Step-by-step guides for uploading videos, creating clips, building reviews, managing teams, and more."
permalink: /help/
---

<link rel="stylesheet" href="{{ '/styles/kb.css' | relative_url }}">

<!-- KB Hero -->
<section class="kb-hero">
    <div class="container">
        <h1 class="kb-hero-title">Knowledge Base</h1>
        <p class="kb-hero-subtitle">Everything you need to get the most out of Scout Elite. Step-by-step guides, tips, and answers.</p>
    </div>
</section>

<!-- KB Articles by Category -->
<section class="kb-categories">
    <div class="container">

        {% assign categories = "getting-started,video-library,clip-projects,reviews,tagging,sharing-teams,scout-elite-live,billing" | split: "," %}
        {% assign category_names = "Getting Started,Video Library,Clip Projects,Reviews,Tagging & Organization,Sharing & Teams,Scout Elite Live,Billing & Subscription" | split: "," %}
        {% assign category_icons = "🚀,📹,✂️,📋,🏷️,👥,📱,💳" | split: "," %}

        {% for cat in categories %}
            {% assign cat_articles = site.help | where: "category", cat | sort: "order" %}
            {% if cat_articles.size > 0 %}
            <div class="kb-category">
                <div class="kb-category-header">
                    <span class="kb-category-icon">{{ category_icons[forloop.index0] }}</span>
                    <h2 class="kb-category-title">{{ category_names[forloop.index0] }}</h2>
                </div>
                <div class="kb-articles-grid">
                    {% for article in cat_articles %}
                    <a href="{{ article.url }}" class="kb-article-card">
                        <h3 class="kb-article-card-title">{{ article.title }}</h3>
                        <p class="kb-article-card-desc">{{ article.description }}</p>
                        <div class="kb-article-card-meta">
                            {% if article.tier and article.tier != 'free' %}
                                <span class="kb-tier-badge kb-tier-{{ article.tier }}">
                                    {% if article.tier == 'solo' %}Solo{% elsif article.tier == 'pro' %}Pro{% endif %}
                                </span>
                            {% endif %}
                        </div>
                    </a>
                    {% endfor %}
                </div>
            </div>
            {% endif %}
        {% endfor %}

    </div>
</section>
