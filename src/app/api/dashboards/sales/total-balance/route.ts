import { NextResponse } from "next/server";

import type { TotalBalanceResponse } from "@/types/dashboards/sales/total-balance";

const supportedCurrencies = ["IRT", "USD", "EUR", "GBP"] as const;

type SupportedCurrency = (typeof supportedCurrencies)[number];

const balances: Record<SupportedCurrency, TotalBalanceResponse> = {
  IRT: {
    bankName: "MASKAN",
    availableBalance: 48_725_000,
    currency: "IRT",
    cardNumber: "6280 •••• •••• 1035",
    summary: {
      income: 284_650_000,
      spend: 47_820_000,
      saved: 236_830_000,
    },
  },

  USD: {
    bankName: "CHASE",
    availableBalance: 1_250,
    currency: "USD",
    cardNumber: "•••• •••• •••• 6532",
    summary: {
      income: 7_300,
      spend: 1_250,
      saved: 6_050,
    },
  },

  EUR: {
    bankName: "DEUTSCHE BANK",
    availableBalance: 1_080,
    currency: "EUR",
    cardNumber: "•••• •••• •••• 3831",
    summary: {
      income: 6_400,
      spend: 1_080,
      saved: 5_320,
    },
  },

  GBP: {
    bankName: "BARCLAYS",
    availableBalance: 920,
    currency: "GBP",
    cardNumber: "•••• •••• •••• 2214",
    summary: {
      income: 5_500,
      spend: 920,
      saved: 4_580,
    },
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency");

  const selectedCurrency: SupportedCurrency =
    currency && supportedCurrencies.includes(currency as SupportedCurrency)
      ? (currency as SupportedCurrency)
      : "IRT";

  return NextResponse.json(balances[selectedCurrency]);
}
