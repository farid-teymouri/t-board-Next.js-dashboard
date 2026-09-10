import { NextResponse } from "next/server";

import type { ConversionFunnelResponse } from "@/types/dashboards/analytics/conversion-funnel";

const response: ConversionFunnelResponse = {
  items: [
    {
      id: 1,
      name: "Visited",
      value: 128400,
    },
    {
      id: 2,
      name: "Signed up",
      value: 38520,
    },
    {
      id: 3,
      name: "Activated",
      value: 14124,
    },
    {
      id: 4,
      name: "Paid",
      value: 3648,
    },
  ],
};

export async function GET() {
  return NextResponse.json(response);
}
