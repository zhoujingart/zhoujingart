function showExhibitionDetailError(key, message) {
    document.getElementById('exhibitionDetailContent').innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h2 data-i18n="exhibitions.notFound">展览未找到</h2>
            <p data-i18n="${key}">${message}</p>
            <a href="exhibitions.html" class="btn-primary" data-i18n="exhibitions.backToList">返回展览列表</a>
        </div>`;
    window.languageManager?.applyTranslations();
}

function renderExhibitionDetail(exhibitionId) {
    if (!exhibitionId) {
        showExhibitionDetailError('exhibitions.selectFromList', '请从展览列表中选择一个展览查看详情。');
        return;
    }

    const exhibition = findExhibitionById(exhibitionId);
    if (!exhibition) {
        showExhibitionDetailError('exhibitions.idNotFound', `无法找到ID为 "${exhibitionId}" 的展览。`);
        return;
    }

    const language = window.languageManager?.currentLang || 'zh';
    document.title = `${exhibition.title[language] || exhibition.title.zh} - 周婧`;
    renderExhibitionDetailPage(exhibition);
}
