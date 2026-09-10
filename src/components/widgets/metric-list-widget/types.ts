import type { LucideIcon } from "lucide-react";

export type MetricValueType = "number" | "decimal" | "duration";

export interface MetricListItem {
  id: string;
  label: string;
  value: number;
  valueType?: MetricValueType;
  change: number;
  icon?: LucideIcon;
}

export interface MetricListWidgetProps {
  header: {
    label?: string;
    title: string;
    description?: string;
  };
  items: MetricListItem[];
  locale: "fa" | "en";
}
