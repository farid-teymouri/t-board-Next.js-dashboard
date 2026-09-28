export type ProductMediaType = "image" | "video";

export interface ProductMedia {
  id: string;
  type: ProductMediaType;
  src: string;
  thumbnail?: string;
  alt: string;
  isPrimary?: boolean;
}
