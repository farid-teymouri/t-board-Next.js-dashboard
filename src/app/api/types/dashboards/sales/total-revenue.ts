export type TotalRevenue = {
  totalRevenue: number;

  currency: {
    code: string;
    label: string;
  };

  growth: number;

  labels: {
    title: string;
    performance: string;
    comparison: string;
  };

  points: {
    month: string;
    value: number;
  }[];
};
