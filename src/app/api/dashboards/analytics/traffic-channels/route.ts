import { NextResponse } from "next/server";

import type { TrafficChannelsResponse } from "@/types/dashboards/analytics/traffic-channels";

export async function GET() {
  const trafficChannels: TrafficChannelsResponse = {
    totalVisitors: 128_400,

    channels: {
      organicSearch: 53_928,
      direct: 30_816,
      social: 20_544,
      referral: 14_124,
      paid: 8_988,
    },
  };

  return NextResponse.json(trafficChannels);
}
