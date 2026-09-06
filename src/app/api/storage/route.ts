import { NextResponse } from "next/server";

import type { UserStorage } from "../../../types/storage";

const storage: UserStorage = {
  usedBytes: 7_516_192_768,
  totalBytes: 10_737_418_240,
};

export async function GET() {
  return NextResponse.json(storage);
}
