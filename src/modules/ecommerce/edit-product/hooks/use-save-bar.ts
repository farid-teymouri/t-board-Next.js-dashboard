import { useQuery } from "@tanstack/react-query";

import type { SaveBarData } from "../widgets/save-bar/types";

const SAVE_BAR_API_URL = "/api/ecommerce/edit-product/save-bar";

async function fetchSaveBar(): Promise<SaveBarData> {
  const response = await fetch(SAVE_BAR_API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch save bar data");
  }

  return response.json();
}

export function useSaveBar() {
  return useQuery({
    queryKey: ["ecommerce", "edit-product", "save-bar"],
    queryFn: fetchSaveBar,
  });
}
