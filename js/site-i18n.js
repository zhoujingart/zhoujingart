(function initializeSiteI18n() {
    const supportedLanguages = new Set(['zh', 'en']);

    function getLanguage(fallback = 'en') {
        const managedLanguage = window.languageManager?.currentLang;
        if (supportedLanguages.has(managedLanguage)) return managedLanguage;

        const storedLanguage = window.localStorage?.getItem('language');
        if (supportedLanguages.has(storedLanguage)) return storedLanguage;

        return supportedLanguages.has(fallback) ? fallback : 'en';
    }

    function text(value, language = getLanguage()) {
        if (typeof value === 'string' || typeof value === 'number') return String(value);
        if (!value || typeof value !== 'object') return '';

        return value[language] || value.en || value.zh || '';
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatDate(value, language = getLanguage()) {
        const dateText = text(value, language);
        if (!dateText) return '';

        const formatSingleDate = (part) => {
            const match = part.trim().match(/^(\d{4})\.(\d{2})\.(\d{2})$/);
            if (!match) return part.trim();

            const [, year, month, day] = match;
            const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
            return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
                year: language === 'zh' ? 'numeric' : undefined,
                month: language === 'zh' ? 'numeric' : 'short',
                day: 'numeric',
                timeZone: 'UTC'
            }).format(date);
        };

        const parts = dateText.split('-');
        return parts.length === 2
            ? `${formatSingleDate(parts[0])} – ${formatSingleDate(parts[1])}`
            : formatSingleDate(dateText);
    }

    window.siteI18n = Object.freeze({ getLanguage, text, escapeHtml, formatDate });
}());
