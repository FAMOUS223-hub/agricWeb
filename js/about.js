// About Page Gallery Modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('imgPopup');
    const captionText = document.getElementById('caption');
    const galleryImages = document.querySelectorAll('.hover-lift');
    const closeBtn = document.getElementById('closeModal');

    if (modal && modalImg) {
        galleryImages.forEach(img => {
            // Only attach to images in the gallery
            if (img.tagName === 'IMG' && img.parentElement.classList.contains('stagger-children')) {
                img.addEventListener('click', function() {
                    modal.style.display = "flex";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt || "AgricWorld Gallery";
                    document.body.style.overflow = 'hidden'; // Prevent scroll
                });
            }
        });

        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            };
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        };
    }
});