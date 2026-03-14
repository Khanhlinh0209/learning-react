import { Construction } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

/**
 * User Management Page - Quản lý người dùng (Admin only).
 * Placeholder để học sinh tự implement CRUD users.
 */
export default function UserManagementPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Quản lý người dùng
        </h2>
        <p className="text-muted-foreground">
          Xem danh sách, phân quyền và quản lý người dùng hệ thống.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-amber-500" />
            <CardTitle>Tính năng đang phát triển</CardTitle>
          </div>
          <CardDescription>
            Phần này dành cho học sinh tự triển khai (CRUD users).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Các tính năng cần implement:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>Danh sách người dùng với phân trang</li>
              <li>Tìm kiếm theo email/tên</li>
              <li>Phân quyền (User ↔ Admin)</li>
              <li>Khóa/mở khóa tài khoản</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
