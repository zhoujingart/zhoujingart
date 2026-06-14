(function () {
    const heroPaintings = [
        'painting_01.jpg', 'painting_02.jpg', 'painting_03.jpg', 'painting_04.png',
        'painting_05.jpg', 'painting_06.jpg', 'painting_07.jpg', 'painting_08.jpg',
        'painting_09.jpg', 'painting_10.jpg', 'painting_11.jpg', 'painting_12.jpg',
        'painting_13.jpg', 'painting_14.jpg', 'painting_15.jpg', 'painting_16.jpg',
        'painting_17.jpg', 'painting_18.jpg', 'painting_19.jpg', 'painting_20.png',
        'painting_21.png', 'painting_22.png', 'painting_23.png', 'painting_24.png',
        'painting_25.png', 'painting_26.png', 'painting_27.png', 'painting_28.png',
        'painting_29.png', 'painting_30.png', 'painting_31.png', 'painting_32.png',
        'painting_33.jpg', 'painting_34.jpg', 'painting_35.jpg', 'painting_36.jpg',
        'painting_37.png', 'painting_38.png'
    ];

    function getRandomPaintingPath() {
        const fileName = heroPaintings[Math.floor(Math.random() * heroPaintings.length)];
        return `images/paintings/${fileName}`;
    }

    function setHeroBackground(hero, src) {
        hero.style.backgroundImage = `url('${src}')`;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const hero = document.querySelector('[data-random-hero]');
        if (!hero) return;

        const originalPath = getRandomPaintingPath();
        const displayPath = window.getV2ImagePath
            ? window.getV2ImagePath(originalPath, 'hero')
            : `../${originalPath}`;
        const fallbackPath = window.getV2OriginalPath
            ? window.getV2OriginalPath(originalPath)
            : `../${originalPath}`;

        const image = new Image();
        image.onload = () => {
            requestAnimationFrame(() => setHeroBackground(hero, displayPath));
        };
        image.onerror = () => {
            if (fallbackPath && fallbackPath !== displayPath) {
                setHeroBackground(hero, fallbackPath);
            }
        };
        image.src = displayPath;
    });
}());
