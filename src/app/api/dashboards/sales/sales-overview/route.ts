import { NextResponse } from "next/server";

import type { UserSalesOverview } from "@/app/api/types/dashboards/sales";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";

  const salesOverview: UserSalesOverview = {
    revenueGrowth: 12.4,
    topProducts: locale === "fa" ? ["کتاب", "میز"] : ["Book", "Desk"],
    targetHit: 86,
    dealsWon: 142,
    stillOpen: 37,
    pendingInvoices: 2,
  };

  return NextResponse.json(salesOverview);
}
