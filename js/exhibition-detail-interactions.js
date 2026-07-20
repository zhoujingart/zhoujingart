function bindExhibitionDetailInteractions(container, exhibition, getText) {
    const openViewer = (event) => {
        const trigger = event.target.closest('.viewer-trigger');
        if (!trigger) return;

        const index = Number(trigger.dataset.viewerIndex);
        if (!Number.isInteger(index)) return;

        if (trigger.dataset.viewerType === 'image') {
            openImageViewer(index, exhibition.id);
        } else if (trigger.dataset.viewerType === 'artwork') {
            const artwork = exhibition.artworks[index];
            if (artwork) openArtworkViewer(artwork.image, getText(artwork, 'title'));
        } else if (trigger.dataset.viewerType === 'document') {
            const documentItem = exhibition.documents[index];
            if (documentItem) openCertificateViewer(documentItem.image, getText(documentItem, 'title'));
        }
    };

    container.onclick = openViewer;
    container.onkeydown = (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('.viewer-trigger')) {
            event.preventDefault();
            openViewer(event);
        }
    };
}
