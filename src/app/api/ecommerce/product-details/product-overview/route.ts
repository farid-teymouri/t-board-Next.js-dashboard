import { NextResponse } from "next/server";

import type { ProductOverview } from "@/modules/ecommerce/product-details/widgets/product-overview/types";

const productOverview: ProductOverview = {
  brand: {
    fa: "زاپا",
    en: "ZAPA",
  },

  category: {
    fa: "لباس‌های بیرونی",
    en: "Outerwear",
  },

  name: {
    fa: "ژاکت والُو",
    en: "Valou Jacket",
  },

  sku: "00W024442B",

  vendor: {
    fa: "ZAPA",
    en: "ZAPA",
  },

  warranty: {
    fa: "ندارد",
    en: "—",
  },

  rating: 4.5,

  reviewCount: 128,

  price: 3420000,

  originalPrice: 5250000,

  currency: "IRT",

  availableQuantity: 5,

  description: {
    fa: "ژاکت والُو، یکی از مدل‌های شاخص این برند، این فصل با خز مصنوعی تدی و به رنگ شکلاتی بازطراحی شده است. یقه ایستاده و نوارهای کشباف در قسمت لبه‌ها، ظاهری مدرن و راحت به این مدل می‌دهند و آن را به گزینه‌ای مناسب برای استایل‌های روزمره تبدیل می‌کنند.",

    en: "The VALOU jacket, an iconic piece from the brand, is reinvented this season in a teddy-style faux fur. Available in chocolate, it easily complements all your everyday outfits. Its stand-up collar and ribbed trim add a modern and comfortable touch to this essential piece.",
  },
};

export async function GET() {
  return NextResponse.json({
    ...productOverview,
  });
}
