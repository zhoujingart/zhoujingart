document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.removeAttribute('data-theme');

    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    function setMenuOpen(isOpen) {
        if (!menuOverlay) return;
        menuOverlay.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => setMenuOpen(true));
    }

    if (menuClose && menuOverlay) {
        menuClose.addEventListener('click', () => setMenuOpen(false));
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', (event) => {
            if (event.target === menuOverlay) {
                setMenuOpen(false);
            }
        });
    }

    menuLinks.forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    const introSection = document.querySelector('.intro-section');
    if (scrollIndicator && introSection) {
        scrollIndicator.addEventListener('click', () => {
            introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-nav.prev');
    const lightboxNext = lightbox.querySelector('.lightbox-nav.next');

    let currentImageIndex = 0;
    let visibleItems = [];

    function getVisibleGalleryItems() {
        return Array.from(document.querySelectorAll('.gallery-item')).filter((item) => {
            return !item.classList.contains('hidden') && item.offsetParent !== null;
        });
    }

    function updateLightboxContent() {
        const currentItem = visibleItems[currentImageIndex];
        if (!currentItem || !lightboxImg) return;

        const img = currentItem.querySelector('img');
        if (!img) return;

        const title = currentItem.querySelector('h3');
        const description =
            currentItem.querySelector('.gallery-size') ||
            currentItem.querySelector('.gallery-info p:last-child') ||
            currentItem.querySelector('p');

        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || '';

        if (lightboxTitle) {
            lightboxTitle.textContent = title ? title.textContent : img.alt || '';
        }

        if (lightboxDesc) {
            lightboxDesc.textContent = description ? description.textContent : '';
        }
    }

    function openLightbox(item) {
        visibleItems = getVisibleGalleryItems();
        currentImageIndex = visibleItems.indexOf(item);
        if (currentImageIndex < 0) return;

        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = document.body.classList.contains('menu-open') ? 'hidden' : '';
        if (lightboxImg) {
            lightboxImg.removeAttribute('src');
        }
    }

    function showNextImage() {
        if (!visibleItems.length) return;
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        if (!visibleItems.length) return;
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxContent();
    }

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('.view-btn, .gallery-img-container');
        if (!trigger) return;

        const item = trigger.closest('.gallery-item');
        if (item) {
            openLightbox(item);
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) return;

        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowRight') showNextImage();
        if (event.key === 'ArrowLeft') showPrevImage();
    });
});
