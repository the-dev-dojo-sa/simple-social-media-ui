import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { debugAuth } from '../../services/auth';

const AuthDebugger = () => {
    const { user, isAuthenticated, loading, error } = useAuth();
    const authDebug = debugAuth();

    if (process.env.NODE_ENV === 'production') {
        return null; // Don't show in production
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm text-xs">
            <h3 className="font-bold mb-2">Auth Debug</h3>
            <div className="space-y-1">
                <div>Loading: {loading ? 'Yes' : 'No'}</div>
                <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
                <div>Has Token: {authDebug.hasToken ? 'Yes' : 'No'}</div>
                <div>Token Length: {authDebug.tokenLength}</div>
                <div>Token Preview: {authDebug.tokenPreview}</div>
                {user && (
                    <div>User: {user.username} ({user.email})</div>
                )}
                {error && (
                    <div className="text-red-400">Error: {error}</div>
                )}
            </div>
        </div>
    );
};

export default AuthDebugger; 