// Random hero background image from images/paintings (jpg/png)
// 使用 requestAnimationFrame 优化性能
document.addEventListener('DOMContentLoaded', () => {
    const heroImg = document.getElementById('heroRandomImage');
    if (!heroImg) return;

    // Maintain an allow-list to avoid non-art files if any
    const candidates = [
        'painting_01.jpg', 'painting_02.jpg', 'painting_03.jpg', 'painting_04.png', 'painting_05.jpg', 'painting_06.jpg',
        'painting_07.jpg', 'painting_08.jpg', 'painting_09.jpg', 'painting_10.jpg', 'painting_11.jpg', 'painting_12.jpg',
        'painting_13.jpg', 'painting_14.jpg', 'painting_15.jpg', 'painting_16.jpg', 'painting_17.jpg', 'painting_18.jpg',
        'painting_19.jpg', 'painting_33.jpg', 'painting_34.jpg', 'painting_35.jpg', 'painting_36.jpg', 'painting_37.png'
    ];

    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    const path = `images/paintings/${pick}`;

    // Preload then swap for smoother UX with requestAnimationFrame
    const img = new Image();
    img.onload = () => {
        requestAnimationFrame(() => {
            heroImg.src = path;
        });
    };
    img.onerror = () => { /* keep default */ };
    img.src = path;
});
