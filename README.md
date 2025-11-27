# Club Studio Animated Header

An animated header component featuring a floating image grid system with smooth rotation effects. Designed for seamless WordPress integration.

## Features

- ✨ Invisible grid system with rotating images
- 🎨 Smooth fade transitions between images
- 📱 Fully responsive (desktop & mobile)
- 🎯 Performance optimized with visibility detection
- 🔧 Easy to customize and configure
- 🚀 WordPress-ready injection code

## Project Structure

```
club-studio-header/
├── index.html          # Main HTML structure
├── styles.css          # All styles including grid and header
├── script.js           # Animation logic and interactions
└── README.md          # This file
```

## Local Testing

Simply open `index.html` in your browser to see the header in action with demo images.

## Configuration

Edit the `CONFIG` object in `script.js` to customize:

```javascript
const CONFIG = {
    gridColumns: 8,              // Number of grid columns (8 on desktop)
    gridRows: 6,                 // Number of grid rows (6 on desktop)
    rotationInterval: 3000,      // Time between image changes (ms)
    fadeDuration: 800,           // Fade transition duration (ms)
    imagePaths: [...],           // Array of image URLs
    activeGridCells: [...]       // Which grid cells show images
};
```

### Adding Your Images

Replace the placeholder image URLs in `CONFIG.imagePaths` with your actual image paths:

```javascript
imagePaths: [
    '/wp-content/uploads/header-img-1.jpg',
    '/wp-content/uploads/header-img-2.jpg',
    '/wp-content/uploads/header-img-3.jpg',
    // Add more images...
],
```

### Customizing Active Grid Cells

The `activeGridCells` array determines which cells in the grid display rotating images. Cell indices start at 0 (top-left) and go left-to-right, top-to-bottom:

```
Grid example (8x6 = 48 cells):
[0,  1,  2,  3,  4,  5,  6,  7 ]
[8,  9,  10, 11, 12, 13, 14, 15]
[16, 17, 18, 19, 20, 21, 22, 23]
...
```

## WordPress Integration

### Method 1: Theme Template Files (Recommended)

1. **Upload files to your theme:**
   - Copy `styles.css` content to your theme's CSS file or create `header-animation.css`
   - Copy `script.js` to your theme directory as `header-animation.js`

2. **Enqueue in `functions.php`:**

```php
function club_studio_header_scripts() {
    wp_enqueue_style(
        'club-studio-header', 
        get_template_directory_uri() . '/header-animation.css',
        array(),
        '1.0.0'
    );
    
    wp_enqueue_script(
        'club-studio-header', 
        get_template_directory_uri() . '/header-animation.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'club_studio_header_scripts');
```

3. **Add HTML to `header.php`:**

Replace or modify your existing header in `header.php`:

```php
<!-- Animated Background Grid -->
<div class="floating-bg-container">
    <div class="grid-overlay">
        <!-- Grid populated by JavaScript -->
    </div>
</div>

<!-- Main Header -->
<header class="site-header">
    <div class="header-container">
        <div class="header-logo">
            <a href="<?php echo esc_url(home_url('/')); ?>">
                <span class="logo-text">CLUB STUDIO</span>
            </a>
        </div>
        
        <nav class="header-nav">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class' => 'nav-menu',
                'container' => false,
            ));
            ?>
        </nav>
        
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
```

### Method 2: Custom HTML Widget/Block

1. **Install a Custom HTML plugin** (if needed) or use the built-in HTML block

2. **Add CSS via Customizer:**
   - Go to Appearance → Customize → Additional CSS
   - Paste the contents of `styles.css`

3. **Add JavaScript:**
   - Use a plugin like "Insert Headers and Footers"
   - Or add to your theme's `footer.php` before `</body>`:

```html
<script>
// Paste the contents of script.js here
</script>
```

4. **Add HTML structure** to your header area using a Custom HTML block

### Method 3: Child Theme (Safest)

If using a third-party theme, create a child theme to avoid losing changes on updates:

1. Create a child theme directory: `/wp-content/themes/your-theme-child/`
2. Add `style.css` and `functions.php`
3. Follow Method 1 using child theme paths

## Customization Guide

### Changing Colors

In `styles.css`, modify:

```css
.site-header {
    background: rgba(255, 255, 255, 0.95); /* Header background */
}

.header-logo a {
    color: #000; /* Logo color */
}

.nav-item a {
    color: #000; /* Navigation link color */
}
```

### Adjusting Grid Size

Desktop grid is 8x6 by default. To change:

```css
.grid-overlay {
    grid-template-columns: repeat(8, 1fr); /* 8 columns */
    grid-template-rows: repeat(6, 1fr);    /* 6 rows */
}
```

Mobile is automatically 4x8 (defined in JavaScript).

### Animation Timing

Adjust in `script.js`:

```javascript
rotationInterval: 3000,  // Increase for slower rotation
fadeDuration: 800,       // Increase for slower fades
```

### Header Height

Adjust padding in `styles.css`:

```css
.header-container {
    padding: 20px 40px; /* Vertical | Horizontal */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Images are lazy-loaded and only animated when the page is visible
- Animations pause when user switches tabs (saves CPU/battery)
- Optimized for 60fps smooth animations
- Responsive grid adjusts on mobile devices

## Troubleshooting

**Images not showing:**
- Check image paths in `CONFIG.imagePaths`
- Ensure images are uploaded to WordPress media library
- Verify file permissions

**Animation not working:**
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded after the DOM
- Verify grid cells are being created

**Header conflicts with theme:**
- Adjust z-index in `.site-header` (currently 1000)
- Check for CSS conflicts with theme styles
- Consider using more specific selectors

**Mobile menu not working:**
- Ensure the mobile menu toggle button is present
- Check that JavaScript is not being blocked
- Verify no JavaScript conflicts with other plugins

## Future Enhancements

- [ ] Add parallax scrolling effect
- [ ] Implement random grid cell selection
- [ ] Add transition effects (zoom, slide, etc.)
- [ ] Create WordPress plugin version
- [ ] Add admin panel for easy configuration

## License

MIT License - feel free to use and modify for your projects.

## Support

For issues or questions, please open an issue in the repository.
