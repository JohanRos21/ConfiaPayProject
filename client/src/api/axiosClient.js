// client/src/api/axiosClient.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("🔥 API URL cargada en producción:", API_URL);

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
