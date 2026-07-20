document.addEventListener('DOMContentLoaded', () => {
    if (!window.siteContent) {
        console.error('Shared content API not loaded');
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

function getExhibitionText(value) {
    return window.siteI18n?.text(value, window.siteI18n.getLanguage('en')) || '';
}

function formatExhibitionDate(value) {
    return window.siteI18n?.formatDate(value, window.siteI18n.getLanguage('en')) || value || '';
}

function renderExhibitionsList(container) {
    container.innerHTML = '';
    const years = window.siteContent.getExhibitionYears();

    years.forEach(year => {
        const yearGroup = document.createElement('div');
        yearGroup.className = 'year-group';

        const yearLabel = document.createElement('h2');
        yearLabel.className = 'year-label';
        yearLabel.textContent = year;
        yearGroup.appendChild(yearLabel);

        const yearExhibitions = document.createElement('div');
        yearExhibitions.className = 'year-exhibitions';

        window.siteContent.exhibitionsByYear[year].forEach(ex => {
            const row = document.createElement('div');
            row.className = 'exhibition-item-row';
            row.dataset.exhibitionId = ex.id;
            // Link to detail page with ID
            addExhibitionNavigation(row, ex.id);

            // Add Image
            const imgDiv = document.createElement('div');
            imgDiv.className = 'ex-list-image';
            if (ex.images && ex.images.length > 0) {
                const img = document.createElement('img');
                if (window.setV2ImageSource) {
                    window.setV2ImageSource(img, ex.images[0].src, 'card');
                } else {
                    img.src = '../' + ex.images[0].src;
                }
                img.alt = getExhibitionText(ex.title);
                imgDiv.appendChild(img);
            }
            row.appendChild(imgDiv);

            const dateCol = document.createElement('div');
            dateCol.className = 'ex-date-col';
            dateCol.textContent = formatExhibitionDate(ex.date);

            const infoCol = document.createElement('div');
            infoCol.className = 'ex-info-col';

            const title = document.createElement('h3');
            title.className = 'ex-item-title';
            title.textContent = getExhibitionText(ex.title);

            const venue = document.createElement('p');
            venue.className = 'ex-item-venue';
            // Try to construct a nice location string
            let locationStr = getExhibitionText(ex.organizer);
            const country = getExhibitionText(ex.country);
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
            const titleText = getExhibitionText(ex.title).toLowerCase();
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
    const latest = window.siteContent.getLatestExhibitions(3);

    latest.forEach(ex => {
        const row = document.createElement('div');
        row.className = 'exhibition-row';
        row.dataset.exhibitionId = ex.id;
        addExhibitionNavigation(row, ex.id);

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

            if (window.setV2ImageSource) {
                window.setV2ImageSource(img, ex.images[0].src, 'card');
            } else {
                img.src = '../' + ex.images[0].src;
            }
            img.alt = getExhibitionText(ex.title);
            imgDiv.appendChild(img);
        }
        row.appendChild(imgDiv);

        const yearDiv = document.createElement('div');
        yearDiv.className = 'ex-year';
        yearDiv.textContent = ex.year;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'ex-info';

        const title = document.createElement('h3');
        title.textContent = getExhibitionText(ex.title);

        const loc = document.createElement('p');
        let locationStr = getExhibitionText(ex.organizer);
        const country = getExhibitionText(ex.country);
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

function addExhibitionNavigation(element, exhibitionId) {
    element.tabIndex = 0;
    element.setAttribute('role', 'link');
    const navigate = () => {
        window.location.href = `exhibition-detail.html?id=${exhibitionId}`;
    };
    element.addEventListener('click', navigate);
    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate();
        }
    });
}
