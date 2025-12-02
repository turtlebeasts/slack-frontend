import { apiClient } from "../../shared/lib/apiClient";

export const authApi = {
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),

  register: (name, email, password) =>
    apiClient.post("/auth/register", { name, email, password }),
};
