function getDetailLocalizedText(item, field, language) {
    if (window.siteI18n) return window.siteI18n.text(item?.[field], language);
    const value = item?.[field];
    if (value && typeof value === 'object') return value[language] || value.zh || '';
    return value || '';
}

function getDetailImagePath(src, profile = 'card') {
    if (window.siteMedia) return window.siteMedia.getOptimizedPath(src, profile);
    return window.getOptimizedImagePath ? window.getOptimizedImagePath(src, profile) : src;
}

function getDetailPosterImage(images, language) {
    return images.find((image) => {
        const title = getDetailLocalizedText(image, 'title', language);
        return title.includes('海报') || /poster/i.test(title);
    }) || images[0];
}
