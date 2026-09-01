import { NextResponse } from "next/server";

import type { AdminStorage } from "../types/storage";

const adminStorage: AdminStorage = {
  usedBytes: 7_516_192_768,
  totalBytes: 10_737_418_240,
};

export async function GET() {
  return NextResponse.json(adminStorage);
}
