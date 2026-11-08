// Theme renderer. Canonical records live in content/artworks.js.
if (!window.siteContent) throw new Error('Shared content API must load before js/gallery.js');
const artworksData = window.siteContent.artworks;

// 初始化排序权重与原始索引（用于默认排序：权重高者在前，权重相同按初始顺序）
artworksData.forEach((artwork, index) => {
    if (typeof artwork.sortWeight !== 'number') {
        artwork.sortWeight = 0;
    }
    artwork.__initialIndex = index;
});

// 当前语言、筛选和排序状态
let currentLang = 'zh';
let currentFilter = 'all';
let currentSort = 'default';

// 图片模态框相关变量
let imageModal, imageModalImg, imageModalTitle;
let lastGalleryTrigger = null;

let galleryInitialized = false;

function getSharedArtworks() {
    return window.siteContent?.artworks || artworksData;
}

function initGallery() {
    if (galleryInitialized || !window.languageManager?.isInitialized) return;

    galleryInitialized = true;
    currentLang = window.languageManager.currentLang;
    initSortControls();
    initScrollOptimization();
    renderGallery();
    initImageModal();
    initGalleryViewerTriggers();
}

document.addEventListener('languageReady', initGallery);
if (window.languageManager?.isInitialized) initGallery();

// 滚动优化：滚动时禁用 hover 效果
function initScrollOptimization() {
    let scrollTimer;
    const body = document.body;

    window.addEventListener('scroll', function () {
        body.classList.add('is-scrolling');

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });
}

// 监听语言切换事件
document.addEventListener('languageChanged', function (e) {
    currentLang = e.detail.language;
    updateSortControlsText();
    renderGallery();
});

// 初始化排序控制器
function initSortControls() {
    initCustomSelect();
    updateSortControlsText();
}

// 初始化自定义选择器
function initCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    const selectTrigger = customSelect?.querySelector('.select-trigger');
    const selectOptions = customSelect?.querySelector('.select-options');
    const selectText = customSelect?.querySelector('.select-text');
    const hiddenSelect = document.getElementById('sortSelect');

    if (!customSelect || !selectTrigger || !selectOptions || !selectText) return;

    // 点击触发器切换下拉菜单
    selectTrigger.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleCustomSelect();
    });

    // 选项点击事件
    selectOptions.addEventListener('click', function (e) {
        const option = e.target.closest('.select-option');
        if (!option) return;

        const value = option.dataset.value;
        const text = option.querySelector('span').textContent;

        // 更新选中状态
        selectOptions.querySelectorAll('.select-option').forEach(opt => {
            opt.classList.remove('active');
        });
        option.classList.add('active');

        // 更新显示文本
        selectText.textContent = text;

        // 更新隐藏的select值
        if (hiddenSelect) {
            hiddenSelect.value = value;
        }

        // 更新排序
        currentSort = value;
        renderGallery();

        // 关闭下拉菜单
        closeCustomSelect();

        // 添加视觉反馈
        const sortControls = document.querySelector('.sort-controls-premium');
        if (sortControls) {
            sortControls.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                sortControls.style.transform = '';
            }, 200);
        }
    });

    // 点击外部区域关闭
    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            closeCustomSelect();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeCustomSelect();
        }
    });

    // 设置初始值
    const defaultOption = selectOptions.querySelector(`[data-value="${currentSort}"]`);
    if (defaultOption) {
        defaultOption.classList.add('active');
        selectText.textContent = defaultOption.querySelector('span').textContent;
    }
}

// 切换自定义选择器
function toggleCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    if (customSelect.classList.contains('open')) {
        closeCustomSelect();
    } else {
        openCustomSelect();
    }
}

// 打开自定义选择器
function openCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    customSelect.classList.add('open');

    // 关闭其他可能打开的下拉菜单
    document.querySelectorAll('.custom-select.open').forEach(select => {
        if (select !== customSelect) {
            select.classList.remove('open');
        }
    });
}

// 关闭自定义选择器
function closeCustomSelect() {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return;

    customSelect.classList.remove('open');
}

// 更新排序控制器文本
function updateSortControlsText() {
    if (!window.languageManager) return;

    // 更新自定义选择器显示文本
    const customSelect = document.getElementById('customSelect');
    const selectText = customSelect?.querySelector('.select-text');
    const activeOption = customSelect?.querySelector('.select-option.active');

    if (selectText && activeOption) {
        const spanElement = activeOption.querySelector('span');
        if (spanElement) {
            const i18nKey = spanElement.getAttribute('data-i18n');
            if (i18nKey) {
                const translatedText = window.languageManager.getTranslation(i18nKey);
                if (translatedText) {
                    selectText.textContent = translatedText;
                }
            }
        }
    }

    // 更新隐藏的select选项文本（用于可访问性）
    const hiddenSelect = document.getElementById('sortSelect');
    if (hiddenSelect) {
        const options = hiddenSelect.querySelectorAll('option');
        if (options.length >= 3) {
            options[0].textContent = window.languageManager.getTranslation('gallery.sortDefault') || '默认排序';
            options[1].textContent = window.languageManager.getTranslation('gallery.sortByYearDesc') || '按年份 (新→旧)';
            options[2].textContent = window.languageManager.getTranslation('gallery.sortByYearAsc') || '按年份 (旧→新)';
        }

        // 更新select的aria-label
        const sortByText = window.languageManager.getTranslation('gallery.sortBy') || '排序方式';
        hiddenSelect.setAttribute('aria-label', sortByText);
    }
}

// 获取翻译文本
function getArtworkText(artwork, field) {
    const text = artwork[field];
    if (typeof text === 'object' && text[currentLang]) {
        return text[currentLang];
    }
    return text || '';
}

// 获取状态显示文本
function getStatusText(status) {
    const statusTexts = {
        available: { zh: "可购买", en: "Available" },
        sold: { zh: "已售出", en: "Sold Out" },
        reserved: { zh: "已预定", en: "Reserved" }
    };
    return statusTexts[status] ? statusTexts[status][currentLang] : status;
}

// 获取状态CSS类
function getStatusClass(status) {
    return `gallery-artwork-status-${status}`;
}

function getOptimizedGalleryImage(src, profile = 'card') {
    return window.getOptimizedImagePath ? window.getOptimizedImagePath(src, profile) : src;
}

// 渲染作品集
function renderGallery() {
    const container = document.querySelector('.gallery-grid');
    if (!container) return;

    // 使用 requestAnimationFrame 优化渲染性能
    requestAnimationFrame(() => {
        container.innerHTML = '';

        // 根据筛选条件过滤作品
        const filteredArtworks = currentFilter === 'all'
            ? [...getSharedArtworks()]
            : getSharedArtworks().filter(artwork => artwork.category === currentFilter);

        // 根据当前排序方式排序
        sortArtworks(filteredArtworks);

        // 使用 DocumentFragment 批量插入DOM，减少重排
        const fragment = document.createDocumentFragment();

        filteredArtworks.forEach(artwork => {
            const artworkElement = createArtworkElement(artwork);
            fragment.appendChild(artworkElement);
        });

        container.appendChild(fragment);
    });
}

// 排序作品
function sortArtworks(artworks) {
    switch (currentSort) {
        case 'year-desc':
            // 按年份降序：最新在前
            artworks.sort((a, b) => {
                return parseInt(b.year) - parseInt(a.year);
            });
            break;
        case 'year-asc':
            // 按年份升序：最旧在前
            artworks.sort((a, b) => {
                return parseInt(a.year) - parseInt(b.year);
            });
            break;
        case 'default':
        default:
            // 默认排序：按可配置权重降序，权重相同按初始顺序稳定排序
            artworks.sort((a, b) => {
                const wa = typeof a.sortWeight === 'number' ? a.sortWeight : 0;
                const wb = typeof b.sortWeight === 'number' ? b.sortWeight : 0;
                if (wb !== wa) return wb - wa; // 权重高者在前
                const ia = typeof a.__initialIndex === 'number' ? a.__initialIndex : getSharedArtworks().findIndex(it => it.id === a.id);
                const ib = typeof b.__initialIndex === 'number' ? b.__initialIndex : getSharedArtworks().findIndex(it => it.id === b.id);
                return ia - ib; // 稳定：原始顺序
            });
            break;
    }
}

// 创建作品元素
function createArtworkElement(artwork) {
    const element = document.createElement('div');
    element.className = 'gallery-artwork-card';
    element.setAttribute('data-artwork-id', artwork.id);

    // 检测是否为移动端
    const isMobile = window.innerWidth <= 768;

    const title = getArtworkText(artwork, 'title');
    const medium = getArtworkText(artwork, 'medium');
    const description = getArtworkText(artwork, 'description');
    const price = getArtworkText(artwork, 'price');
    const statusText = getStatusText(artwork.status);
    const statusClass = getStatusClass(artwork.status);
    const cardImage = getOptimizedGalleryImage(artwork.image, 'card');
    const previewImage = getOptimizedGalleryImage(artwork.image, 'preview');

    element.innerHTML = `
        <div class="gallery-artwork-image-container">
            <img src="${cardImage}"
                 alt="${title}"
                 class="gallery-artwork-image"
                 loading="lazy"
                 decoding="async"
                 onerror="this.onerror=null;this.src='${artwork.image}'"
                 onload="this.classList.add('is-loaded')">
            <div class="gallery-artwork-overlay">
                <div class="gallery-artwork-actions">
                    <button type="button" class="action-btn view-btn" data-view-artwork-id="${artwork.id}" aria-label="${currentLang === 'zh' ? '查看大图：' : 'Zoom view: '}${title}">
                        <i class="fas fa-search-plus"></i>
                        <span>${currentLang === 'zh' ? '放大查看' : 'Zoom View'}</span>
                    </button>
                </div>
            </div>
            ${artwork.featured ? '<div class="gallery-featured-badge"><i class="fas fa-star"></i></div>' : ''}
            ${artwork.status === 'sold' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-check-circle"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            <!-- 暂时隐藏可购买和已预定状态标签
            ${artwork.status === 'available' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-shopping-cart"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            ${artwork.status === 'reserved' ? `
            <div class="gallery-artwork-status ${statusClass}">
                <i class="fas fa-clock"></i>
                <span>${statusText}</span>
            </div>
            ` : ''}
            -->
        </div>
        <div class="gallery-artwork-info">
            <h3 class="gallery-artwork-title">${title}</h3>
            <div class="gallery-artwork-details">
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '媒材' : 'Medium'}:</span>
                    <span class="gallery-detail-value">${medium}</span>
                </div>
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '尺寸' : 'Size'}:</span>
                    <span class="gallery-detail-value">${artwork.size}</span>
                </div>
                <div class="gallery-detail-row">
                    <span class="gallery-detail-label">${currentLang === 'zh' ? '年份' : 'Year'}:</span>
                    <span class="gallery-detail-value">${artwork.year}</span>
                </div>
            </div>
        </div>
    `;

    // 移动端直接点击图片卡片打开大图
    if (isMobile) {
        element.addEventListener('click', function (e) {
            // 防止事件冒泡
            e.preventDefault();
            e.stopPropagation();
            lastGalleryTrigger = element;
            openImageModal(previewImage, title, artwork.image);
        });

        // 添加移动端特有的样式类
        element.classList.add('mobile-direct-click');
    }

    return element;
}

function initGalleryViewerTriggers() {
    const container = document.querySelector('.gallery-grid');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-view-artwork-id]');
        if (!trigger) return;

        const artwork = getSharedArtworks().find((item) => item.id === trigger.dataset.viewArtworkId);
        if (!artwork) return;

        lastGalleryTrigger = trigger;
        openImageModal(
            getOptimizedGalleryImage(artwork.image, 'preview'),
            getArtworkText(artwork, 'title'),
            artwork.image
        );
    });
}

// 初始化图片模态框
function initImageModal() {
    imageModal = document.getElementById('imageModal');
    if (!imageModal) return;

    imageModalImg = imageModal.querySelector('.modal-content');
    imageModalTitle = imageModal.querySelector('.modal-title');
    const closeBtn = imageModal.querySelector('.modal-close');

    // 绑定关闭事件
    closeBtn.addEventListener('click', closeImageModal);
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImageModal();
    });

    // 键盘ESC关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            closeImageModal();
        }
    });
}

// 打开图片模态框
function openImageModal(imageSrc, imageTitle, fallbackSrc) {
    if (!imageModal) return;

    imageModalImg.onerror = function () {
        if (fallbackSrc && imageModalImg.src !== fallbackSrc) {
            imageModalImg.onerror = null;
            imageModalImg.src = fallbackSrc;
        }
    };
    imageModalImg.src = imageSrc;
    imageModalImg.alt = imageTitle;
    if (imageModalTitle) {
        imageModalTitle.textContent = imageTitle;
    }

    imageModal.style.display = 'flex';
    setTimeout(() => {
        imageModal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
    imageModal.querySelector('.modal-close')?.focus();
}

// 关闭图片模态框
function closeImageModal() {
    if (!imageModal) return;

    imageModal.classList.remove('show');
    setTimeout(() => {
        imageModal.style.display = 'none';
        if (imageModalImg) {
            imageModalImg.removeAttribute('src');
            imageModalImg.removeAttribute('alt');
            imageModalImg.onerror = null;
        }
        document.body.style.overflow = '';
        if (lastGalleryTrigger instanceof HTMLElement) lastGalleryTrigger.focus();
        lastGalleryTrigger = null;
    }, 300);
}

// 全局函数供HTML调用
window.openImageModal = openImageModal;
