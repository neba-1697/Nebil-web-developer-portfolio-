(function() {
    'use strict';

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = 'var(--shadow-lg)';
                navbar.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.backgroundColor = 'var(--bg-white)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Display success message (since this is a demo)
            alert(`Thank you, ${name}! Your message has been received. This is a demo form - please use the contact information provided to reach out directly.`);
            
            // Reset form
            this.reset();
        });
    }

    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe skills sections for progress bar animation
    const skillsSections = document.querySelectorAll('.skills-section, .learning-goals');
    skillsSections.forEach(section => {
        progressObserver.observe(section);
    });

    // Typing effect for hero text (optional enhancement)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.textContent.includes('Nebil Shebab')) {
        // Only apply typing effect on the main portfolio pages
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero background (subtle)
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Copy email to clipboard functionality
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(element => {
        element.addEventListener('click', function() {
            const email = this.textContent || this.getAttribute('data-email');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Email copied to clipboard!';
                    tooltip.style.cssText = `
                        position: absolute;
                        background: var(--primary-color);
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 4px;
                        font-size: 0.875rem;
                        z-index: 1000;
                        pointer-events: none;
                        transform: translateX(-50%);
                    `;
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + rect.width / 2 + 'px';
                    tooltip.style.top = rect.top - 40 + 'px';
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 2000);
                });
            }
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Loading animation for page
    window.addEventListener('load', function() {
        // Remove any loading overlays
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }

        // Trigger initial animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in', 'visible');
        }
    });

    // Print styles optimization
    window.addEventListener('beforeprint', function() {
        // Hide navigation and other non-essential elements when printing
        const navbar = document.querySelector('.navbar');
        const backToPortfolio = document.querySelector('.back-to-portfolio');
        
        if (navbar) navbar.style.display = 'none';
        if (backToPortfolio) backToPortfolio.style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        // Restore elements after printing
        const navbar = document.querySelector('.navbar');
        const backToPortfolio = document.querySelector('.back-to-portfolio');
        
        if (navbar) navbar.style.display = 'block';
        if (backToPortfolio) backToPortfolio.style.display = 'block';
    });

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Focus management for mobile menu
        if (e.key === 'Tab' && navMenu && navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Console log for developers
    console.log('🌟 Portfolio website by Nebil Shebab - Self-taught web developer from Ethiopia');
    console.log('📧 Contact: nebilshebab949@gmail.com');
    console.log('💻 Built with HTML5, CSS3, and JavaScript');

})();
