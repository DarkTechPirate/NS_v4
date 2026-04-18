import api from '../api/axios';

export const getConversations = async () => {
    const response = await api.get('/messages');
    return response.data;
};

export const getMessages = async (conversationId) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
};

export const sendMessage = async (conversationId, text) => {
    const response = await api.post(`/messages/${conversationId}`, { text });
    return response.data;
};

export const createConversation = async (targetId) => {
    const response = await api.post('/messages', { targetId });
    return response.data;
};

export const getUnreadMessageCount = async () => {
    const response = await api.get('/messages/unread');
    return response.data;
};
