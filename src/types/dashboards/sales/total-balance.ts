export interface TotalBalanceResponse {
  bankName: string;
  availableBalance: number;
  currency: {
    code: "IRT";
    label: string;
  };
  cardNumber: string;

  labels: {
    availableBalance: string;
  };

  summary: {
    income: number;
    spend: number;
    saved: number;
  };
}
