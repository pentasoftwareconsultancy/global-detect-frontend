import api from "./apiService";

export const authService = {
  login: (data) => api.post("/api/auth/login", data),
  signup: (data) => api.post("/api/auth/signup", data),
  getProfile: () => api.get("/api/user/profile"),
};