import type { Currency } from "@/utils/currency";

export type InvoiceSummaryDirection = "up" | "down";

export type InvoiceSummaryMetric = {
  amount: number;
  change: number;
  direction: InvoiceSummaryDirection;
};

export type InvoiceSummary = {
  outstanding: InvoiceSummaryMetric;

  overdue: {
    amount: number;
    count: number;
  };

  paid30Days: InvoiceSummaryMetric;

  drafts: {
    count: number;
  };

  currency: Currency;
};

export type InvoicesSummaryResponse = {
  summary: InvoiceSummary;
};

export type InvoicesSummaryProps = {
  locale: "fa" | "en";

  dictionary: {
    outstanding: string;
    overdue: string;
    paid30Days: string;
    drafts: string;
    change: string;
    invoices: string;
  };
};
