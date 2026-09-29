import { NextResponse } from "next/server";

import type { ProductOverview } from "@/modules/ecommerce/product-details/widgets/product-overview/types";

const productOverview: ProductOverview = {
  brand: {
    fa: "آرورا",
    en: "Aurora",
  },
  category: {
    fa: "تجهیزات صوتی بی‌ سیم",
    en: "Wireless Audio",
  },
  name: {
    fa: "چراغ رومیزی آلومینیومی آرورا",
    en: "Aurora Aluminium Task Lamp",
  },
  sku: "APG-0001",

  vendor: {
    fa: "Aperture Studio",
    en: "Aperture Studio",
  },

  warranty: {
    fa: "۲ سال",
    en: "2 years",
  },

  rating: 4.5,
  reviewCount: 128,
  price: 120000,
  originalPrice: 150000,
  currency: "IRT",
  availableQuantity: 84,
  description: {
    fa: "این چراغ رومیزی با آلومینیوم ماشین‌ کاری‌ شده دقیق، قابلیت تنظیم نور بدون پله، بازوی مفصلی مغناطیسی و LED قابل تنظیم با دمای رنگ ۲۷۰۰ تا ۴۰۰۰ کلوین طراحی شده است. این محصول برای کار متمرکز پشت میز ساخته شده و به همراه پایه مجهز به عبور دهی USB-C عرضه می‌شود.",
    en: "A precision-machined aluminium task lamp with stepless dimming, a magnetic articulating arm and a warm 2700K–4000K tunable LED. Built for focused desk work, it ships with a USB-C passthrough base.",
  },
};

export async function GET() {
  return NextResponse.json({
    ...productOverview,
  });
}
