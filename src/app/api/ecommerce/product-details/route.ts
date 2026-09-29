import { NextResponse } from "next/server";

import type { ProductDetails } from "@/types/ecommerce/product-details";

const productDetails: ProductDetails = {
  id: "prod-001",

  name: {
    fa: "چراغ رومیزی آلومینیومی آرورا",
    en: "Aurora Aluminium Task Lamp",
  },

  sku: "APG-0001",

  category: {
    fa: "تجهیزات صوتی بی‌ سیم",
    en: "Wireless Audio",
  },
};

export async function GET() {
  return NextResponse.json(productDetails);
}
