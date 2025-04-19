// VerveNxt Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Theme toggle (dark/light mode)
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    if (themeToggle && themeIcon) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = '🌙';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate-fadeIn');
            }
        });
    }
    
    // Initial check and add scroll event listener
    if (animateElements.length > 0) {
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    }
    
    // Testimonials slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let currentSlide = 0;
    
    function showSlide(index) {
        const slides = testimonialsSlider.querySelectorAll('.testimonial-card');
        if (slides.length === 0) return;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show current slide
        slides[index].style.display = 'block';
    }
    
    function nextSlide() {
        const slides = testimonialsSlider.querySelectorAll('.testimonial-card');
        if (slides.length === 0) return;
        
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        const slides = testimonialsSlider.querySelectorAll('.testimonial-card');
        if (slides.length === 0) return;
        
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Set up testimonials slider if it exists
    if (testimonialsSlider) {
        const prevButton = testimonialsSlider.querySelector('.prev-button');
        const nextButton = testimonialsSlider.querySelector('.next-button');
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }
        
        // Initialize first slide
        showSlide(currentSlide);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('is-invalid');
            } else if (nameInput) {
                nameInput.classList.remove('is-invalid');
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.classList.add('is-invalid');
                } else {
                    emailInput.classList.remove('is-invalid');
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('is-invalid');
            } else if (messageInput) {
                messageInput.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // In a real implementation, this would send the form data to a server
                // For now, just show a success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.style.display = 'none';
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
            }
        });
    }
    
    // Create VerveNxt logo SVG programmatically
    const logoContainers = document.querySelectorAll('.logo-svg-container');
    
    logoContainers.forEach(container => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '150');
        svg.setAttribute('height', '40');
        svg.setAttribute('viewBox', '0 0 150 40');
        svg.setAttribute('fill', 'none');
        
        // Create the logo elements
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M10 10L25 5L40 10L25 35L10 10Z');
        path1.setAttribute('fill', '#0066cc');
        
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M45 15L60 10L75 15L60 30L45 15Z');
        path2.setAttribute('fill', '#ff6b35');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '85');
        text.setAttribute('y', '25');
        text.setAttribute('fill', '#333333');
        text.setAttribute('font-family', 'Poppins, sans-serif');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('font-size', '16');
        text.textContent = 'VerveNxt';
        
        // Add elements to SVG
        svg.appendChild(path1);
        svg.appendChild(path2);
        svg.appendChild(text);
        
        // Add SVG to container
        container.appendChild(svg);
    });
});
