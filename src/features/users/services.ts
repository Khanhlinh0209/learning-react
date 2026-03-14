import { createBaseService } from "@/shared/services/BaseService";
import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/shared/constants";
import type { UserProfile, UpdateProfileDto } from "@/features/users/types";
import type { BaseFilterParams } from "@/shared/types";

/**
 * User Service - profile operations.
 * Spread pattern để thêm custom getMe method.
 */
export const userService = {
  ...createBaseService<
    UserProfile,
    unknown,
    UpdateProfileDto,
    BaseFilterParams
  >({
    endpoint: API_ENDPOINTS.USER.ME,

    // Override update để dùng endpoint khác (/user/profile thay vì /user/me/:id)
    update: async (data) => {
      return apiClient.put<UserProfile>(
        API_ENDPOINTS.USER.PROFILE,
        data,
      ) as unknown as Promise<UserProfile>;
    },
  }),

  /**
   * Lấy thông tin user hiện tại (từ JWT token).
   */
  async getMe(): Promise<UserProfile> {
    return apiClient.get<UserProfile>(
      API_ENDPOINTS.USER.ME,
    ) as unknown as Promise<UserProfile>;
  },
};
