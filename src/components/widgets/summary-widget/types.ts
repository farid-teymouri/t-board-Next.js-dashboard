import type { ReactNode } from "react";

export type SummaryMetric = {
  label: string;
  value: ReactNode;
};

export type SummaryAction = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary";
};

export type SummaryWidgetProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  metrics?: SummaryMetric[];
  actions?: SummaryAction[];
};
