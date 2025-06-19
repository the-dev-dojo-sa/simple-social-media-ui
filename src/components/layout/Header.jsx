import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setShowDropdown(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
                    SocialSphere
                </Link>
                
                {isAuthenticated ? (
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Feed
                        </Link>
                        <Link
                            to="/profile"
                            className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/messages"
                            className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Messages
                        </Link>
                        
                        {/* User dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none"
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                                <span>{user?.username}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                        <div className="font-medium">{user?.username}</div>
                                        <div className="text-gray-500">{user?.email}</div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                ) : (
                    <nav className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-gray-600 hover:text-blue-600"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            Sign up
                        </Link>
                    </nav>
                )}
                
                {/* Mobile menu button */}
                <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            
            {/* Mobile menu dropdown */}
            {isAuthenticated && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="px-4 py-2 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Feed
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/messages"
                            className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Messages
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
