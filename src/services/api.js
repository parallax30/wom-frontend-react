import axios from "axios";

const api = axios.create({ 
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

// Interceptor para agregar token desde .env
api.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default api;
