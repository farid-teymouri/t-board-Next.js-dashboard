export type CashFlowPeriod = "6M" | "12M" | "YTD";

export type CashFlowDataPoint = {
  month: string;
  monthEn: string;
  income: number;
  expenses: number;
  net: number;
};

export type CashFlowResponse = {
  period: CashFlowPeriod;
  currency: "IRT";
  data: CashFlowDataPoint[];
};
