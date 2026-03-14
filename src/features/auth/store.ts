import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthActions, AuthState } from "./types";

/**
 * Zustand store cho Auth – lưu JWT + role.
 * Persist vào localStorage để giữ đăng nhập sau reload.
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,

      setAuth: ({ accessToken, role }) => set({ accessToken, role }),
      clearAuth: () => set({ accessToken: null, role: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
