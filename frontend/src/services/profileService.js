import api from '../api/axios';

export const updateProfileInfo = async (data) => {
    const response = await api.put('/profile/info', data);
    return response.data;
};

export const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/profile/profile-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getDashboardData = async () => {
    const response = await api.get('/profile/dashboard');
    return response.data;
};
