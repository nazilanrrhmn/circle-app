import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL;

export const apiV1 = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

apiV1.interceptors.request.use(
  (config) => {
    // Ambil token terbaru dari cookies
    const token = Cookies.get("token");

    if (token) {
      // Setel ulang header Authorization dengan token terbaru
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Tangani error request di sini
    return Promise.reject(error);
  }
);
