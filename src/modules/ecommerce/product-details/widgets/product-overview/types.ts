import type { Currency } from "@/utils/currency/types";

export type ProductOverviewVariantType = "color" | "text";

export interface ProductOverviewVariantValue {
  id: string;
  label: {
    fa: string;
    en: string;
  };
  color?: string;
  disabled?: boolean;
}

export interface ProductOverviewVariantOption {
  id: string;
  name: {
    fa: string;
    en: string;
  };
  type: ProductOverviewVariantType;
  values: ProductOverviewVariantValue[];
}

export interface ProductOverviewVariantCombination {
  selections: Record<string, string>;
  price: number;
  originalPrice?: number;
}

export interface ProductOverviewVariants {
  options: ProductOverviewVariantOption[];
  combinations: ProductOverviewVariantCombination[];
}

export interface ProductOverview {
  brand: {
    fa: string;
    en: string;
  };

  category: {
    fa: string;
    en: string;
  };

  name: {
    fa: string;
    en: string;
  };

  sku: string;

  vendor: {
    fa: string;
    en: string;
  };

  warranty: {
    fa: string;
    en: string;
  };

  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  currency: Currency;
  availableQuantity: number;

  description: {
    fa: string;
    en: string;
  };
}
