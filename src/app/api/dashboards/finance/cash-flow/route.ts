import { NextResponse } from "next/server";

import type {
  CashFlowDataPoint,
  CashFlowPeriod,
  CashFlowResponse,
} from "@/types/dashboards/finance/cash-flow";

const data: CashFlowDataPoint[] = [
  {
    month: "فروردین",
    monthEn: "Mar",
    income: 42000000,
    expenses: -28000000,
    net: 14000000,
  },
  {
    month: "اردیبهشت",
    monthEn: "Apr",
    income: 38000000,
    expenses: -24000000,
    net: 14000000,
  },
  {
    month: "خرداد",
    monthEn: "May",
    income: 45000000,
    expenses: -31000000,
    net: 14000000,
  },
  {
    month: "تیر",
    monthEn: "Jun",
    income: 40000000,
    expenses: -33000000,
    net: 7000000,
  },
  {
    month: "مرداد",
    monthEn: "Jul",
    income: 47000000,
    expenses: -30000000,
    net: 16400000,
  },
  {
    month: "شهریور",
    monthEn: "Aug",
    income: 43000000,
    expenses: -27000000,
    net: 16000000,
  },
  {
    month: "مهر",
    monthEn: "Sep",
    income: 39000000,
    expenses: -29000000,
    net: 10000000,
  },
  {
    month: "آبان",
    monthEn: "Oct",
    income: 46000000,
    expenses: -32000000,
    net: 14000000,
  },
  {
    month: "آذر",
    monthEn: "Nov",
    income: 41000000,
    expenses: -26000000,
    net: 15000000,
  },
  {
    month: "دی",
    monthEn: "Dec",
    income: 44000000,
    expenses: -31000000,
    net: 13000000,
  },
  {
    month: "بهمن",
    monthEn: "Jan",
    income: 37000000,
    expenses: -25000000,
    net: 12000000,
  },
  {
    month: "اسفند",
    monthEn: "Feb",
    income: 43000000,
    expenses: -30000000,
    net: 13000000,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const requestedPeriod = searchParams.get("period");

  const period: CashFlowPeriod =
    requestedPeriod === "6M" ||
    requestedPeriod === "12M" ||
    requestedPeriod === "YTD"
      ? requestedPeriod
      : "12M";

  let filteredData = data;

  if (period === "6M") {
    filteredData = data.slice(-6);
  }

  if (period === "YTD") {
    filteredData = data.slice(0, 6);
  }

  const response: CashFlowResponse = {
    period,
    currency: "IRT",
    data: filteredData,
  };

  return NextResponse.json(response);
}
