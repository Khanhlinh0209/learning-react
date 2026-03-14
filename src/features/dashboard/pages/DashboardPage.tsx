import { Link } from "react-router-dom";
import { BookOpen, Users } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

/**
 * Admin Dashboard - Trang chủ của admin.
 * Hiển thị các shortcut links đến các tính năng quản lý.
 */
export default function DashboardPage() {
  const dashboardCards = [
    {
      label: "Quản lý nghi lễ",
      description: "Tạo, sửa, xóa nghi lễ",
      href: "/admin/rituals",
      icon: BookOpen,
    },
    {
      label: "Quản lý người dùng",
      description: "Xem danh sách và phân quyền",
      href: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Chào mừng đến trang quản trị. Chọn mục bên dưới để bắt đầu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} to={card.href}>
              <Card className="transition-all hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle>{card.label}</CardTitle>
                  </div>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
