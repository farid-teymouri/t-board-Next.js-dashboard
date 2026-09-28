import { useQuery } from "@tanstack/react-query";

import type { VariantsData } from "../widgets/variants/types";

const fetchVariants = async (locale: "fa" | "en"): Promise<VariantsData> => {
  const response = await fetch(
    `/api/ecommerce/edit-product/variants?locale=${locale}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch variants");
  }

  return response.json();
};

export function useVariants(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "variants", locale],
    queryFn: () => fetchVariants(locale),
  });
}
