export type PerformanceData = {
  unitsSold: number;
  revenue: {
    value: number;
    currency: "USD" | "IRR" | "IRT" | "TRY" | "USDT" | "EUR" | "GBP";
  };
  conversion: number;
  averageRating: number;
};
