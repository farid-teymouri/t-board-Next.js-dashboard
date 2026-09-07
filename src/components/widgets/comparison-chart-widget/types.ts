export interface ComparisonChartDataPoint {
  label: string | number;
  values: Record<string, number>;
}

export interface ComparisonChartSeries {
  key: string;
  label: string;
  color: string;
  dashed?: boolean;
}

export interface ComparisonChartPeriod {
  value: string;
  label: string;
}

export interface ComparisonChartWidgetProps {
  title: string;
  description?: string;
  data: ComparisonChartDataPoint[];
  series: ComparisonChartSeries[];
  locale: "fa" | "en";
  periods?: ComparisonChartPeriod[];
  activePeriod?: string;
  onPeriodChange?: (period: string) => void;
  labelFormatter?: (label: string | number) => string;
  valueFormatter?: (value: number) => string;
  axisValueFormatter?: (value: number) => string;
  height?: number;
}

export interface ComparisonChartTooltipProps {
  active?: boolean;

  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;

  label?: string | number;

  locale: "fa" | "en";

  series: ComparisonChartSeries[];

  labelFormatter?: (label: string | number) => string;

  valueFormatter?: (value: number) => string;
}
