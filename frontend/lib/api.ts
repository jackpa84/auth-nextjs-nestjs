import axios from 'axios';
import { AuthService } from './auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http:
});


api.interceptors.request.use(
  (config) => {
    
    const publicRoutes = ['/auth/login', '/auth/register', '/auth/refresh'];
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    if (!isPublicRoute) {
      const token = AuthService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await AuthService.refreshAuthToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        AuthService.clearTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);