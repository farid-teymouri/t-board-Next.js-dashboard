import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/ecommerce/invoices/invoices-table",
  });
}
