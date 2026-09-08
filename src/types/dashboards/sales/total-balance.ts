import type { Currency } from "@/utils/currency";

export interface TotalBalanceResponse {
  bankName: string;

  availableBalance: number;

  currency: Currency;

  cardNumber: string;

  summary: {
    income: number;

    spend: number;

    saved: number;
  };
}
