import { api } from "./axios";
import type { ApiResponse } from "@repo/types";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: string;
  email: string;
}

export class AuthApi {
  static async register(data: RegisterPayload) {
    const response = await api.post("/auth/register", data);

    return response.data;
  }

  static async login(data: LoginPayload) {
    const response = await api.post("/auth/login", data);

    return response.data;
  }

  static async logout() {
    const response = await api.post("/auth/logout");

    return response.data;
  }

  static async logoutAll() {
    const response = await api.post("/auth/logout-all");

    return response.data;
  }

  static async me() {
    const response = await api.get<ApiResponse<CurrentUser>>("/auth/me");

    return response.data.data;
  }

  static async refresh() {
    const response = await api.post("/auth/refresh");

    return response.data;
  }
}
