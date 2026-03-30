// 媒体报道数据
const pressData = {
    personalInterviews: {
        items: [
            {
                title: {
                    zh: "Fad Mag 杂志 - 周婧的个人专访",
                    en: "Fad Mag Magazine - Personal Interview with Jing Zhou"
                },
                description: {
                    zh: "当代艺术家——通过多维创造力连接文化",
                    en: "Jing Zhou: A Contemporary Artist Bridging Cultures Through Multidimensional Creativity"
                },
                publication: {
                    zh: "Fad Mag 杂志",
                    en: "Fad Mag Magazine"
                },
                url: "https://fadmagazine.com/2025/02/18/jing-zhou-a-contemporary-artist-bridging-cultures-through-multidimensional-creativity/",
                date: "2025.02.18",
                thumbnail: "images/pressSnapshot/snapshot_p_fadmagazine.com.jpeg"
            },
            {
                title: {
                    zh: "Kunst Plaza - 周婧的个人专访",
                    en: "Kunst Plaza - Personal Interview with Jing Zhou"
                },
                description: {
                    zh: "碎片化整体：周婧",
                    en: "Fragmentierte Ganzheit: Jing Zhou"
                },
                publication: {
                    zh: "Kunst Plaza（德语媒体）",
                    en: "Kunst Plaza (German Media)"
                },
                url: "https://www.kunstplaza.de/ausstellungen/fragmentierte-ganzheit-jing-zhou/",
                date: "2025.06.03",
                thumbnail: "images/pressSnapshot/snapshot_p_www.kunstplaza.de.jpeg"
            }
        ]
    },
    groupExhibitions: { items: [] }
};

// 当前语言（避免与其它脚本冲突）
let pressCurrentLang = localStorage.getItem('language') || 'zh';

// 获取翻译文本
function getTranslation(key) {
    if (window.languageManager) {
        return window.languageManager.getTranslation(key);
    }
    return key;
}

// 获取媒体报道文本的辅助函数
function getPressText(press, field) {
    if (typeof press[field] === 'object' && press[field] !== null) {
        return press[field][pressCurrentLang] || press[field]['en'] || '';
    }
    return press[field] || '';
}

// 获取缩略图URL - 直接使用本地图片
function getScreenshotUrl(item) {
    return item.thumbnail || null;
}

// 创建媒体项目HTML
function createPressItemHTML(item) {
    const screenshotUrl = getScreenshotUrl(item);

    const title = getPressText(item, 'title');
    const description = getPressText(item, 'description');
    const date = getPressText(item, 'date');
    const publication = getPressText(item, 'publication');

    return `
        <div class="press-item">
            <div class="press-thumbnail" onclick="openPressImageModal('${screenshotUrl}', '${title}', '${item.url}')">
                <img data-src="${screenshotUrl}" 
                     alt="${title}" 
                     class="press-lazy-img"
                     decoding="async"
                     onerror="this.classList.add('is-hidden'); this.parentElement.querySelector('.press-thumbnail-fallback').classList.remove('is-hidden');">
                <div class="press-thumbnail-fallback is-hidden">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="press-thumbnail-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="press-content-area">
                <div class="press-header-v2">
                    <div class="press-header-left">
                        ${(date || publication) ? `<div class=\"press-meta-line\">${date ? `<span class=\"press-date\">${date}</span>` : ''}${publication ? `<span class=\"press-publication\">${publication}</span>` : ''}</div>` : ''}
                        <h4 class="press-title">
                            <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                                ${title}
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </h4>
                    </div>
                    <div class="press-meta desktop-only">
                        <a href="${item.url}" class="press-source" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i>
                            <span data-i18n="press.readMore">${getTranslation('press.readMore')}</span>
                        </a>
                    </div>
                </div>
                <p class="press-description">${description}</p>
                ${item.note ? `<p class="press-note">${item.note}</p>` : ''}
                <div class="press-meta mobile-only">
                    <a href="${item.url}" class="press-source" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i>
                        <span data-i18n="press.readMore">${getTranslation('press.readMore')}</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}



// 更新模态框提示文字
function updateModalHints() {
    const modal = document.getElementById('pressImageModal');
    const modalCaption = document.getElementById('pressModalCaption');

    if (modal && modal.style.display === 'flex' && modalCaption) {
        const hints = getImageViewerHints();
        const currentContent = modalCaption.innerHTML;

        // 只更新提示部分，保留标题和链接
        const hintPattern = /<div class=\"press-hints\">[\s\S]*?<\/div>/;
        const newHints = `<div class="press-hints">
            <i class="fas fa-mouse"></i> ${hints.clickZoom} • 
            <i class="fas fa-mouse-pointer"></i> ${hints.wheelZoom} • 
            <i class="fas fa-hand-paper"></i> ${hints.dragMove} • 
            <i class="fas fa-keyboard"></i> ${hints.resetKey}
        </div>`;

        modalCaption.innerHTML = currentContent.replace(hintPattern, newHints);
    }
}

// 初始化页面
function initPress() {
    // 等待语言管理器初始化完成
    function initPressContent() {
        if (window.languageManager) {
            pressCurrentLang = window.languageManager.currentLang;
            loadPressContent();
        } else {
            // 如果语言管理器还没准备好，再等一下
            setTimeout(initPressContent, 10);
        }
    }

    initPressContent();

    // 监听语言切换
    document.addEventListener('languageChanged', function (e) {
        pressCurrentLang = e.detail.language;
        loadPressContent();
        // 更新模态框提示文字（如果模态框是打开的）
        updateModalHints();
    });
}

// 加载媒体报道内容
function loadPressContent() {
    // 使用优化的渲染函数
    renderPressItems();
}

// 获取图片查看器操作提示文字
function getImageViewerHints() {
    const isZh = pressCurrentLang === 'zh';
    return {
        clickZoom: isZh ? '点击放大' : 'Click to zoom',
        wheelZoom: isZh ? '滚轮缩放' : 'Wheel to zoom',
        dragMove: isZh ? '拖拽移动' : 'Drag to move',
        resetKey: isZh ? 'R键重置' : 'R to reset'
    };
}

// 打开大图模态框
function openPressImageModal(imageSrc, title, url) {
    const modal = document.getElementById('pressImageModal');
    const modalImage = document.getElementById('pressModalImage');
    const modalCaption = document.getElementById('pressModalCaption');

    // 重置图片查看器状态
    resetImageViewer();

    // 获取提示文字
    const hints = getImageViewerHints();

    // 预加载图片以确保清晰度
    const img = new Image();
    img.onload = function () {
        // 设置图片源和属性
        modalImage.src = imageSrc;
        modalImage.alt = title;

        // 计算图片的实际显示比例
        const viewportWidth = window.innerWidth * 0.9;
        const viewportHeight = window.innerHeight * 0.9;
        const imageRatio = Math.min(viewportWidth / img.naturalWidth, viewportHeight / img.naturalHeight);

        // 设置合适的最大缩放比例，不超过原始分辨率
        imageViewer.maxScale = Math.max(1, Math.min(4, 1 / imageRatio));

        // 设置图片样式以确保最佳显示质量
        modalImage.style.imageRendering = 'optimizeQuality';
        modalImage.style.webkitImageRendering = '-webkit-optimize-contrast';
        modalImage.style.msInterpolationMode = 'bicubic';

        // 显示模态框
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    img.onerror = function () {
        // 即使预加载失败，也显示图片
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // 开始预加载
    img.src = imageSrc;

    // 设置标题和链接
    modalCaption.innerHTML = `
        <strong>${title}</strong><br>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="press-link">
            ${url} <i class="fas fa-external-link-alt" style="font-size: 12px;"></i>
        </a>
        <div class="press-hints">
            <i class="fas fa-mouse"></i> ${hints.clickZoom} • 
            <i class="fas fa-mouse-pointer"></i> ${hints.wheelZoom} • 
            <i class="fas fa-hand-paper"></i> ${hints.dragMove} • 
            <i class="fas fa-keyboard"></i> ${hints.resetKey}
        </div>
    `;
}

// 关闭大图模态框
function closePressImageModal() {
    const modal = document.getElementById('pressImageModal');

    // 重置图片查看器状态
    resetImageViewer();

    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// 图片查看器状态
let imageViewer = {
    scale: 1,
    minScale: 1,
    maxScale: 4,
    translateX: 0,
    translateY: 0,
    isDragging: false,
    hasDragged: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
};

// 更新图片变换
function updateImageTransform() {
    const modalImage = document.getElementById('pressModalImage');
    if (modalImage) {
        // 使用更精确的transform设置，避免模糊
        const transform = `translate3d(${imageViewer.translateX}px, ${imageViewer.translateY}px, 0) scale(${imageViewer.scale})`;
        modalImage.style.transform = transform;
        modalImage.style.cursor = imageViewer.scale > imageViewer.minScale ? 'grab' : 'zoom-in';

        // 动态调整图片渲染质量
        if (imageViewer.scale > 1) {
            modalImage.style.imageRendering = 'auto';
            modalImage.style.webkitImageRendering = 'auto';
        } else {
            modalImage.style.imageRendering = 'optimizeQuality';
            modalImage.style.webkitImageRendering = '-webkit-optimize-contrast';
        }
    }
}

// 重置图片查看器状态
function resetImageViewer() {
    imageViewer.scale = 1;
    imageViewer.translateX = 0;
    imageViewer.translateY = 0;
    imageViewer.isDragging = false;
    imageViewer.hasDragged = false;
    updateImageTransform();
}

// 缩放图片
function zoomImage(delta, clientX, clientY) {
    const modalImage = document.getElementById('pressModalImage');
    if (!modalImage) return;

    const rect = modalImage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 计算缩放中心点相对于图片的位置
    const offsetX = (clientX - centerX) / imageViewer.scale;
    const offsetY = (clientY - centerY) / imageViewer.scale;

    // 计算新的缩放比例
    const newScale = Math.max(imageViewer.minScale, Math.min(imageViewer.maxScale, imageViewer.scale + delta));

    if (newScale !== imageViewer.scale) {
        // 调整平移以保持缩放中心点不变
        imageViewer.translateX -= offsetX * (newScale - imageViewer.scale);
        imageViewer.translateY -= offsetY * (newScale - imageViewer.scale);
        imageViewer.scale = newScale;

        updateImageTransform();
    }
}

// 点击缩放
function toggleImageZoom(e) {
    const rect = e.target.getBoundingClientRect();
    const clientX = e.clientX || rect.left + rect.width / 2;
    const clientY = e.clientY || rect.top + rect.height / 2;

    if (imageViewer.scale === imageViewer.minScale) {
        // 智能选择放大倍数，不超过最大缩放比例
        const targetScale = Math.min(imageViewer.maxScale, 2.5);
        zoomImage(targetScale - imageViewer.scale, clientX, clientY);
    } else {
        // 重置到原始大小
        resetImageViewer();
    }
}

// 初始化模态框事件监听器
function initPressModal() {
    const modal = document.getElementById('pressImageModal');
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close');
    const modalImage = document.getElementById('pressModalImage');

    // 关闭按钮事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closePressImageModal);
    }

    if (modalImage) {
        // 图片点击缩放事件（需要区分点击和拖拽）
        modalImage.addEventListener('click', function (e) {
            e.stopPropagation();
            // 只有在没有拖拽的情况下才执行缩放
            if (!imageViewer.hasDragged) {
                toggleImageZoom(e);
            }
        });

        // 鼠标滚轮缩放
        modalImage.addEventListener('wheel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            zoomImage(delta, e.clientX, e.clientY);
        });

        // 鼠标拖拽开始
        modalImage.addEventListener('mousedown', function (e) {
            if (imageViewer.scale > imageViewer.minScale) {
                e.preventDefault();
                imageViewer.isDragging = true;
                imageViewer.hasDragged = false;
                imageViewer.startX = e.clientX;
                imageViewer.startY = e.clientY;
                imageViewer.lastX = imageViewer.translateX;
                imageViewer.lastY = imageViewer.translateY;
                modalImage.style.cursor = 'grabbing';
            }
        });

        // 鼠标拖拽移动
        document.addEventListener('mousemove', function (e) {
            if (imageViewer.isDragging) {
                e.preventDefault();
                const deltaX = e.clientX - imageViewer.startX;
                const deltaY = e.clientY - imageViewer.startY;

                // 检测是否真的在拖拽（移动距离超过阈值）
                if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
                    imageViewer.hasDragged = true;
                }

                imageViewer.translateX = imageViewer.lastX + deltaX / imageViewer.scale;
                imageViewer.translateY = imageViewer.lastY + deltaY / imageViewer.scale;
                updateImageTransform();
            }
        });

        // 鼠标拖拽结束
        document.addEventListener('mouseup', function (e) {
            if (imageViewer.isDragging) {
                imageViewer.isDragging = false;
                modalImage.style.cursor = imageViewer.scale > imageViewer.minScale ? 'grab' : 'zoom-in';

                // 延迟重置拖拽标志，避免立即触发点击事件
                setTimeout(() => {
                    imageViewer.hasDragged = false;
                }, 10);
            }
        });

        // 触摸事件支持
        modalImage.addEventListener('touchstart', function (e) {
            if (e.touches.length === 1) {
                imageViewer.isDragging = true;
                imageViewer.startX = e.touches[0].clientX;
                imageViewer.startY = e.touches[0].clientY;
                imageViewer.lastX = imageViewer.translateX;
                imageViewer.lastY = imageViewer.translateY;
            }
        }, { passive: true });

        modalImage.addEventListener('touchmove', function (e) {
            if (imageViewer.isDragging && e.touches.length === 1) {
                e.preventDefault(); // 阻止默认滚动行为
                imageViewer.hasDragged = true;

                const deltaX = e.touches[0].clientX - imageViewer.startX;
                const deltaY = e.touches[0].clientY - imageViewer.startY;

                imageViewer.translateX = imageViewer.lastX + deltaX / imageViewer.scale;
                imageViewer.translateY = imageViewer.lastY + deltaY / imageViewer.scale;

                // 使用 requestAnimationFrame 优化性能
                requestAnimationFrame(updateImageTransform);
            }
        }, { passive: false });

        modalImage.addEventListener('touchend', function (e) {
            imageViewer.isDragging = false;
            // 延迟重置拖拽标志
            setTimeout(() => {
                imageViewer.hasDragged = false;
            }, 10);
        }, { passive: true });
    }

    // 点击背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closePressImageModal();
        }
    });

    // ESC键关闭和重置缩放
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closePressImageModal();
            } else if (e.key === 'r' || e.key === 'R') {
                // R键重置缩放
                resetImageViewer();
            }
        }
    });
}

// 渲染媒体报道内容
function renderPressItems() {
    const container = document.querySelector('.press-items');
    if (!container) return;

    // 使用 DocumentFragment 优化DOM操作
    const fragment = document.createDocumentFragment();

    // 个人专访
    if (pressData.personalInterviews.items.length > 0) {
        const personalSection = document.createElement('div');
        personalSection.className = 'press-section';
        personalSection.innerHTML = `
            <h3 class="section-title" data-i18n="press.personalInterviews">${getTranslation('press.personalInterviews')}</h3>
            <div class="press-list" data-section="personal">
                ${pressData.personalInterviews.items.map(item => createPressItemHTML(item)).join('')}
            </div>
        `;
        fragment.appendChild(personalSection);
    }

    // 群展报道：从 exhibitionsData 中提取所有 press，按时间排序
    // 性能优化：使用传统 for 循环替代 3 层嵌套 forEach
    const exhibitionPressItems = [];
    if (typeof exhibitionsData === 'object') {
        const years = Object.keys(exhibitionsData);
        for (let i = 0; i < years.length; i++) {
            const year = years[i];
            const exhibitions = exhibitionsData[year];
            if (!Array.isArray(exhibitions)) continue;

            for (let j = 0; j < exhibitions.length; j++) {
                const ex = exhibitions[j];
                const pressArray = ex.press;
                if (!Array.isArray(pressArray)) continue;

                for (let k = 0; k < pressArray.length; k++) {
                    const p = pressArray[k];
                    exhibitionPressItems.push({
                        title: p.title,
                        description: p.description,
                        publication: p.source,
                        url: p.url,
                        date: p.date ? { zh: p.date, en: p.date } : undefined,
                        thumbnail: p.thumbnail || null
                    });
                }
            }
        }
    }

    if (exhibitionPressItems.length > 0) {
        // 按时间倒序（YYYY.MM.DD 或 YYYY.MM）排序
        exhibitionPressItems.sort((a, b) => (parsePressDate(b.date?.zh) - parsePressDate(a.date?.zh)));

        const groupSection = document.createElement('div');
        groupSection.className = 'press-section';

        // 性能优化：一次性渲染所有项目，避免分批渲染导致的高度跳动和重排
        groupSection.innerHTML = `
            <h3 class="section-title" data-i18n="press.groupExhibitions">${getTranslation('press.groupExhibitions')}</h3>
            <div class="press-list" data-section="group">
                ${exhibitionPressItems.map(item => createPressItemHTML(item)).join('')}
            </div>
        `;
        fragment.appendChild(groupSection);
    }

    // 清空容器并一次性插入所有内容
    container.innerHTML = '';
    container.appendChild(fragment);

    // 初始化高性能懒加载
    initSmartLazyLoading();
}

// 将 'YYYY.MM.DD' 或 'YYYY.MM' 转为时间戳
function parsePressDate(dateStr) {
    if (!dateStr) return 0;
    // 移除所有非数字字符，转为数字进行比较
    return parseInt(dateStr.replace(/[^\d]/g, '')) || 0;
}

// 智能懒加载系统：只在滚动停止时加载图片，彻底解决滚动卡顿
function initSmartLazyLoading() {
    const lazyImages = document.querySelectorAll('.press-lazy-img');
    if (!lazyImages.length) return;

    // 滚动状态追踪
    let isScrolling = false;
    let scrollTimer = null;

    // 监听滚动状态
    window.addEventListener('scroll', () => {
        isScrolling = true;
        clearTimeout(scrollTimer);
        // 150ms 无滚动事件则认为滚动停止
        scrollTimer = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }, { passive: true });

    // 待加载图片队列
    const loadQueue = new Set();

    // 观察者：只负责将图片加入/移出队列
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadQueue.add(entry.target);
            } else {
                // 如果图片还没加载就移出了视口，从队列中移除
                loadQueue.delete(entry.target);
            }
        });
    }, {
        rootMargin: "100px 0px", // 提前一点点检测
        threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));

    // 队列处理循环
    function processQueue() {
        // 只有在非滚动状态且队列不为空时才加载
        if (!isScrolling && loadQueue.size > 0) {
            // 每次处理最多 3 张图片，避免阻塞主线程
            const batch = Array.from(loadQueue).slice(0, 3);

            batch.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src'); // 避免重复处理

                    // 图片加载完成后的处理
                    img.onload = function () {
                        this.classList.add('is-loaded');
                        if (this.parentElement) {
                            this.parentElement.classList.add('loaded');
                        }
                    };

                    // 停止观察已处理的图片
                    observer.unobserve(img);
                    loadQueue.delete(img);
                }
            });
        }

        // 继续下一帧检查
        requestAnimationFrame(processQueue);
    }

    // 启动处理循环
    requestAnimationFrame(processQueue);
}

// 全局滚动状态管理 - 避免多个滚动监听器
let globalScrollState = {
    isScrolling: false,
    scrollTimer: null,
    lastScrollTime: 0,
    ticking: false
};

// 初始化图片懒加载优化 - 使用 Intersection Observer，滚动时暂停加载
function initImageLoading() {
    const images = document.querySelectorAll('.press-lazy-img');
    if (images.length === 0) return;

    const loadedImages = new Set(); // 追踪已加载的图片
    const pendingImages = new Set(); // 滚动时暂存待加载的图片
    let observerCallbackTimer = null;

    // 创建 Intersection Observer - 使用节流减少回调频率
    const imageObserver = new IntersectionObserver((entries) => {
        // 节流：避免回调执行过于频繁
        if (observerCallbackTimer) return;

        observerCallbackTimer = setTimeout(() => {
            observerCallbackTimer = null;

            entries.forEach(entry => {
                const img = entry.target;

                // 只处理进入视口且未加载的图片
                if (entry.isIntersecting && !loadedImages.has(img)) {
                    // 如果正在滚动，暂存图片，等滚动停止后加载
                    if (globalScrollState.isScrolling) {
                        pendingImages.add(img);
                    } else {
                        loadImage(img, imageObserver);
                    }
                }
            });
        }, 50); // 节流 50ms
    }, {
        // 减少预加载距离从 200px → 100px，减少提前触发
        rootMargin: '100px 0px',
        threshold: 0.01
    });

    // 观察所有图片
    images.forEach(img => imageObserver.observe(img));

    // 加载单个图片的函数
    function loadImage(img, observer) {
        const src = img.getAttribute('data-src');
        if (!src || img.src || loadedImages.has(img)) return;

        // 标记为已加载（避免重复加载）
        loadedImages.add(img);
        const thumbnail = img.parentElement;

        // 直接加载，不使用 requestIdleCallback（避免延迟）
        img.src = src;

        // 图片加载成功后添加 loaded 类
        img.onload = function () {
            if (thumbnail) {
                thumbnail.classList.add('loaded');
            }
            // 图片加载完成后才停止观察，减少回调次数
            if (observer) {
                observer.unobserve(img);
            }
        };

        // 错误处理
        img.onerror = function () {
            this.classList.add('is-hidden');
            const fallback = this.parentElement.querySelector('.press-thumbnail-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
            }
            // 错误时也移除占位符和停止观察
            if (thumbnail) {
                thumbnail.classList.add('loaded');
            }
            if (observer) {
                observer.unobserve(img);
            }
        };
    }

    // 滚动停止后加载待处理图片的函数
    window.addEventListener('scrollend-press', () => {
        if (pendingImages.size > 0) {
            requestAnimationFrame(() => {
                const imagesToLoad = Array.from(pendingImages);
                pendingImages.clear();

                // 批量加载，每次最多5张
                imagesToLoad.slice(0, 5).forEach(img => {
                    if (!loadedImages.has(img)) {
                        loadImage(img, imageObserver);
                    }
                });
            });
        }
    });

    // 立即加载前 10 张可见图片
    requestAnimationFrame(() => {
        let loadedCount = 0;
        const MAX_INITIAL_LOAD = 10;

        images.forEach(img => {
            if (loadedCount >= MAX_INITIAL_LOAD) return;

            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                loadImage(img, imageObserver);
                loadedCount++;
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    // 稍微延迟以确保LanguageManager已经加载
    setTimeout(initPress, 100);
    // 初始化模态框
    initPressModal();
});
