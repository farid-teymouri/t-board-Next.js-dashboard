import type { GrowthMetric } from "@/types/metrics/growth";

export type SalesSummary = {
  revenueGrowth: GrowthMetric;

  topProducts: string[];

  targetHit: number;

  dealsWon: number;

  stillOpen: number;

  pendingInvoices: number;
};
