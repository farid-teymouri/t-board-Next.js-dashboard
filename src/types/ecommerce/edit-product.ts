export type EditProductStatus = "active" | "inactive";

export interface EcommerceEditProductData {
  id: string;
  status: EditProductStatus;
  stock: number;
  lastSavedAt: string;
}
