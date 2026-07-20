function renderExhibitionDetailPage(exhibition) {
    requestAnimationFrame(() => {
        const language = window.languageManager?.currentLang || 'zh';
        const text = (item, field) => getDetailLocalizedText(item, field, language);
        const title = text(exhibition, 'title');
        const poster = getDetailPosterImage(exhibition.images, language);
        const siteImages = exhibition.images.filter((image) => image !== poster);
        const label = (key, fallback) => window.getTranslation?.(key) || fallback;
        const image = (item, index, type = 'image') => `<img class="viewer-trigger" role="button" tabindex="0" data-viewer-type="${type}" data-viewer-index="${index}" src="${getDetailImagePath(item.src || item.image, type === 'image' ? 'card' : 'card')}" alt="${text(item, 'title')}" loading="lazy" decoding="async">`;
        const info = (key, value, fallback) => value ? `<div class="info-row"><span class="info-label">${label(key, fallback)}</span><span class="info-value">${value}</span></div>` : '';
        const organizer = text(exhibition, 'organizer');
        const location = text(exhibition, 'location');
        const country = text(exhibition, 'country');
        const description = text(exhibition, 'description');
        const content = `
            <div class="exhibition-header"><h1 class="exhibition-title">${title}</h1><div class="exhibition-info-card">${info('exhibitions.organizer', organizer, '主办方')}${info('exhibitions.period', exhibition.date, '展期')}${info('exhibitions.location', location, '地点')}${info('exhibitions.country', country, '国家')}</div></div>
            <div class="exhibition-poster-section"><div class="poster-container">${image(poster, exhibition.images.indexOf(poster))}<div class="poster-caption">${text(poster, 'title')}</div></div></div>
            ${text(exhibition, 'organizerDescription') || text(exhibition, 'organizerLink') ? `<div class="exhibition-info-section"><h2>${label('exhibitions.aboutOrganizer', '主办方介绍')}</h2><div class="organizer-content"><div class="organizer-name">${organizer}</div>${text(exhibition, 'organizerDescription') ? `<p class="exhibition-aboutOrganizer">${text(exhibition, 'organizerDescription')}</p>` : ''}${text(exhibition, 'organizerLink') ? `<div class="organizer-link"><a href="${text(exhibition, 'organizerLink')}" target="_blank" rel="noopener noreferrer" class="organizer-link-btn">${label('exhibitions.learnMore', '了解更多')}</a></div>` : ''}</div></div>` : ''}
            ${description ? `<div class="exhibition-info-section"><h2>${label('exhibitions.description', '展览介绍')}</h2><p class="exhibition-description">${description}</p></div>` : ''}
            ${exhibition.artworks?.length ? `<div class="exhibition-artworks"><h2>${label('exhibitions.artworks', '参展作品')}</h2><div class="artworks-grid">${exhibition.artworks.map((artwork, index) => `<div class="artwork-card">${artwork.image ? image(artwork, index, 'artwork') : ''}<div class="artwork-header"><h4>${text(artwork, 'title')}</h4></div><div class="artwork-details"><div class="detail-row">${text(artwork, 'medium')}</div><div class="detail-row">${artwork.size}</div><div class="detail-row">${artwork.year}</div></div></div>`).join('')}</div></div>` : ''}
            ${siteImages.length ? `<div class="exhibition-site"><h2>${label('exhibitions.exhibitionSite', '展览现场')}</h2><div class="site-images-grid">${siteImages.map((item) => `<div class="site-image-item">${image(item, exhibition.images.indexOf(item))}<div class="image-caption"><div class="image-title">${text(item, 'title')}</div><div class="image-description">${text(item, 'description')}</div></div></div>`).join('')}</div></div>` : ''}
            ${exhibition.documents?.length ? `<div class="exhibition-certificates"><h2>${label('exhibitions.documents', '展览文档')}</h2><div class="certificates-grid">${exhibition.documents.map((item, index) => `<div class="certificate-item">${image(item, index, 'document')}<div class="certificate-title">${text(item, 'title')}</div></div>`).join('')}</div></div>` : ''}
            ${exhibition.press?.length ? `<div class="exhibition-press"><h2>${label('exhibitions.press', '媒体报道')}</h2><div class="press-grid">${exhibition.press.map((item) => `<div class="press-card"><h4 class="press-title">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${text(item, 'title')}</a>` : text(item, 'title')}</h4><div class="press-meta"><span class="press-source">${text(item, 'source')}</span><span class="press-date">${item.date || ''}</span></div>${text(item, 'description') ? `<p class="press-description">${text(item, 'description')}</p>` : ''}</div>`).join('')}</div></div>` : ''}
        `;
        const container = document.getElementById('exhibitionDetailContent');
        container.innerHTML = content;
        bindExhibitionDetailInteractions(container, exhibition, text);
    });
}
