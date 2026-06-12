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
        setupGalleryControls();
        renderGalleryGrid(galleryGrid);

        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            renderGalleryGrid(galleryGrid);
        });
    }
});

let v2CurrentFilter = 'all';
let v2CurrentSort = 'default';

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

function getArtworkYear(artwork) {
    const year = parseInt(artwork.year, 10);
    return Number.isNaN(year) ? 0 : year;
}

function getArtworkWeight(artwork) {
    return typeof artwork.sortWeight === 'number' ? artwork.sortWeight : 0;
}

function getSortedArtworks() {
    const filteredArtworks = artworksData.filter((artwork) => {
        const mediumEn = artwork.medium.en || artwork.medium;
        const category = getCategoryFromMedium(mediumEn);
        return v2CurrentFilter === 'all' || category === v2CurrentFilter;
    });

    return filteredArtworks.sort((a, b) => {
        if (v2CurrentSort === 'year-desc') {
            return getArtworkYear(b) - getArtworkYear(a) || getArtworkWeight(b) - getArtworkWeight(a);
        }

        if (v2CurrentSort === 'year-asc') {
            return getArtworkYear(a) - getArtworkYear(b) || getArtworkWeight(b) - getArtworkWeight(a);
        }

        return getArtworkWeight(b) - getArtworkWeight(a);
    });
}

/**
 * Render the gallery grid
 * @param {HTMLElement} container - The container element
 */
function renderGalleryGrid(container) {
    container.innerHTML = '';

    const sortedArtworks = getSortedArtworks();

    sortedArtworks.forEach(artwork => {
        const medium = getLangText(artwork.medium);
        // We need English medium for categorization logic
        const mediumEn = artwork.medium.en || artwork.medium;
        const category = getCategoryFromMedium(mediumEn);

        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-category', category);

        const imagePath = window.getV2ImagePath
            ? window.getV2ImagePath(artwork.image, 'card')
            : `../${artwork.image}`;
        const fallbackAttr = window.getV2FallbackAttr ? window.getV2FallbackAttr(artwork.image) : '';

        const viewText = getLangText({ en: 'View', zh: '查看' });
        const soldText = getLangText({ en: 'Sold Out', zh: '已售出' });
        const isSold = artwork.status === 'sold';

        item.innerHTML = `
            <div class="gallery-img-container">
                <img src="${imagePath}" alt="${getLangText(artwork.title)}" loading="lazy" decoding="async"${fallbackAttr}>
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

function setupGalleryControls() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('v2-sort-select');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                v2CurrentFilter = btn.getAttribute('data-filter') || 'all';

                const galleryGrid = document.querySelector('.v2-gallery-grid');
                if (galleryGrid) renderGalleryGrid(galleryGrid);
            });
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            v2CurrentSort = sortSelect.value || 'default';

            const galleryGrid = document.querySelector('.v2-gallery-grid');
            if (galleryGrid) renderGalleryGrid(galleryGrid);
        });
    }
}
