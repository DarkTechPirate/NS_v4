const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&w=600&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `${BACKEND_URL}${imagePath}`;
    return `${BACKEND_URL}/${imagePath}`;
};
