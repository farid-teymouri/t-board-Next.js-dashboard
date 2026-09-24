export type ProductStatus = "in-stock" | "out-of-stock" | "low-stock";

export type ProductBadge = "new" | "bestseller" | "on-sale";

export type ProductImageVariant = "chart-2" | "chart-3" | "chart-4" | "chart-5";

export type ProductImage = {
  primary: ProductImageVariant;
  secondary: ProductImageVariant;
  foreground: string;
};

export interface EcommerceProduct {
  id: string;
  name: string;
  category: string;
  image: ProductImage;

  price: number;
  previousPrice?: number;
  currency: "IRT";

  rating: number;
  reviewCount: number;

  stock: number;
  sales: number;

  status: ProductStatus;
  badges: ProductBadge[];
}

export interface EcommerceProductCategory {
  id: string;
  name: string;
  count: number;
}

export interface EcommerceProductsFilters {
  categories: EcommerceProductCategory[];

  price: {
    min: number;
    max: number;
    step: number;
  };

  availability: ProductStatus[];

  ratings: number[];
}

export interface EcommerceProductsData {
  products: EcommerceProduct[];
  filters: EcommerceProductsFilters;

  count: number;
  total: number;
}
