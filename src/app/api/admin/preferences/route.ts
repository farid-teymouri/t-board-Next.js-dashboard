import { NextResponse } from "next/server";

import type { AdminPreferences } from "../types/preferences";

const adminPreferences: AdminPreferences = {
  notifications: {
    sms: true,
    email: false,
  },
};

export async function GET() {
  return NextResponse.json(adminPreferences);
}
