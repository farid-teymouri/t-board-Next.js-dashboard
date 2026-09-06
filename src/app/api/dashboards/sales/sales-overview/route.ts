import { NextResponse } from "next/server";

import type { SalesOverview } from "@/types/dashboards/sales/overview";
import type { GrowthMetric, GrowthPeriod } from "@/types/metrics/growth";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";

  const requestedPeriod = searchParams.get("period");

  const period: GrowthPeriod =
    requestedPeriod === "day" ||
    requestedPeriod === "week" ||
    requestedPeriod === "month" ||
    requestedPeriod === "year"
      ? requestedPeriod
      : "month";

  const growthByPeriod: Record<GrowthPeriod, GrowthMetric> = {
    day: {
      value: 3.2,
      trend: "up",
      period: "day",
    },

    week: {
      value: 8.7,
      trend: "down",
      period: "week",
    },

    month: {
      value: 12.4,
      trend: "up",
      period: "month",
    },

    year: {
      value: 21.5,
      trend: "up",
      period: "year",
    },
  };

  const salesOverview: SalesOverview = {
    revenueGrowth: growthByPeriod[period],
    topProducts: locale === "fa" ? ["کتاب", "میز"] : ["Book", "Desk"],
    targetHit: 86,
    dealsWon: 142,
    stillOpen: 37,
    pendingInvoices: 2,
  };

  return NextResponse.json(salesOverview);
}
