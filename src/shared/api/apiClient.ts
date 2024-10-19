import axios from "axios";
import { useAuthStore } from "../../app/entities/auth/model/use-auth-store";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
