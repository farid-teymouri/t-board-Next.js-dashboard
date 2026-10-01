import type { EcommerceCheckoutDictionary } from "@/i18n/dictionaries";
export type OrderSummaryLocalizedValue = {
  fa: string;
  en: string;
};

export type OrderSummaryProduct = {
  id: string;
  name: OrderSummaryLocalizedValue;
  description: OrderSummaryLocalizedValue;
  image: string;
  price: number;
  currency: "IRT";
  quantity: number;
  size: OrderSummaryLocalizedValue;
  color: OrderSummaryLocalizedValue;
};

export type OrderSummarySummary = {
  subtotal: number;
  shipping: number;
  total: number;
  currency: "IRT";
};

export type OrderSummaryData = {
  products: OrderSummaryProduct[];
  summary: OrderSummarySummary;
};

export type OrderSummaryProps = {
  dictionary: EcommerceCheckoutDictionary["orderSummary"];
  locale: "fa" | "en";
};
