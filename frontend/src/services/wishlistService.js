import api from '../api/axios';

export const getWishlist = async () => {
    const response = await api.get('/wishlist');
    return response.data;
};

export const addToWishlist = async (providerId, providerModel) => {
    const response = await api.post('/wishlist', { providerId, providerModel });
    return response.data;
};

export const removeFromWishlist = async (providerId) => {
    const response = await api.delete(`/wishlist/${providerId}`);
    return response.data;
};
