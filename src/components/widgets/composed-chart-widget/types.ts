export type ChartSeries = {
  dataKey: string;
  label: string;
  color: string;
  type: "bar" | "line";
  radius?: number;
};

export type ChartData = {
  [key: string]: string | number;
};

export type ChartPeriodOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ChartPeriods = {
  options: ChartPeriodOption[];
  value: string;
  onChange: (value: string) => void;
};

export type ComposedChartWidgetHeader = {
  label: string;
  title: string;
  description?: string;
};

export interface ComposedChartWidgetProps {
  header: ComposedChartWidgetHeader;

  data: ChartData[];

  series: ChartSeries[];

  xAxisDataKey: string;

  periods?: ChartPeriods;

  formatter?: (value: number, locale: "fa" | "en") => string;

  locale: "fa" | "en";
}
