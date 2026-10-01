export type CheckoutReviewLocalizedValue = {
  fa: string;
  en: string;
};

export type CheckoutReviewContact = {
  email: string;
  phone: string;
};

export type CheckoutReviewShippingAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  province: string;
  city: string;
  postcode: string;
};

export type CheckoutReviewShipping = {
  name: string;
  description: string;
  price: number;
  currency: "IRT";
};

export type CheckoutReviewPayment = {
  type: "online" | "bank-transfer";
  typeName: string;
  methodName?: string;
};

export type CheckoutReviewProduct = {
  id: string;
  name: CheckoutReviewLocalizedValue;
  description: CheckoutReviewLocalizedValue;
  image: string;
  price: number;
  currency: "IRT";
  quantity: number;
  size: CheckoutReviewLocalizedValue;
  color: CheckoutReviewLocalizedValue;
};

export type CheckoutReviewSummary = {
  subtotal: number;
  shipping: number;
  total: number;
  currency: "IRT";
};

export type CheckoutReviewData = {
  contact: CheckoutReviewContact;
  shippingAddress: CheckoutReviewShippingAddress;
  shipping: CheckoutReviewShipping;
  payment: CheckoutReviewPayment;
  products: CheckoutReviewProduct[];
  summary: CheckoutReviewSummary;
};

export type CheckoutReviewDictionary = {
  step: string;
  title: string;
  description: string;
  contact: string;
  email: string;
  phone: string;
  shipToAddress: string;
  address: string;
  province: string;
  city: string;
  postcode: string;
  shipping: string;
  paymentMethod: string;
  products: string;
  terms: string;
  placeOrder: string;
  backToPayment: string;
  item: string;
  termsError: string;
};

export type CheckoutReviewProps = {
  dictionary: CheckoutReviewDictionary;
  locale: "fa" | "en";
  onBack: () => void;
};
