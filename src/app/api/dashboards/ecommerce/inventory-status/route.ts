import { NextResponse } from "next/server";

import type { InventoryStatusResponse } from "@/types/dashboards/ecommerce/inventory-status";

const response: InventoryStatusResponse = {
  total: 3210,
  items: [
    {
      id: "in-stock",
      label: "In stock",
      value: 2504,
    },
    {
      id: "low-stock",
      label: "Low stock",
      value: 481,
    },
    {
      id: "out-of-stock",
      label: "Out of stock",
      value: 225,
    },
  ],
  belowReorderThreshold: 14,
};

export async function GET() {
  return NextResponse.json(response);
}
