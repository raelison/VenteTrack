
import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Intercepteur pour gérer les erreurs d'authentification (ex: token expiré)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
