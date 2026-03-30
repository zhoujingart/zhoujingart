// 工作室页面功能
document.addEventListener('DOMContentLoaded', function () {
    // 等待语言管理器初始化完成
    function initStudio() {
        if (window.languageManager && window.languageManager.isInitialized) {
            renderStudioContent();
        } else {
            setTimeout(initStudio, 50);
        }
    }

    if (document.readyState === 'complete') {
        initStudio();
    } else {
        window.addEventListener('load', initStudio);
    }
});

// 工作室本地翻译
const studioTranslations = {
    // 工作室页面标题和描述
    title: { zh: "工作室", en: "Studio" },
    description: {
        zh: "探索周婧的艺术工作室，了解她的创作过程和艺术理念。",
        en: "Explore Zhou Jing's art studio and discover her creative process and artistic philosophy."
    },

    // 工作室介绍
    studioTitle: { zh: "周婧的艺术工作室", en: "Zhou Jing's Art Studio" },
    studioSubtitle: { zh: "创意与灵感的诞生地", en: "The Birthplace of Creativity and Inspiration" },
    studioIntroduction: {
        zh: "这里是周婧的私人艺术工作室，一个充满创意能量的神圣空间。在这里，每一个想法都可能成为艺术作品的起点，每一次实验都可能带来新的突破。工作室不仅是创作的场所，更是艺术家与内心对话的私密空间。",
        en: "This is Zhou Jing's private art studio, a sacred space filled with creative energy. Here, every idea can become the starting point of an artwork, and every experiment can lead to new breakthroughs. The studio is not only a place for creation, but also a private space for the artist to dialogue with her inner self."
    },

    // 创作过程
    processTitle: { zh: "创作过程", en: "Creative Process" },
    processStep1: { zh: "构思与灵感", en: "Conception & Inspiration" },
    processStep2: { zh: "绘画与表达", en: "Painting & Expression" },
    processStep3: { zh: "技法与实验", en: "Technique & Experimentation" },
    processStep4: { zh: "完善与呈现", en: "Refinement & Presentation" },

    // 图片标题和描述
    image1Title: { zh: "创作空间", en: "Creative Space" },
    image1Description: {
        zh: "宽敞明亮的工作室，充满自然光线，为艺术创作提供理想环境。",
        en: "Spacious and bright studio filled with natural light, providing an ideal environment for artistic creation."
    },

    image2Title: { zh: "创作过程", en: "Creative Process" },
    image2Description: {
        zh: "艺术家专注于画布上的每一笔，将内心的情感转化为视觉语言。",
        en: "The artist focuses on every stroke on the canvas, transforming inner emotions into visual language."
    },

    image3Title: { zh: "材料与工具", en: "Materials & Tools" },
    image3Description: {
        zh: "丰富的绘画材料和工具，每一种都承载着不同的艺术可能性。",
        en: "Rich painting materials and tools, each carrying different artistic possibilities."
    },

    image4Title: { zh: "作品完成", en: "Work Completion" },
    image4Description: {
        zh: "完成的作品展示，记录着从构思到实现的完整创作历程。",
        en: "Display of completed works, documenting the complete creative journey from conception to realization."
    },

    // 创作理念
    philosophyTitle: { zh: "创作理念", en: "Creative Philosophy" },
    philosophyQuote: {
        zh: "艺术创作是一个持续的探索过程，在这个过程中，我与材料、色彩、形式进行对话，寻找表达内心世界的最佳方式。每一件作品都是这种对话的结果，承载着创作时刻的情感与思考。",
        en: "Artistic creation is a continuous process of exploration, in which I dialogue with materials, colors, and forms, seeking the best way to express my inner world. Each work is the result of this dialogue, carrying the emotions and thoughts of the moment of creation."
    },
    philosophyAuthor: { zh: "周婧", en: "Zhou Jing" },

    // 工作室特色
    featuresTitle: { zh: "工作室特色", en: "Studio Features" },
    feature1Title: { zh: "自然光线", en: "Natural Light" },
    feature1Description: {
        zh: "充足的自然光线为色彩创作提供最佳条件",
        en: "Abundant natural light provides optimal conditions for color creation"
    },

    feature2Title: { zh: "专业设备", en: "Professional Equipment" },
    feature2Description: {
        zh: "完善的绘画工具和材料支持多种创作技法",
        en: "Complete painting tools and materials support various creative techniques"
    },

    feature3Title: { zh: "静谧环境", en: "Tranquil Environment" },
    feature3Description: {
        zh: "安静的创作环境有助于艺术家专注创作",
        en: "Quiet creative environment helps artists focus on creation"
    },

    feature4Title: { zh: "灵感空间", en: "Inspiration Space" },
    feature4Description: {
        zh: "充满艺术品和参考资料的启发性空间",
        en: "Inspiring space filled with artworks and reference materials"
    }
};

// 获取当前语言
function getCurrentLanguage() {
    return window.languageManager ? window.languageManager.currentLang : 'zh';
}

// 获取本地翻译
function getStudioTranslation(key) {
    const currentLang = getCurrentLanguage();
    const translation = studioTranslations[key];

    if (translation && translation[currentLang]) {
        return translation[currentLang];
    }

    // 降级到中文
    if (translation && translation.zh) {
        return translation.zh;
    }

    return key;
}

// 工作室数据
const studioData = {
    images: [
        {
            id: "studio_01",
            src: "images/studio/studio_01.jpg",
            titleKey: "image1Title",
            descriptionKey: "image1Description",
            processKey: "processStep1"
        },
        {
            id: "studio_02",
            src: "images/studio/studio_02.jpg",
            titleKey: "image2Title",
            descriptionKey: "image2Description",
            processKey: "processStep2"
        },
        {
            id: "studio_03",
            src: "images/studio/studio_03.jpg",
            titleKey: "image3Title",
            descriptionKey: "image3Description",
            processKey: "processStep3"
        },
        {
            id: "studio_04",
            src: "images/studio/studio_04.jpg",
            titleKey: "image4Title",
            descriptionKey: "image4Description",
            processKey: "processStep4"
        }
    ]
};

// 渲染工作室内容
function renderStudioContent() {
    const container = document.querySelector('.studio-content');
    if (!container) return;

    // 更新页面级别的描述
    const studioText = document.querySelector('.studio-text');
    if (studioText) {
        studioText.innerHTML = `<p>${getStudioTranslation('description')}</p>`;
    }

    const heroImages = studioData.images.slice(0, 3);
    container.innerHTML = `
        <!-- Hero v2：分层拼贴 + 文案 -->
        <div class="studio-hero-v2">
            <div class="hero2-text">
                <h3 class="hero2-title">${getStudioTranslation('studioTitle')}</h3>
                <p class="hero2-subtitle">${getStudioTranslation('studioSubtitle')}</p>
                <p class="hero2-description">${getStudioTranslation('studioIntroduction')}</p>
            </div>
            <div class="hero2-collage">
                ${heroImages.map((img, i) => `
                    <div class="collage-layer layer-${i + 1}" onclick="openStudioViewer('${img.src}', '${img.titleKey}', '${img.descriptionKey}')">
                        <img src="${img.src}" alt="${getStudioTranslation(img.titleKey)}" />
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 纵向交替时间线：创作过程 -->
        <div class="studio-steps-v2">
            <h3 class="steps2-title">${getStudioTranslation('processTitle')}</h3>
            <div class="steps2-timeline">
                ${studioData.images.map((image, index) => `
                    <div class="steps2-item ${index % 2 === 1 ? 'alt' : ''}">
                        <div class="steps2-node">${index + 1}</div>
                        <div class="steps2-card">
                            <div class="steps2-thumb" onclick="openStudioViewer('${image.src}', '${image.processKey}', '${image.descriptionKey}')">
                                <img src="${image.src}" alt="${getStudioTranslation(image.titleKey)}" loading="lazy" decoding="async" />
                            </div>
                            <div class="steps2-content">
                                <h4>${getStudioTranslation(image.processKey)}</h4>
                                <p>${getStudioTranslation(image.descriptionKey)}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 紧凑引言 -->
        <div class="studio-quote-compact">
            <blockquote>“${getStudioTranslation('philosophyQuote')}”</blockquote>
            <cite>— ${getStudioTranslation('philosophyAuthor')}</cite>
        </div>

        <!-- 条纹特性区 -->
        <div class="studio-stripes">
            <div class="stripe">
                <i class="fas fa-sun"></i>
                <div class="stripe-body">
                    <h4>${getStudioTranslation('feature1Title')}</h4>
                    <p>${getStudioTranslation('feature1Description')}</p>
                </div>
            </div>
            <div class="stripe">
                <i class="fas fa-palette"></i>
                <div class="stripe-body">
                    <h4>${getStudioTranslation('feature2Title')}</h4>
                    <p>${getStudioTranslation('feature2Description')}</p>
                </div>
            </div>
            <div class="stripe">
                <i class="fas fa-leaf"></i>
                <div class="stripe-body">
                    <h4>${getStudioTranslation('feature3Title')}</h4>
                    <p>${getStudioTranslation('feature3Description')}</p>
                </div>
            </div>
            <div class="stripe">
                <i class="fas fa-heart"></i>
                <div class="stripe-body">
                    <h4>${getStudioTranslation('feature4Title')}</h4>
                    <p>${getStudioTranslation('feature4Description')}</p>
                </div>
            </div>
        </div>
    `;

    // 添加动画效果
    setTimeout(() => {
        const steps2 = document.querySelectorAll('.steps2-item');
        steps2.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.15}s`;
            item.classList.add('fade-in');
        });
    }, 100);
}

// 打开工作室图片查看器
function openStudioViewer(imageSrc, titleKey, descriptionKey) {
    const title = getStudioTranslation(titleKey);
    const description = getStudioTranslation(descriptionKey);

    const viewer = document.createElement('div');
    viewer.className = 'studio-viewer-modal';
    viewer.innerHTML = `
        <div class="viewer-overlay" onclick="this.parentElement.remove()"></div>
        <div class="viewer-content">
            <img src="${imageSrc}" alt="${title}">
            <div class="viewer-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
            <button class="viewer-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(viewer);
    setTimeout(() => viewer.classList.add('show'), 10);
}

// 监听语言切换
document.addEventListener('languageChanged', function () {
    renderStudioContent();
}); 