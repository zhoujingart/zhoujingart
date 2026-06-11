(function () {
    const profileDirs = {
        card: '../images/optimized/card/',
        hero: '../images/optimized/card/',
        preview: '../images/optimized/card/',
        pressThumb: '../images/optimized/press-thumb/',
        pressPreview: '../images/optimized/press-preview/'
    };

    const externalUrlPattern = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;

    function normalizeImageSrc(src) {
        if (!src || typeof src !== 'string') return '';

        const trimmed = src.trim();
        if (
            !trimmed ||
            externalUrlPattern.test(trimmed) ||
            trimmed.startsWith('data:') ||
            trimmed.startsWith('blob:')
        ) {
            return '';
        }

        return trimmed.replace(/^(\.\/|\.\.\/)+/, '').replace(/^\/+/, '');
    }

    function getV2OriginalPath(src) {
        const normalized = normalizeImageSrc(src);
        if (!normalized || !normalized.startsWith('images/')) return src;
        return `../${normalized}`;
    }

    function getV2ImagePath(src, profile) {
        const normalized = normalizeImageSrc(src);
        if (!normalized || !normalized.startsWith('images/')) return src;

        const baseDir = profileDirs[profile] || profileDirs.card;
        return `${baseDir}${normalized.slice('images/'.length)}`;
    }

    function getV2FallbackAttr(src) {
        const fallback = getV2OriginalPath(src);
        if (!fallback || fallback === src) return '';
        return ` onerror="this.onerror=null;this.src='${fallback}'"`;
    }

    function setV2ImageSource(img, src, profile) {
        if (!img) return;

        const optimized = getV2ImagePath(src, profile);
        const fallback = getV2OriginalPath(src);

        img.src = optimized;
        img.loading = 'lazy';
        img.decoding = 'async';

        if (fallback && fallback !== optimized) {
            img.addEventListener('error', function handleImageError() {
                img.src = fallback;
            }, { once: true });
        }
    }

    window.getV2ImagePath = getV2ImagePath;
    window.getV2OriginalPath = getV2OriginalPath;
    window.getV2FallbackAttr = getV2FallbackAttr;
    window.setV2ImageSource = setV2ImageSource;
}());
