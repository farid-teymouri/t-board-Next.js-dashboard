import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    published: 42,
    drafts: 8,
    reads: 128400,
  });
}
