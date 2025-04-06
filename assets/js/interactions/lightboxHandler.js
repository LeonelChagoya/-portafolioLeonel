export function setupLightbox() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('close-lightbox');

    thumbnails.forEach(img => {
        img.addEventListener('click', () => {
            const src = img.dataset.full;
            lightboxImage.src = src;
            lightbox.classList.remove('hidden');
        });
    });

    closeBtn?.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightboxImage.src = '';
    });
}
