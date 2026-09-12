export type ChartPeriod = "week" | "month" | "year";

export type ChartKey<T> = Extract<keyof T, string>;

export type ChartValueFormatter = (
  value: number,
  locale: "fa" | "en",
) => string;

export type ChartAxisPosition = "left" | "right";

export type ChartSeries<T> = {
  dataKey: ChartKey<T>;
  label: string;
  color: string;
  type: "bar" | "line";
  radius?: number;
  barSize?: number;
  yAxisId?: string;
  formatter?: ChartValueFormatter;
};
export type ChartYAxis = {
  id: string;
  position?: ChartAxisPosition;
  formatter?: ChartValueFormatter;
  ticks?: number[];
  domain?: [number | "auto", number | "auto"];
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

  /**
   * Legacy formatter.
   * Used when a series does not define its own formatter.
   */
  formatter?: ChartValueFormatter;

  /**
   * Optional dedicated Y-axes.
   * When omitted, the chart behaves like the original single-axis version.
   */
  yAxes?: ChartYAxis[];

  locale: "fa" | "en";
}
