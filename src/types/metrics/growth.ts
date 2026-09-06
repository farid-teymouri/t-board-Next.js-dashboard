export type GrowthPeriod = "day" | "week" | "month" | "year";

export type GrowthTrend = "up" | "down" | "neutral";

export type GrowthMetric = {
  value: number;
  trend: GrowthTrend;
  period: GrowthPeriod;
};
