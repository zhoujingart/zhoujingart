document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000); // Simulate loading time or wait for assets
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Add a slight delay for the follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects for cursor
    const links = document.querySelectorAll('a, .menu-toggle, .menu-close, .exhibition-item-row, .gallery-item, button, .filter-btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'transparent';
            cursor.style.border = '1px solid var(--text-color)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.background = 'rgba(128,128,128,0.1)';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--text-color)';
            cursor.style.border = 'none';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.background = 'transparent';
        });
    });

    // Theme Toggle
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-adjust"></i>';
    themeToggle.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--text-color);
        color: var(--bg-color);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 2rem auto 0;
        transition: transform 0.3s ease;
    `;

    // Hover effect for theme toggle
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });

    const menuFooter = document.querySelector('.menu-footer');
    if (menuFooter) {
        menuFooter.appendChild(themeToggle);
    } else {
        document.body.appendChild(themeToggle);
        themeToggle.style.position = 'fixed';
        themeToggle.style.bottom = '2rem';
        themeToggle.style.right = '2rem';
        themeToggle.style.zIndex = '10001';
    }    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    function toggleMenu() {
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    menuClose.addEventListener('click', toggleMenu);

    // Close menu when clicking on the overlay background
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay || e.target.classList.contains('menu-items') || e.target.classList.contains('menu-footer')) {
            toggleMenu();
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Hero Parallax Effect
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < window.innerHeight) {
                        heroImage.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }    // Horizontal Scroll for Works (Wheel event)
    const worksGallery = document.querySelector('.works-gallery');
    if (worksGallery) {
        worksGallery.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                worksGallery.scrollLeft += e.deltaY;
            }
        });
    }

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 500);
                    }
                });
            });
        });
    }

    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDesc = document.querySelector('.lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    const lightboxNext = document.querySelector('.lightbox-nav.next');
    let currentImageIndex = 0;
    let visibleItems = [];

    if (lightbox) {
        // Open Lightbox using Event Delegation
        document.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('.view-btn');
            const imgContainer = e.target.closest('.gallery-img-container');

            if (viewBtn || imgContainer) {
                const item = e.target.closest('.gallery-item');
                if (item) {
                    // Update visible items list based on current filter
                    visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
                    const visibleIndex = visibleItems.indexOf(item);

                    if (visibleIndex !== -1) {
                        currentImageIndex = visibleIndex;
                        updateLightboxContent();
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                }
            }
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Navigation
        const showNextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
            updateLightboxContent();
        };

        const showPrevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
            updateLightboxContent();
        };

        if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        });

        function updateLightboxContent() {
            const currentItem = visibleItems[currentImageIndex];
            const img = currentItem.querySelector('img');
            const title = currentItem.querySelector('h3').textContent;
            // Check if p tag exists, sometimes it might be different structure
            const p = currentItem.querySelector('p');
            const desc = p ? p.textContent : '';

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = desc;
        }
    }
});
