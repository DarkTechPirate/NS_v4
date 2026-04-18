import api from '../api/axios';

export const getPlatformStats = async () => {
    try {
        const response = await api.get('/admin/stats');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllProvidersAdmin = async () => {
    try {
        const response = await api.get('/admin/providers');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyProvider = async (providerId, providerType) => {
    try {
        const response = await api.put('/admin/providers/verify', { providerId, providerType });
        return response.data;
    } catch (error) {
        throw error;
    }
};
