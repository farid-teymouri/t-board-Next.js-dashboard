export type ChartPeriod = "week" | "month" | "year";

export type ChartKey<T> = Extract<keyof T, string>;

export type ChartSeries<T> = {
  dataKey: ChartKey<T>;
  label: string;
  color: string;
  type: "bar" | "line";
  radius?: number;
};

export type ChartPeriodOption = {
  label: string;
  value: ChartPeriod;
};

export type ChartPeriods = {
  options: ChartPeriodOption[];
  value: ChartPeriod;
  onChange: (value: ChartPeriod) => void;
};

export type ComposedChartWidgetHeader = {
  label: string;
  title: string;
  description?: string;
};

export interface ComposedChartWidgetProps<T> {
  header: ComposedChartWidgetHeader;
  data: T[];
  series: ChartSeries<T>[];
  xAxisDataKey: ChartKey<T>;
  periods?: ChartPeriods;
  formatter?: (value: number, locale: "fa" | "en") => string;
  locale: "fa" | "en";
}
