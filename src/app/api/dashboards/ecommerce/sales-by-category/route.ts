import { NextResponse } from "next/server";

import type { SalesByCategoryResponse } from "@/types/dashboards/ecommerce/sales-by-category";

export async function GET() {
  const salesByCategory: SalesByCategoryResponse = {
    netSales: 142_800,

    categories: {
      apparel: 48_600,
      electronics: 38_500,
      homeLiving: 30_000,
      beauty: 17_100,
      other: 8_600,
    },
  };

  return NextResponse.json(salesByCategory);
}
