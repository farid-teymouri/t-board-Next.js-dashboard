export type CheckoutShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "IRT";
  logo: string;
  isDefault: boolean;
};

export type CheckoutShippingDictionary = {
  step: string;
  title: string;
  back: string;
  continueToPayment: string;
};

export type CheckoutShippingProps = {
  dictionary: CheckoutShippingDictionary;
  locale: "fa" | "en";
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  onBack: () => void;
  onContinue: (data: CheckoutShippingData) => void;
};
export type CheckoutShippingData = {
  id: string;
  name: string;
  description: string;
  price?: number;
  currency?: string;
};
