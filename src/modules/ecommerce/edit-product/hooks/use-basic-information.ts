"use client";

import { useQuery } from "@tanstack/react-query";

import type { BasicInformationData } from "../widgets/basic-information/types";

type EditProductResponse = {
  basicInformation: BasicInformationData;
};

async function fetchEditProduct(
  locale: "fa" | "en",
): Promise<EditProductResponse> {
  const response = await fetch(
    `/api/ecommerce/edit-product/basic-information?locale=${locale}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
}

export function useEditProduct(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "basic-information", locale],
    queryFn: () => fetchEditProduct(locale),
  });
}
