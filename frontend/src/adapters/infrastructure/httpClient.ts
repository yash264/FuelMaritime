import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:4000", // adjust to your backend port
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional interceptors for logging or auth
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);
