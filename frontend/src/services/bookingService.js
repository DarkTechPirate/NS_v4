import api from '../api/axios';

export const createBooking = async (data) => {
    try {
        const response = await api.post('/bookings', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyBookings = async () => {
    try {
        const response = await api.get('/bookings/my-bookings');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProviderBookings = async (providerId) => {
    try {
        const response = await api.get(`/bookings/provider/${providerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBookingStatus = async (id, status) => {
    try {
        const response = await api.put(`/bookings/${id}/status`, { status });
        return response.data;
    } catch (error) {
        throw error;
    }
};
