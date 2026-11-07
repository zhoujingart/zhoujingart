// Deliberate hanging order; artwork information comes from shared content.
document.addEventListener('DOMContentLoaded', () => {
    function renderFolio() {
        const language = window.siteI18n.getLanguage('en');
        const text = value => window.siteI18n.text(value, language);
        const works = window.siteContent.artworks;
        const find = number => works.find(work => work.id === `gallery-painting-${number}`);
        function mountArtwork(container, work, index, hero = false) {
            if (!work) return;
            const figure = document.createElement('figure');
            figure.className = 'folio-work';
            const link = document.createElement('a');
            link.href = `gallery.html#${work.id}`;
            link.className = 'folio-art-link';
            const img = document.createElement('img');
            img.alt = text(work.title);
            img.loading = hero ? 'eager' : 'lazy';
            img.decoding = 'async';
            if (hero) img.fetchPriority = 'high';
            window.siteMedia.setImageSource(img, work.image, 'card', '../');
            img.loading = hero ? 'eager' : 'lazy';
            link.append(img);
            const caption = document.createElement('figcaption');
            const title = document.createElement('span');
            title.textContent = `${index} — ${text(work.title)}`;
            const meta = document.createElement('span');
            meta.textContent = `${text(work.medium)} · ${work.year} · ${work.size}`;
            caption.append(title, meta);
            figure.append(link, caption);
            container.append(figure);
        }
        const hero = document.getElementById('folio-feature');
        const selection = document.getElementById('folio-works');
        hero.replaceChildren();
        selection.replaceChildren();
        mountArtwork(hero, find('38'), '01', true);
        ['02', '37', '40', '01'].forEach((id, i) => mountArtwork(selection, find(id), String(i + 2).padStart(2, '0')));
    }
    renderFolio();
    document.addEventListener('languageChanged', renderFolio);
});
