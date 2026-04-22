/**
 * AgricWorld Global Script
 * Handles Navigation, Scroll Animations, and Premium Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initFormHandling();
});

/**
 * Navigation Logic
 * Handles scrolled state and mobile sidebar
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const sidebar = document.getElementById('sidebar');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Sidebar Toggle
    window.toggleSidebar = function() {
        if (sidebar) {
            sidebar.classList.toggle('open');
            // Toggle body scroll
            if (sidebar.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    };

    // Close sidebar when clicking links
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });
}

/**
 * Scroll Reveal Animations
 * Uses Intersection Observer for performance
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Once animated, we can stop observing if we want it to stay
                // revealObserver.unobserve(entry.target);
            } else {
                // Optional: remove class to re-animate when scrolling back up
                entry.target.classList.remove('animate');
            }
        });
    }, observerOptions);

    // Observe reveal elements and stagger containers
    const revealElements = document.querySelectorAll('.reveal, .stagger-children');
    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Stats Counter Animation
 * Animates numbers when they come into view
 */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCount(entry.target);
                entry.target.dataset.animated = "true";
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => countObserver.observe(stat));

    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCount = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.floor(current).toLocaleString() + (el.innerText.includes('+') ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target.toLocaleString() + (el.innerText.includes('+') ? '+' : '');
            }
        };
        updateCount();
    }
}

/**
 * Form Handling
 * Demo submission with success feedback
 */
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                btn.classList.add('btn-success');
                btn.style.background = 'var(--success)';
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.classList.remove('btn-success');
                }, 3000);
            }, 1500);
        });
    }
}