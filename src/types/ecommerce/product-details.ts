export type ProductMediaType = "image" | "video";

export type ProductStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductCondition = "new" | "used" | "refurbished";

export type ProductOrderStatus =
  | "completed"
  | "processing"
  | "refunded"
  | "cancelled";

export interface ProductMedia {
  id: string;
  type: ProductMediaType;
  src: string;
  thumbnail?: string;
  alt: string;
  isPrimary?: boolean;
}

export interface EcommerceProductDetailsInfo {
  brand: string;
  description: string;
  shortDescription: string;
  status: ProductStatus;
  condition: ProductCondition;
  tags: string[];
}

export interface EcommerceProductPricing {
  currency: string;
  price: number;
  compareAtPrice: number;
  discountPercentage: number;
}

export interface EcommerceProductInventory {
  stock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  warehouse: string;
}

export interface EcommerceProductMetrics {
  views: number;
  orders: number;
  unitsSold: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
}

export interface EcommerceProductSalesData {
  date: string;
  sales: number;
  revenue: number;
}

export interface EcommerceProductSales {
  totalUnitsSold: number;
  totalRevenue: number;
  averageOrderValue: number;
  data: EcommerceProductSalesData[];
}

export interface EcommerceProductAttribute {
  id: string;
  label: string;
  value: string;
}

export interface EcommerceProductRecentOrder {
  id: string;
  customer: string;
  quantity: number;
  total: number;
  currency: string;
  status: ProductOrderStatus;
  createdAt: string;
}

export interface EcommerceProductDetailsData {
  id: string;
  name: string;
  sku: string;
  category: string;

  info: EcommerceProductDetailsInfo;

  pricing: EcommerceProductPricing;

  inventory: EcommerceProductInventory;

  metrics: EcommerceProductMetrics;

  sales: EcommerceProductSales;

  attributes: EcommerceProductAttribute[];

  media: ProductMedia[];

  recentOrders: EcommerceProductRecentOrder[];
}
