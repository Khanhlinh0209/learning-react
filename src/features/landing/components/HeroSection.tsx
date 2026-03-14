import { Link } from "react-router-dom";
import { BookOpen, Search, Star, Shield } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            Nền tảng tra cứu nghi lễ số 1
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Thích Cúng Kiếng
          </h1>

          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Tra cứu, tìm hiểu và thực hành các nghi lễ truyền thống Việt Nam. Từ
            cúng gia tiên, lễ Tết đến các nghi thức tâm linh – tất cả đều có
            trong một ứng dụng.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/rituals">
                <Search className="mr-2 h-4 w-4" />
                Khám phá nghi lễ
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Tạo tài khoản miễn phí</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Tra cứu dễ dàng",
      description:
        "Tìm kiếm nghi lễ theo tên, danh mục, độ khó hoặc bất kỳ từ khoá nào.",
    },
    {
      icon: BookOpen,
      title: "Chi tiết đầy đủ",
      description:
        "Mỗi nghi lễ đều có hướng dẫn chi tiết, lễ vật cần chuẩn bị và bài cúng.",
    },
    {
      icon: Star,
      title: "Nổi bật & Phổ biến",
      description: "Cập nhật liên tục những nghi lễ được quan tâm nhiều nhất.",
    },
    {
      icon: Shield,
      title: "Nội dung uy tín",
      description:
        "Tham khảo từ nhiều nguồn tài liệu truyền thống đáng tin cậy.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Tính năng nổi bật</h2>
        <p className="mt-2 text-muted-foreground">
          Mọi thứ bạn cần để tìm hiểu nghi lễ truyền thống
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card
            key={f.title}
            className="text-center transition-shadow hover:shadow-md"
          >
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
