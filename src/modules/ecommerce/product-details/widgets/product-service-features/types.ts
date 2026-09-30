export interface ProductServiceFeature {
  id: string;

  icon: "support" | "returns" | "shipping" | "secure-payment" | "authenticity";

  title: {
    fa: string;
    en: string;
  };

  description: {
    fa: string;
    en: string;
  };
}

export interface ProductServiceFeaturesData {
  features: ProductServiceFeature[];
}
