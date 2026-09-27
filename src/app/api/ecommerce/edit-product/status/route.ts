import { NextResponse } from "next/server";

import type { ProductStatusData } from "@/modules/ecommerce/edit-product/widgets/status/types";

const productStatus: ProductStatusData = {
  status: "active",
  salesChannels: {
    onlineStore: true,
    pointOfSale: true,
    socialMarketplaces: false,
  },
};

export async function GET() {
  return NextResponse.json(productStatus);
}
