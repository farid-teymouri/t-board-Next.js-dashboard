import { NextResponse } from "next/server";

import type { EcommerceEditProductData } from "@/types/ecommerce/edit-product";

const editProduct: EcommerceEditProductData = {
  id: "APG-0001",
  status: "active",
  stock: 84,
  lastSavedAt: "2026-06-22T14:41:00",
 
};

export async function GET() {
  return NextResponse.json(editProduct);
}
