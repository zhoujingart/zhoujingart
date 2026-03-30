document.addEventListener('DOMContentLoaded', () => {
    if (typeof exhibitionsData === 'undefined') {
        console.error('Exhibitions data not loaded');
        return;
    }

    const listContainer = document.querySelector('.exhibitions-list-section .container');
    const previewContainer = document.querySelector('.exhibition-list'); // In index.html

    if (listContainer) {
        renderExhibitionsList(listContainer);
    }

    if (previewContainer) {
        renderExhibitionsPreview(previewContainer);
    }

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
        if (listContainer) renderExhibitionsList(listContainer);
        if (previewContainer) renderExhibitionsPreview(previewContainer);
    });
});

function getLangText(obj) {
    const lang = localStorage.getItem('language') || 'en';
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    // Prefer requested lang, fallback to zh (original data often has zh), then first available
    return obj[lang] || obj['en'] || obj['zh'] || Object.values(obj)[0] || '';
}

function formatDate(dateStr) {
    // Format: "2025.08.23-2025.09.23" -> "Aug 23 - Sep 23"
    if (!dateStr) return '';
    try {
        // Handle "2025.08.23" or "2025.08.23-2025.09.23"
        const parts = dateStr.split('-');
        const start = parts[0].trim();
        const end = parts.length > 1 ? parts[1].trim() : '';

        const formatSingle = (d) => {
            // d is like 2025.08.23
            const [y, m, day] = d.split('.');
            const date = new Date(y, m - 1, day);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };

        if (end) {
            return `${formatSingle(start)} - ${formatSingle(end)}`;
        }
        return formatSingle(start);
    } catch (e) {
        return dateStr;
    }
}

function renderExhibitionsList(container) {
    container.innerHTML = '';
    const years = Object.keys(exhibitionsData).sort((a, b) => b - a);

    years.forEach(year => {
        const yearGroup = document.createElement('div');
        yearGroup.className = 'year-group';

        const yearLabel = document.createElement('h2');
        yearLabel.className = 'year-label';
        yearLabel.textContent = year;
        yearGroup.appendChild(yearLabel);

        const yearExhibitions = document.createElement('div');
        yearExhibitions.className = 'year-exhibitions';

        exhibitionsData[year].forEach(ex => {
            const row = document.createElement('div');
            row.className = 'exhibition-item-row';
            // Link to detail page with ID
            row.onclick = () => window.location.href = `exhibition-detail.html?id=${ex.id}`;

            // Add Image
            const imgDiv = document.createElement('div');
            imgDiv.className = 'ex-list-image';
            if (ex.images && ex.images.length > 0) {
                const img = document.createElement('img');
                let imgSrc = ex.images[0].src;
                if (!imgSrc.startsWith('../')) {
                    imgSrc = '../' + imgSrc;
                }
                img.src = imgSrc;
                img.alt = getLangText(ex.title, 'en');
                imgDiv.appendChild(img);
            }
            row.appendChild(imgDiv);

            const dateCol = document.createElement('div');
            dateCol.className = 'ex-date-col';
            dateCol.textContent = formatDate(ex.date);

            const infoCol = document.createElement('div');
            infoCol.className = 'ex-info-col';

            const title = document.createElement('h3');
            title.className = 'ex-item-title';
            title.textContent = getLangText(ex.title, 'en');

            const venue = document.createElement('p');
            venue.className = 'ex-item-venue';
            // Try to construct a nice location string
            let locationStr = getLangText(ex.organizer, 'en');
            const country = getLangText(ex.country, 'en');
            if (country) {
                // Extract city/country if possible, or just append
                // V1 data: "Westmount, Quebed, Canada"
                const parts = country.split(',');
                const countryName = parts[parts.length - 1].trim();
                locationStr += `, ${countryName}`;
            }
            venue.textContent = locationStr;

            infoCol.appendChild(title);
            infoCol.appendChild(venue);

            const typeCol = document.createElement('div');
            typeCol.className = 'ex-type-col';
            // Infer type from title or description if possible, otherwise generic
            const titleText = getLangText(ex.title, 'en').toLowerCase();
            if (titleText.includes('solo')) {
                typeCol.textContent = 'Solo Exhibition';
            } else if (titleText.includes('group') || titleText.includes('invitational')) {
                typeCol.textContent = 'Exhibition';
            } else {
                typeCol.textContent = 'Exhibition';
            }

            const arrowCol = document.createElement('div');
            arrowCol.className = 'ex-arrow-col';
            arrowCol.innerHTML = '<i class="fas fa-arrow-right"></i>';

            row.appendChild(dateCol);
            row.appendChild(infoCol);
            row.appendChild(typeCol);
            row.appendChild(arrowCol);

            yearExhibitions.appendChild(row);
        });

        yearGroup.appendChild(yearExhibitions);
        container.appendChild(yearGroup);
    });
}

function renderExhibitionsPreview(container) {
    container.innerHTML = '';
    // Get latest 3 exhibitions
    const allExhibitions = [];
    Object.keys(exhibitionsData).sort((a, b) => b - a).forEach(year => {
        exhibitionsData[year].forEach(ex => {
            allExhibitions.push({ ...ex, year });
        });
    });

    const latest = allExhibitions.slice(0, 3);

    latest.forEach(ex => {
        const row = document.createElement('div');
        row.className = 'exhibition-row';
        row.onclick = () => window.location.href = `exhibition-detail.html?id=${ex.id}`;

        // Add Image
        const imgDiv = document.createElement('div');
        imgDiv.className = 'ex-image';
        if (ex.images && ex.images.length > 0) {
            const img = document.createElement('img');
            // Handle relative path if needed, but usually src in data is relative to root
            // Since we are in index.html (root), images/ works.
            // If we are in pages/exhibitions.html, it might need ../
            // But wait, index.html is in v2/index.html? No, workspace info says /Users/michael/Documents/GitHub/zhoujing/index.html
            // But I am editing v2 files.
            // Let's check where index.html is.
            // Workspace info:
            // index.html
            // v2/index.html (implied by context of editing v2 files)

            // If I am editing v2/js/render-exhibitions.js, it is used by v2/index.html.
            // v2/index.html is in v2/. Images are in ../images/ (based on v2/studio.html using ../images/)
            // The data in js/exhibitions.js has "images/exhibitions/..."
            // So for v2/index.html, the path should be "../images/exhibitions/..."

            let imgSrc = ex.images[0].src;
            if (!imgSrc.startsWith('../')) {
                imgSrc = '../' + imgSrc;
            }
            img.src = imgSrc;
            img.alt = getLangText(ex.title, 'en');
            imgDiv.appendChild(img);
        }
        row.appendChild(imgDiv);

        const yearDiv = document.createElement('div');
        yearDiv.className = 'ex-year';
        yearDiv.textContent = ex.year;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'ex-info';

        const title = document.createElement('h3');
        title.textContent = getLangText(ex.title, 'en');

        const loc = document.createElement('p');
        let locationStr = getLangText(ex.organizer, 'en');
        const country = getLangText(ex.country, 'en');
        if (country) {
            const parts = country.split(',');
            const countryName = parts[parts.length - 1].trim();
            locationStr += `, ${countryName}`;
        }
        loc.textContent = locationStr;

        infoDiv.appendChild(title);
        infoDiv.appendChild(loc);

        const linkDiv = document.createElement('div');
        linkDiv.className = 'ex-link';
        linkDiv.innerHTML = '<i class="fas fa-arrow-right"></i>';

        row.appendChild(yearDiv);
        row.appendChild(infoDiv);
        row.appendChild(linkDiv);

        container.appendChild(row);
    });
}
