// Theme renderer. Canonical records live in content/exhibitions.js.
if (!window.siteContent) throw new Error('Shared content API must load before js/exhibitions.js');
const exhibitionsData = window.siteContent.exhibitionsByYear;

// 获取翻译文本的辅助函数
function getTranslation(key) {
    if (window.languageManager) {
        return window.languageManager.getTranslation(key);
    }
    // 如果语言管理器不可用，返回默认翻译
    const defaultTranslations = {
        zh: {
            "exhibitions.viewDetail": "查看详情",
            "exhibitions.backToList": "返回展览列表",
            "exhibitions.timeline": "展览时间线",
            "exhibitions.artworks": "参展作品",
            "exhibitions.documents": "展览文档",
            "exhibitions.press": "媒体报道",
            "exhibitions.period": "展期",
            "exhibitions.location": "地点",
            "exhibitions.country": "国家",
            "exhibitions.description": "简介",
            "exhibitions.medium": "媒材",
            "exhibitions.size": "尺寸",
            "exhibitions.year": "年份",
            "exhibitions.exhibitionSite": "展览现场",
            "exhibitions.organizer": "主办方",
            "exhibitions.aboutOrganizer": "主办方介绍"
        },
        en: {
            "exhibitions.viewDetail": "View Details",
            "exhibitions.backToList": "Back to Exhibition List",
            "exhibitions.timeline": "Exhibition Timeline",
            "exhibitions.artworks": "Artworks",
            "exhibitions.documents": "Exhibition Documents",
            "exhibitions.press": "Press Coverage",
            "exhibitions.period": "Period",
            "exhibitions.location": "Location",
            "exhibitions.country": "Country",
            "exhibitions.description": "Description",
            "exhibitions.medium": "Medium",
            "exhibitions.size": "Size",
            "exhibitions.year": "Year",
            "exhibitions.exhibitionSite": "Exhibition Site",
            "exhibitions.organizer": "Organizer",
            "exhibitions.aboutOrganizer": "About Organizer"
        }
    };

    const lang = currentLang || 'zh';
    return defaultTranslations[lang][key] || key;
}

// 获取作品字段的多语言文本
function getArtworkText(artwork, field) {
    if (window.siteI18n) return window.siteI18n.text(artwork?.[field], currentLang);
    if (typeof artwork[field] === 'object' && artwork[field] !== null) {
        return artwork[field][currentLang] || artwork[field].zh || artwork[field];
    }
    return artwork[field] || '';
}

// 获取图片字段的多语言文本
function getImageText(img, field) {
    if (window.siteI18n) return window.siteI18n.text(img?.[field], currentLang);
    if (typeof img[field] === 'object' && img[field] !== null) {
        return img[field][currentLang] || img[field].zh || img[field];
    }
    return img[field] || '';
}

function getOptimizedExhibitionImage(src, profile = 'card') {
    return window.getOptimizedImagePath ? window.getOptimizedImagePath(src, profile) : src;
}

// 获取媒体报道字段的多语言文本
function getPressText(press, field) {
    if (window.siteI18n) return window.siteI18n.text(press?.[field], currentLang);
    if (typeof press[field] === 'object' && press[field] !== null) {
        return press[field][currentLang] || press[field].zh || press[field];
    }
    return press[field] || '';
}

// 当前语言
let currentLang = 'zh';

// 初始化展览页面
document.addEventListener('DOMContentLoaded', function () {
    // 初始化当前语言
    if (window.languageManager) {
        currentLang = window.languageManager.currentLang;
    }

    // 监听语言切换
    document.addEventListener('languageChanged', function (e) {
        currentLang = e.detail.language;
        // 重新渲染展览列表
        renderExhibitions();
    });

    // 使用事件委托处理展览项点击
    const timeline = document.querySelector('.exhibitions-timeline');
    if (timeline) {
        timeline.addEventListener('click', function (e) {
            const exhibitionItem = e.target.closest('.exhibition-item');
            if (exhibitionItem) {
                // 如果点击的是查看详情按钮，不处理（让链接自己跳转）
                if (e.target.closest('.view-detail-btn')) {
                    return;
                }

                // 获取展览ID并跳转
                const exhibitionId = exhibitionItem.getAttribute('data-exhibition-id');
                if (exhibitionId) {
                    e.preventDefault();
                    window.location.href = `exhibition-detail.html?id=${exhibitionId}`;
                }
            }
        });
    }

    // 初始渲染
    renderExhibitions();
});

// 渲染展览时间线
function renderExhibitions() {
    const container = document.querySelector('.exhibitions-timeline');
    if (!container) return;

    // 清空容器
    container.innerHTML = '';

    // 按年份倒序排列
    const years = window.siteContent?.getExhibitionYears()
        || Object.keys(exhibitionsData).sort((a, b) => b - a);

    // 分批渲染配置
    const BATCH_SIZE = 2; // 每次渲染2个年份
    let currentIndex = 0;

    function renderBatch() {
        const fragment = document.createDocumentFragment();
        const endIndex = Math.min(currentIndex + BATCH_SIZE, years.length);

        for (let i = currentIndex; i < endIndex; i++) {
            const year = years[i];
            const yearSection = document.createElement('div');
            yearSection.className = 'exhibition-year';

            const yearTitle = document.createElement('h3');
            yearTitle.textContent = year;
            yearSection.appendChild(yearTitle);

            const exhibitionsList = document.createElement('div');
            exhibitionsList.className = 'exhibitions-list';

            const exhibitions = window.siteContent?.exhibitionsByYear[year] || exhibitionsData[year];
            exhibitions.forEach(exhibition => {
                const exhibitionItem = createExhibitionItem(exhibition);
                exhibitionsList.appendChild(exhibitionItem);
            });

            yearSection.appendChild(exhibitionsList);
            fragment.appendChild(yearSection);
        }

        container.appendChild(fragment);
        currentIndex = endIndex;

        // 如果还有未渲染的年份，继续下一批
        if (currentIndex < years.length) {
            // 使用 requestAnimationFrame 在下一帧继续渲染，避免阻塞主线程
            requestAnimationFrame(renderBatch);
        }
    }

    // 开始第一批渲染
    requestAnimationFrame(renderBatch);
}

// 创建展览项目
function createExhibitionItem(exhibition) {
    const item = document.createElement('div');
    item.className = 'exhibition-item';
    item.setAttribute('data-exhibition-id', exhibition.id);

    const title = exhibition.title[currentLang] || exhibition.title.zh;
    const location = exhibition.location[currentLang] || exhibition.location.zh;
    const country = exhibition.country[currentLang] || exhibition.country.zh;
    const organizer = exhibition.organizer ? (exhibition.organizer[currentLang] || exhibition.organizer.zh) : '';

    // 优化：只显示前2张预览图（减少图片数量），使用懒加载和异步解码
    const previewImages = exhibition.images.slice(0, 2).map((img, index) =>
        `<img src="${getOptimizedExhibitionImage(img.src, 'card')}"
              alt="${getImageText(img, 'title')}"
              class="preview-image"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null;this.src='${img.src}'"
              ${index > 0 ? 'fetchpriority="low"' : ''}>`
    ).join('');

    item.innerHTML = `
        <div class="exhibition-info">
            <div class="exhibition-date">${exhibition.date}</div>
            <h4 class="exhibition-title">${title}</h4>
            ${organizer ? `<div class="exhibition-organizer">${organizer}</div>` : ''}
            <div class="exhibition-location">${location}</div>
            <div class="exhibition-country">${country}</div>
        </div>
        <div class="exhibition-preview">
            ${previewImages}
        </div>
        <div class="exhibition-action">
            <a href="exhibition-detail.html?id=${exhibition.id}" class="view-detail-btn">
                <i class="fas fa-eye"></i>
                <span>${getTranslation('exhibitions.viewDetail')}</span>
            </a>
        </div>
    `;

    return item;
}



// 根据ID查找展览
function findExhibitionById(id) {
    if (window.siteContent) return window.siteContent.findExhibition(id);
    for (const year in exhibitionsData) {
        const exhibition = exhibitionsData[year].find(ex => ex.id === id);
        if (exhibition) return exhibition;
    }
    return null;
}





function createExhibitionViewer({ className, displaySrc, fallbackSrc, title, description = '' }) {
    const viewer = document.createElement('div');
    const previouslyFocused = document.activeElement;
    viewer.className = className;
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', title);
    viewer.innerHTML = `
        <div class="viewer-overlay"></div>
        <div class="viewer-content">
            <img src="${displaySrc}" alt="${title}">
            <div class="viewer-info">
                <h3>${title}</h3>
                ${description ? `<p>${description}</p>` : ''}
            </div>
            <button type="button" class="viewer-close" aria-label="Close image viewer">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    const closeButton = viewer.querySelector('.viewer-close');
    const image = viewer.querySelector('img');
    const close = () => {
        viewer.remove();
        if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
    image.addEventListener('error', () => {
        if (image.src !== fallbackSrc) image.src = fallbackSrc;
    }, { once: true });
    viewer.querySelector('.viewer-overlay').addEventListener('click', close);
    closeButton.addEventListener('click', close);
    viewer.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') close();
    });

    document.body.appendChild(viewer);
    requestAnimationFrame(() => {
        viewer.classList.add('show');
        closeButton.focus();
    });
}

// 打开图片查看器
function openImageViewer(imageIndex, exhibitionId) {
    const exhibition = findExhibitionById(exhibitionId);
    if (!exhibition) return;

    const image = exhibition.images[imageIndex];
    createExhibitionViewer({
        className: 'image-viewer-modal',
        displaySrc: getOptimizedExhibitionImage(image.src, 'preview'),
        fallbackSrc: image.src,
        title: getImageText(image, 'title'),
        description: getImageText(image, 'description')
    });
}



// 打开证书查看器
function openCertificateViewer(imageSrc, title) {
    createExhibitionViewer({
        className: 'certificate-viewer-modal',
        displaySrc: getOptimizedExhibitionImage(imageSrc, 'preview'),
        fallbackSrc: imageSrc,
        title
    });
}

// 打开作品查看器
function openArtworkViewer(imageSrc, title) {
    createExhibitionViewer({
        className: 'artwork-viewer-modal',
        displaySrc: getOptimizedExhibitionImage(imageSrc, 'preview'),
        fallbackSrc: imageSrc,
        title
    });
}
