import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    sku: "APG-0001",
    barcode: "890123456789",
    trackQuantity: true,
    quantity: 84,
    lowStockAlertAt: 10,
    location: {
      id: "website",
      name: {
        en: "Website Warehouse",
        fa: "انبار وب‌سایت",
      },
    },
    locations: [
      {
        id: "website",
        name: {
          en: "Website Warehouse",
          fa: "انبار وب‌سایت",
        },
      },
      {
        id: "main",
        name: {
          en: "Main Storage",
          fa: "انبار اصلی",
        },
      },
      {
        id: "tehran",
        name: {
          en: "Tehran Branch",
          fa: "شعبه تهران",
        },
      },
      {
        id: "berlin",
        name: {
          en: "Berlin Warehouse",
          fa: "انبار برلین",
        },
      },
    ],
  });
}
