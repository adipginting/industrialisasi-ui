import axios from "axios";

const api = axios.create({
  baseURL: "https://api.industrialisasi.site",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
