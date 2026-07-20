/**
 * Render Exhibition Detail Logic
 * Handles dynamic rendering of the exhibition detail page based on URL parameter
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!window.siteContent || !window.siteI18n) {
        console.error('Shared content API not loaded');
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const exhibitionId = urlParams.get('id');

    if (exhibitionId) {
        renderExhibitionDetail(exhibitionId);

        // Listen for language changes
        document.addEventListener('languageChanged', () => {
            renderExhibitionDetail(exhibitionId);
        });
    } else {
        // If no ID provided, redirect to list or show error
        console.error('No exhibition ID provided');
        // Optional: window.location.href = 'exhibitions.html';
    }
});

/**
 * Find exhibition data by ID
 * @param {string} id - The exhibition ID
 * @returns {Object|null} - The exhibition object or null if not found
 */
function getDetailText(value) {
    return window.siteI18n.text(value, window.siteI18n.getLanguage('en'));
}

function escapeAttr(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Render the exhibition detail page
 * @param {string} id - The exhibition ID
 */
function renderExhibitionDetail(id) {
    const exhibition = window.siteContent.findExhibition(id);

    if (!exhibition) {
        console.error('Exhibition not found:', id);
        document.querySelector('main').innerHTML = `
            <div class="container" style="padding: 100px 0; text-align: center;">
                <h2>Exhibition not found</h2>
                <a href="exhibitions.html" class="btn-link">Back to Exhibitions</a>
            </div>
        `;
        return;
    }

    // Update Page Title
    document.title = `${getDetailText(exhibition.title)} | Zhou Jing`;

    // 1. Render Hero Section
    renderHero(exhibition);

    // 2. Render Details Section (Sidebar & Content)
    renderDetails(exhibition);

    // 3. Render Artworks Section (if artworks exist)
    if (exhibition.artworks && exhibition.artworks.length > 0) {
        renderArtworks(exhibition);
    }

    // 4. Render Gallery Section (if images exist)
    if (exhibition.images && exhibition.images.length > 0) {
        renderGallery(exhibition);
    }

    // 5. Render Press Section (if press exists)
    if (exhibition.press && exhibition.press.length > 0) {
        renderPress(exhibition);
    }

    // Apply translations to newly rendered content
    if (window.languageManager) {
        window.languageManager.applyTranslations();
    }
}

/**
 * Render Hero Section
 */
function renderHero(exhibition) {
    const heroSection = document.querySelector('.ex-hero');
    if (!heroSection) return;

    // Use the first image as the hero/poster if available
    const posterSource = exhibition.images && exhibition.images.length > 0
        ? exhibition.images[0].src
        : 'images/Jing-Zhou-portrait.jpg';
    const posterImage = window.getV2ImagePath
        ? window.getV2ImagePath(posterSource, 'card')
        : `../${posterSource}`;
    const posterFallback = window.getV2FallbackAttr ? window.getV2FallbackAttr(posterSource) : '';

    const title = getDetailText(exhibition.title);
    const location = getDetailText(exhibition.country);
    const venue = getDetailText(exhibition.organizer); // Using organizer as venue name for now

    heroSection.innerHTML = `
        <div class="ex-hero-img">
            <img src="${posterImage}" alt="${title}" loading="eager" decoding="async"${posterFallback}>
        </div>
        <div class="ex-hero-content">
            <div class="ex-meta">
                <span class="ex-date">${exhibition.date}</span>
                <span class="ex-location">${location}</span>
            </div>
            <h1 class="ex-title">${title}</h1>
            <p class="ex-subtitle">${venue}</p>
        </div>
    `;
}

/**
 * Render Details Section
 */
function renderDetails(exhibition) {
    const detailsSection = document.querySelector('.ex-details');
    if (!detailsSection) return;

    const locationFull = getDetailText(exhibition.location);
    const organizerName = getDetailText(exhibition.organizer);
    const description = getDetailText(exhibition.description);

    // Format description paragraphs
    const descriptionHtml = description.split('\n').map(p => `<p>${p}</p>`).join('');

    detailsSection.innerHTML = `
        <div class="container">
            <div class="ex-grid">
                <div class="ex-sidebar">
                    <div class="info-block">
                        <h3>Location</h3>
                        <p>${locationFull}</p>
                    </div>
                    <div class="info-block">
                        <h3>Organizer</h3>
                        <p>${organizerName}</p>
                    </div>
                    <div class="info-block">
                        <h3>Share</h3>
                        <div class="share-links">
                            <a href="#"><i class="fab fa-weixin"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="ex-content">
                    ${descriptionHtml}
                </div>
            </div>
        </div>
    `;
}

/**
 * Render Gallery Section
 */
function renderGallery(exhibition) {
    // Check if gallery section exists, if not create it
    let gallerySection = document.querySelector('.ex-gallery');
    if (!gallerySection) {
        gallerySection = document.createElement('section');
        gallerySection.className = 'ex-gallery';
        document.querySelector('main').appendChild(gallerySection);
    }

    // Filter out the first image if it was used as poster (optional, depending on design)
    // For now, we'll include all images but maybe skip the very first one if it's strictly a poster
    const images = exhibition.images;

    const imagesHtml = images.map(img => {
        const imagePath = window.getV2ImagePath ? window.getV2ImagePath(img.src, 'card') : `../${img.src}`;
        const fallbackAttr = window.getV2FallbackAttr ? window.getV2FallbackAttr(img.src) : '';

        return `
        <div class="gallery-item">
            <div class="gallery-img-container" style="aspect-ratio: 4/3;">
                <img src="${imagePath}" alt="${getDetailText(img.title)}" loading="lazy" decoding="async"${fallbackAttr}>
                <div class="gallery-overlay">
                    <div class="view-btn">View</div>
                </div>
            </div>
            <div class="gallery-info">
                <p>${getDetailText(img.description)}</p>
            </div>
        </div>
    `;
    }).join('');

    gallerySection.innerHTML = `
        <div class="container">
            <h2 class="gallery-title" data-i18n="exhibition.view">Exhibition View</h2>
            <div class="gallery-grid">
                ${imagesHtml}
            </div>
        </div>
    `;
}

/**
 * Render Artworks Section
 */
function renderArtworks(exhibition) {
    let artworksSection = document.querySelector('.ex-artworks');
    if (!artworksSection) {
        artworksSection = document.createElement('section');
        artworksSection.className = 'ex-artworks';
        document.querySelector('main').appendChild(artworksSection);
    }

    const artworksHtml = exhibition.artworks.map(artwork => {
        const imagePath = window.getV2ImagePath ? window.getV2ImagePath(artwork.image, 'card') : `../${artwork.image}`;
        const fallbackAttr = window.getV2FallbackAttr ? window.getV2FallbackAttr(artwork.image) : '';

        return `
        <div class="gallery-item">
            <div class="gallery-img-container" style="aspect-ratio: 1/1;">
                <img src="${imagePath}" alt="${getDetailText(artwork.title)}" loading="lazy" decoding="async" style="object-fit: contain;"${fallbackAttr}>
                <div class="gallery-overlay">
                    <div class="view-btn">View</div>
                </div>
            </div>
            <div class="gallery-info">
                <h3>${getDetailText(artwork.title)}</h3>
                <p>${getDetailText(artwork.medium)}, ${artwork.year}</p>
                <p>${artwork.size}</p>
            </div>
        </div>
    `;
    }).join('');

    artworksSection.innerHTML = `
        <div class="container">
            <h2 class="gallery-title" data-i18n="exhibition.artworks">Exhibited Works</h2>
            <div class="gallery-grid">
                ${artworksHtml}
            </div>
        </div>
    `;
}

/**
 * Render Press Section
 */
function renderPress(exhibition) {
    let pressSection = document.querySelector('.ex-press');
    if (!pressSection) {
        pressSection = document.createElement('section');
        pressSection.className = 'ex-press';
        document.querySelector('main').appendChild(pressSection);
    }

    const pressHtml = exhibition.press.map(item => {
        const thumbnail = item.thumbnail || '';
        const imagePath = window.getV2ImagePath ? window.getV2ImagePath(thumbnail, 'pressThumb') : `../${thumbnail}`;
        const previewPath = window.getV2ImagePath ? window.getV2ImagePath(thumbnail, 'pressPreview') : `../${thumbnail}`;
        const originalPath = window.getV2OriginalPath ? window.getV2OriginalPath(thumbnail) : `../${thumbnail}`;
        const fallbackAttr = window.getV2FallbackAttr ? window.getV2FallbackAttr(thumbnail) : '';
        const title = getDetailText(item.title);

        return `
        <div class="press-item" style="border-top: 1px solid var(--border-color);">
            <div class="press-date">${item.date}</div>
            <div class="press-content">
                <h2 class="press-title" style="font-size: 1.5rem;">${title}</h2>
                <div class="press-publication">${getDetailText(item.source)}</div>
                <p class="press-excerpt">${getDetailText(item.description)}</p>
                <a href="${item.url}" target="_blank" rel="noopener" class="press-link">Read Article <i class="fas fa-external-link-alt"></i></a>
            </div>
            <button type="button" class="press-image press-preview-trigger" data-preview-src="${escapeAttr(previewPath)}" data-fallback-src="${escapeAttr(originalPath)}" data-title="${escapeAttr(title)}" data-url="${escapeAttr(item.url)}">
                <img src="${imagePath}" alt="${escapeAttr(title)}" loading="lazy" decoding="async"${fallbackAttr}>
            </button>
        </div>
    `}).join('');

    pressSection.innerHTML = `
        <div class="container">
            <h2 class="gallery-title" data-i18n="exhibition.press">Press & Media</h2>
            <div class="press-list">
                ${pressHtml}
            </div>
        </div>
    `;
}
