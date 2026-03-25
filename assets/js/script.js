// Professional Portfolio Website JavaScript
// Adam Reue - Tech Guru for Hire

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initCounters();
    initLoadingAnimations();
    initIntersectionObserver();
    initPassionProjectLinks();

    console.log('🚀 Professional Portfolio loaded successfully!');
    console.log('📱 Interactive features initialized');
    console.log('🎨 Modern animations applied');
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Smooth scrolling only for on-page hash links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href') || '';
            if (!href.startsWith('#')) {
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                return;
            }

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) {
                return;
            }

            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Special animations for different elements
                if (entry.target.classList.contains('expertise-card')) {
                    animateCards(entry.target);
                }

                if (entry.target.classList.contains('project-card')) {
                    animateProjectCards(entry.target);
                }

                if (entry.target.classList.contains('highlight-item')) {
                    animateHighlights(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.expertise-card, .project-card, .highlight-item, .section-header, .about-intro');
    animateElements.forEach(el => observer.observe(el));
}

// Counter animations for stats
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        counter.textContent = Math.floor(current);

        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Contact form functionality
function initContactForm() {
    // Static GitHub Pages build: no backend form submission.
    // Kept as a no-op so the rest of the page initialization stays simple.
}

// Loading animations
function initLoadingAnimations() {
    // Stagger animation for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });

    // Animate hero elements
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');

    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateX(-50px)';
            heroText.style.transition = 'all 0.8s ease';

            setTimeout(() => {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateX(0)';
            }, 200);
        }, 300);
    }

    if (heroImage) {
        setTimeout(() => {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(50px)';
            heroImage.style.transition = 'all 0.8s ease';

            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 500);
        }, 500);
    }
}

// Intersection Observer for various animations
function initIntersectionObserver() {
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScroll.observe(el);
    });
}

// Utility functions
function animateCards(card) {
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, 100);
}

function animateProjectCards(card) {
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function animateHighlights(highlight) {
    setTimeout(() => {
        highlight.style.opacity = '1';
        highlight.style.transform = 'translateY(0)';
    }, 100);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add CSS for hamburger menu animation
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        border-top: 1px solid var(--border-color);
        padding: 1rem 0;
        box-shadow: var(--shadow-lg);
    }

    .nav-menu.active .nav-link {
        padding: 0.75rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }


    body.menu-open {
        overflow: hidden;
    }

    /* Animation classes */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .expertise-card,
    .project-card,
    .highlight-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .section-header {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .about-intro {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    /* Hover effects */
    .btn {
        position: relative;
        overflow: hidden;
    }

    .btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }

    .btn:hover::before {
        left: 100%;
    }
`;

document.head.appendChild(style);

// Add loading spinner styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll optimizations here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Passion Projects hover links (no click functionality needed)
function initPassionProjectLinks() {
    // Links are now handled via CSS hover effects and direct anchor tags
    // No JavaScript click handlers needed
}
