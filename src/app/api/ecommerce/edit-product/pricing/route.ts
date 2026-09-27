import { NextResponse } from "next/server";

import type { PricingData } from "@/modules/ecommerce/edit-product/widgets/pricing/types";

const pricing: PricingData = {
  price: 10000000,
  discount: 15,
  chargeTax: true,
  floatingPrice: true,
};

export async function GET() {
  return NextResponse.json(pricing);
}
