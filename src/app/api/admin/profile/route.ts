import { NextResponse } from "next/server";

import type { AdminProfile } from "../types/profile";

const adminProfile: AdminProfile = {
  name: "John Smith",
  username: "Johnsmith748",
  email: "johnsmith@example.com",
  avatarSrc: "/images/avatar.jpg",
  status: "online",
  role: "administrator",
};

export async function GET() {
  return NextResponse.json(adminProfile);
}
