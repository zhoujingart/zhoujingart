// 语言切换功能
function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    document.documentElement.lang = newLang;

    // 更新所有带有data-zh和data-en属性的元素
    document.querySelectorAll('[data-zh][data-en]').forEach(element => {
        element.textContent = newLang === 'zh' ? element.dataset.zh : element.dataset.en;
    });

    // 更新标题
    const title = document.querySelector('title');
    if (title) {
        title.textContent = newLang === 'zh' ? title.dataset.zh : title.dataset.en;
    }

    // 更新语言切换按钮文本
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.innerHTML = newLang === 'zh' ?
            '<i class="fas fa-globe"></i> EN' :
            '<i class="fas fa-globe"></i> 中';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化语言切换按钮
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // 初始化标题
    const title = document.querySelector('title');
    if (title) {
        title.textContent = document.documentElement.lang === 'zh' ?
            title.dataset.zh : title.dataset.en;
    }
}); 