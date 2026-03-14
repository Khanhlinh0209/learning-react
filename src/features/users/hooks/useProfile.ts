import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/shared/constants";
import { userService } from "../services";
import type { UpdateProfileDto } from "../types";

/**
 * Hook lấy profile user hiện tại.
 */
export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: () => userService.getMe(),
  });
}

/**
 * Hook mutation cập nhật profile.
 * Sau khi thành công → invalidate cache để refetch.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => userService.update("", data), // ID ignored
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME });
    },
  });
}
