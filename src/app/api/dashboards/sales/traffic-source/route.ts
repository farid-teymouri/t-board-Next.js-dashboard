import { NextResponse } from "next/server";

import type { PerformanceRankingResponse } from "@/app/api/types/dashboards/sales/performance-ranking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") ?? "en";

  const isRTL = locale === "fa";

  const trafficSource: PerformanceRankingResponse = {
    items: [
      {
        id: 1,
        name: isRTL ? "مستقیم" : "Direct",
        value: 38,
        progress: 38,
      },

      {
        id: 2,
        name: isRTL ? "جستجوی ارگانیک" : "Organic Search",
        value: 27,
        progress: 27,
      },

      {
        id: 3,
        name: isRTL ? "ارجاعی" : "Referral",
        value: 14,
        progress: 14,
      },

      {
        id: 4,
        name: isRTL ? "شبکه‌های اجتماعی" : "Social",
        value: 9,
        progress: 9,
      },

      {
        id: 5,
        name: isRTL ? "ایمیل" : "Email",
        value: 7,
        progress: 7,
      },

      {
        id: 6,
        name: isRTL ? "تبلیغات پولی" : "Paid",
        value: 5,
        progress: 5,
      },
    ],
  };

  return NextResponse.json(trafficSource);
}
