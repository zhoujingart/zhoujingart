function renderExhibitionDetailPageExternal(exhibition) {
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
            ${description ? `<div class="exhibition-info-section"><h2>${label('exhibitions.description', '展览介绍')}</h2><p class="exhibition-description">${description}</p></div>` : ''}
            ${exhibition.artworks?.length ? `<div class="exhibition-artworks"><h2>${label('exhibitions.artworks', '参展作品')}</h2><div class="artworks-grid">${exhibition.artworks.map((artwork, index) => `<div class="artwork-card">${artwork.image ? image(artwork, index, 'artwork') : ''}<div class="artwork-header"><h4>${text(artwork, 'title')}</h4></div><div class="artwork-details"><div class="detail-row">${text(artwork, 'medium')}</div><div class="detail-row">${artwork.size}</div><div class="detail-row">${artwork.year}</div></div></div>`).join('')}</div></div>` : ''}
            ${siteImages.length ? `<div class="exhibition-site"><h2>${label('exhibitions.exhibitionSite', '展览现场')}</h2><div class="site-images-grid">${siteImages.map((item) => `<div class="site-image-item">${image(item, exhibition.images.indexOf(item))}<div class="image-caption"><div class="image-title">${text(item, 'title')}</div><div class="image-description">${text(item, 'description')}</div></div></div>`).join('')}</div></div>` : ''}
        `;
        const container = document.getElementById('exhibitionDetailContent');
        container.innerHTML = content;
        bindExhibitionDetailInteractions(container, exhibition, text);
    });
}
