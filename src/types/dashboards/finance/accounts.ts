import type { Currency } from "@/utils/currency";

export type AccountType = "checking" | "savings" | "card" | "reserve";

export type AccountStatus =
  | {
      type: "change";
      value: number;
    }
  | {
      type: "text";
      value: string;
    };

export interface FinanceAccount {
  id: string;
  name: string;
  type: AccountType;
  lastFour: string;
  balance: number;
  currency: Currency;
  status: AccountStatus;
}
