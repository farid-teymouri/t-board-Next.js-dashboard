import { NextResponse } from "next/server";

import type { FinanceSummary } from "@/types/dashboards/finance/finance-summary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";

  const descriptions = {
    en: "That is 34% of income put aside — your best month since February. Three bills fall due in the next seven days.",
    fa: "این یعنی ۳۴٪ از درآمد تان را کنار گذاشته‌ اید — بهترین ماه شما از فوریه تاکنون. سه قبض در هفت روز آینده سر رسید می‌ شوند.",
  };

  const financeSummary: FinanceSummary = {
    savedAmount: 26440000,
    currency: "IRT",
    description: descriptions[locale],
    savingsRate: 34,
    billsDue: 3,
    budgetsOver: 1,
  };

  // Mock values; replace with data from the finance service.

  return NextResponse.json(financeSummary);
}
