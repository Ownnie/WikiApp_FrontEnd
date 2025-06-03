
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from localStorage
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    // If a token exists, add the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};
