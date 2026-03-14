import { User, Mail, Phone, Calendar, Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { LoadingSpinner } from "@/shared/components/common";
import { useProfile } from "../hooks/useProfile";

/**
 * Trang profile – hiển thị thông tin user (GET only).
 * Sử dụng shadcn Card + Badge + Separator.
 */
export function ProfilePage() {
  const { data: profile, isLoading, isError } = useProfile();

  if (isLoading) {
    return <LoadingSpinner className="py-20" size="lg" />;
  }

  if (isError || !profile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">
          Không thể tải thông tin tài khoản.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Thông tin tài khoản</h1>

      <Card>
        {/* Avatar & Name */}
        <CardHeader className="flex-row items-center gap-4 bg-muted/30">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={profile.fullName ?? "Avatar"}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">
              {profile.fullName ?? "Chưa cập nhật tên"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
          <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
            {profile.role === "admin" ? "Quản trị viên" : "Người dùng"}
          </Badge>
        </CardHeader>

        <Separator />

        {/* Info rows */}
        <CardContent className="divide-y p-0">
          <InfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={profile.email}
          />
          <InfoRow
            icon={<User className="h-4 w-4" />}
            label="Họ và tên"
            value={profile.fullName ?? "Chưa cập nhật"}
          />
          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Số điện thoại"
            value={profile.phone ?? "Chưa cập nhật"}
          />
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Ngày sinh"
            value={
              profile.birthday
                ? new Date(profile.birthday).toLocaleDateString("vi-VN")
                : "Chưa cập nhật"
            }
          />
          <InfoRow
            icon={<Shield className="h-4 w-4" />}
            label="Vai trò"
            value={profile.role === "admin" ? "Quản trị viên" : "Người dùng"}
          />
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Ngày tham gia"
            value={new Date(profile.createdAt).toLocaleDateString("vi-VN")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <span className="text-muted-foreground">{icon}</span>
      <span className="w-32 text-sm font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
