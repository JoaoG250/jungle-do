import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { authService } from "@/services/auth.service";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({ baseURL, withCredentials: true });

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await authService.refresh();
        useAuthStore.getState().login(response.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return apiClient(originalRequest);
      } catch (error) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
