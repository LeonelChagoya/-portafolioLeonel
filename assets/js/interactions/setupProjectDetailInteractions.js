export function setupProjectDetailInteractions() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');
    const leftArrow = document.getElementById('arrow-left');
    const rightArrow = document.getElementById('arrow-right');

    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;

    const updateMainImage = (index) => {
        const selectedThumbnail = thumbnails[index];
        if (!selectedThumbnail) return;

        mainImage.src = selectedThumbnail.dataset.full;
        thumbnails.forEach(img => img.classList.remove('selected'));
        selectedThumbnail.classList.add('selected');
        currentIndex = index;
    };

    // Asignar eventos a thumbnails
    thumbnails.forEach((img, idx) => {
        img.addEventListener('click', () => updateMainImage(idx));
    });

    // Asignar eventos a flechas
    leftArrow?.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        updateMainImage(newIndex);
    });

    rightArrow?.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % thumbnails.length;
        updateMainImage(newIndex);
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('close-lightbox');

    mainImage.addEventListener('click', () => {
        if (lightbox && lightboxImage) {
            lightboxImage.src = mainImage.src;
            lightbox.classList.remove('hidden');
        }
    });

    closeBtn?.addEventListener('click', () => {
        if (lightbox && lightboxImage) {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
        }
    });
}
