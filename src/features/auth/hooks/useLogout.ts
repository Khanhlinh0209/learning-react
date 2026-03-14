import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "../services";
import { useAuthStore } from "../store";

/**
 * Hook xử lý logout – không dùng useCrud (không phải CRUD pattern).
 *
 * ⚠️ QUAN TRỌNG:
 * - Xóa auth state (token + role)
 * - Xóa TẤT CẢ cache của React Query (tránh user sau thấy data user trước)
 * - Redirect về trang login
 * - Dù API logout fail, client vẫn phải force logout (UX > API consistency)
 */
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation<void, Error, void>({
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      // 1. Xóa token + role trong store
      clearAuth();

      // 2. ⚠️ XÓA SẠCH cache React Query (privacy/security critical!)
      // Tránh: User A logout → User B login → thấy data của User A
      queryClient.removeQueries();

      // 3. Redirect về login
      navigate("/login", { replace: true });

      toast.success("Đăng xuất thành công!");
    },

    onError: () => {
      // ⚠️ DÙ API LỖI, client vẫn PHẢI logout để đảm bảo UX
      // Lý do: User click "Logout" = User muốn logout
      // → Không thể để họ stuck vì backend/network issues
      clearAuth();
      queryClient.removeQueries();
      navigate("/login", { replace: true });

      toast.info("Đã đăng xuất (offline)");
    },
  });
}
