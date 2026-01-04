import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }

    return null;
}

api.interceptors.request.use(
    (config) => {
        // Get CSRF token from the cookie stored by the Laravel App
        const token = getCookie('XSRF-TOKEN') || getCookie('xsrf-token') || getCookie('laravel_session');

        if (token) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        } else {
            console.warn('CSRF token not found in cookies');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 401 is Unauthorised access, now we handle redirects
            if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        if (error.response?.status === 419) {
            console.error('CSRF token mismatch - try refreshing');
        }

        return Promise.reject(error);
    }
)

export default api;