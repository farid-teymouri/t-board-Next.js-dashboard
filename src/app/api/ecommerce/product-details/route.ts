import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    id: "prod-001",
    name: "Aurora Wireless Buds",
    sku: "AWB-2026",
    category: "Electronics",
  });
}
