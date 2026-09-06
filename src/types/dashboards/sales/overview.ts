import type { GrowthMetric } from "@/types/metrics/growth";

export type SalesOverview = {
  revenueGrowth: GrowthMetric;

  topProducts: string[];

  targetHit: number;

  dealsWon: number;

  stillOpen: number;

  pendingInvoices: number;
};
