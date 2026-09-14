import { NextResponse } from "next/server";

import type { SpendingByCategoryData } from "@/types/dashboards/finance/spending-by-category";

const data: SpendingByCategoryData = {
  total: {
    value: 31_760_000,
    label: "Total spending",
  },

  items: [
    {
      id: "payroll",
      label: "Payroll",
      value: 13_974_000,
      color: "var(--chart-2)",
    },
    {
      id: "software",
      label: "Software",
      value: 5_717_000,
      color: "var(--chart-1)",
    },
    {
      id: "marketing",
      label: "Marketing",
      value: 4_764_000,
      color: "var(--chart-3)",
    },
    {
      id: "office",
      label: "Office",
      value: 4_129_000,
      color: "var(--chart-4)",
    },
    {
      id: "other",
      label: "Other",
      value: 3_176_000,
      color: "var(--chart-5)",
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
