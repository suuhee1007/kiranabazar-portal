import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://kiranabazar-services.onrender.com/api';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kiranabazar_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);
export const fetchProducts = () => api.get('/products');
export const placeOrder = (payload) => api.post('/orders', payload);

export default api;
