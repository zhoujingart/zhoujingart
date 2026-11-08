// Lightweight image path helpers. Original files remain as fallbacks.
(function () {
    const PROFILE_DIRS = {
        card: 'images/optimized/card/',
        hero: 'images/optimized/card/',
        preview: 'images/optimized/card/',
        pressThumb: 'images/optimized/press-thumb/',
        pressPreview: 'images/optimized/press-preview/'
    };

    function getOptimizedImagePath(src, profile = 'card') {
        if (window.siteMedia) return window.siteMedia.getOptimizedPath(src, profile);
        if (!src || typeof src !== 'string' || !src.startsWith('images/')) {
            return src;
        }

        const base = PROFILE_DIRS[profile] || PROFILE_DIRS.card;
        return `${base}${src.slice('images/'.length)}`;
    }

    window.getOptimizedImagePath = getOptimizedImagePath;
})();
