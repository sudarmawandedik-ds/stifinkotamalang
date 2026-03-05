// LAZY LOAD IMAGES section
const lazyLoadImages = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                console.log('Observing image:', src);
                img.src = src;
                img.onload = () => {
                    console.log('Image loaded successfully:', src);
                };
                img.onerror = () => {
                    console.warn('Failed to load image:', src);
                    img.src = 'fallback-image.jpg'; // Path to fallback image
                };
            } else {
                console.warn('Missing data-src attribute for an image.');
            }
            observer.unobserve(img);
        }
    });
});

lazyLoadImages.forEach(img => {
    imgObserver.observe(img);
});