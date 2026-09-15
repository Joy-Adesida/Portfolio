/* ========================================
   PORTFOLIO WEBSITE JAVASCRIPT
   Smooth Navigation & Interactions
   ======================================== */

/**
 * Navigation Toggle for Mobile
 */
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle) return;
    
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

/**
 * Navbar Scroll Effect
 * Adjust navbar appearance on scroll
 */
function initializeNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scroll shadow when scrolled down
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Smooth Scroll for Navigation Links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid anchor links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Scroll Animations
 * Adds fade-in effect to elements as they come into view
 */
function initializeScrollAnimations() {
    // Check if prefers-reduced-motion is set
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe portfolio items and gallery items
    const elementsToObserve = document.querySelectorAll(
        '.gallery-item, .writing-item, .identity-card, .section-header'
    );
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
        observer.observe(el);
    });
}

/**
 * Accessibility: Ensure active navigation link is marked
 * Updates aria-current attribute for screen readers
 */
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.removeAttribute('aria-current');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

/**
 * Focus visible polyfill for better keyboard navigation
 */
function initializeKeyboardNavigation() {
    // Add focus-visible class to elements that receive keyboard focus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

/**
 * Handle gallery image loading
 * Add loading placeholders
 */
function initializeGalleryPlaceholders() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Add data attribute for potential future image loading
        if (!item.querySelector('img')) {
            const placeholder = item.querySelector('.gallery-placeholder');
            if (placeholder) {
                placeholder.setAttribute('role', 'img');
                placeholder.setAttribute('aria-label', placeholder.textContent.trim());
            }
        }
    });
}

/**
 * Debounce utility for performance-critical functions
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Performance: Throttle scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize all scripts on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeNavbarScroll();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeActiveNavigation();
    initializeKeyboardNavigation();
    initializeGalleryPlaceholders();
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    // Reset navigation state
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
});

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    // Handle any dynamic layout adjustments on resize
    // (currently not needed, but kept for future extensibility)
}, 250));

/* ========================================
   LOGGING & DEBUGGING (Development Only)
   ======================================== */

// Uncomment for development debugging
/*
console.log('Portfolio website loaded');
console.log('Sections found:', document.querySelectorAll('section[id]').length);
console.log('Navigation links found:', document.querySelectorAll('.nav-link').length);
*/
