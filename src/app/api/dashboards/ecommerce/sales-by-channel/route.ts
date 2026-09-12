import { NextResponse } from "next/server";

import type { SalesByChannelResponse } from "@/types/dashboards/ecommerce/sales-by-channel";

const response: SalesByChannelResponse = {
  items: [
    {
      id: 1,
      name: "Web store",
      value: 71400000,
      progress: 50,
    },

    {
      id: 2,
      name: "Mobile app",
      value: 38600000,
      progress: 27,
    },

    {
      id: 3,
      name: "Marketplace",
      value: 22800000,
      progress: 16,
    },

    {
      id: 4,
      name: "POS / in-store",
      value: 10000000,
      progress: 7,
    },
  ],
};

export async function GET() {
  return NextResponse.json(response);
}
