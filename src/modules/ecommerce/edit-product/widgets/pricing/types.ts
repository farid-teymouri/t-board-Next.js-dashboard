export type PricingData = {
  price: number;
  discount: number;
  chargeTax: boolean;
  floatingPrice: boolean;
};

export type InstallmentPaymentInterval = 1 | 3 | 6;

export type InstallmentData = {
  enabled: boolean;
  months: number;
  paymentInterval: InstallmentPaymentInterval;
  downPaymentPercent: number;
  interestRate: number;
};

export type PricingDictionary = {
  title: string;
  price: string;
  priceRequired: string;
  discount: string;
  discountDescription: string;
  salePrice: string;
  installment: string;
  installmentDescription: string;
  enableInstallment: string;
  months: string;
  downPayment: string;
  interestRate: string;
  monthlyPayment: string;
  installmentSummary: string;
  monthsSuffix: string;
  chargeTax: string;
  chargeTaxDescription: string;
  floatingPrice: string;
  floatingPriceDescription: string;
  loading: string;
  error: string;
  invalidPrice: string;
  invalidDiscount: string;
  invalidMonths: string;
  invalidDownPayment: string;
  invalidInterestRate: string;
  priceInWords: string;
};
