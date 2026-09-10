import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json({
    label: locale === "fa" ? "۳۰ روز گذشته" : "Last 30 days",
    metrics: [
      {
        id: "sessions",
        value: 48200,
        change: 8.7,
      },
      {
        id: "unique-visitors",
        value: 31600,
        change: 5.3,
      },
      {
        id: "bounce-rate",
        value: 42.1,
        change: -2.4,
      },
      {
        id: "avg-session",
        value: 187,
        change: 6.8,
      },
    ],
  });
}
