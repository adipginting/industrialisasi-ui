import axios from "axios";

const api = axios.create({
  baseURL:
    window.location.host === "industrialisasi.site"
      ? "https://api.industrialisasi.site/blog"
      : "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
