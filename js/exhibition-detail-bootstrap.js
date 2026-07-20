// 展览详情页启动逻辑：页面结构与 URL/语言状态分离，渲染器由页面注册。
function getExhibitionIdFromUrl() {
    return new URLSearchParams(window.location.search).get('id');
}

function initializeExhibitionDetail(render) {
    const renderCurrentExhibition = () => render(getExhibitionIdFromUrl());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderCurrentExhibition, { once: true });
    } else {
        renderCurrentExhibition();
    }
    document.addEventListener('languageChanged', renderCurrentExhibition);
}
