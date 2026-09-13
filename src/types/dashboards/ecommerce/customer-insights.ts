import type { Currency } from "@/utils/currency";

export interface CustomerInsightsResponse {
  lowStockAlerts: {
    title: string;
    action: string;
    items: {
      id: string;
      name: string;
      sku: string;
      quantity: number;
    }[];
  };

  topCustomers: {
    title: string;
    items: {
      id: string;
      initials: string;
      name: string;
      orders: number;
      total: number;
      currency: Currency;
    }[];
  };
}
