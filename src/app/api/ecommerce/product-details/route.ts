import { NextResponse } from "next/server";

import type { ProductDetails } from "@/types/ecommerce/product-details";

const productDetails: ProductDetails = {
  id: "prod-001",
  name: "Aurora Wireless Buds",
  sku: "AWB-2026",
  category: "Electronics",
};

export async function GET() {
  return NextResponse.json(productDetails);
}
