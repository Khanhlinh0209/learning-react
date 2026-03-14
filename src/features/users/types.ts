import type { UserRole } from "@/shared/types";

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  birthday?: string;
  profilePicture?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  fullName?: string;
  phone?: string;
  birthday?: string;
  profilePicture?: string;
}
