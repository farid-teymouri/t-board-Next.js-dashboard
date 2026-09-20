import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    department: "Engineering",
    applicants: 124,
  });
}
