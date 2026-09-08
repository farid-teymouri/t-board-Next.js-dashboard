export type TransactionStatus = "completed" | "pending" | "failed";
import type { Currency } from "@/utils/currency";

export type TransactionAmount = {
  value: number;
  currency: Currency;
  type: "positive" | "negative";
};
export type TransactionMerchant = {
  name: string;
  provider: string;
  icon: string;
};

export type TransactionStatusData = {
  value: TransactionStatus;
  label: string;
};

export type RecentTransaction = {
  id: string;

  merchant: TransactionMerchant;

  category: string;

  date: string;

  amount: TransactionAmount;

  status: TransactionStatusData;
};

export type RecentTransactionsColumns = {
  merchant: string;
  category: string;
  date: string;
  amount: string;
  status: string;
};

export type RecentTransactionsResponse = {
  columns: RecentTransactionsColumns;
  data: RecentTransaction[];
};
