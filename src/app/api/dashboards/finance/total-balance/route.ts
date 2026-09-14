import { NextResponse } from "next/server";

import type { FinanceTotalBalanceResponse } from "@/types/dashboards/finance/total-balance";

export async function GET() {
  const data: FinanceTotalBalanceResponse = {
    title: "Total Balance",
    accounts: [
      {
        bankName: "Mellat",
        amount: 312_540_000,
        currency: "IRT",
        cardNumber: "4921 •••• •••• 3015",
        amountLabel: "Available balance",
        summary: {
          income: 48_200_000,
          expenses: 31_760_000,
          saved: 16_440_000,
        },
      },
      {
        bankName: "Mellat",
        amount: 8_420,
        currency: "USD",
        cardNumber: "4921 •••• •••• 1842",
        amountLabel: "Available balance",
        summary: {
          income: 1_280,
          expenses: 740,
          saved: 540,
        },
      },
      {
        bankName: "Mellat",
        amount: 7_680,
        currency: "EUR",
        cardNumber: "4921 •••• •••• 6724",
        amountLabel: "Available balance",
        summary: {
          income: 1_120,
          expenses: 680,
          saved: 440,
        },
      },
      {
        bankName: "Mellat",
        amount: 6_540,
        currency: "GBP",
        cardNumber: "4921 •••• •••• 9031",
        amountLabel: "Available balance",
        summary: {
          income: 980,
          expenses: 590,
          saved: 390,
        },
      },
    ],
  };

  return NextResponse.json(data);
}
