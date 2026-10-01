export type CheckoutContactAddressDictionary = {
  step: string;
  title: string;
  description: string;

  contactInformation: string;
  alreadyHaveAccount: string;
  login: string;
  email: string;
  emailPlaceholder: string;
  emailDescription: string;

  shippingAddress: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  province: string;
  city: string;
  postcode: string;
  companyName: string;
  phone: string;
  additionalInformation: string;

  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  address1Placeholder: string;
  address2Placeholder: string;
  cityPlaceholder: string;
  postcodePlaceholder: string;
  companyNamePlaceholder: string;
  phonePlaceholder: string;
  additionalInformationPlaceholder: string;

  provincePlaceholder: string;

  provinces: {
    value: string;
    label: string;
  }[];

  continueToShipping: string;

  validation: {
    required: string;
    invalidEmail: string;
  };
  provinceNotFound: string;
  provinceSearchPlaceholder: string;
};

export type CheckoutContactAddressFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  province: string;
  city: string;
  phone: string;
  postcode: string;
  companyName: string;
  additionalInformation: string;
};

export type CheckoutContactAddressProps = {
  dictionary: CheckoutContactAddressDictionary;
  locale: "fa" | "en";
  /** Pre-fill the form from localStorage / previous step */
  defaultValues?: CheckoutContactAddressFormValues;
  /** Called on every field change (debounced) so partial form data survives refresh */
  onValuesChange?: (data: CheckoutContactAddressFormValues) => void;
  onContinue: (data: CheckoutContactAddressFormValues) => void;
};
