import { NextResponse } from "next/server";

import type { AnalyticsOverviewMetricsResponse } from "@/types/dashboards/analytics/overview-metrics";

const response: AnalyticsOverviewMetricsResponse = {
  label: "Last 30 days",
  metrics: [
    {
      id: "sessions",
      value: 128400,
      change: 8.7,
    },
    {
      id: "unique-visitors",
      value: 74210,
      change: 5.3,
    },
    {
      id: "bounce-rate",
      value: 41.2,
      change: -2.1,
    },
    {
      id: "avg-session",
      value: 192,
      change: 5.8,
    },
  ],
};

export async function GET() {
  return NextResponse.json(response);
}
