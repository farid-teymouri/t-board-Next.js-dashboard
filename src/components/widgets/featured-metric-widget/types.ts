import type { ReactNode } from "react";

export type FeaturedMetricCardData = {
  label: ReactNode;
  amountLabel: ReactNode;
  amount: ReactNode;
  currency: ReactNode;
  identifier?: ReactNode;
  direction?: "ltr" | "rtl";
};

export type FeaturedMetricCardContent =
  | {
      type: "card";
      loading: true;
    }
  | ({
      type: "card";
      loading?: false;
    } & FeaturedMetricCardData);

export type FeaturedMetricSelectorOption = {
  value: string;
  label: ReactNode;
};

export type FeaturedMetricSelector = {
  options: readonly FeaturedMetricSelectorOption[];
  value: string;
  onChange: (value: string) => void;
};

export type FeaturedMetricContent = FeaturedMetricCardContent;

export type FeaturedMetricHeader = {
  title: ReactNode;
  selector?: FeaturedMetricSelector;
};

export type FeaturedMetricWidgetProps = {
  header?: FeaturedMetricHeader;
  content?: FeaturedMetricContent;
  footer?: ReactNode;
  loading?: boolean;
};
