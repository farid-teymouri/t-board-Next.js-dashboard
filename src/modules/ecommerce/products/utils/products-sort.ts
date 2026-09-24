import type { EcommerceProduct } from "@/types/ecommerce/products";
import type { ProductsSort } from "../widgets/products-list";

export function sortProducts(
  products: EcommerceProduct[],
  sort: ProductsSort = "featured",
) {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.id.localeCompare(a.id));

    case "price-high-to-low":
      return sorted.sort((a, b) => b.price - a.price);

    case "price-low-to-high":
      return sorted.sort((a, b) => a.price - b.price);

    case "best-selling":
      return sorted.sort((a, b) => b.sales - a.sales);

    case "top-rated":
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return b.reviewCount - a.reviewCount;
      });

    case "name-a-z":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        }),
      );

    default:
      return sorted;
  }
}