// ===================================
// COUNTDOWN TIMER - Expires Dec 2nd 2025 Midnight PST
// ===================================
(function() {
    const EXPIRATION_DATE = new Date('2025-12-02T00:00:00-08:00');
    
    const timerElement = document.getElementById('countdown-timer');
    const heroCtaContainer = document.querySelector('.hero-cta');
    
    function updateCountdown() {
        const now = new Date();
        const diff = EXPIRATION_DATE - now;
        
        if (diff <= 0) {
            timerElement.textContent = 'EXPIRED';
            if (heroCtaContainer) {
                heroCtaContainer.classList.add('countdown-expired');
            }
            return false;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const pad = (n) => n.toString().padStart(2, '0');
        
        if (hours >= 24) {
            const days = Math.floor(hours / 24);
            const remainingHours = hours % 24;
            timerElement.textContent = `${days}d ${pad(remainingHours)}:${pad(minutes)}:${pad(seconds)}`;
        } else {
            timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
        
        return true;
    }
    
    if (updateCountdown()) {
        setInterval(updateCountdown, 1000);
    }
})();

// ===================================
// MOBILE MENU TOGGLE
// ===================================
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.header-nav');
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (!this.toggle || !this.nav) return;
        
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking nav links
        const navLinks = this.nav.querySelectorAll('.nav-item a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggleMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.nav.contains(e.target) && 
                !this.toggle.contains(e.target)) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('active');
        this.toggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.toggle.querySelectorAll('span');
        if (this.isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}


// ===================================
// STICKY HEADER ON SCROLL
// ===================================
class StickyHeader {
    constructor() {
        this.header = document.querySelector('.site-header');
        this.scrollThreshold = 100; // Distance from top before header becomes sticky
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => this.handleScroll());
        this.handleScroll(); // Check initial state
    }
    
    handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > this.scrollThreshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================
class TestimonialsCarousel {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.cardWidth = 345.6 + 32; // card width + gap
        this.featuredWidth = 414.72 + 32; // featured card width + gap
        
        this.init();
    }
    
    init() {
        if (!this.track || !this.prevBtn || !this.nextBtn) return;
        
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Center on featured card initially (card 3, index 2)
        this.currentIndex = 2;
        this.updateCarousel();
    }
    
    next() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    updateCarousel() {
        // Calculate offset based on card positions
        let offset = 0;
        for (let i = 0; i < this.currentIndex; i++) {
            if (i === 2) { // Featured card
                offset += this.featuredWidth;
            } else {
                offset += this.cardWidth;
            }
        }
        
        this.track.style.transform = `translateX(-${offset}px)`;
    }
}

// ===================================
// INITIALIZE ON LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    window.mobileMenu = new MobileMenu();
    
    // Initialize sticky header
    window.stickyHeader = new StickyHeader();
    
    // Initialize testimonials carousel (none exist now, but keeping for future)
    window.testimonialsCarousel = new TestimonialsCarousel();
    
    console.log('LA Fitness initialized');
});

