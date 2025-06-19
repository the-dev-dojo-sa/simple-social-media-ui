import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/layout/Header";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/ui/ErrorBoundary";

export default function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Router>
                    <Header />
                    <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                        <Routes>
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                            <Route 
                                path="/" 
                                element={
                                    <ProtectedRoute>
                                        <FeedPage />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/profile" 
                                element={
                                    <ProtectedRoute>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route 
                                path="/messages" 
                                element={
                                    <ProtectedRoute>
                                        <MessagesPage />
                                    </ProtectedRoute>
                                } 
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </Router>
            </AuthProvider>
        </ErrorBoundary>
    );
}
