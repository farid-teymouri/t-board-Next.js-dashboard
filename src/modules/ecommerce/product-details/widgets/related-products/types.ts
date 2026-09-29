export type RelatedProductBadgeType = "new" | "bestseller" | "discount";

export interface RelatedProductBadge {
  type: RelatedProductBadgeType;
  label: {
    fa: string;
    en: string;
  };
  className: string;
}

export interface RelatedProduct {
  id: string;

  name: {
    fa: string;
    en: string;
  };

  description: {
    fa: string;
    en: string;
  };

  category: {
    fa: string;
    en: string;
  };

  price: number;

  rating: number;

  reviews: number;

  badges: RelatedProductBadge[];

  image: string;
}

export interface RelatedProductsData {
  products: RelatedProduct[];
}
