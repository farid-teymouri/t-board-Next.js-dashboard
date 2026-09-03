import { NextResponse } from "next/server";

import type { TotalBalanceResponse } from "@/app/api/types/dashboards/sales/total-balance";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") ?? "en";

  const totalBalance: TotalBalanceResponse = {
    bankName: "MASKAN",

    availableBalance: 48_725_000,

    currency: {
      code: "IRT",
      label: locale === "fa" ? "تومان" : "IRT",
    },

    cardNumber: "6280 •••• •••• 1035",

    labels: {
      availableBalance:
        locale === "fa" ? "موجودی قابل برداشت" : "Available balance",
    },

    summary: {
      income: 284_650_000,
      spend: 47_820_000,
      saved: 236_830_000,
    },
  };

  return NextResponse.json(totalBalance);
}
