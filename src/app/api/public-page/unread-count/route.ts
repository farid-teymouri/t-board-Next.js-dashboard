import { NextResponse } from "next/server";

import type { UserDashboardUnreadCount } from "../../../../types/public-page/unread-count";

const dashboardUnreadCount: UserDashboardUnreadCount = {
  unreadCount: 5,
};

export async function GET() {
  return NextResponse.json(dashboardUnreadCount);
}
