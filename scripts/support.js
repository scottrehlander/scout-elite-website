// Support page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate form
        if (!window.validateForm(contactForm)) {
            return;
        }

        // Disable button and show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';

        try {
            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Add timestamp
            data.timestamp = new Date().toISOString();
            data.userAgent = navigator.userAgent;

            // Simulate API call (replace with actual Brevo API integration)
            await submitToBrevo(data);

            // Show success message
            window.showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            window.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    });

    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Clear error state when user starts typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            }
        });
    });

    // Field validation function
    function validateField(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Update field state
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        } else {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
        }

        return isValid;
    }

    // Brevo API integration function
    async function submitToBrevo(data) {
        // This is a placeholder for Brevo integration
        // In a real implementation, you would:
        // 1. Send data to your backend API
        // 2. Your backend would use Brevo's API to send the email
        // 3. Return success/failure status

        // For demo purposes, we'll simulate an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    console.log('Form data that would be sent to Brevo:', data);
                    resolve({ success: true });
                } else {
                    reject(new Error('Simulated API error'));
                }
            }, 2000);
        });

        /* 
        Real Brevo integration would look like this:
        
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return await response.json();
        */
    }

    // FAQ item click handlers for mobile expansion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle highlight effect on click
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Auto-resize textarea
    const messageTextarea = document.getElementById('message');
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Character counter for message field
    const maxChars = 2000;
    const messageField = document.getElementById('message');
    const messageGroup = messageField.parentNode;
    
    // Create character counter
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = `
        font-size: var(--font-size-xs);
        color: var(--text-muted);
        text-align: right;
        margin-top: var(--space-1);
    `;
    messageGroup.appendChild(charCounter);

    messageField.addEventListener('input', function() {
        const remaining = maxChars - this.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        
        if (remaining < 100) {
            charCounter.style.color = 'var(--warning)';
        } else if (remaining < 0) {
            charCounter.style.color = 'var(--danger)';
        } else {
            charCounter.style.color = 'var(--text-muted)';
        }
    });

    // Initial character count
    messageField.dispatchEvent(new Event('input'));
});

// Analytics and tracking (placeholder)
function trackFormInteraction(action, field = null) {
    // This would integrate with your analytics service
    console.log('Analytics:', action, field);
    
    // Example: Google Analytics 4
    // gtag('event', action, {
    //     'event_category': 'Contact Form',
    //     'event_label': field
    // });
}

// Track form field focus
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name);
        });
    });
});