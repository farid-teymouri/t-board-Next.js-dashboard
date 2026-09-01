import { NextResponse } from "next/server";

import type { UserNotificationsResponse } from "../types/notifications";

const notifications: UserNotificationsResponse = [
  {
    id: 1,
    type: "new-user",
    username: "farima23",
    types: ["new", "unread"],
    createdAt: {
      value: 7,
      unit: "minutes",
    },
  },
  {
    id: 2,
    type: "server-event",
    username: "admin",
    event: "high-cpu",
    cpuUsage: 92,
    types: ["server", "warning"],
    createdAt: {
      value: 15,
      unit: "minutes",
    },
  },
  {
    id: 3,
    type: "shared-post",
    username: "nilofare_abi",
    social: "facebook",
    types: ["share"],
    createdAt: {
      value: 32,
      unit: "minutes",
    },
  },
  {
    id: 4,
    type: "new-user",
    username: "abasi8744",
    types: ["unread"],
    createdAt: {
      value: 1,
      unit: "hour",
    },
  },
];

export async function GET() {
  return NextResponse.json(notifications);
}
