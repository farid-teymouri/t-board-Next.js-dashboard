import type { GrowthMetric } from "@/types/metrics/growth";

export function getGrowthComparisonKey(period: GrowthMetric["period"]) {
  switch (period) {
    case "day":
      return "previousDay";

    case "week":
      return "previousWeek";

    case "month":
      return "previousMonth";

    case "year":
      return "previousYear";
  }
}
