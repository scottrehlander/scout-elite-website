---
layout: default
title: Support | Scout Elite
permalink: /support.html
---

<!-- Support Hero Section -->
<section class="support-hero">
    <div class="container">
        <div class="support-hero-content">
            <h1 class="support-title">How can we help you?</h1>
            <p class="support-subtitle">Get in touch with our team for questions about Scout Elite, feature requests, or business inquiries.</p>
        </div>
    </div>
</section>

<!-- Contact Form Section -->
<section class="contact-section">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-info">
                <h2>Get in Touch</h2>
                <p>Have a question about Scout Elite? Need help getting started? Want to discuss enterprise solutions? We're here to help.</p>
                <div class="contact-methods">
                    <div class="contact-method">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Email Support</h3>
                            <p>Get help via email. We typically respond within 24 hours.</p>
                        </div>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="12,22 12,6.81" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Business Inquiries</h3>
                            <p>Interested in enterprise solutions or partnerships? Let's talk.</p>
                        </div>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="contact-details">
                            <h3>Documentation</h3>
                            <p>Check out our <a href="blog.html">blog</a> for guides, tutorials, and feature updates.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-form-container">
                <form id="contact-form" class="contact-form">
                    <h2>Send us a message</h2>
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input type="text" id="name" name="name" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="company">Company/Organization</label>
                        <input type="text" id="company" name="company">
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="inquiry-type">Type of Inquiry *</label>
                        <select id="inquiry-type" name="inquiry-type" required>
                            <option value="">Select an option</option>
                            <option value="general">General Question</option>
                            <option value="support">Technical Support</option>
                            <option value="business">Business Inquiry</option>
                            <option value="partnership">Partnership</option>
                            <option value="feature">Feature Request</option>
                            <option value="bug">Bug Report</option>
                        </select>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject *</label>
                        <input type="text" id="subject" name="subject" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" name="message" rows="5" required placeholder="Please describe your question or inquiry in detail..."></textarea>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="updates" name="updates">
                            <span class="checkmark"></span>
                            <span class="checkbox-text">I'd like to receive updates about new features and Scout Elite news</span>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary submit-btn">
                        <span class="btn-text">Send Message</span>
                        <span class="btn-loading" style="display: none;">
                            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                                <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z" opacity="0.75"/>
                            </svg>
                            Sending...
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section class="faq-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <p class="section-subtitle">Quick answers to common questions about Scout Elite</p>
        </div>
        <div class="faq-grid">
            <div class="faq-item">
                <h3>How do I get started with Scout Elite?</h3>
                <p>Getting started is easy! Just <a target="_blank" href="https://xpress.scout-elite.com/account/register">Create Your Account</a> in Scout Elite Xpress and choose one of our cost-effective subscription plans or download the app on the iOS App Store or Google Play.</p>
            </div>
            <div class="faq-item">
                <h3>Is there a mobile app?</h3>
                <p>Yes! Scout Elite Live is offered as a mobile applications for both iOS and Android devices. Game analysis can be viewed on the web in a mobile-friendly format directly in <a href="https://xpress.scout-elite.com">Scout Elite Xpress</a>.</p>
            </div>
            <div class="faq-item">
                <h3>What kind of support do you offer?</h3>
                <p>We provide comprehensive support including email assistance, documentation, training resources, and dedicated support for enterprise customers.</p>
            </div>
            <div class="faq-item">
                <h3>Can I integrate Scout Elite with other tools?</h3>
                <p>Scout Elite is integration-ready with existing tools and workflows. Contact us using the form above to discuss your specific needs.</p>
            </div>
            <div class="faq-item">
                <h3>Is my data secure?</h3>
                <p>Absolutely. We use enterprise-grade security measures including encryption, secure servers, and regular security audits to protect your data.</p>
            </div>
        </div>
    </div>
</section>
