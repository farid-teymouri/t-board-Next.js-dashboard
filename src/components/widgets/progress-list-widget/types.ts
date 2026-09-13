import type { ReactNode } from "react";

import type { Currency } from "@/utils/currency";

export type ProgressListVariant =
  | "classic"
  | "colorful"
  | "funnel"
  | "products";

export type ProgressListValueMode = "value" | "amount" | "percentage";

export type ProgressListRank = "hidden" | "visible" | "highlighted";

export type ProgressListTranslations = {
  title: string;
  description: string;
  action?: string;
  valueSuffix?: string;
  sold?: string;
  categories?: Record<string, string>;
  stages?: string[];
  conversionLabel?: string;
};

export type FunnelProgressListTranslations = ProgressListTranslations & {
  stages: string[];
  conversionLabel: string;
};

export type ProgressListItem = {
  id: number | string;
  name: string;
  value: number;
  progress?: number;
  category?: string;
  description?: string;
  amount?: number;
  icon?: ReactNode;
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

  isLoading?: boolean;
  isError?: boolean;
};
