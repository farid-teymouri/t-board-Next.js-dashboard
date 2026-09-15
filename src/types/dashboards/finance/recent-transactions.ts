export type FinanceTransactionDate = {
  en: string;
  fa: string;
};

export type FinanceTransactionCategory = {
  en: string;
  fa: string;
};

export type FinanceTransactionCurrency = {
  code: string;
  en: string;
  fa: string;
};

export type FinanceTransactionAccount = {
  en: string;
  fa: string;
};

export type FinanceTransaction = {
  id: string;
  date: FinanceTransactionDate;
  payee: string;
  category: FinanceTransactionCategory;
  account: FinanceTransactionAccount;
  amount: number;
  currency: FinanceTransactionCurrency;
};
