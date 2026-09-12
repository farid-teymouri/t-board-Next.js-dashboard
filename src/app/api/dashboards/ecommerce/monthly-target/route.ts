import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    period: "2026-08",
    periods: {
      monthly: {
        achieved: 142800000,
        target: 210000000,
        remaining: 67200000,
        dailyRunRate: 5900000,
        currency: "IRT",
        daysAhead: 4,
      },
      quarterly: {
        achieved: 428400000,
        target: 720000000,
        remaining: 291600000,
        dailyRunRate: 10400000,
        currency: "IRT",
        daysAhead: 7,
      },
    },
  });
}
