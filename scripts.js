/* ==========================================================================
   Main Application Logic (Master File)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavbarAnimation();
    initMobileMenu();
    initSkillsAnimation();
    initScrollAnimations();
    initContactForm();
    initDynamicCV(); 
});

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

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

function initSkillsAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.targetWidth;
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => {
        bar.dataset.targetWidth = bar.style.width;
        bar.style.width = '0';
        observer.observe(bar);
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0'; 
        observer.observe(el);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            if (typeof emailjs === 'undefined') {
                alert('EmailJS service is currently unavailable. Please try again later.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            emailjs.sendForm('service_6m3af3p', 'template_zkcweey', contactForm)
                .then(() => {
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('animate__animated', 'animate__fadeIn');
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
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}



        const downloadCvBtn = document.getElementById("downloadCvBtn");
if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", function () {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
}
