import { NextResponse } from "next/server";

import type { PerformanceRankingResponse } from "@/types/dashboards/sales/performance-ranking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") ?? "en";

  const isRTL = locale === "fa";

  const topSellingProducts: PerformanceRankingResponse = {
    currency: {
      code: "IRT",
      label: isRTL ? "تومان" : "IRT",
    },

    items: [
      {
        id: 1,
        name: isRTL ? "چراغ رومیزی برنجی" : "Brass Task Light",
        category: isRTL ? "روشنایی" : "Lighting",
        description: isRTL
          ? "چراغ رومیزی با بدنه برنجی و طراحی مینیمال"
          : "Minimal desk light with a brushed brass finish",
        value: 412,
        progress: 92,
        amount: 1_200_000,
      },

      {
        id: 2,
        name: isRTL ? "کتاب عادت‌های اتمی" : "Atomic Habits",
        category: isRTL ? "کتاب" : "Books",
        description: isRTL
          ? "راهنمایی کاربردی برای ساخت عادت‌های بهتر"
          : "A practical guide to building better habits",
        value: 356,
        progress: 81,
        amount: 950_000,
      },

      {
        id: 3,
        name: isRTL ? "ماگ سرامیکی مات" : "Matte Ceramic Mug",
        category: isRTL ? "نوشیدنی" : "Drinkware",
        description: isRTL
          ? "ماگ سرامیکی مات با فرم ساده و کاربردی"
          : "Soft-touch ceramic mug with a minimalist silhouette",
        value: 298,
        progress: 74,
        amount: 1_107_000,
      },

      {
        id: 4,
        name: isRTL ? "پایه مانیتور گردویی" : "Walnut Monitor Riser",
        category: isRTL ? "میز کار" : "Desk",
        description: isRTL
          ? "پایه‌ای از چوب گردو برای نظم بهتر روی میز"
          : "Solid walnut riser for a cleaner desk setup",
        value: 241,
        progress: 63,
        amount: 350_000,
      },

      {
        id: 5,
        name: isRTL ? "کتاب هنر شفاف اندیشیدن" : "The Art of Thinking Clearly",
        category: isRTL ? "کتاب" : "Books",
        description: isRTL
          ? "نگاهی کاربردی به خطاهای رایج در تصمیم‌گیری"
          : "A practical look at common errors in decision-making",
        value: 198,
        progress: 51,
        amount: 450_000,
      },
    ],
  };

  return NextResponse.json(topSellingProducts);
}
