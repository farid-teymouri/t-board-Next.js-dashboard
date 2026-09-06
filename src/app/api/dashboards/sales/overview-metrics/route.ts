import { NextResponse } from "next/server";

import type { OverviewMetricsResponse } from "@/types/dashboards/sales/overview-metrics";

export async function GET() {
  const data: OverviewMetricsResponse = {
    items: [
      {
        id: "customers",
        value: 3920,
        change: -3.1,
        format: "number",
      },
      {
        id: "products",
        value: 1204,
        change: 2.0,
        format: "number",
      },
      {
        id: "transactions",
        value: 9812,
        change: -3.2,
        format: "number",
      },
      {
        id: "averageOrderValue",
        value: 76.24,
        change: 5.8,
        format: "currency",
      },
      {
        id: "refundRate",
        value: 1.8,
        change: -0.4,
        format: "percent",
      },
    ],
  };

  return NextResponse.json(data);
}
