import { NextRequest, NextResponse } from "next/server";

import type { GrowthPeriod, GrowthTrend } from "@/types/metrics/growth";
import type { MetricData } from "@/types/metrics/metric";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? "en";

  const period =
    (request.nextUrl.searchParams.get("period") as GrowthPeriod) ?? "year";

  const trend =
    (request.nextUrl.searchParams.get("trend") as GrowthTrend) ?? "up";

  const value = 12480000000;

  const growth = trend === "down" ? -12.4 : 12.4;

  const isDown = trend === "down";

  const faSeries = isDown
    ? [
        { label: "فروردین", value: 1640000000 },
        { label: "اردیبهشت", value: 1510000000 },
        { label: "خرداد", value: 1390000000 },
        { label: "تیر", value: 1260000000 },
        { label: "مرداد", value: 1180000000 },
        { label: "شهریور", value: 1020000000 },
        { label: "مهر", value: 940000000 },
        { label: "آبان", value: 820000000 },
        { label: "آذر", value: 680000000 },
        { label: "دی", value: 590000000 },
        { label: "بهمن", value: 510000000 },
        { label: "اسفند", value: 420000000 },
      ]
    : [
        { label: "فروردین", value: 420000000 },
        { label: "اردیبهشت", value: 510000000 },
        { label: "خرداد", value: 680000000 },
        { label: "تیر", value: 590000000 },
        { label: "مرداد", value: 820000000 },
        { label: "شهریور", value: 940000000 },
        { label: "مهر", value: 1020000000 },
        { label: "آبان", value: 1180000000 },
        { label: "آذر", value: 1260000000 },
        { label: "دی", value: 1390000000 },
        { label: "بهمن", value: 1510000000 },
        { label: "اسفند", value: 1640000000 },
      ];

  const enSeries = isDown
    ? [
        { label: "Jan", value: 1640000000 },
        { label: "Feb", value: 1510000000 },
        { label: "Mar", value: 1390000000 },
        { label: "Apr", value: 1260000000 },
        { label: "May", value: 1180000000 },
        { label: "Jun", value: 1020000000 },
        { label: "Jul", value: 940000000 },
        { label: "Aug", value: 820000000 },
        { label: "Sep", value: 680000000 },
        { label: "Oct", value: 590000000 },
        { label: "Nov", value: 510000000 },
        { label: "Dec", value: 420000000 },
      ]
    : [
        { label: "Jan", value: 420000000 },
        { label: "Feb", value: 510000000 },
        { label: "Mar", value: 680000000 },
        { label: "Apr", value: 590000000 },
        { label: "May", value: 820000000 },
        { label: "Jun", value: 940000000 },
        { label: "Jul", value: 1020000000 },
        { label: "Aug", value: 1180000000 },
        { label: "Sep", value: 1260000000 },
        { label: "Oct", value: 1390000000 },
        { label: "Nov", value: 1510000000 },
        { label: "Dec", value: 1640000000 },
      ];

  const data: MetricData = {
    value,

    currency: "IRT",

    growth: {
      value: growth,
      trend,
      period,
    },

    series: locale === "fa" ? faSeries : enSeries,
  };

  return NextResponse.json(data);
}
