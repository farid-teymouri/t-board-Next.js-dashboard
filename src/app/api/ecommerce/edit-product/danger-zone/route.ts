import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    lifetimeSales: 42,
    reviews: 128,
  });
}
