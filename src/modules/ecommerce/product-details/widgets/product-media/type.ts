import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";
import type { ProductMedia } from "@/types/ecommerce/product-details";

export type ProductMediaProps = {
  media: ProductMedia[];
  dictionary: EcommerceProductDetailsDictionary["media"];
};
