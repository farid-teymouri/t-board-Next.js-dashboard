export type UserSalesOverview = {
  revenueGrowth: number;
  topProducts: string[];
  targetHit: number;
  dealsWon: number;
  stillOpen: number;
  pendingInvoices: number;
};
export type TotalRevenue = {
  currentYear: {
    month: string;
    revenue: number;
  }[];

  growth: number;
};
