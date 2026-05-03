import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';

const Messages = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef();

    useEffect(() => {
        if (!user) return;
        socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
            path: '/ws/',
            withCredentials: true
        });
        socketRef.current.on('connect', () => {
            socketRef.current.emit('join', user._id);
        });

        socketRef.current.on('newMessage', (message) => {
            if (activeConversation && message.conversation === activeConversation._id) {
                setMessages(prev => [...prev, message]);
            }
            fetchConversations();
        });

        fetchConversations();

        return () => {
            socketRef.current.disconnect();
        };
    }, [user, activeConversation]);

    const fetchConversations = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/messages`, { withCredentials: true });
            setConversations(res.data);
        } catch (error) {
            console.error('Failed to fetch conversations', error);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/messages/${conversationId}`, { withCredentials: true });
            setMessages(res.data);
        } catch (error) {
            console.error('Failed to fetch messages', error);
        }
    };

    const handleSelectConversation = (conv) => {
        setActiveConversation(conv);
        fetchMessages(conv._id);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/messages/${activeConversation._id}`, { text: newMessage }, { withCredentials: true });
            setMessages(prev => [...prev, res.data]);
            setNewMessage('');
            fetchConversations();
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const getOtherParticipant = (participants) => {
        return participants.find(p => p._id !== user._id) || participants[0];
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/3 bg-white rounded-lg shadow border flex flex-col overflow-hidden h-[700px]">
                    <div className="p-4 border-b bg-gray-100 font-bold text-gray-700">Conversations</div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="p-4 text-gray-500 text-center">No conversations yet.</div>
                        ) : (
                            conversations.map(conv => {
                                const other = getOtherParticipant(conv.participants);
                                return (
                                    <div 
                                        key={conv._id} 
                                        onClick={() => handleSelectConversation(conv)}
                                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${activeConversation?._id === conv._id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                    >
                                        <h4 className="font-bold text-gray-800">{other.fullname} <span className="text-xs text-gray-400 capitalize">({other.role})</span></h4>
                                        <p className="text-sm text-gray-500 truncate">{conv.lastMessage?.text || "Started a conversation"}</p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="hidden md:flex flex-1 bg-white rounded-lg shadow border flex-col overflow-hidden h-[700px]">
                    {activeConversation ? (
                        <>
                            <div className="p-4 border-b bg-gray-100 font-bold text-gray-700 flex items-center justify-between">
                                <span>{getOtherParticipant(activeConversation.participants).fullname}</span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map(msg => {
                                    const isMe = msg.sender._id === user._id || msg.sender === user._id;
                                    return (
                                        <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white flex gap-2">
                                <input 
                                    type="text" 
                                    value={newMessage} 
                                    onChange={(e) => setNewMessage(e.target.value)} 
                                    placeholder="Type a message..." 
                                    className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                                />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400">
                            Select a conversation to start chatting.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
