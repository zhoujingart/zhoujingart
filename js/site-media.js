(function initializeSiteMedia() {
    const profileDirectories = Object.freeze({
        card: 'images/optimized/card/',
        hero: 'images/optimized/card/',
        preview: 'images/optimized/card/',
        pressThumb: 'images/optimized/press-thumb/',
        pressPreview: 'images/optimized/press-preview/'
    });
    const externalUrlPattern = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;

    function normalizeSource(source) {
        if (typeof source !== 'string') return '';
        const trimmed = source.trim();
        if (!trimmed || externalUrlPattern.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
            return '';
        }
        return trimmed.replace(/^(\.\/|\.\.\/)+/, '').replace(/^\/+/, '');
    }

    function withPrefix(path, prefix = '') {
        return path ? `${prefix}${path}` : '';
    }

    function getOriginalPath(source, prefix = '') {
        const normalized = normalizeSource(source);
        return normalized.startsWith('images/') ? withPrefix(normalized, prefix) : source || '';
    }

    function getOptimizedPath(source, profile = 'card', prefix = '') {
        const normalized = normalizeSource(source);
        if (!normalized.startsWith('images/')) return source || '';

        const directory = profileDirectories[profile] || profileDirectories.card;
        return withPrefix(`${directory}${normalized.slice('images/'.length)}`, prefix);
    }

    function setImageSource(image, source, profile = 'card', prefix = '') {
        if (!image) return;

        const optimizedPath = getOptimizedPath(source, profile, prefix);
        const originalPath = getOriginalPath(source, prefix);
        image.src = optimizedPath;
        image.loading = 'lazy';
        image.decoding = 'async';

        if (originalPath && originalPath !== optimizedPath) {
            image.addEventListener('error', () => {
                image.src = originalPath;
            }, { once: true });
        }
    }

    window.siteMedia = Object.freeze({ getOriginalPath, getOptimizedPath, setImageSource });
}());
