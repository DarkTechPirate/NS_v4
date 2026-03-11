import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as apiLogout } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const response = await getMe();
            if (response.success && response.user) {
                setUser(response.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            // console.error("Not authenticated");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = (userData) => {
        setUser(userData);
    };

    const logoutUser = async () => {
        try {
            await apiLogout();
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
