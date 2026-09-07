import { NextResponse } from "next/server";

import type { SalesSummary } from "@/types/dashboards/sales/sales-summary";
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

  const salesByPeriod: Record<
    GrowthPeriod,
    {
      revenueGrowth: GrowthMetric;
      topProducts: {
        en: string[];
        fa: string[];
      };
    }
  > = {
    day: {
      revenueGrowth: {
        value: 3.2,
        trend: "up",
        period: "day",
      },
      topProducts: {
        en: ["Book", "Desk"],
        fa: ["کتاب", "میز"],
      },
    },

    week: {
      revenueGrowth: {
        value: 8.7,
        trend: "down",
        period: "week",
      },
      topProducts: {
        en: ["Chair", "Lamp"],
        fa: ["صندلی", "چراغ"],
      },
    },

    month: {
      revenueGrowth: {
        value: 12.4,
        trend: "up",
        period: "month",
      },
      topProducts: {
        en: ["Laptop", "Monitor"],
        fa: ["لپ‌تاپ", "مانیتور"],
      },
    },

    year: {
      revenueGrowth: {
        value: 21.5,
        trend: "up",
        period: "year",
      },
      topProducts: {
        en: ["Phone", "Tablet"],
        fa: ["گوشی", "تبلت"],
      },
    },
  };

  const salesSummary: SalesSummary = {
    revenueGrowth: salesByPeriod[period].revenueGrowth,
    topProducts:
      salesByPeriod[period].topProducts[locale === "fa" ? "fa" : "en"],

    // Mock values; replace with data from the sales service.
    targetHit: 86,
    dealsWon: 142,
    stillOpen: 37,
    pendingInvoices: 2,
  };

  return NextResponse.json(salesSummary);
}
