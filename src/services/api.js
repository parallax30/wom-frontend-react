import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

if (!apiBaseUrl) {
  throw new Error("Missing required environment variable: NEXT_PUBLIC_API_URL or NEXT_PUBLIC_STRAPI_URL");
}

const api = axios.create({ 
  baseURL: `${apiBaseUrl.replace(/\/$/, "")}/api`,
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
