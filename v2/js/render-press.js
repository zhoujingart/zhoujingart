/**
 * Render Press Logic
 * Handles dynamic rendering of the press list
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof pressData === 'undefined') {
        console.error('Press data not loaded');
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
function getLangText(textObj) {
    // Get current language from localStorage or default to 'en'
    const lang = localStorage.getItem('language') || 'en';

    if (typeof textObj === 'string') return textObj;
    if (!textObj) return '';

    return textObj[lang] || textObj['en'] || '';
}

/**
 * Format date string
 * @param {string} dateStr - Date string (e.g. "2025.02.18")
 * @returns {string} - Formatted date (e.g. "Feb 18, 2025")
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        // Handle "2025.02.18"
        const parts = dateStr.split('.');
        if (parts.length < 3) return dateStr;

        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

/**
 * Render the press list
 * @param {HTMLElement} container - The container element
 * @param {number} [limit] - Optional limit of items to render
 */
function renderPressList(container, limit) {
    container.innerHTML = '';

    // Combine all press items
    let allItems = [];
    if (pressData.personalInterviews && pressData.personalInterviews.items) {
        allItems = allItems.concat(pressData.personalInterviews.items);
    }
    if (pressData.groupExhibitions && pressData.groupExhibitions.items) {
        allItems = allItems.concat(pressData.groupExhibitions.items);
    }

    // Extract press items from exhibitionsData
    if (typeof exhibitionsData !== 'undefined') {
        Object.keys(exhibitionsData).forEach(year => {
            const exhibitions = exhibitionsData[year];
            if (Array.isArray(exhibitions)) {
                exhibitions.forEach(ex => {
                    if (ex.press && Array.isArray(ex.press)) {
                        ex.press.forEach(p => {
                            allItems.push({
                                title: p.title,
                                description: p.description,
                                publication: p.source, // Map source to publication
                                url: p.url,
                                date: p.date,
                                thumbnail: p.thumbnail
                            });
                        });
                    }
                });
            }
        });
    }

    // Sort by date descending
    allItems.sort((a, b) => {
        const dateA = getLangText(a.date).split('.').join('-');
        const dateB = getLangText(b.date).split('.').join('-');
        return new Date(dateB) - new Date(dateA);
    });

    // Apply limit if provided
    if (limit && limit > 0) {
        allItems = allItems.slice(0, limit);
    }

    allItems.forEach(item => {
        const pressItem = document.createElement('div');
        pressItem.className = 'press-item';

        // Image path adjustment
        const thumbnail = item.thumbnail || '';
        const imagePath = thumbnail.startsWith('http') ? thumbnail : `../${thumbnail}`;

        // Handle date which might be an object or string
        const dateStr = getLangText(item.date);

        pressItem.innerHTML = `
            <div class="press-date">${formatDate(dateStr)}</div>
            <div class="press-content">
                <h2 class="press-title">${getLangText(item.title)}</h2>
                <div class="press-publication">${getLangText(item.publication)}</div>
                <p class="press-excerpt">${getLangText(item.description)}</p>
                <a href="${item.url}" target="_blank" rel="noopener" class="press-link">Read Article <i class="fas fa-external-link-alt"></i></a>
            </div>
            <div class="press-image">
                <img src="${imagePath}" alt="${getLangText(item.title)}">
            </div>
        `;

        container.appendChild(pressItem);
    });
}
