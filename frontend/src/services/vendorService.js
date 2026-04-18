import api from '../api/axios';

export const getAllVendors = async (params) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await api.get(`/vendors?${queryParams}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVendorById = async (id) => {
    try {
        const response = await api.get(`/vendors/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createVendor = async (data) => {
    try {
        const response = await api.post('/vendors', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVendor = async (id, data) => {
    try {
        const response = await api.put(`/vendors/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadVendorImage = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post(`/vendors/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
