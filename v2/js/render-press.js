/**
 * Render Press Logic
 * Handles dynamic rendering of the press list
 */

document.addEventListener('DOMContentLoaded', () => {
    if (!window.siteContent || !window.siteI18n) {
        console.error('Shared content API not loaded');
        return;
    }

    // Render full list on Press page
    const pressContainer = document.querySelector('.press-section .container');
    if (pressContainer) {
        renderPressList(pressContainer);
    }

    // Render recent press on Home page
    const recentPressContainer = document.querySelector('.recent-press-list');
    if (recentPressContainer) {
        renderPressList(recentPressContainer, 3);
    }

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
        if (pressContainer) renderPressList(pressContainer);
        if (recentPressContainer) renderPressList(recentPressContainer, 3);
    });
});

/**
 * Get text based on current language
 * @param {Object|string} textObj - The text object with en/zh keys or a string
 * @returns {string} - The localized text
 */
function getPressText(value) {
    return window.siteI18n.text(value, window.siteI18n.getLanguage('en'));
}

/**
 * Format date string
 * @param {string} dateStr - Date string (e.g. "2025.02.18")
 * @returns {string} - Formatted date (e.g. "Feb 18, 2025")
 */
function formatPressDate(value) {
    return window.siteI18n.formatDate(value, window.siteI18n.getLanguage('en'));
}

function escapeAttr(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Render the press list
 * @param {HTMLElement} container - The container element
 * @param {number} [limit] - Optional limit of items to render
 */
function renderPressList(container, limit) {
    container.innerHTML = '';

    let allItems = window.siteContent.getPressItems();

    // Apply limit if provided
    if (limit && limit > 0) {
        allItems = allItems.slice(0, limit);
    }

    allItems.forEach(item => {
        const pressItem = document.createElement('div');
        pressItem.className = 'press-item';

        const thumbnail = item.thumbnail || '';
        const imagePath = window.getV2ImagePath
            ? window.getV2ImagePath(thumbnail, 'pressThumb')
            : `../${thumbnail}`;
        const previewPath = window.getV2ImagePath
            ? window.getV2ImagePath(thumbnail, 'pressPreview')
            : `../${thumbnail}`;
        const originalPath = window.getV2OriginalPath
            ? window.getV2OriginalPath(thumbnail)
            : `../${thumbnail}`;
        const fallbackAttr = window.getV2FallbackAttr ? window.getV2FallbackAttr(thumbnail) : '';

        // Handle date which might be an object or string
        const dateStr = getPressText(item.date);
        const title = getPressText(item.title);

        pressItem.innerHTML = `
            <div class="press-date">${formatPressDate(dateStr)}</div>
            <div class="press-content">
                <h2 class="press-title">${title}</h2>
                <div class="press-publication">${getPressText(item.publication)}</div>
                <p class="press-excerpt">${getPressText(item.description)}</p>
                <a href="${item.url}" target="_blank" rel="noopener" class="press-link">Read Article <i class="fas fa-external-link-alt"></i></a>
            </div>
            <button type="button" class="press-image press-preview-trigger" data-preview-src="${escapeAttr(previewPath)}" data-fallback-src="${escapeAttr(originalPath)}" data-title="${escapeAttr(title)}" data-url="${escapeAttr(item.url)}">
                <img src="${imagePath}" alt="${escapeAttr(title)}" loading="lazy" decoding="async"${fallbackAttr}>
            </button>
        `;

        container.appendChild(pressItem);
    });
}
