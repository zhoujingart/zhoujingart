(function initializeSiteContent() {
    const artworks = typeof artworksData === 'undefined' ? [] : artworksData;
    const exhibitionsByYear = typeof exhibitionsData === 'undefined' ? {} : exhibitionsData;
    const press = typeof pressData === 'undefined' ? {} : pressData;

    function getExhibitionYears() {
        return Object.keys(exhibitionsByYear).sort((left, right) => Number(right) - Number(left));
    }

    function getExhibitions() {
        return getExhibitionYears().flatMap((year) => exhibitionsByYear[year] || []);
    }

    function findExhibition(id) {
        return getExhibitions().find((exhibition) => exhibition.id === id) || null;
    }

    function getLatestExhibitions(limit = 3) {
        return getExhibitions()
            .slice()
            .sort((left, right) => String(right.date || '').localeCompare(String(left.date || '')))
            .slice(0, limit);
    }

    function getPressItems() {
        const standalone = [
            ...(press.personalInterviews?.items || []),
            ...(press.groupExhibitions?.items || [])
        ];
        const exhibitionPress = getExhibitions().flatMap((exhibition) => (exhibition.press || []).map((item) => ({
            ...item,
            publication: item.publication || item.source
        })));

        return [...standalone, ...exhibitionPress]
            .sort((left, right) => String(right.date || '').localeCompare(String(left.date || '')));
    }

    window.siteContent = Object.freeze({
        artworks,
        exhibitionsByYear,
        press,
        getExhibitionYears,
        getExhibitions,
        findExhibition,
        getLatestExhibitions,
        getPressItems
    });
}());
