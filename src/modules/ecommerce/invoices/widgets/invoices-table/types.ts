import type { Currency } from "@/utils/currency";
import type { InvoiceSummary } from "../invoices-summary/types";
export type InvoiceTab = "all" | "paid" | "unpaid" | "overdue" | "draft";

export type InvoiceStatus = "paid" | "unpaid" | "overdue" | "draft";

export type InvoiceClient = {
  firstName: {
    fa: string;
    en: string;
  };
  lastName: {
    fa: string;
    en: string;
  };
  email: string;
  avatarColor: string;
};
export type InvoiceSort =
  | "newest"
  | "dueDate"
  | "amountHigh"
  | "amountLow"
  | "client"
  | "status";

export type Invoice = {
  id: string;
  client: InvoiceClient;
  issueDate: string;
  dueDate: string;
  overdueDays: number;
  amount: number;
  currency: Currency;
  status: InvoiceStatus;
  paidAt?: string;
};

export type InvoiceTabCount = {
  id: InvoiceTab;
  count: number;
};

export type InvoicesTableData = {
  summary: InvoiceSummary;
  tabs: InvoiceTabCount[];
  invoices: Invoice[];
};

export type InvoicesTableProps = {
  dictionary: {
    tabs: Record<InvoiceTab, string>;
    columns: {
      invoice: string;
      client: string;
      issueDate: string;
      due: string;
      amount: string;
      status: string;
      actions: string;
    };
    searchPlaceholder: string;
    calendar: string;
    reset: string;
    overdue: string;
    error: string;
    selectAll: string;
    selectInvoice: string;
    status: Record<InvoiceStatus, string>;
    pagination: {
      showing: string;
      previous: string;
      next: string;
    };
    sort: {
      label: string;
      newest: string;
      dueDate: string;
      amountHigh: string;
      amountLow: string;
      client: string;
      status: string;
    };
    summary: {
      paid: string;
      outstanding: string;
    };
  };
  locale: "fa" | "en";
};
