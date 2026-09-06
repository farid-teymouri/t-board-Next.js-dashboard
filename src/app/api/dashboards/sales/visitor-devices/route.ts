import { NextResponse } from "next/server";
import type { VisitorDevicesResponse } from "@/types/dashboards/sales/visitor-devices";
export async function GET() {
  const visitorDevices: VisitorDevicesResponse = {
    totalVisitors: 56_020,
    devices: { mobile: 31_720, desktop: 18_460, tablet: 5_840 },
  };
  return NextResponse.json(visitorDevices);
}
