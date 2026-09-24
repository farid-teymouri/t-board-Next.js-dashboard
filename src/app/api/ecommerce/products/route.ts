import { NextResponse } from "next/server";

import type {
  EcommerceProduct,
  EcommerceProductsData,
  EcommerceProductCategory,
  ProductBadge,
  ProductStatus,
} from "@/types/ecommerce/products";

type Locale = "fa" | "en";

const categories = [
  "Lighting",
  "Furniture",
  "Electronics",
  "Accessories",
  "Office",
  "Home Decor",
] as const;

const productNames = [
  "Aperture Desk Lamp",
  "Orbit Pendant Light",
  "Nova Floor Lamp",
  "Arc Table Lamp",
  "Halo Wall Light",
  "Lumen Desk Lamp",
  "Vertex Office Chair",
  "Forma Lounge Chair",
  "Atlas Work Desk",
  "Mono Side Table",
  "Echo Bookshelf",
  "Grid Storage Cabinet",
  "Pulse Wireless Headphones",
  "Echo Bluetooth Speaker",
  "Nova Mechanical Keyboard",
  "Orbit Wireless Mouse",
  "Pixel 4K Monitor",
  "Core USB-C Hub",
  "Aero Laptop Stand",
  "Wave Webcam",
  "Minimal Desk Mat",
  "Focus Notebook",
  "Urban Backpack",
  "Classic Leather Wallet",
  "Terra Ceramic Vase",
  "Linea Wall Clock",
  "Cloud Cushion",
  "Nordic Table Mirror",
  "Oak Plant Stand",
  "Stone Candle Holder",
  "Studio Desk Organizer",
  "Daily Planner",
  "Executive Pen Set",
  "Travel Mug",
  "Thermal Water Bottle",
  "Canvas Storage Box",
  "Soft Throw Blanket",
  "Modern Floor Mirror",
  "Luna Bedside Table",
  "Zen Aroma Diffuser",
  "Craft Desk Tray",
  "Essential Tool Kit",
  "Smart LED Strip",
  "Ambient Night Light",
  "Focus Reading Lamp",
  "Studio Monitor Stand",
  "Compact Charging Dock",
  "Multi-Port Charger",
] as const;

const productNamesFa = [
  "چراغ مطالعه آپرچر",
  "چراغ آویز اوربیت",
  "چراغ ایستاده نوا",
  "چراغ رومیزی آرک",
  "چراغ دیواری هالو",
  "چراغ رومیزی لومن",
  "صندلی اداری ورتکس",
  "صندلی راحتی فورما",
  "میز کار اطلس",
  "میز کنار مونو",
  "کتابخانه اکو",
  "کابینت ذخیره‌سازی گرید",
  "هدفون بی‌سیم پالس",
  "اسپیکر بلوتوث اکو",
  "کیبورد مکانیکی نوا",
  "ماوس بی‌سیم اوربیت",
  "مانیتور 4K پیکسل",
  "هاب USB-C کور",
  "استند لپ‌تاپ آئرو",
  "وبکم ویو",
  "پد میز مینیمال",
  "دفتر فوکوس",
  "کوله شهری",
  "کیف پول چرمی کلاسیک",
  "گلدان سرامیکی ترا",
  "ساعت دیواری لینیا",
  "کوسن کلاد",
  "آینه رومیزی نوردیک",
  "استند گیاه بلوط",
  "جاشمعی سنگی",
  "نظم‌دهنده میز استودیو",
  "برنامه‌ریز روزانه",
  "ست خودکار مدیریتی",
  "ماگ سفری",
  "بطری آب حرارتی",
  "جعبه ذخیره پارچه‌ای",
  "پتو نرم",
  "آینه قدی مدرن",
  "میز کنار تخت لونا",
  "دستگاه رایحه زن",
  "سینی میز کار",
  "کیت ابزار ضروری",
  "نوار LED هوشمند",
  "چراغ خواب محیطی",
  "چراغ مطالعه فوکوس",
  "استند مانیتور استودیو",
  "داک شارژ",
  "شارژر چند پورته",
] as const;

const categoryByIndex = [
  "Lighting",
  "Lighting",
  "Lighting",
  "Lighting",
  "Lighting",
  "Lighting",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Furniture",
  "Electronics",
  "Electronics",
  "Electronics",
  "Electronics",
  "Electronics",
  "Electronics",
  "Electronics",
  "Electronics",
  "Accessories",
  "Accessories",
  "Accessories",
  "Accessories",
  "Home Decor",
  "Home Decor",
  "Home Decor",
  "Home Decor",
  "Home Decor",
  "Home Decor",
  "Office",
  "Office",
  "Office",
  "Office",
  "Office",
  "Office",
  "Furniture",
  "Furniture",
  "Home Decor",
  "Office",
  "Office",
  "Electronics",
  "Lighting",
  "Lighting",
  "Lighting",
  "Electronics",
  "Electronics",
  "Electronics",
] as const;

const categoryTranslations = {
  en: {
    Lighting: "Lighting",
    Furniture: "Furniture",
    Electronics: "Electronics",
    Accessories: "Accessories",
    Office: "Office",
    "Home Decor": "Home Decor",
  },
  fa: {
    Lighting: "روشنایی",
    Furniture: "مبلمان",
    Electronics: "الکترونیک",
    Accessories: "لوازم جانبی",
    Office: "اداری",
    "Home Decor": "دکوراسیون منزل",
  },
} as const;

const priceByCategory: Record<(typeof categories)[number], number> = {
  Lighting: 1850000,
  Furniture: 7200000,
  Electronics: 12800000,
  Accessories: 1450000,
  Office: 2150000,
  "Home Decor": 1750000,
};

const imageVariants = [
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

function createProductImage(index: number, name: string) {
  return {
    primary: imageVariants[index % imageVariants.length],
    secondary: imageVariants[(index + 1) % imageVariants.length],
    foreground: name,
  };
}

function getBadges(index: number): ProductBadge[] {
  const badges: ProductBadge[] = [];

  if (index % 7 === 0) badges.push("new");
  if (index % 5 === 0) badges.push("bestseller");
  if (index % 4 === 0) badges.push("on-sale");

  return badges;
}

function getStatus(index: number): ProductStatus {
  if (index % 11 === 0) return "out-of-stock";
  if (index % 7 === 0) return "low-stock";

  return "in-stock";
}

function getProductPrice(
  category: (typeof categories)[number],
  index: number,
) {
  const base = priceByCategory[category];

  const multiplier = 0.7 + ((index * 17) % 90) / 100;

  return Math.round((base * multiplier) / 50000) * 50000;
}

function createProduct(
  index: number,
  locale: Locale,
): EcommerceProduct {
  const category = categoryByIndex[index];

  const status = getStatus(index);
  const badges = getBadges(index);
  const price = getProductPrice(category, index);

  const name =
    locale === "fa"
      ? productNamesFa[index]
      : productNames[index];

  const hasSale = badges.includes("on-sale");

  const previousPrice = hasSale
    ? Math.round((price * 1.2) / 50000) * 50000
    : undefined;

  const stock =
    status === "out-of-stock"
      ? 0
      : status === "low-stock"
        ? 2 + (index % 7)
        : 12 + ((index * 13) % 90);

  return {
    id: `APG-${String(index + 1).padStart(4, "0")}`,

    name,

    category: categoryTranslations[locale][category],

    image: createProductImage(index, name),

    price,
    previousPrice,

    currency: "IRT",

    rating: [4.8, 4.5, 4.2, 3.9, 3.6][index % 5],

    reviewCount: 34 + ((index * 19) % 420),

    stock,

    sales: 42 + ((index * 47) % 820),

    status,

    badges,
  };
}

function createCategories(
  locale: Locale,
): EcommerceProductCategory[] {
  return categories.map((category) => ({
    id: category.toLowerCase().replace(/\s+/g, "-"),

    name: categoryTranslations[locale][category],

    count: categoryByIndex.filter(
      (item) => item === category,
    ).length,
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale: Locale =
    searchParams.get("locale") === "fa"
      ? "fa"
      : "en";

  const products = productNames.map((_, index) =>
    createProduct(index, locale),
  );

  const data: EcommerceProductsData = {
    products,

    filters: {
      categories: createCategories(locale),

      price: {
        min: Math.min(
          ...products.map((product) => product.price),
        ),

        max: Math.max(
          ...products.map(
            (product) =>
              product.previousPrice ?? product.price,
          ),
        ),

        step: 50000,
      },

      availability: [
        "in-stock",
        "low-stock",
        "out-of-stock",
      ],

      ratings: [2, 3, 4],
    },

    count: products.length,

    total: products.length,
  };

  return NextResponse.json(data);
}