"use client";

import { useQuery } from "@tanstack/react-query";

import type { InvoicesTableData } from "../widgets/invoices-table/types";

async function fetchInvoices(): Promise<InvoicesTableData> {
  const response = await fetch("/api/ecommerce/invoices/invoices-table");

  if (!response.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return response.json();
}

export function useInvoices() {
  return useQuery({
    queryKey: ["ecommerce", "invoices", "table"],
    queryFn: fetchInvoices,
  });
}
