/**
 * Render Gallery Logic
 * Handles dynamic rendering of the gallery grid and filtering
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof artworksData === 'undefined') {
        console.error('Artworks data not loaded');
        return;
    }

    const galleryGrid = document.querySelector('.v2-gallery-grid');
    if (galleryGrid) {
        renderGalleryGrid(galleryGrid);
        setupFiltering();

        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            renderGalleryGrid(galleryGrid);
            // Re-apply current filter if needed, but for now just re-rendering is fine.
            // If we want to keep the filter state, we might need to read the active button.
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) {
                const filterValue = activeBtn.getAttribute('data-filter');
                // Trigger click to re-filter
                // Or manually filter:
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }
});

/**
 * Get text based on current language
 * @param {Object|string} textObj - The text object with en/zh keys or a string
 * @returns {string} - The localized text
 */
function getLangText(textObj) {
    // Get current language from localStorage or default to 'en'
    const lang = localStorage.getItem('language') || 'en';

    if (typeof textObj === 'string') return textObj;
    if (!textObj) return '';

    return textObj[lang] || textObj['en'] || '';
}

/**
 * Determine category from medium string
 * @param {string} medium - The medium string
 * @returns {string} - The category key (oil, acrylic, mixed)
 */
function getCategoryFromMedium(medium) {
    const m = medium.toLowerCase();
    if (m.includes('oil') || m.includes('油画')) return 'oil';
    if (m.includes('acrylic') || m.includes('丙烯')) return 'acrylic';
    if (m.includes('mixed') || m.includes('综合')) return 'mixed';
    return 'mixed'; // Default
}

/**
 * Render the gallery grid
 * @param {HTMLElement} container - The container element
 */
function renderGalleryGrid(container) {
    container.innerHTML = '';

    // Sort by sortWeight descending (higher weight first)
    const sortedArtworks = [...artworksData].sort((a, b) => {
        const weightA = typeof a.sortWeight === 'number' ? a.sortWeight : 0;
        const weightB = typeof b.sortWeight === 'number' ? b.sortWeight : 0;
        return weightB - weightA;
    });

    sortedArtworks.forEach(artwork => {
        const medium = getLangText(artwork.medium);
        // We need English medium for categorization logic
        const mediumEn = artwork.medium.en || artwork.medium;
        const category = getCategoryFromMedium(mediumEn);

        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', category);

        // Image path adjustment (assuming data has relative paths like "images/...")
        // V2 is in a subdirectory, so we might need "../"
        let imagePath = artwork.image;
        if (!imagePath.startsWith('http') && !imagePath.startsWith('../')) {
            imagePath = `../${imagePath}`;
        }

        const viewText = getLangText({ en: 'View', zh: '查看' });
        const soldText = getLangText({ en: 'Sold Out', zh: '已售出' });
        const isSold = artwork.status === 'sold';

        item.innerHTML = `
            <div class="gallery-img-container">
                <img src="${imagePath}" alt="${getLangText(artwork.title)}">
                <div class="gallery-overlay">
                    <div class="view-btn">${viewText}</div>
                </div>
                ${isSold ? `<div class="sold-badge">${soldText}</div>` : ''}
            </div>
            <div class="gallery-info">
                <h3>${getLangText(artwork.title)}</h3>
                <p>${medium}, ${artwork.year}</p>
                <p class="gallery-size">${artwork.size}</p>
            </div>
        `;

        // Add click event for lightbox or detail view
        // For now, we'll just use the lightbox logic if it exists in main.js, 
        // or we can implement a simple redirect if that's the intended behavior.
        // The V2 gallery.html didn't seem to have links, just "View" buttons.
        // Let's assume we want to open a lightbox. 
        // Note: main.js might need to re-bind lightbox events if they are attached on load.
        // Let's check main.js for lightbox logic later. 
        // For now, we just render.

        container.appendChild(item);
    });
}

/**
 * Setup filtering logic
 */
function setupFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            // Remove existing listeners (cloning replaces the element)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                newBtn.classList.add('active');

                const filterValue = newBtn.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add animation class if needed
                        item.classList.remove('hidden');
                    } else {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
}
