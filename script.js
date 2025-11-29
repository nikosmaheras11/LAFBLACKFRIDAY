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
// CONFIGURATION
// ===================================
const CONFIG = {
    gridColumns: 6,
    gridRows: 4,
    sequenceInterval: 6000, // milliseconds before switching to next sequence
    fadeDuration: 1200, // milliseconds for fade transition
    imagePaths: [
        // Actual Figma images
        'assets/images/image1.png',
        'assets/images/image2.png',
        'assets/images/image3.png',
        'assets/images/image4.png',
        'assets/images/image5.png',
        'assets/images/image6.png',
        'assets/images/image7.png',
        'assets/images/image8.png',
        'assets/images/image9.png',
        'assets/images/image10.png',
        'assets/images/image11.png',
        'assets/images/image12.png'
    ],
    // Three predefined sequences from Figma designs
    // Each sequence shows 5 images in specific grid positions
    sequences: [
        // Sequence 1 (Figma: 140-7458)
        [
            { index: 0, borderRadius: '12px', image: 0 },   // Row 1, Col 1
            { index: 4, borderRadius: '12px', image: 1 },   // Row 1, Col 5
            { index: 13, borderRadius: '12px', image: 2 },  // Row 3, Col 2
            { index: 21, borderRadius: '12px', image: 3 },  // Row 4, Col 4
            { index: 23, borderRadius: '12px', image: 4 }   // Row 4, Col 6
        ],
        // Sequence 2 (Figma: 250-1877)
        [
            { index: 1, borderRadius: '12px', image: 5 },   // Row 1, Col 2
            { index: 5, borderRadius: '12px', image: 6 },   // Row 1, Col 6
            { index: 10, borderRadius: '12px', image: 7 },  // Row 2, Col 5
            { index: 12, borderRadius: '12px', image: 8 },  // Row 3, Col 1
            { index: 21, borderRadius: '12px', image: 9 }   // Row 4, Col 4
        ],
        // Sequence 3 (Figma: 250-1925)
        [
            { index: 0, borderRadius: '12px', image: 10 },  // Row 1, Col 1
            { index: 2, borderRadius: '12px', image: 11 },  // Row 1, Col 3
            { index: 4, borderRadius: '12px', image: 0 },   // Row 1, Col 5
            { index: 13, borderRadius: '12px', image: 1 },  // Row 3, Col 2
            { index: 23, borderRadius: '12px', image: 2 }   // Row 4, Col 6
        ]
    ]
};

// ===================================
// GRID INITIALIZATION
// ===================================
class FloatingHeaderGrid {
    constructor(config) {
        this.config = config;
        this.gridContainer = document.querySelector('.grid-overlay');
        this.cells = [];
        this.animationIntervals = [];
        this.currentSequenceIndex = 0;
        
        this.init();
    }

    init() {
        this.createGrid();
        this.startSequenceCycle();
    }

    createGrid() {
        const totalCells = this.config.gridColumns * this.config.gridRows;
        
        // Create all grid cells (empty initially)
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            
            this.gridContainer.appendChild(cell);
            this.cells.push(cell);
        }
        
        // Show first sequence immediately
        this.showSequence(0, true);
    }

    showSequence(sequenceIndex, isInitial = false) {
        const sequence = this.config.sequences[sequenceIndex];
        
        // Get all grid indices that should be visible in this sequence
        const targetIndices = sequence.map(card => card.index);
        
        // Hide all cards not in this sequence
        this.cells.forEach((cell, index) => {
            if (!targetIndices.includes(index)) {
                if (!isInitial) {
                    cell.classList.remove('card-visible');
                    cell.classList.add('card-hidden');
                }
            }
        });
        
        // Show cards in this sequence
        sequence.forEach((cardConfig, i) => {
            const cell = this.cells[cardConfig.index];
            
            // Clear existing content if any
            cell.innerHTML = '';
            
            // Set border radius
            cell.style.borderRadius = cardConfig.borderRadius;
            
            // Add image
            const img = document.createElement('img');
            img.src = this.config.imagePaths[cardConfig.image];
            img.alt = `Floating image ${cardConfig.image + 1}`;
            img.classList.add('active');
            cell.appendChild(img);
            
            // Stagger the fade-in for smooth transitions
            if (isInitial) {
                // Initial load: show immediately with staggered animation
                setTimeout(() => {
                    cell.classList.add('card-visible');
                }, i * 100);
            } else {
                // Transition: fade in after previous cards fade out
                setTimeout(() => {
                    cell.classList.remove('card-hidden');
                    cell.classList.add('card-visible');
                }, this.config.fadeDuration * 0.5 + (i * 100));
            }
        });
    }

    startSequenceCycle() {
        // Cycle through sequences every sequenceInterval
        const intervalId = setInterval(() => {
            // Move to next sequence (loop back to 0 after last one)
            this.currentSequenceIndex = (this.currentSequenceIndex + 1) % this.config.sequences.length;
            this.showSequence(this.currentSequenceIndex);
        }, this.config.sequenceInterval);
        
        this.animationIntervals.push(intervalId);
    }

    destroy() {
        // Clean up intervals
        this.animationIntervals.forEach(id => clearInterval(id));
        this.animationIntervals = [];
    }
}

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
        
        // Animate hamburger icon
        const spans = this.toggle.querySelectorAll('span');
        if (this.isOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations to save resources
        if (window.floatingGrid) {
            window.floatingGrid.destroy();
        }
    } else {
        // Page is visible again, restart animations
        if (window.floatingGrid) {
            window.floatingGrid.startAnimations();
        }
    }
});

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
    // Initialize floating grid
    window.floatingGrid = new FloatingHeaderGrid(CONFIG);
    
    // Initialize mobile menu
    window.mobileMenu = new MobileMenu();
    
    // Initialize sticky header
    window.stickyHeader = new StickyHeader();
    
    // Initialize testimonials carousel
    window.testimonialsCarousel = new TestimonialsCarousel();
    
    console.log('Club Studio Header initialized');
});

