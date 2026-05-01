/* ==========================================================================
   Main Application Logic
   File: scripts.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initNavbarAnimation();
    initMobileMenu();
    initSkillsAnimation();
    initScrollAnimations();
    initContactForm();
});

/* ==========================================================================
   1. Navbar Glassmorphism Trigger
   ========================================================================== */
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   2. Mobile Menu (With Auto-Close & Icon Morphing)
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    // Safety check to ensure the elements exist
    if (menuToggle && navLinks) {
        
        // Toggle the menu open/closed when the hamburger is clicked
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change the hamburger icon to an "X" when open
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Automatically close the menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                
                // Reset icon back to hamburger
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

/* ==========================================================================
   3. Skills Progress Bar Animation
   ========================================================================== */
function initSkillsAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                // Fetch the target width that was stored in the data attribute
                const targetWidth = bar.dataset.targetWidth;
                
                // Animate to target
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => {
        // Store the original width from HTML, then reset to 0 for the animation
        bar.dataset.targetWidth = bar.style.width;
        bar.style.width = '0';
        observer.observe(bar);
    });
}

/* ==========================================================================
   4. Scroll Fade-in Animations
   ========================================================================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Utilizing Animate.css which you linked in your HTML
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.style.opacity = '0'; // Hide initially before scroll triggers
        observer.observe(el);
    });
}

/* ==========================================================================
   5. Contact Form Submission (EmailJS)
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // UI Feedback during submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                alert('EmailJS service is currently unavailable. Please try again later.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Send form
            emailjs.sendForm('service_6m3af3p', 'template_zkcweey', contactForm)
                .then(() => {
                    // Modern, clean success message matching the dark theme
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message', 'animate__animated', 'animate__fadeIn');
                    successMessage.style.textAlign = 'center';
                    successMessage.style.padding = '3rem 1rem';
                    successMessage.innerHTML = `
                        <div style="font-size: 3.5rem; color: var(--accent); margin-bottom: 1rem;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 style="color: var(--text); font-size: 1.5rem; margin-bottom: 0.5rem;">Message Sent!</h3>
                        <p style="color: var(--muted); font-size: 1rem;">Thank you for reaching out. I will get back to you shortly.</p>
                    `;
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                }, (error) => {
                    alert('Transmission failed: ' + error.text);
                    console.error('EmailJS error:', error);
                    
                    // Reset button if failed
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}