import { NextResponse } from "next/server";

import type { ProductDetails } from "@/types/ecommerce/product-details";

const productDetails: ProductDetails = {
  id: "prod-001",

  name: {
    fa: "ژاکت والُو",
    en: "Valou Jacket",
  },

  sku: "00W024442B",

  category: {
    fa: "لباس‌های بیرونی",
    en: "Outerwear",
  },
};

export async function GET() {
  return NextResponse.json(productDetails);
}
