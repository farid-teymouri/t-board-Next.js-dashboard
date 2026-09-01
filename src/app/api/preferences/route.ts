import { NextResponse } from "next/server";

import type { UserPreferences } from "../types/preferences";

const preferences: UserPreferences = {
  notifications: {
    sms: true,
    email: false,
  },
};

export async function GET() {
  return NextResponse.json(preferences);
}
