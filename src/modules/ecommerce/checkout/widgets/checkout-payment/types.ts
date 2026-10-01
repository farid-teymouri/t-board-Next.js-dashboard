export type CheckoutPaymentType = {
  id: "online" | "bank-transfer";
  name: string;
  description?: string;
  isDefault: boolean;
};

export type CheckoutPaymentMethod = {
  id: string;
  name: string;
  logo: string;
  isDefault: boolean;
};

export type CheckoutPaymentDictionary = {
  step: string;
  title: string;
  description: string;
  back: string;
  continueToReview: string;
};

export type CheckoutPaymentProps = {
  dictionary: CheckoutPaymentDictionary;
  locale: "fa" | "en";
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  onBack: () => void;
  onContinue: () => void;
};
