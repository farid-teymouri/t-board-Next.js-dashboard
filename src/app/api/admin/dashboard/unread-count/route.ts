import { NextResponse } from "next/server";

import type { AdminDashboardUnreadCount } from "../../types/dashboard";

const dashboardUnreadCount: AdminDashboardUnreadCount = {
  unreadCount: 5,
};

export async function GET() {
  return NextResponse.json(dashboardUnreadCount);
}
