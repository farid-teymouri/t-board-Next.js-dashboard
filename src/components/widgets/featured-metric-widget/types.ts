import type { ReactNode } from "react";

export type FeaturedMetricCardContent = {
  type: "card";
  label: ReactNode;
  amountLabel: ReactNode;
  amount: ReactNode;
  currency: ReactNode;
  identifier?: ReactNode;
  direction?: "ltr" | "rtl";
};

export type FeaturedMetricContent = FeaturedMetricCardContent;

export type FeaturedMetricWidgetProps = {
  header?: ReactNode;
  content?: FeaturedMetricContent;
  footer?: ReactNode;
};
