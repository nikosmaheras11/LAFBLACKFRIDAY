// ===================================
// CONFIGURATION
// ===================================
const CONFIG = {
    gridColumns: 6,
    gridRows: 4,
    rotationInterval: 3000, // milliseconds between card changes
    fadeDuration: 800, // milliseconds for fade transition
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
    // All possible grid positions - cards will never be adjacent
    // activeGridCells will be dynamically chosen to ensure non-adjacency
    allGridPositions: [
        { index: 0, borderRadius: '12px', image: 0 },    // [1,1]
        { index: 1, borderRadius: '12px', image: 1 },    // [1,2]
        { index: 2, borderRadius: '12px', image: 2 },    // [1,3]
        { index: 3, borderRadius: '12px', image: 3 },    // [1,4]
        { index: 4, borderRadius: '12px', image: 4 },    // [1,5]
        { index: 5, borderRadius: '12px', image: 5 },    // [1,6]
        { index: 6, borderRadius: '12px', image: 6 },    // [2,1]
        { index: 7, borderRadius: '12px', image: 7 },    // [2,2]
        { index: 8, borderRadius: '12px', image: 8 },    // [2,3]
        { index: 9, borderRadius: '12px', image: 9 },    // [2,4]
        { index: 10, borderRadius: '12px', image: 10 },  // [2,5]
        { index: 11, borderRadius: '12px', image: 11 },  // [2,6]
        { index: 12, borderRadius: '12px', image: 0 },   // [3,1]
        { index: 13, borderRadius: '12px', image: 1 },   // [3,2]
        { index: 14, borderRadius: '12px', image: 2 },   // [3,3]
        { index: 15, borderRadius: '12px', image: 3 },   // [3,4]
        { index: 16, borderRadius: '12px', image: 4 },   // [3,5]
        { index: 17, borderRadius: '12px', image: 5 },   // [3,6]
        { index: 18, borderRadius: '12px', image: 6 },   // [4,1]
        { index: 19, borderRadius: '12px', image: 7 },   // [4,2]
        { index: 20, borderRadius: '12px', image: 8 },   // [4,3]
        { index: 21, borderRadius: '12px', image: 9 },   // [4,4]
        { index: 22, borderRadius: '12px', image: 10 },  // [4,5]
        { index: 23, borderRadius: '12px', image: 11 }   // [4,6]
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
        this.config.activeGridCells = [];
        
        this.init();
    }

    init() {
        // Initialize with 5 non-adjacent cards
        this.config.activeGridCells = this.selectNonAdjacentCards(5);
        this.createGrid();
        this.startAnimations();
    }
    
    // Check if two grid indices are adjacent (horizontally, vertically, or diagonally)
    areAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / this.config.gridColumns);
        const col1 = index1 % this.config.gridColumns;
        const row2 = Math.floor(index2 / this.config.gridColumns);
        const col2 = index2 % this.config.gridColumns;
        
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        
        // Adjacent if within 1 cell in any direction (including diagonal)
        return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff) > 0;
    }
    
    // Check if a grid position is in the hero text exclusion zone (center area)
    isInExclusionZone(index) {
        const row = Math.floor(index / this.config.gridColumns);
        const col = index % this.config.gridColumns;
        
        // Exclude center 4 cells (columns 2-3, rows 2-3) where hero text appears
        // This is roughly indices 8,9,10,14,15,16 in a 6x4 grid
        const exclusionIndices = [8, 9, 14, 15]; // Center-center cells
        
        return exclusionIndices.includes(index);
    }
    
    // Select N non-adjacent cards from allGridPositions
    selectNonAdjacentCards(count) {
        const selected = [];
        const available = [...this.config.allGridPositions].filter(
            pos => !this.isInExclusionZone(pos.index)
        );
        
        // Shuffle available positions for randomness
        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        
        for (const position of available) {
            if (selected.length >= count) break;
            
            // Check if this position is adjacent to any selected positions
            const isAdjacentToAny = selected.some(s => 
                this.areAdjacent(position.index, s.index)
            );
            
            if (!isAdjacentToAny) {
                selected.push(position);
            }
        }
        
        return selected;
    }

    createGrid() {
        const totalCells = this.config.gridColumns * this.config.gridRows;
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            
            // Find if this cell has custom styling
            const cellConfig = this.config.activeGridCells.find(c => c.index === i);
            
            if (cellConfig) {
                cell.style.borderRadius = cellConfig.borderRadius;
                this.addImagesToCell(cell, cellConfig);
            }
            
            this.gridContainer.appendChild(cell);
            this.cells.push(cell);
        }
    }

    addImagesToCell(cell, cellConfig) {
        // Add single image for this card
        const img = document.createElement('img');
        img.src = this.config.imagePaths[cellConfig.image];
        img.alt = `Floating image ${cellConfig.image + 1}`;
        img.classList.add('active');
        cell.appendChild(img);
    }

    startAnimations() {
        // Only show 5 cards at a time - ONE card cycles at a time
        const maxVisibleCards = 5;
        let currentVisibleIndexes = [];
        
        // Initialize first 5 cards as visible
        for (let i = 0; i < Math.min(maxVisibleCards, this.config.activeGridCells.length); i++) {
            const cellConfig = this.config.activeGridCells[i];
            const cell = this.cells[cellConfig.index];
            cell.classList.add('card-visible');
            currentVisibleIndexes.push(i);
        }
        
        // Cycle one card at a time every 3 seconds
        const intervalId = setInterval(() => {
            // Pick a random visible card to remove
            const indexToRemove = Math.floor(Math.random() * currentVisibleIndexes.length);
            const cellIndexToHide = currentVisibleIndexes[indexToRemove];
            const cellToHide = this.cells[this.config.activeGridCells[cellIndexToHide].index];
            
            // Get current visible grid indices
            const currentVisibleGridIndices = currentVisibleIndexes.map(i => 
                this.config.activeGridCells[i].index
            );
            
            // Find all available positions that aren't currently visible
            const availablePositions = this.config.allGridPositions.filter(pos => {
                // Not currently visible
                if (currentVisibleGridIndices.includes(pos.index)) return false;
                
                // Not in exclusion zone (hero text area)
                if (this.isInExclusionZone(pos.index)) return false;
                
                // Not adjacent to any currently visible card (except the one being removed)
                const otherVisible = currentVisibleGridIndices.filter(
                    idx => idx !== this.config.activeGridCells[cellIndexToHide].index
                );
                
                return !otherVisible.some(visIdx => this.areAdjacent(pos.index, visIdx));
            });
            
            if (availablePositions.length > 0) {
                // Pick random non-adjacent position
                const newPosition = availablePositions[
                    Math.floor(Math.random() * availablePositions.length)
                ];
                
                // Create new config for this position
                const newCellConfig = {
                    ...newPosition,
                    image: Math.floor(Math.random() * this.config.imagePaths.length)
                };
                
                // Add image to the cell if it doesn't have one
                const cellToShow = this.cells[newPosition.index];
                if (!cellToShow.querySelector('img')) {
                    cellToShow.style.borderRadius = newCellConfig.borderRadius;
                    this.addImagesToCell(cellToShow, newCellConfig);
                }
                
                // Fade out old card
                cellToHide.classList.remove('card-visible');
                cellToHide.classList.add('card-hidden');
                
                // Update config
                this.config.activeGridCells[cellIndexToHide] = newCellConfig;
                
                // Fade in new card after delay
                setTimeout(() => {
                    cellToShow.classList.remove('card-hidden');
                    cellToShow.classList.add('card-visible');
                    
                    // Update visible indexes array
                    currentVisibleIndexes[indexToRemove] = cellIndexToHide;
                }, 400); // Half of fade duration for overlap
            }
        }, this.config.rotationInterval);
        
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

// ===================================
// RESPONSIVE GRID ADJUSTMENT
// ===================================
function updateGridForMobile() {
    if (window.innerWidth <= 768) {
        CONFIG.gridColumns = 3;
        CONFIG.gridRows = 6;
        CONFIG.activeGridCells = [
            { index: 2, borderRadius: '12px', image: 0 },
            { index: 5, borderRadius: '10px', image: 1 },
            { index: 8, borderRadius: '12px', image: 2 },
            { index: 12, borderRadius: '10px', image: 3 },
            { index: 15, borderRadius: '12px', image: 4 }
        ];
    } else {
        CONFIG.gridColumns = 6;
        CONFIG.gridRows = 4;
        CONFIG.activeGridCells = [
            { index: 0, borderRadius: '12px', image: 0 },
            { index: 4, borderRadius: '12px', image: 1 },
            { index: 6, borderRadius: '8.4px', image: 2 },
            { index: 11, borderRadius: '9.282px', image: 3 },
            { index: 12, borderRadius: '9.282px', image: 4 },
            { index: 13, borderRadius: '12px', image: 5 },
            { index: 16, borderRadius: '9.6px', image: 6 },
            { index: 17, borderRadius: '12px', image: 0 },
            { index: 21, borderRadius: '12px', image: 1 }
        ];
    }
}

// Update on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateGridForMobile();
        
        // Reinitialize grid if needed
        if (window.floatingGrid) {
            window.floatingGrid.destroy();
            document.querySelector('.grid-overlay').innerHTML = '';
            window.floatingGrid = new FloatingHeaderGrid(CONFIG);
        }
    }, 250);
});
