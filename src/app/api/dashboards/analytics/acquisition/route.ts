import { NextRequest, NextResponse } from "next/server";

import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";
import type {
  AnalyticsAcquisitionConfig,
  AnalyticsAcquisitionResponse,
} from "@/types/dashboards/analytics/acquisition";

const config: AnalyticsAcquisitionConfig = {
  availablePeriods: ["week", "month", "year"],
  defaultPeriod: "month",
};

const dataByPeriod: Record<ChartPeriod, AnalyticsAcquisitionResponse["data"]> =
  {
    year: [
      { key: "2023", sessions: 82000, newVisitors: 36000, returning: 28000 },
      { key: "2024", sessions: 91000, newVisitors: 41000, returning: 30000 },
      { key: "2025", sessions: 104000, newVisitors: 47000, returning: 34000 },
      { key: "2026", sessions: 98000, newVisitors: 43000, returning: 32000 },
    ],
    month: [
      { key: "jan", sessions: 8200, newVisitors: 3600, returning: 2800 },
      { key: "feb", sessions: 9100, newVisitors: 4100, returning: 3000 },
      { key: "mar", sessions: 10400, newVisitors: 4700, returning: 3400 },
      { key: "apr", sessions: 9800, newVisitors: 4300, returning: 3200 },
      { key: "may", sessions: 11600, newVisitors: 5200, returning: 3900 },
      { key: "jun", sessions: 12400, newVisitors: 5600, returning: 4200 },
      { key: "jul", sessions: 13200, newVisitors: 6100, returning: 4500 },
      { key: "aug", sessions: 11900, newVisitors: 5100, returning: 4100 },
      { key: "sep", sessions: 10800, newVisitors: 4600, returning: 3700 },
      { key: "oct", sessions: 12600, newVisitors: 5500, returning: 4300 },
      { key: "nov", sessions: 13800, newVisitors: 6200, returning: 4700 },
      { key: "dec", sessions: 14500, newVisitors: 6600, returning: 5000 },
    ],
    week: [
      { key: "mon", sessions: 1800, newVisitors: 800, returning: 600 },
      { key: "tue", sessions: 2100, newVisitors: 950, returning: 700 },
      { key: "wed", sessions: 2400, newVisitors: 1100, returning: 780 },
      { key: "thu", sessions: 2700, newVisitors: 1250, returning: 850 },
      { key: "fri", sessions: 2300, newVisitors: 1050, returning: 720 },
      { key: "sat", sessions: 1900, newVisitors: 850, returning: 620 },
      { key: "sun", sessions: 2500, newVisitors: 1150, returning: 800 },
    ],
  };

export async function GET(request: NextRequest) {
  const requestedPeriod = request.nextUrl.searchParams.get(
    "period",
  ) as ChartPeriod | null;

  if (!requestedPeriod) {
    return NextResponse.json(config);
  }

  if (!config.availablePeriods.includes(requestedPeriod)) {
    return NextResponse.json(
      {
        error: "Unsupported period",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    period: requestedPeriod,
    data: dataByPeriod[requestedPeriod],
  });
}
