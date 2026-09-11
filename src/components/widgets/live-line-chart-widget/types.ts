export type LiveLineChartPoint = {
  timestamp: string;
  value: number;
};

export type LiveLineChartGoal = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type LiveLineChartWidgetProps = {
  title: string;
  description: string;
  liveLabel: string;

  value: number;
  data: LiveLineChartPoint[];

  goalsTitle: string;
  goals: LiveLineChartGoal[];

  locale: "fa" | "en";
};
