export type GrowthPeriod = "day" | "week" | "month" | "year";

export type GrowthTrend = "up" | "down";

export type GrowthMetric = {
  value: number;

  // up = increase, down = decrease
  trend: "up" | "down";

  // Comparison period
  period: "day" | "week" | "month" | "year";
};
