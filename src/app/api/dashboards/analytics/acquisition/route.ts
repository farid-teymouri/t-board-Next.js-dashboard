import { NextResponse } from "next/server";

import type { AnalyticsAcquisitionResponse } from "@/app/api/types/dashboards/analytics/acquisition";

export async function GET() {
  const acquisition: AnalyticsAcquisitionResponse = {
    data: [
      { month: 1, sessions: 8200, newVisitors: 3600, returning: 2800 },
      { month: 2, sessions: 9100, newVisitors: 4100, returning: 3000 },
      { month: 3, sessions: 10400, newVisitors: 4700, returning: 3400 },
      { month: 4, sessions: 9800, newVisitors: 4300, returning: 3200 },
      { month: 5, sessions: 11600, newVisitors: 5200, returning: 3900 },
      { month: 6, sessions: 12400, newVisitors: 5600, returning: 4200 },
      { month: 7, sessions: 13200, newVisitors: 6100, returning: 4500 },
      { month: 8, sessions: 11900, newVisitors: 5100, returning: 4100 },
      { month: 9, sessions: 10800, newVisitors: 4600, returning: 3700 },
      { month: 10, sessions: 12600, newVisitors: 5500, returning: 4300 },
      { month: 11, sessions: 13800, newVisitors: 6200, returning: 4700 },
      { month: 12, sessions: 14500, newVisitors: 6600, returning: 5000 },
    ],
  };

  return NextResponse.json(acquisition);
}
