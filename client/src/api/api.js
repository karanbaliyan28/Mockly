// client/src/api/api.js
import axios from "axios";

// Create a new Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend's base URL
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    // Get user info from local storage
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    // If the user is logged in, add the token to the headers
    if (userInfo && userInfo.token) {
      config.headers["Authorization"] = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
