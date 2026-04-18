import api from '../api/axios';

export const getAllVenues = async (params) => {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await api.get(`/venues?${queryParams}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVenueById = async (id) => {
    try {
        const response = await api.get(`/venues/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createVenue = async (data) => {
    try {
        const response = await api.post('/venues', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVenue = async (id, data) => {
    try {
        const response = await api.put(`/venues/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadVenueImage = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post(`/venues/${id}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
