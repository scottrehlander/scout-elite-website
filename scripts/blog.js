// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    const postsGrid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const newsletterForm = document.getElementById('newsletter-form');

    let allPosts = [];
    let displayedPosts = [];
    let currentCategory = 'all';
    let postsPerPage = 6;
    let currentPage = 1;

    // Sample blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "Getting Started with Scout Elite: A Comprehensive Guide",
            excerpt: "Learn the basics of Scout Elite and discover how to set up your first scouting project with our step-by-step tutorial.",
            category: "tutorials",
            author: "Scout Elite Team",
            date: "2024-12-07",
            readTime: "8 min read",
            featured: false
        },
        {
            id: 2,
            title: "5 Advanced Scouting Techniques for Competitive Teams",
            excerpt: "Elevate your scouting game with these proven techniques used by top-performing teams worldwide.",
            category: "tips",
            author: "Sarah Johnson",
            date: "2024-12-05",
            readTime: "6 min read",
            featured: false
        },
        {
            id: 3,
            title: "Mobile App Update: New Offline Capabilities",
            excerpt: "Our latest mobile app update introduces powerful offline features, allowing you to scout even without internet connection.",
            category: "updates",
            author: "Development Team",
            date: "2024-12-03",
            readTime: "4 min read",
            featured: false
        },
        {
            id: 4,
            title: "Data Visualization Best Practices in Scouting",
            excerpt: "Transform your raw scouting data into compelling visual stories that drive strategic decisions.",
            category: "tutorials",
            author: "Mike Chen",
            date: "2024-12-01",
            readTime: "10 min read",
            featured: false
        },
        {
            id: 5,
            title: "Introducing Real-time Collaboration Features",
            excerpt: "Work seamlessly with your team members in real-time with our new collaborative scouting tools.",
            category: "features",
            author: "Product Team",
            date: "2024-11-28",
            readTime: "5 min read",
            featured: false
        },
        {
            id: 6,
            title: "How to Build Effective Scouting Reports",
            excerpt: "Master the art of creating actionable scouting reports that help your team make informed decisions.",
            category: "tips",
            author: "Alex Rodriguez",
            date: "2024-11-25",
            readTime: "7 min read",
            featured: false
        },
        {
            id: 7,
            title: "Performance Optimization: Faster Data Processing",
            excerpt: "Experience lightning-fast data processing with our latest performance improvements and infrastructure upgrades.",
            category: "updates",
            author: "Engineering Team",
            date: "2024-11-22",
            readTime: "3 min read",
            featured: false
        },
        {
            id: 8,
            title: "Scout Elite API: Integration Guide",
            excerpt: "Learn how to integrate Scout Elite with your existing tools using our comprehensive API documentation.",
            category: "tutorials",
            author: "Developer Relations",
            date: "2024-11-20",
            readTime: "12 min read",
            featured: false
        },
        {
            id: 9,
            title: "Security Update: Enhanced Data Protection",
            excerpt: "We've implemented additional security measures to keep your scouting data safe and secure.",
            category: "updates",
            author: "Security Team",
            date: "2024-11-18",
            readTime: "4 min read",
            featured: false
        }
    ];

    // Initialize the blog
    function initBlog() {
        allPosts = [...blogPosts];
        filterAndDisplayPosts();
        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category filter buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                setActiveCategory(category);
                filterAndDisplayPosts();
            });
        });

        // Load more button
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            filterAndDisplayPosts(true);
        });

        // Newsletter form
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Set active category
    function setActiveCategory(category) {
        currentCategory = category;
        currentPage = 1;
        
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
    }

    // Filter and display posts
    function filterAndDisplayPosts(append = false) {
        postsGrid.classList.add('filtering');
        
        setTimeout(() => {
            let filteredPosts = allPosts;
            
            // Filter by category
            if (currentCategory !== 'all') {
                filteredPosts = allPosts.filter(post => post.category === currentCategory);
            }

            // Calculate posts to show
            const startIndex = append ? displayedPosts.length : 0;
            const endIndex = currentPage * postsPerPage;
            const postsToShow = filteredPosts.slice(startIndex, endIndex);

            if (!append) {
                displayedPosts = [];
                postsGrid.innerHTML = '';
            }

            // Add new posts
            postsToShow.forEach(post => {
                displayedPosts.push(post);
                const postElement = createPostElement(post);
                postsGrid.appendChild(postElement);
            });

            // Update load more button
            const hasMorePosts = filteredPosts.length > displayedPosts.length;
            loadMoreBtn.style.display = hasMorePosts ? 'block' : 'none';

            postsGrid.classList.remove('filtering');
        }, 300);
    }

    // Create post element
    function createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'post-card fade-in';
        article.dataset.category = post.category;

        const categoryClass = getCategoryClass(post.category);
        const formattedDate = window.utils.formatDate(post.date);

        article.innerHTML = `
            <div class="post-card-image">
                <div class="post-image-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="post-card-content">
                <div class="post-meta">
                    <span class="post-category">${getCategoryDisplayName(post.category)}</span>
                    <span class="post-date">${formattedDate}</span>
                </div>
                <h3 class="post-card-title">${post.title}</h3>
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-footer">
                    <span class="post-author">By ${post.author}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
            </div>
        `;

        // Add click handler
        article.addEventListener('click', function() {
            handlePostClick(post);
        });

        return article;
    }

    // Get category display name
    function getCategoryDisplayName(category) {
        const categoryNames = {
            'features': 'New Features',
            'tutorials': 'Tutorials',
            'tips': 'Tips & Tricks',
            'updates': 'Updates'
        };
        return categoryNames[category] || category;
    }

    // Get category class
    function getCategoryClass(category) {
        return `category-${category}`;
    }

    // Handle post click
    function handlePostClick(post) {
        // In a real implementation, this would navigate to the full post
        console.log('Clicked post:', post);
        
        // For demo purposes, show an alert
        alert(`This would open the full article: "${post.title}"\n\nIn a real implementation, this would navigate to a dedicated post page.`);
        
        // Track analytics
        trackPostClick(post);
    }

    // Handle newsletter submission
    async function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        if (!email) {
            window.showMessage('Please enter your email address.', 'error');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            window.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        try {
            // Simulate API call
            await subscribeToNewsletter(email);
            
            window.showMessage('Thank you for subscribing! You\'ll receive our latest updates.', 'success');
            emailInput.value = '';
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            window.showMessage('Sorry, there was an error subscribing. Please try again.', 'error');
        }
    }

    // Newsletter subscription function
    async function subscribeToNewsletter(email) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    console.log('Newsletter subscription:', email);
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated API error'));
                }
            }, 1000);
        });
    }

    // Analytics tracking
    function trackPostClick(post) {
        console.log('Analytics: Post clicked', {
            postId: post.id,
            title: post.title,
            category: post.category
        });
        
        // Real implementation would integrate with analytics service
        // gtag('event', 'blog_post_click', {
        //     'post_id': post.id,
        //     'post_title': post.title,
        //     'post_category': post.category
        // });
    }

    function trackCategoryFilter(category) {
        console.log('Analytics: Category filtered', category);
        
        // Real implementation would integrate with analytics service
        // gtag('event', 'blog_category_filter', {
        //     'category': category
        // });
    }

    // Search functionality (could be added later)
    function searchPosts(query) {
        return allPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Add search functionality if search input exists
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
        const debouncedSearch = window.utils.debounce(function(e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                const searchResults = searchPosts(query);
                displaySearchResults(searchResults);
            } else if (query.length === 0) {
                filterAndDisplayPosts();
            }
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);
    }

    // Display search results
    function displaySearchResults(results) {
        postsGrid.innerHTML = '';
        displayedPosts = [];
        
        if (results.length === 0) {
            postsGrid.innerHTML = '<p class="no-results">No posts found matching your search.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }

        results.forEach(post => {
            displayedPosts.push(post);
            const postElement = createPostElement(post);
            postsGrid.appendChild(postElement);
        });

        loadMoreBtn.style.display = 'none';
    }

    // Initialize the blog when the page loads
    initBlog();
});

// Blog utilities
window.blogUtils = {
    // Get posts by category
    getPostsByCategory: function(category) {
        return blogPosts.filter(post => post.category === category);
    },

    // Get recent posts
    getRecentPosts: function(limit = 5) {
        return blogPosts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },

    // Get featured posts
    getFeaturedPosts: function() {
        return blogPosts.filter(post => post.featured);
    }
};