import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type MetricValueType = "number" | "decimal" | "duration";

export interface MetricListItem {
  id: string;
  label: string;
  value: number;
  valueType?: MetricValueType;
  change: number;
  icon?: LucideIcon;
}

export interface MetricListWidgetHeader {
  label?: string;
  title: string;
  description?: string;
}

export interface MetricListWidgetMetricsProps {
  variant?: "metrics";
  header: MetricListWidgetHeader;
  items: MetricListItem[];
  locale: "fa" | "en";
}

export interface MetricListSectionItem {
  id: string;
  label: ReactNode;
  meta?: ReactNode;
  value?: number;
  icon?: LucideIcon;
  iconClassName?: string;
}

export interface MetricListSection {
  id: string;
  title: string;
  action?: {
    label: string;
  };
  items: MetricListSectionItem[];
}

export interface MetricListWidgetSectionsProps {
  variant: "sections";
  sections: MetricListSection[];
  locale: "fa" | "en";
}

export type MetricListWidgetProps =
  | MetricListWidgetMetricsProps
  | MetricListWidgetSectionsProps;
