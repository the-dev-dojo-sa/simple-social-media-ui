import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutService, isAuthenticated, login as loginService, register as registerService, debugAuth } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (isAuthenticated()) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const data = await loginService(credentials);
            
            // Get user data
            const userData = await getCurrentUser();
            setUser(userData);
            console.log('Login successful:', debugAuth());
            return userData;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            
            // First register the user
            const registeredUser = await registerService(userData);
            console.log('Registration successful:', registeredUser);
            
            // Then automatically log them in to get the access token
            const loginData = await loginService({
                username: userData.username,
                password: userData.password
            });
            console.log('Auto-login after registration:', debugAuth());
            
            // Get the full user data with the token
            const fullUserData = await getCurrentUser();
            setUser(fullUserData);
            console.log('Full user data retrieved:', fullUserData);
            
            return fullUserData;
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
        setError(null);
        console.log('Logout completed');
    };

    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 