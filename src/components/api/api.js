import axios from "axios";

const api = axios.create({
  baseURL: "https://api.industrialisasi.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
