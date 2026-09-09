import type { ReactNode } from "react";
import type { Currency } from "@/utils/currency";
export type ProgressListVariant = "classic" | "colorful";

export type ProgressListValueMode = "value" | "amount" | "percentage";

export type ProgressListRank = "hidden" | "visible" | "highlighted";

export type ProgressListTranslations = {
  title: string;
  description: string;
  action: string;
  valueSuffix?: string;
};

export type ProgressListItem = {
  id: number | string;
  name: string;
  value: number;
  progress: number;
  category?: string;
  description?: string;
  amount?: number;
};

export type ProgressListDisplay = {
  rank?: ProgressListRank;
  progress?: boolean;
  meta?: boolean;
};

export type ProgressListStatus = "loading" | "error" | "success";

export type ProgressListWidgetProps = {
  translations: ProgressListTranslations;
  items: ProgressListItem[];
  locale: "fa" | "en";
  currency?: Currency;
  variant?: ProgressListVariant;
  valueMode?: ProgressListValueMode;
  display?: ProgressListDisplay;
  action?: ReactNode;
  currencyLabel?: string;

  isLoading?: boolean;
  isError?: boolean;
};
