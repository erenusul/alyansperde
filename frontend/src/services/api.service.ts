import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // Network error (backend'e ulaşılamıyor)
    if (!error.response) {
      console.error('Network Error:', error.message);
      console.error('API URL:', API_URL);
      console.error('Request URL:', error.config?.url);
      // Login/Register sayfalarında network hatasını göster
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        return Promise.reject(new Error('Backend sunucusuna bağlanılamıyor. Lütfen backend\'in çalıştığından emin olun.'));
      }
    }
    
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname === '/login' || window.location.pathname === '/register';
      if (!isLoginPage) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
