"use client";

import { useQuery } from "@tanstack/react-query";

type SearchEngineListingResponse = {
  pageTitle: {
    en: string;
    fa: string;
  };
  metaDescription: {
    en: string;
    fa: string;
  };
  breadcrumbs: {
    domain: string;
    category: string;
    slug: string;
  };
};
async function fetchSearchEngineListing(): Promise<SearchEngineListingResponse> {
  const response = await fetch(
    "/api/ecommerce/edit-product/search-engine-listing",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search engine listing");
  }

  return response.json();
}

export function useSearchEngineListing(locale: "fa" | "en") {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "search-engine-listing", locale],
    queryFn: fetchSearchEngineListing,
    select: (data) => ({
      pageTitle: data.pageTitle[locale],
      metaDescription: data.metaDescription[locale],
      breadcrumbs: data.breadcrumbs,
    }),
  });
}
