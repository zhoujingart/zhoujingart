// 语言配置 - 统一格式（中英文放在一起）
const translations = {
    // 导航
    nav: {
        home: { zh: "首页", en: "Home" },
        gallery: { zh: "作品集", en: "Gallery" },
        exhibitions: { zh: "展览", en: "Exhibitions" },
        about: { zh: "关于艺术家", en: "About" },
        press: { zh: "媒体报道", en: "Press" },
        studio: { zh: "工作室", en: "Studio" },
        contact: { zh: "联系", en: "Contact" }
    },

    // 语言切换
    lang: {
        current: { zh: "EN", en: "中" },
        switch: { zh: "Switch to English", en: "切换到中文" }
    },

    // 首页
    home: {
        title: { zh: "周祥攸兴", en: "ZHOU XIANG YOU XING" },
        artist: { zh: "周婧", en: "Zhou Jing" },
        subtitle: { zh: "一位通过多维创造力连接文化的当代艺术家。", en: "A Contemporary Artist Bridging Cultures Through Multidimensional Creativity." }
    },

    // 作品集
    gallery: {
        title: { zh: "作品集", en: "Gallery" },
        subtitle: { zh: "探索色彩与情感的对话", en: "Exploring the Dialogue Between Color and Emotion" },
        sortBy: { zh: "排序方式", en: "Sort By" },
        sortDefault: { zh: "默认排序", en: "Default Order" },
        sortByYearDesc: { zh: "按年份 ↓ (新→旧)", en: "By Year ↓ (New→Old)" },
        sortByYearAsc: { zh: "按年份 ↑ (旧→新)", en: "By Year ↑ (Old→New)" },
        artwork1: {
            title: { zh: "内心景象", en: "Inner Landscape" },
            meta: { zh: "2024 • 布面油画", en: "2024 • Oil on Canvas" }
        },
        artwork2: {
            title: { zh: "色彩对话", en: "Color Dialogue" },
            meta: { zh: "2024 • 混合媒材", en: "2024 • Mixed Media" }
        },
        artwork3: {
            title: { zh: "抽象表达", en: "Abstract Expression" },
            meta: { zh: "2023 • 丙烯画", en: "2023 • Acrylic" }
        },
        artwork4: {
            title: { zh: "情感流动", en: "Emotional Flow" },
            meta: { zh: "2023 • 水彩画", en: "2023 • Watercolor" }
        },
        artwork5: {
            title: { zh: "文化融合", en: "Cultural Fusion" },
            meta: { zh: "2023 • 综合材料", en: "2023 • Mixed Materials" }
        },
        artwork6: {
            title: { zh: "时间印记", en: "Time Imprint" },
            meta: { zh: "2022 • 布面油画", en: "2022 • Oil on Canvas" }
        },
        modalDescription: {
            zh: "使用左右箭头或键盘方向键浏览作品，双击图片可进入全屏模式。",
            en: "Use arrow buttons or keyboard keys to browse artworks. Double-click image to enter fullscreen mode."
        }
    },

    // 展览
    exhibitions: {
        title: { zh: "展览", en: "Exhibitions" },
        documents: { zh: "展览文档", en: "Exhibition Documents" },
        noExhibitions: { zh: "暂无展览信息", en: "No exhibitions available" },
        viewDetail: { zh: "查看详情", en: "View Details" },
        backToList: { zh: "返回展览列表", en: "Back to Exhibition List" },
        timeline: { zh: "展览时间线", en: "Exhibition Timeline" },
        basicInfo: { zh: "基本信息", en: "Basic Information" },
        exhibitionSite: { zh: "展览现场", en: "Exhibition Site" },
        artworks: { zh: "参展作品", en: "Artworks" },
        press: { zh: "媒体报道", en: "Press Coverage" },
        period: { zh: "展期", en: "Period" },
        location: { zh: "地点", en: "Location" },
        country: { zh: "国家", en: "Country" },
        description: { zh: "展览简介", en: "Description" },
        organizer: { zh: "主办方", en: "Organizer" },
        aboutOrganizer: { zh: "主办方介绍", en: "About the Organizer" },
        learnMore: { zh: "了解更多", en: "Learn More" },
        medium: { zh: "媒材", en: "Medium" },
        size: { zh: "尺寸", en: "Size" },
        year: { zh: "年份", en: "Year" },
        notFound: { zh: "展览未找到", en: "Exhibition Not Found" },
        selectFromList: { zh: "请从展览列表中选择一个展览查看详情。", en: "Please select an exhibition from the list to view details." },
        idNotFound: { zh: "无法找到指定的展览。", en: "Unable to find the specified exhibition." }
    },

    // 简历
    cv: {
        title: { zh: "简历", en: "Curriculum Vitae" },
        education: {
            title: { zh: "教育背景", en: "Education" },
            items: [
                { zh: "格拉斯哥艺术学院 时尚与纺织品设计", en: "Glasgow School of Art, Fashion and Textile Design" },
                { zh: "中央美术学院 本科", en: "Central Academy of Fine Arts, BA" }
            ]
        },
        awards: {
            title: { zh: "专业资质", en: "Professional Qualifications" },
            items: [
                { zh: "中外文化交流协会会员", en: "Member of Shanghai International Cultural Exchange Association" },
                { zh: "青年艺术家协会会员", en: "Member of Youth Artists Association" },
                { zh: "海外青年联合会会员", en: "Member of Overseas Youth Federation" }
            ]
        },
        residencies: {
            title: { zh: "专业经历", en: "Professional Experience" },
            items: [
                { zh: "ZJ STUDIO 创始人", en: "Founder of ZJ STUDIO" },
                { zh: "当代艺术家", en: "Contemporary Artist" },
                { zh: "时尚与纺织品设计师", en: "Fashion and Textile Designer" }
            ]
        },
        publications: {
            title: { zh: "展览经历", en: "Exhibitions" },
            items: [
                { zh: "2023 上海青年艺术家邀请展", en: "2023 Shanghai Young Artists Invitational Exhibition" },
                { zh: "2015 伦敦新设计师展", en: "2015 New Designers, London" }
            ]
        },
        download: { zh: "下载简历", en: "Download CV" },
        downloadText: { zh: "下载PDF版本", en: "Download PDF Version" }
    },

    // 媒体报道
    press: {
        title: { zh: "媒体报道", en: "Press & Reviews" },
        personalInterviews: { zh: "个人专访", en: "Personal Interviews" },
        groupExhibitions: { zh: "展览报道", en: "Exhibition Coverage" },
        readMore: { zh: "查看完整报道", en: "Read Full Article" }
    },

    // 联系方式
    contact: {
        title: { zh: "联系", en: "Contact" },
        subtitle: { zh: "让我们开始对话", en: "Let's Start a Conversation" },
        artistTitle: { zh: "艺术家", en: "Artist" },
        artistDescription: { zh: "当代艺术家 & 时尚设计师", en: "Contemporary Artist & Fashion Designer" },
        emailTitle: { zh: "邮箱联系", en: "Email Contact" },
        emailNote: { zh: "欢迎艺术合作与展览邀请", en: "Welcome art collaborations and exhibition invitations" },
        socialTitle: { zh: "社交媒体", en: "Social Media" },
        portfolioTitle: { zh: "作品集下载", en: "Portfolio Download" },
        portfolioText: { zh: "下载PDF版本", en: "Download PDF Version" },
        portfolioNote: { zh: "包含完整作品集和展览记录", en: "Includes complete portfolio and exhibition history" },
        formTitle: { zh: "发送消息", en: "Send Message" },
        formSubtitle: { zh: "有任何问题或合作意向，请随时联系", en: "Feel free to reach out for any questions or collaboration opportunities" },
        locationTitle: { zh: "工作地点", en: "Work Location" },
        location: { zh: "上海", en: "Shanghai" },
        hoursTitle: { zh: "工作时间", en: "Work Hours" },
        hours: { zh: "周一至周五 9:00-18:00", en: "Monday - Friday 9:00-18:00" },
        languageTitle: { zh: "语言", en: "Languages" },
        languages: { zh: "中文 & English", en: "Chinese & English" },
        ctaText: { zh: "期待与您的艺术对话", en: "Looking forward to our artistic dialogue" },
        ctaButton: { zh: "立即联系", en: "Contact Now" },
        wechat: { zh: "微信二维码", en: "WeChat QR Code" }
    },

    // 关于艺术家
    about: {
        statementTitle: { zh: "艺术家陈述", en: "Artist Statement" },
        statementContent: [
            {
                zh: "周婧是一位中国视觉艺术家，他的实践通过以过程为导向的标记来探索重复、耐力和更新。她的画作将日常生活的节奏转化为冥想带有情感清晰度和韧性的手势。自 2020 年以来，她创作了一系列作品，将东方的耐心和仪式哲学与西方概念抽象传统联系起来。最近的展览包括“What Remains to be See”（1215 画廊，蒙特利尔，2025 年）、NYCxDesign 的 Fractured Horizons（纽约，2025 年）和 Fables（Mall Galleries，伦敦，2025 年）。她的作品被国际收藏，包括 LooLooLook 画廊（巴黎）和 1215 画廊（蒙特利尔）的永久收藏。作为中外文化交流协会、青年艺术家协会和海外青年联合会的会员，她凭借独特的跨文化背景和创意风格在当代艺术界获得了广泛关注和赞誉。",
                en: "Jing Zhou is a Chinese visual artist whose practice explores repetition, endurance, and renewal through process-led mark-making. Her paintings transform the rhythms of everyday routine into meditative gestures that carry emotional clarity and resilience. Since 2020, she has developed a body of work that bridges Eastern philosophies of patience and ritual with Western traditions of conceptual abstraction. Recent exhibitions include What Remains to be Seen(1215 Gallery, Montreal, 2025), Fractured Horizons at NYCxDesign(New York, 2025), and Fables(Mall Galleries, London, 2025).Her work is held in international collections, including the permanent collection of LooLooLook Gallery(Paris) and 1215 Gallery(Montreal). As a member of the Sino-Foreign Cultural Exchange Association, Youth Artists Association, and Overseas Youth Federation, Zhou has garnered significant attention and acclaim in the contemporary art world for her distinctive cross-cultural background and unique creative style."
            },
            {
                zh: "逃逸仪式—当重复变成了阻力。",
                en: "Rituals of Escape - Where repetition becomes resistance."
            },
            {
                zh: "我们日复一日重复着同样的轨迹：闹钟、截止日期、通勤、以及那股无形的、要求我们不断表现的压力。久而久之，本应赋予我们目标的框架，却开始剥夺我们的目标感。“进步”的承诺，渐渐沦为生存的单调循环。",
                en: "We move through the same motions each day. Alarms. Deadlines. Commutes. The quiet pressure to perform. Over time, the structure meant to give us purpose begins to strip it away. The promise of progress flattens into the monotony of survival."
            },
            {
                zh: "周婧对这种节奏再熟悉不过。多年来，她身处的体系始终要求速度、精准，以及对自我的压抑。她走上艺术之路并非某个戏剧性的转折点，而更像一场渐进式的舒展。起初只是对疲惫的本能回应，后来逐渐演变成一种持久的耐力练习与自我修复。她抛开了截止日期，找到了新的节奏；在静默中，重新寻回了意义。",
                en: "Jing Zhou knows this rhythm too well. For years, she moved within systems that demanded speed, precision, and the suppression of self. Her path into art was not a dramatic turning point, more a gradual unravelling. What began as an instinctive response to exhaustion evolved into a sustained practice of endurance and self-repair. In place of deadlines, she found a new tempo. In stillness, she began to rediscover meaning."
            },
            {
                zh: "本作品集便是这场转变的成果。每一件作品都是一次无声的拒绝：几何形态在边界中生长；色彩在长久的克制后缓缓浮现；表层由手工打造，经过反复丈量，每一步都深思熟虑。看似极简的画面，实则承载着饱满的情绪；看似重复的笔触，其实是对节奏的重新掌控——这是一种自主选择的日常。",
                en: "This exhibition is the outcome of that shift. Each work is a quiet refusal. Geometries build within boundaries. Colour emerges slowly, after long periods of restraint. Surfaces are hand-built, measured, and deliberate. What appears minimal is loaded with emotion. What looks repetitive is, in fact, a reclaiming of rhythm. It is routine, carefully chosen."
            },
            {
                zh: "周的创作受多种影响，但都处理得极为含蓄。佛教曼陀罗中冥想式的对称，为作品提供了结构基础；草间弥生对图案的沉浸式运用，在她的创作过程中有所呼应，只是周的基调更偏向内省。她曾从事设计的经历，体现在对构图的精准把控中，然而作品却摒弃了表面的光鲜，转而扎根于质感、从容与情感之中。",
                en: "Zhou’s influences are present but handled with subtlety. The meditative symmetry of Buddhist mandalas provides a structural foundation. Yayoi Kusama’s immersive use of pattern resonates in the process, though Zhou’s tone is more introspective. Her past in design is visible in the control of composition, yet her work resists surface gloss. It is grounded in texture, slowness, and feeling."
            },
            {
                zh: "对周而言，艺术成了对抗“被他人需求塑造的生活”所带来的缓慢侵蚀的生存方式。它所提供的并非奇幻意义上的逃离，而是作为治愈手段的“逃逸”。这些作品不喧嚣，它们为我们留出空间，邀请我们直面重负。而在这份静默之中，它们给予了我们别的东西：呼吸、关怀，以及无声的希望。",
                en: "Art, for Zhou, became a way to survive the slow corrosion of a life shaped by others’ demands. It offered her not escape in the fantastical sense but escape as a method of healing. These works do not shout. They hold space. They ask us to sit with weight. And within that stillness, they offer something else: breath, care, and quiet hope."
            },
            {
                zh: "这场展览不是抗议，也不是退缩，而是一场重新掌控。这些是耐力的仪式，是用柔软进行的反抗，是经时间慢慢雕琢而成的解放。",
                en: "This exhibition is not a protest. It is not a retreat. It is a reclamation. These are rituals of endurance, of defiance through softness, and of liberation shaped slowly over time."
            }
        ],
        cvTitle: { zh: "简历", en: "Curriculum Vitae" },
        education: {
            title: { zh: "教育背景", en: "Education" },
            items: [
                { zh: "格拉斯哥艺术学院 时尚与纺织品设计", en: "Glasgow School of Art, Fashion and Textile Design" },
                { zh: "中央美术学院 本科", en: "Central Academy of Fine Arts, BA" }
            ]
        },
        awards: {
            title: { zh: "专业资质", en: "Professional Qualifications" },
            items: [
                { zh: "中外文化交流协会会员", en: "Member of Shanghai International Cultural Exchange Association" },
                { zh: "青年艺术家协会会员", en: "Member of Youth Artists Association" },
                { zh: "海外青年联合会会员", en: "Member of Overseas Youth Federation" }
            ]
        },
        residencies: {
            title: { zh: "专业经历", en: "Professional Experience" },
            items: [
                { zh: "ZJ STUDIO 创始人", en: "Founder of ZJ STUDIO" },
                { zh: "当代艺术家", en: "Contemporary Artist" },
                { zh: "时尚与纺织品设计师", en: "Fashion and Textile Designer" }
            ]
        },
        publications: {
            title: { zh: "展览经历", en: "Exhibitions" },
            items: [
                { zh: "2023 上海青年艺术家邀请展", en: "2023 Shanghai Young Artists Invitational Exhibition" },
                { zh: "2015 伦敦新设计师展", en: "2015 New Designers, London" }
            ]
        },
        downloadsTitle: { zh: "资料下载", en: "Downloads" },
        cvDownload: { zh: "简历", en: "Curriculum Vitae" },
        cvDescription: { zh: "完整的教育背景和职业经历", en: "Complete educational background and professional experience" },
        statementDownload: { zh: "艺术家陈述", en: "Artist Statement" },
        statementDescription: { zh: "详细的创作理念和艺术哲学", en: "Detailed creative philosophy and artistic philosophy" },
        downloadText: { zh: "下载", en: "Download" }
    },

    // 页脚
    footer: {
        copyright: { zh: "© 2025 周婧. 保留所有权利.", en: "© 2025 Zhou Jing. All rights reserved." }
    }
};

// 语言管理器类
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.isInitialized = false;
        this.init();
    }

    init() {
        // 从本地存储获取语言设置
        const savedLang = localStorage.getItem('language');
        if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
            this.currentLang = savedLang;
        }

        // 立即设置页面语言
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';

        // 使用更频繁的检查来确保翻译及时应用
        this.applyTranslationsRepeatedly();

        // 等待DOM加载完成后绑定事件
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
                this.applyTranslations();
                this.isInitialized = true;
            });
        } else {
            // DOM已经加载完成
            this.bindEvents();
            this.isInitialized = true;
        }
    }

    applyTranslationsRepeatedly() {
        // 立即应用一次
        this.applyTranslations();

        // 然后在短时间内多次应用，确保所有元素都被翻译
        const intervals = [10, 50, 100, 200];
        intervals.forEach(delay => {
            setTimeout(() => this.applyTranslations(), delay);
        });
    }

    bindEvents() {
        // 绑定语言切换按钮
        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', this.currentLang);
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
        this.applyTranslations();

        // 触发语言切换事件
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLang }
        }));
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        // 如果是数组，处理数组中的每个元素
        if (Array.isArray(value)) {
            return value.map(item => {
                if (item && typeof item === 'object' && item[this.currentLang]) {
                    return item[this.currentLang];
                }
                return item;
            });
        }

        // 如果是对象且有当前语言的翻译，返回翻译
        if (value && typeof value === 'object' && value[this.currentLang]) {
            return value[this.currentLang];
        }

        // 如果是字符串，直接返回
        if (typeof value === 'string') {
            return value;
        }

        console.warn(`Translation not found for key: ${key} in language: ${this.currentLang}`);
        return key;
    }

    applyTranslations() {
        // 更新所有带有 data-i18n 属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);

            // 特殊处理数组类型的翻译
            if (Array.isArray(translation)) {
                if (key.includes('statementContent')) {
                    // 处理艺术家陈述内容（段落数组）
                    element.innerHTML = translation.map(paragraph => `<p>${paragraph}</p>`).join('');
                } else if (key.includes('.items')) {
                    // 处理列表项数组
                    element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
                } else {
                    // 其他数组情况，用换行符连接
                    element.textContent = translation.join('\n');
                }
            } else {
                element.textContent = translation;
            }
        });

        // 更新页面标题
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const zhTitle = titleElement.getAttribute('data-zh');
            const enTitle = titleElement.getAttribute('data-en');
            if (zhTitle && enTitle) {
                titleElement.textContent = this.currentLang === 'zh' ? zhTitle : enTitle;
            }
        }

        // 更新语言切换按钮文本
        this.updateLanguageToggle();

        // 更新自定义选择器的文本
        this.updateCustomSelectText();
    }

    updateLanguageToggle() {
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = this.getTranslation('lang.current');
        }

        const langToggle = document.querySelector('.lang-toggle');
        if (langToggle) {
            langToggle.setAttribute('aria-label', this.getTranslation('lang.switch'));
        }
    }

    // 更新自定义选择器的文本
    updateCustomSelectText() {
        const customSelect = document.getElementById('customSelect');
        if (!customSelect) return;

        const selectText = customSelect.querySelector('.select-text');
        const activeOption = customSelect.querySelector('.select-option.active');

        if (selectText && activeOption) {
            const spanElement = activeOption.querySelector('span');
            if (spanElement) {
                const i18nKey = spanElement.getAttribute('data-i18n');
                if (i18nKey) {
                    const translatedText = this.getTranslation(i18nKey);
                    if (translatedText) {
                        selectText.textContent = translatedText;
                    }
                }
            }
        }
    }
}

// 全局函数，供其他脚本使用
function getTranslation(key) {
    if (window.languageManager) {
        return window.languageManager.getTranslation(key);
    }
    return key;
}

// 辅助函数：获取当前语言
function getCurrentLanguage() {
    if (window.languageManager) {
        return window.languageManager.currentLang;
    }
    return 'en';
}

// 辅助函数：获取翻译文本（处理对象格式）
function getTranslationText(textObj) {
    if (!textObj) return '';
    if (typeof textObj === 'string') return textObj;

    const currentLang = getCurrentLanguage();
    if (textObj[currentLang]) {
        return textObj[currentLang];
    }

    // 降级到英文
    return textObj.en || textObj.zh || '';
}

// 立即初始化语言管理器
window.languageManager = new LanguageManager();

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, LanguageManager, getTranslation, getCurrentLanguage, getTranslationText };
} 