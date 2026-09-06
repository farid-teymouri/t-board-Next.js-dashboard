import type { ReactNode } from "react";

import type { MetricData } from "@/types/metrics/metric";

export type MetricWidgetLabels = {
  title: string;

  comparison: {
    day: string;
    week: string;
    month: string;
    year: string;
  };

  units?: Record<string, string>;
};

export type MetricWidgetProps = {
  locale: "fa" | "en";
  labels: MetricWidgetLabels;
  data: MetricData;
  className?: string;
  valueFormatter?: (value: number) => ReactNode;
};
