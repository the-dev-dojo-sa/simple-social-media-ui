const API_URL = "https://simple-social-media-api.dev.nachert.art";

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return token ? { "Authorization": `Bearer ${token}` } : {};
};

export const getPosts = async () => {
    const headers = {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
    };
    
    const res = await fetch(`${API_URL}/posts/`, {
        mode: "cors",
        headers
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('access_token');
            throw new Error("Authentication required");
        }
        if (res.status === 403) {
            throw new Error("Access forbidden - please log in again");
        }
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "Failed to fetch posts");
    }
    
    return res.json();
};

export const createPost = async (postData) => {
    const headers = {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
    };
    
    const res = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        mode: "cors",
        headers,
        body: JSON.stringify(postData),
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('access_token');
            throw new Error("Authentication required");
        }
        if (res.status === 403) {
            throw new Error("Access forbidden - please log in again");
        }
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "Failed to create post");
    }
    
    return res.json();
};

// Generic authenticated request helper
export const authenticatedRequest = async (url, options = {}) => {
    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        mode: "cors",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    
    if (!res.ok) {
        if (res.status === 401) {
            localStorage.removeItem('access_token');
            throw new Error("Authentication required");
        }
        if (res.status === 403) {
            throw new Error("Access forbidden - please log in again");
        }
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || "Request failed");
    }
    
    return res.json();
};
