import { NextResponse } from "next/server";

import type { SalesPerformanceResponse } from "@/types/dashboards/sales/performance";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const period = searchParams.get("period") ?? "month";

  if (period !== "month") {
    return NextResponse.json(
      {
        message: "Only monthly performance data is currently available.",
      },
      { status: 400 },
    );
  }

  const response: SalesPerformanceResponse = {
    period: "month",
    data: [
      {
        month: 1,
        thisPeriod: 48200,
        previousPeriod: 42100,
      },
      {
        month: 2,
        thisPeriod: 51800,
        previousPeriod: 44900,
      },
      {
        month: 3,
        thisPeriod: 49600,
        previousPeriod: 47200,
      },
      {
        month: 4,
        thisPeriod: 55300,
        previousPeriod: 48100,
      },
      {
        month: 5,
        thisPeriod: 58700,
        previousPeriod: 51200,
      },
      {
        month: 6,
        thisPeriod: 62100,
        previousPeriod: 52800,
      },
      {
        month: 7,
        thisPeriod: 59800,
        previousPeriod: 53600,
      },
      {
        month: 8,
        thisPeriod: 64600,
        previousPeriod: 55200,
      },
      {
        month: 9,
        thisPeriod: 62400,
        previousPeriod: 51400,
      },
      {
        month: 10,
        thisPeriod: 68100,
        previousPeriod: 58300,
      },
      {
        month: 11,
        thisPeriod: 72400,
        previousPeriod: 61700,
      },
      {
        month: 12,
        thisPeriod: 76800,
        previousPeriod: 65300,
      },
    ],
  };

  return NextResponse.json(response);
}
