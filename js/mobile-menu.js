// 移动端菜单功能
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileViewport = window.matchMedia('(max-width: 768px)');
    let lastMenuTrigger = null;

    if (mobileToggle && navRight) {
        function isMobileViewport() {
            return mobileViewport.matches;
        }

        function syncMenuAccessibility() {
            if (!isMobileViewport()) {
                navRight.removeAttribute('aria-hidden');
                return;
            }

            navRight.setAttribute('aria-hidden', String(!navRight.classList.contains('active')));
        }

        // 点击汉堡菜单按钮切换菜单
        mobileToggle.addEventListener('click', function () {
            toggleMenu();
        });

        // 点击导航链接时关闭菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMenu({ restoreFocus: false });
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
        mobileViewport.addEventListener('change', function () {
            if (!isMobileViewport() && navRight.classList.contains('active')) {
                closeMenu({ restoreFocus: false });
            }
            syncMenuAccessibility();
        });

        syncMenuAccessibility();
    }

    function toggleMenu() {
        const isOpen = navRight.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        navRight.setAttribute('aria-hidden', String(!isOpen));

        if (isOpen) {
            lastMenuTrigger = document.activeElement;
            window.setTimeout(function () {
                navRight.querySelector('.nav-link')?.focus();
            }, 50);
        } else if (lastMenuTrigger instanceof HTMLElement) {
            lastMenuTrigger.focus();
            lastMenuTrigger = null;
        }
    }

    function closeMenu({ restoreFocus = true } = {}) {
        navRight.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileViewport.matches) navRight.setAttribute('aria-hidden', 'true');
        else navRight.removeAttribute('aria-hidden');

        if (restoreFocus && lastMenuTrigger instanceof HTMLElement) {
            lastMenuTrigger.focus();
        }
        lastMenuTrigger = null;
    }
});
