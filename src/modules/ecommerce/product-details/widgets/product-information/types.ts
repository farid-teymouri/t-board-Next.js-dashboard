export type ProductInformationRow = {
  label: string;
  value: string;
};

export type ProductInformationData = {
  description: string;
  specifications: ProductInformationRow[];
  additionalInformation: ProductInformationRow[];
  reviewsCount: number;
};

export type ProductInformationTabsDictionary = {
  description: string;
  specification: string;
  additionalInformation: string;
  reviews: string;
  vendor: string;
};

export type ProductInformationReviewsDictionary = {
  basedOn: string;
  writeReview: string;
  verified: string;
  helpful: string;
  viewMore: string;
};

export type ProductInformationDictionary = {
  tabs: ProductInformationTabsDictionary;
  content: {
    error: string;
  };
  reviews: ProductInformationReviewsDictionary;
};

export type ProductInformationProps = {
  data: ProductInformationData;
  dictionary: ProductInformationDictionary;
};

export interface ProductInformationItem {
  label: {
    fa: string;
    en: string;
  };
  value: {
    fa: string;
    en: string;
  };
}

export interface ProductInformationDescription {
  paragraphs: {
    fa: string;
    en: string;
  }[];
  features: {
    fa: string;
    en: string;
  }[];
}

export interface ProductReview {
  id: string;

  user: {
    initials: string;
    name: string;
  };

  rating: number;

  date: string;

  verified: boolean;

  content: {
    fa: string;
    en: string;
  };

  helpfulCount: number;
}

export interface ProductRatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ProductInformation {
  description: ProductInformationDescription;

  specifications: ProductInformationItem[];

  additionalInformation: ProductInformationItem[];

  rating: number;

  reviewCount: number;

  ratingDistribution: ProductRatingDistribution;

  reviews: ProductReview[];

  vendor: ProductVendor;
}

export interface ProductVendor {
  name: {
    fa: string;
    en: string;
  };
  logo: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  instagram: string;
  telegram: string;
  description: {
    fa: string;
    en: string;
  };
}
