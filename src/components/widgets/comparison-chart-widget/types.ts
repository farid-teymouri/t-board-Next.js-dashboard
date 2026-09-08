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

export interface ComparisonChartPeriod<TValue extends string = string> {
  value: TValue;
  label: string;
}

export interface ComparisonChartWidgetProps<TPeriod extends string = string> {
  title: string;
  description?: string;
  data: ComparisonChartDataPoint[];
  series: ComparisonChartSeries[];
  locale: "fa" | "en";
  periods?: ComparisonChartPeriod<TPeriod>[];
  activePeriod?: TPeriod;
  onPeriodChange?: (period: TPeriod) => void;
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
