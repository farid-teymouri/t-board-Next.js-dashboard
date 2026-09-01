import { NextResponse } from "next/server";

import type { UserProfile } from "../types/profile";

const profile: UserProfile = {
  name: "John Smith",
  username: "Johnsmith748",
  email: "johnsmith@example.com",
  avatarSrc: "/images/avatar.jpg",
  status: "online",
  role: "administrator",
};

export async function GET() {
  return NextResponse.json(profile);
}
