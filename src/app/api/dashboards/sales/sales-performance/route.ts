import { NextResponse } from "next/server";

import type {
  SalesPerformancePeriod,
  SalesPerformanceResponse,
} from "@/types/dashboards/sales/sales-performance";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const period =
    (searchParams.get("period") as SalesPerformancePeriod | null) ?? "month";

  if (!["year", "month", "week"].includes(period)) {
    return NextResponse.json(
      {
        message: "Invalid period. Supported periods are year, month, and week.",
      },
      { status: 400 },
    );
  }

  const dataByPeriod: Record<
    SalesPerformancePeriod,
    SalesPerformanceResponse["data"]
  > = {
    week: [
      { label: 1, thisPeriod: 10000, previousPeriod: 14000 },
      { label: 2, thisPeriod: 11000, previousPeriod: 14500 },
      { label: 3, thisPeriod: 10500, previousPeriod: 15000 },
      { label: 4, thisPeriod: 11500, previousPeriod: 15500 },
      { label: 5, thisPeriod: 10800, previousPeriod: 16000 },
      { label: 6, thisPeriod: 12000, previousPeriod: 16500 },
      { label: 7, thisPeriod: 11800, previousPeriod: 17000 },
    ],
    month: [
      { label: 1, thisPeriod: 48200, previousPeriod: 42100 },
      { label: 2, thisPeriod: 51800, previousPeriod: 44900 },
      { label: 3, thisPeriod: 49600, previousPeriod: 47200 },
      { label: 4, thisPeriod: 55300, previousPeriod: 48100 },
      { label: 5, thisPeriod: 58700, previousPeriod: 51200 },
      { label: 6, thisPeriod: 62100, previousPeriod: 52800 },
      { label: 7, thisPeriod: 59800, previousPeriod: 53600 },
      { label: 8, thisPeriod: 64600, previousPeriod: 55200 },
      { label: 9, thisPeriod: 62400, previousPeriod: 51400 },
      { label: 10, thisPeriod: 68100, previousPeriod: 58300 },
      { label: 11, thisPeriod: 72400, previousPeriod: 61700 },
      { label: 12, thisPeriod: 76800, previousPeriod: 65300 },
    ],
    year: [
      { label: 2022, thisPeriod: 520000, previousPeriod: 480000 },
      { label: 2023, thisPeriod: 610000, previousPeriod: 550000 },
      { label: 2024, thisPeriod: 720000, previousPeriod: 640000 },
      { label: 2025, thisPeriod: 810000, previousPeriod: 730000 },
      { label: 2026, thisPeriod: 890000, previousPeriod: 790000 },
    ],
  };

  const availablePeriods = (
    Object.entries(dataByPeriod) as [
      SalesPerformancePeriod,
      SalesPerformanceResponse["data"],
    ][]
  )
    .filter(([, data]) => data.length > 0)
    .map(([period]) => period);

  if (availablePeriods.length === 0) {
    return NextResponse.json(
      {
        message: "No sales performance data is available.",
      },
      { status: 500 },
    );
  }

  const activePeriod = availablePeriods.includes(period)
    ? period
    : availablePeriods[0];

  const data = dataByPeriod[activePeriod];

  const response: SalesPerformanceResponse = {
    period: activePeriod,
    availablePeriods,
    currency: "IRT",
    data,
  };

  return NextResponse.json(response);
}
