import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/shared/constants";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/features/auth/types";

/**
 * Auth Service - login & register endpoints.
 * Không dùng BaseService vì không phải CRUD pattern.
 */
export const authService = {
  /**
   * Đăng nhập với email và password.
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    ) as unknown as Promise<AuthResponse>;
  },

  /**
   * Đăng ký tài khoản mới.
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    ) as unknown as Promise<AuthResponse>;
  },

  /**
   * Đăng xuất (xóa refresh token cookie).
   */
  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
