import { NextResponse } from "next/server";

import type { ProductServiceFeaturesData } from "@/modules/ecommerce/product-details/widgets/product-service-features/types";

const data: ProductServiceFeaturesData = {
  features: [
    {
      id: "support",
      icon: "support",
      title: {
        fa: "پشتیبانی ۲۴/۷",
        en: "24/7 Support",
      },
      description: {
        fa: "پشتیبانی ۲۴ ساعته، ۷ روز هفته",
        en: "24-hour support, 7 days a week",
      },
    },
    {
      id: "returns",
      icon: "returns",
      title: {
        fa: "ضمانت بازگشت کالا",
        en: "Easy Returns",
      },
      description: {
        fa: "مهلت ۷ روزه برای بازگشت کالا",
        en: "7-day return guarantee",
      },
    },
    {
      id: "shipping",
      icon: "shipping",
      title: {
        fa: "ارسال سریع",
        en: "Fast Shipping",
      },
      description: {
        fa: "ارسال سریع و مطمئن سفارش",
        en: "Fast and reliable delivery",
      },
    },
  ],
};

export async function GET() {
  return NextResponse.json(data);
}
