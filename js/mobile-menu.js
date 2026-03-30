// 移动端菜单功能
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navRight) {
        // 点击汉堡菜单按钮切换菜单
        mobileToggle.addEventListener('click', function () {
            toggleMenu();
        });

        // 点击导航链接时关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // 点击菜单外部区域关闭菜单
        navRight.addEventListener('click', function (e) {
            if (e.target === navRight) {
                closeMenu();
            }
        });

        // ESC键关闭菜单
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navRight.classList.contains('active')) {
                closeMenu();
            }
        });

        // 窗口调整大小时关闭菜单
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && navRight.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    function toggleMenu() {
        navRight.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    function closeMenu() {
        navRight.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}); 