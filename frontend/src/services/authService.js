import api from '../api/axios';

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

export const logout = async () => {
    const response = await api.get('/auth/logout');
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const googleOneTapLogin = async (token) => {
    const response = await api.post('/auth/google/onetap', { token });
    return response.data;
};
