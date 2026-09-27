"use client";

import { useQuery } from "@tanstack/react-query";

import type { OrganizationData } from "../widgets/organization/types";

export function useOrganization() {
  return useQuery<OrganizationData>({
    queryKey: ["ecommerce", "edit-product", "organization"],
    queryFn: async () => {
      const response = await fetch("/api/ecommerce/edit-product/organization");

      if (!response.ok) {
        throw new Error("Failed to fetch organization data");
      }

      return response.json();
    },
  });
}
