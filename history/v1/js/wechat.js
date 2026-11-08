document.addEventListener('DOMContentLoaded', function () {
    const wechatLink = document.getElementById('wechat-link');
    const wechatModal = document.getElementById('wechatModal');

    // 检查元素是否存在
    if (!wechatLink || !wechatModal) {
        console.warn('WeChat elements not found on this page');
        return;
    }

    const closeBtn = wechatModal.querySelector('.modal-close');

    // 点击微信图标显示二维码
    wechatLink.addEventListener('click', function (e) {
        e.preventDefault();
        wechatModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 点击关闭按钮或背景关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            console.log('Close button clicked');
            wechatModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }

    // 点击模态框背景关闭
    wechatModal.addEventListener('click', function (e) {
        if (e.target === wechatModal) {
            console.log('Modal background clicked');
            wechatModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && wechatModal.style.display === 'flex') {
            wechatModal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    });
}); 