// ===================================
// CONFIGURATION
// ===================================
const CONFIG = {
    gridColumns: 8,
    gridRows: 6,
    rotationInterval: 3000, // milliseconds between image changes
    fadeDuration: 800, // milliseconds for fade transition
    imagePaths: [
        // Add your image paths here
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
        'https://picsum.photos/400/300?random=3',
        'https://picsum.photos/400/300?random=4',
        'https://picsum.photos/400/300?random=5',
        'https://picsum.photos/400/300?random=6',
        'https://picsum.photos/400/300?random=7',
        'https://picsum.photos/400/300?random=8',
    ],
    // Which grid cells should display rotating images (array of cell indices)
    activeGridCells: [5, 8, 12, 15, 19, 23, 28, 31, 35, 40]
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
        
        this.init();
    }

    init() {
        this.createGrid();
        this.startAnimations();
    }

    createGrid() {
        const totalCells = this.config.gridColumns * this.config.gridRows;
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.index = i;
            
            // Only add images to specific cells
            if (this.config.activeGridCells.includes(i)) {
                this.addImagesToCell(cell, i);
            }
            
            this.gridContainer.appendChild(cell);
            this.cells.push(cell);
        }
    }

    addImagesToCell(cell, cellIndex) {
        // Add multiple images to rotate through
        this.config.imagePaths.forEach((imgPath, index) => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = `Floating image ${index + 1}`;
            img.dataset.imageIndex = index;
            
            // First image is active by default
            if (index === 0) {
                img.classList.add('active');
            }
            
            cell.appendChild(img);
        });
    }

    startAnimations() {
        // Start rotation for each active cell with slight offset
        this.config.activeGridCells.forEach((cellIndex, idx) => {
            const cell = this.cells[cellIndex];
            const images = cell.querySelectorAll('img');
            
            if (images.length === 0) return;
            
            let currentImageIndex = 0;
            
            // Stagger the start of each cell's animation
            const startDelay = idx * 300;
            
            setTimeout(() => {
                const intervalId = setInterval(() => {
                    // Fade out current image
                    images[currentImageIndex].classList.remove('active');
                    
                    // Move to next image
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    
                    // Fade in next image
                    images[currentImageIndex].classList.add('active');
                }, this.config.rotationInterval);
                
                this.animationIntervals.push(intervalId);
            }, startDelay);
        });
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
// INITIALIZE ON LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating grid
    window.floatingGrid = new FloatingHeaderGrid(CONFIG);
    
    // Initialize mobile menu
    window.mobileMenu = new MobileMenu();
    
    console.log('Club Studio Header initialized');
});

// ===================================
// RESPONSIVE GRID ADJUSTMENT
// ===================================
function updateGridForMobile() {
    if (window.innerWidth <= 768) {
        CONFIG.gridColumns = 4;
        CONFIG.gridRows = 8;
    } else {
        CONFIG.gridColumns = 8;
        CONFIG.gridRows = 6;
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
