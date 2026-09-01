import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? "en";

  return NextResponse.json({
    totalRevenue: 12480000000,

    currency: {
      code: "IRR",
      label: locale === "fa" ? "تومان" : "Toman",
    },

    growth: 12.4,

    labels:
      locale === "fa"
        ? {
            title: "درآمد کل",
            performance: "عملکرد درآمد",
            comparison: "نسبت به سال گذشته",
          }
        : {
            title: "Total revenue",
            performance: "Revenue performance",
            comparison: "vs. last year",
          },

    points:
      locale === "fa"
        ? [
            { month: "فروردین", value: 420000000 },
            { month: "اردیبهشت", value: 510000000 },
            { month: "خرداد", value: 680000000 },
            { month: "تیر", value: 590000000 },
            { month: "مرداد", value: 820000000 },
            { month: "شهریور", value: 940000000 },
            { month: "مهر", value: 1020000000 },
            { month: "آبان", value: 1180000000 },
            { month: "آذر", value: 1260000000 },
            { month: "دی", value: 1390000000 },
            { month: "بهمن", value: 1510000000 },
            { month: "اسفند", value: 1640000000 },
          ]
        : [
            { month: "Jan", value: 420000000 },
            { month: "Feb", value: 510000000 },
            { month: "Mar", value: 680000000 },
            { month: "Apr", value: 590000000 },
            { month: "May", value: 820000000 },
            { month: "Jun", value: 940000000 },
            { month: "Jul", value: 1020000000 },
            { month: "Aug", value: 1180000000 },
            { month: "Sep", value: 1260000000 },
            { month: "Oct", value: 1390000000 },
            { month: "Nov", value: 1510000000 },
            { month: "Dec", value: 1640000000 },
          ],
  });
}
