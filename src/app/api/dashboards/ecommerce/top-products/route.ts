import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") ?? "en";

  const isPersian = locale === "fa";

  return NextResponse.json({
    items: [
      {
        id: 1,
        name: isPersian
          ? "هدفون بی‌سیم SoundMax Pro"
          : "SoundMax Pro Wireless Headphones",
        category: isPersian ? "الکترونیک" : "Electronics",
        value: 1204,
        progress: 100,
        amount: 1290000,
        icon: "headphones",
      },
      {
        id: 2,
        name: isPersian ? "هودی کتان Essential" : "Essential Cotton Hoodie",
        category: isPersian ? "پوشاک" : "Apparel",
        value: 982,
        progress: 81.56,
        amount: 4200000,
        icon: "shirt",
      },
      {
        id: 3,
        name: isPersian
          ? "سرم آبرسان پوست PureSkin"
          : "PureSkin Hydrating Serum",
        category: isPersian ? "زیبایی" : "Beauty",
        value: 854,
        progress: 70.93,
        amount: 3800000,
        icon: "sparkles",
      },
      {
        id: 4,
        name: isPersian ? "گلدان سرامیکی Nordic" : "Nordic Ceramic Planter",
        category: isPersian ? "خانه" : "Home",
        value: 611,
        progress: 50.75,
        amount: 2800000,
        icon: "flower",
      },
    ],
  });
}
