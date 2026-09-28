import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "saved",
    savedAt: "2026-06-22T14:41:00",
  });
}
