import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const locale =
    request.nextUrl.searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json({
    lowStockAlerts: {
      title: locale === "fa" ? "هشدار کمبود موجودی" : "Low-Stock Alerts",
      action: locale === "fa" ? "تأمین مجدد" : "Restock",
      items: [
        {
          id: "hydra-glow-serum",
          name: locale === "fa" ? "سرم درخشش هیدرا" : "Hydra Glow Serum",
          sku: "SKU BTY-2210",
          quantity: 8,
        },
        {
          id: "aurora-wireless-buds",
          name:
            locale === "fa" ? "ایرباد بی‌سیم اورورا" : "Aurora Wireless Buds",
          sku: "SKU ELC-0042",
          quantity: 2,
        },
        {
          id: "linen-oversized-tee-m",
          name:
            locale === "fa"
              ? "تیشرت اورسایز لینن — M"
              : "Linen Oversized Tee — M",
          sku: "SKU APP-1180",
          quantity: 11,
        },
      ],
    },

    topCustomers: {
      title: locale === "fa" ? "برترین مشتریان" : "Top Customers",
      items: [
        {
          id: "ali-rezaei",
          initials: "AR",
          name: locale === "fa" ? "علی رضایی" : "Ali Rezaei",
          orders: 28,
          total: 40210000,
          currency: "IRT",
        },
        {
          id: "mina-karimi",
          initials: "MK",
          name: locale === "fa" ? "مینا کریمی" : "Mina Karimi",
          orders: 22,
          total: 36840000,
          currency: "IRT",
        },
        {
          id: "sara-ahmadi",
          initials: "SA",
          name: locale === "fa" ? "سارا احمدی" : "Sara Ahmadi",
          orders: 19,
          total: 29400000,
          currency: "IRT",
        },
      ],
    },
  });
}
