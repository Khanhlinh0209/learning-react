import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services";
import type { RegisterRequest, AuthResponse } from "../types";

/**
 * Hook xử lý đăng ký – không dùng useCrud (không phải CRUD pattern).
 * Thành công → redirect về trang login.
 */
export function useRegister() {
  const navigate = useNavigate();

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: (data) => authService.register(data),
    onSuccess: () => {
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login", { replace: true });
    },
  });
}
