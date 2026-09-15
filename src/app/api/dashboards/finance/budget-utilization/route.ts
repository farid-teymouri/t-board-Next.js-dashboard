import { NextResponse } from "next/server";

import type { BudgetUtilizationResponse } from "@/types/dashboards/finance/budget-utilization";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") ?? "en";
  const isRTL = locale === "fa";

  const budgetUtilization: BudgetUtilizationResponse = {
    items: [
      {
        id: 1,
        name: isRTL ? "حقوق و دستمزد" : "Payroll",
        spent: 13.9,
        budget: 15,
        progress: (13.9 / 15) * 100,
      },
      {
        id: 2,
        name: isRTL ? "نرم‌افزار" : "Software",
        spent: 5.7,
        budget: 6,
        progress: (5.7 / 6) * 100,
      },
      {
        id: 3,
        name: isRTL ? "بازاریابی" : "Marketing",
        spent: 4.8,
        budget: 4,
        progress: (4.8 / 4) * 100,
      },
      {
        id: 4,
        name: isRTL ? "اداری" : "Office",
        spent: 4.1,
        budget: 5,
        progress: (4.1 / 5) * 100,
      },
    ],

    alert: {
      message: isRTL
        ? "هزینه بازاریابی ۱۹٪ بیشتر از بودجه است."
        : "Marketing is 19% over budget.",
      percentage: 19,
    },
  };

  return NextResponse.json(budgetUtilization);
}
