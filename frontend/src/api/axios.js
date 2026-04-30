import axios from "axios";

const api = axios.create({
  // If VITE_API_URL is missing, fall back to local backend.
  // Expected value: "http://localhost:5000/api"
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;