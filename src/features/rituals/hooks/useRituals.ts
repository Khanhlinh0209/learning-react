import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMemo } from "react";

import { QUERY_KEYS } from "@/shared/constants";
import {
  ritualService,
  ritualCategoryService,
} from "@/features/rituals/services";
import type {
  CreateRitualDto,
  UpdateRitualDto,
  RitualFilterParams,
} from "@/features/rituals/types";

/**
 * Hook lấy danh sách rituals với pagination và filters.
 * Đồng bộ filters với URL search params.
 *
 * Luồng hoạt động:
 * URL thay đổi → searchParams cập nhật → filters mới → queryKey mới → React Query tự động fetch lại
 *
 * Lợi ích: User có thể bookmark/share link với filter đang chọn
 */
export function useRituals() {
  // Hook của React Router - đọc query string từ URL (vd: ?page=2&search=abc)
  const [searchParams] = useSearchParams();

  // Tác dụng: Chạy một hàm tính toán tốn tài nguyên và lưu kết quả (cache). Nó chỉ tính toán lại khi dependency thay đổi.
  // Ví dụ: Dùng khi cần filter, map, hoặc tính toán một mảng lớn mà không muốn làm lại mỗi khi component re-render.
  // Cú pháp: const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  // Parse filters từ URL params
  // useMemo đảm bảo object chỉ tạo lại khi searchParams thay đổi → tránh re-render không cần thiết
  const filters = useMemo<RitualFilterParams>(() => {
    return {
      // Chuyển string → number, fallback về giá trị mặc định nếu không có
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      // || undefined để loại bỏ giá trị rỗng ("") → không gửi param rỗng lên API
      search: searchParams.get("search") || undefined,
      difficultyLevel: searchParams.get("difficultyLevel") || undefined,
      ritualCategoryId: searchParams.get("ritualCategoryId") || undefined,
    };
  }, [searchParams]); // Dependency: chỉ tính lại khi URL params thay đổi

  const query = useQuery({
    // Cache key dựa trên filters → mỗi bộ filter khác nhau = cache riêng
    queryKey: [...QUERY_KEYS.RITUALS, filters],
    // Gọi API với filters hiện tại
    queryFn: () => ritualService.getAll(filters),
    // Giữ data cũ trong khi đang fetch mới → UX mượt hơn, không bị "nhấp nháy"
    placeholderData: (prev) => prev,
  });

  return {
    rituals: query.data?.data ?? [], // Mảng rituals, fallback [] nếu chưa có data
    pagination: query.data?.meta, // Thông tin phân trang (total, totalPages, etc.)
    isLoading: query.isLoading, // true khi đang fetch lần đầu
    error: query.error, // Error object nếu request thất bại
  };
}

/**
 * Hook tạo ritual mới.
 * Sau khi thành công → invalidate cache + navigate về list.
 */
export function useCreateRitual() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRitualDto) => ritualService.create(data),
    onSuccess: () => {
      toast.success("Tạo nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
      navigate("/admin/rituals");
    },
  });
}

/**
 * Hook cập nhật ritual.
 * Sau khi thành công → invalidate cache (list + detail) + navigate về list.
 */
export function useUpdateRitual() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRitualDto }) =>
      ritualService.update(id, data),
    onSuccess: (_data, variables) => {
      toast.success("Cập nhật nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RITUAL_DETAIL(variables.id),
      });
      navigate("/admin/rituals");
    },
  });
}

/**
 * Hook xóa ritual (soft delete).
 * Sau khi thành công → invalidate cache.
 */
export function useDeleteRitual() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ritualService.remove(id),
    onSuccess: () => {
      toast.success("Xóa nghi lễ thành công!");
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RITUALS });
    },
  });
}

/**
 * Hook lấy chi tiết 1 ritual.
 */
export function useRitualDetail(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.RITUAL_DETAIL(id),
    queryFn: () => ritualService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook lấy danh sách ritual categories cho dropdown.
 */
export function useRitualCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.RITUAL_CATEGORIES,
    queryFn: () => ritualCategoryService.getSelectOptions(),
    staleTime: 10 * 60 * 1000,
  });
}
