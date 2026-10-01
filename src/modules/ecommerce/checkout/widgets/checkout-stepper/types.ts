export type CheckoutStepperDictionary = {
  steps: {
    contactAddress: string;
    shipping: string;
    payment: string;
    review: string;
  };
  status: {
    inProgress: string;
    complete: string;
  };
};

export type CheckoutStepperProps = {
  dictionary: CheckoutStepperDictionary;
  locale: "fa" | "en";
  currentStep: number;
};
