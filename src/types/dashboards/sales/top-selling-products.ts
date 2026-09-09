import type { Currency } from "@/utils/currency";

export interface TopSellingProduct {
  id: number;
  name: string;
  category?: string;
  description?: string;
  value: number;
  progress: number;
  amount?: number;
}

export interface TopSellingProductsResponse {
  items: TopSellingProduct[];
  currency?: {
    code: Currency;
    label: string;
  };
}
