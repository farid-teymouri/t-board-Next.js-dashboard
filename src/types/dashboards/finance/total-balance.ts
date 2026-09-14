import type { Currency } from "@/utils/currency";

export type FinanceBalanceSummary = {
  income: number;
  expenses: number;
  saved: number;
};

export type FinanceBalanceAccount = {
  bankName: string;
  amount: number;
  currency: Currency;
  cardNumber: string;
  amountLabel: string;
  summary: FinanceBalanceSummary;
};

export type FinanceTotalBalanceResponse = {
  title: string;
  accounts: FinanceBalanceAccount[];
};
