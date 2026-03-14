import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

import { authService } from "../services";
import { useAuthStore } from "../store";
import type { LoginRequest, AuthResponse } from "../types";
import type { UserRole } from "@/shared/types";

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}

/**
 * Hook xử lý login – không dùng useCrud (không phải CRUD pattern).
 * Decode JWT lấy role, lưu vào Zustand store, redirect dựa vào role.
 */
export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();

  // Lấy trang trước đó (nếu bị redirect từ ProtectedRoute)
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/";

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (res) => {
      // Decode JWT để lấy role
      const decoded = jwtDecode<JwtPayload>(res.accessToken);

      setAuth({
        accessToken: res.accessToken,
        role: decoded.role,
      });

      toast.success("Đăng nhập thành công!");

      // Admin → /admin, User → trang trước đó hoặc /
      if (decoded.role === "admin") {
        navigate("/admin/rituals", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    },
  });
}
