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

/* ==========================================================================
   6. Dynamic PDF CV Generator (Blank Page Fix + Full Data)
   ========================================================================== */
function initDynamicCV() {
    const cvBtn = document.getElementById('generateCvBtn');
    
    if (!cvBtn) return;

    cvBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = cvBtn.innerHTML;
        cvBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        cvBtn.style.pointerEvents = 'none';

        // PASSING A RAW HTML STRING PREVENTS THE "BLANK PDF" BUG
        const cvHTML = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111; line-height: 1.5; background: #fff; max-width: 800px; margin: 0 auto;">
                
                <!-- Header -->
                <div style="text-align: center; border-bottom: 2px solid #0070f3; padding-bottom: 20px; margin-bottom: 25px;">
                    <h1 style="margin: 0 0 5px 0; font-size: 28pt; color: #000; font-weight: bold;">Shahriar Morshed Jahin</h1>
                    <p style="margin: 0 0 10px 0; font-size: 14pt; color: #444;">MS Student in Agricultural Extension & Rural Development</p>
                    <p style="margin: 0; font-size: 10pt; color: #666;">
                        shahriar5855@stu.gau.edu.bd | shahriarjahin@gmail.com | Gazipur, Bangladesh
                    </p>
                </div>

                <!-- Professional Summary -->
                <h2 style="font-size: 14pt; color: #0070f3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; font-weight: bold;">Professional Summary</h2>
                <p style="font-size: 10.5pt; color: #333; margin-bottom: 25px;">
                    I work at the intersection of fisheries, agriculture, and rural development. My focus is on extension services, farmer engagement, policy implementation, and data-driven approaches that strengthen livelihoods and improve sector-level decision making.
                </p>

                <!-- Education -->
                <h2 style="font-size: 14pt; color: #0070f3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; font-weight: bold;">Education</h2>
                
                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Master of Science (MS), Agricultural Extension & Rural Development</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Gazipur Agricultural University</strong> | 2026 – Present</p>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Bachelor of Science in Fisheries</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Gazipur Agricultural University</strong> | 2021 – 2025</p>
                </div>

                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Higher Secondary Certificate (HSC)</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Birshreshtha Noor Mohammad Public College, Dhaka</strong> | 2020</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Secondary School Certificate (SSC)</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Thakurgaon Govt. Boys’ High School</strong> | 2018</p>
                </div>

                <!-- Experience -->
                <h2 style="font-size: 14pt; color: #0070f3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; font-weight: bold;">Experience & Leadership</h2>
                
                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Intern</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>District Fisheries Office, Gazipur</strong> | Nov 2025 – Jan 2026</p>
                    <p style="margin: 3px 0 0 0; font-size: 10pt; color: #333;">Practical extension workflows, farm/hatchery visits, feed mill observation, and field surveys of wetlands and commercial ponds.</p>
                </div>

                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Vice President</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>IT Society, Gazipur Agricultural University</strong> | Feb 2025 - Present</p>
                </div>

                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Chief of Staff</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Hult Prize at Gazipur Agricultural University</strong> | Jan 2025 - Jun 2025</p>
                </div>

                <div style="margin-bottom: 10px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Surveyor (Part-time)</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>CEGIS</strong> | Dec 2024 - Feb 2025</p>
                    <p style="margin: 3px 0 0 0; font-size: 10pt; color: #333;">Conducted surveys and data collection of Beels of Mymensingh Division for Wetland management project.</p>
                </div>

                <div style="margin-bottom: 25px;">
                    <h3 style="margin: 0; font-size: 11.5pt; color: #000;">Sub-secretary of Publicity</h3>
                    <p style="margin: 2px 0; font-size: 10pt; color: #555;"><strong>Rangpur Divisional Student Welfare Organization, GAU</strong> | Oct 2024 - Present</p>
                </div>

                <!-- Skills -->
                <h2 style="font-size: 14pt; color: #0070f3; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; font-weight: bold;">Skills & Competencies</h2>
                <ul style="font-size: 10.5pt; color: #333; padding-left: 20px; margin-bottom: 0; line-height: 1.6;">
                    <li><strong>Extension & Field Work:</strong> Farmer Interaction, Field Survey & Data Collection, Training Programs, Extension Reporting.</li>
                    <li><strong>Data, Programming & Analysis:</strong> Python, R (Statistical Analysis), Data Visualization, HTML/CSS/JS.</li>
                    <li><strong>Bioinformatics:</strong> Genomic Data Analysis, Molecular Docking, Discovery Studio & PyRx.</li>
                </ul>

            </div>
        `;

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
