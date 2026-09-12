import { NextResponse } from "next/server";
const data = {
  week: [
    { key: "Mon", revenue: 27000000, orders: 420 },
    { key: "Tue", revenue: 43000000, orders: 680 },
    { key: "Wed", revenue: 24000000, orders: 370 },
    { key: "Thu", revenue: 55000000, orders: 850 },
    { key: "Fri", revenue: 61000000, orders: 940 },
    { key: "Sat", revenue: 58000000, orders: 890 },
    { key: "Sun", revenue: 69000000, orders: 1060 },
  ],

  month: [
    { key: "Jan", revenue: 41000000, orders: 620 },
    { key: "Feb", revenue: 53000000, orders: 810 },
    { key: "Mar", revenue: 48000000, orders: 730 },
    { key: "Apr", revenue: 56000000, orders: 860 },
    { key: "May", revenue: 64000000, orders: 980 },
    { key: "Jun", revenue: 71000000, orders: 1090 },
    { key: "Jul", revenue: 80000000, orders: 1230 },
    { key: "Aug", revenue: 95000000, orders: 1460 },
    { key: "Sep", revenue: 101000000, orders: 1550 },
  ],

  year: [
    { key: "2022", revenue: 101000000, orders: 1250 },
    { key: "2023", revenue: 150000000, orders: 1840 },
    { key: "2024", revenue: 204000000, orders: 2510 },
    { key: "2025", revenue: 254000000, orders: 3120 },
    { key: "2026", revenue: 244000000, orders: 3020 },
  ],
};

const availablePeriods = ["week", "month", "year"] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");

  if (!period) {
    return NextResponse.json({
      availablePeriods,
      defaultPeriod: "month",
    });
  }

  if (!availablePeriods.includes(period as (typeof availablePeriods)[number])) {
    return NextResponse.json(
      { message: "Unsupported period" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    period,
    data: data[period as keyof typeof data],
  });
}
