const API_URL = "https://simple-social-media-api.dev.nachert.art";

// Register a new user
export const register = async (userData) => {
    const res = await fetch(`${API_URL}/register/`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Registration failed");
    }
    
    return res.json();
};

// Login user
export const login = async (credentials) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const res = await fetch(`${API_URL}/login/`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
    });
    
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Login failed");
    }
    
    const data = await res.json();
    
    // Store token in localStorage
    localStorage.setItem('access_token', data.access_token);
    
    return data;
};

// Get current user
export const getCurrentUser = async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        throw new Error("No access token found");
    }
    
    const res = await fetch(`${API_URL}/users/me/`, {
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('access_token');
        }
        throw new Error("Failed to get current user");
    }
    
    return res.json();
};

// Logout user
export const logout = () => {
    localStorage.removeItem('access_token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

// Get stored token
export const getToken = () => {
    return localStorage.getItem('access_token');
};

// Debug function to check authentication status
export const debugAuth = () => {
    const token = localStorage.getItem('access_token');
    return {
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
    };
}; 