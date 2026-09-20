import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const locale =
    request.nextUrl.searchParams.get("locale") === "fa" ? "fa" : "en";

  const blog = {
    en: {
      title: "Building Modern Dashboards",
      category: "Development",
    },
    fa: {
      title: "ساخت داشبوردهای مدرن",
      category: "توسعه",
    },
  };

  return NextResponse.json(blog[locale]);
}
