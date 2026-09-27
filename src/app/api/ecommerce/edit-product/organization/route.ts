import { NextResponse } from "next/server";

const organizationData = {
  categoryTree: [
    {
      id: "electronics",
      name: {
        en: "Electronics",
        fa: "لوازم الکترونیکی",
      },
      children: [
        {
          id: "computers",
          name: {
            en: "Computers",
            fa: "کامپیوتر",
          },
          children: [
            {
              id: "laptops",
              name: {
                en: "Laptops",
                fa: "لپ‌تاپ",
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "office",
      name: {
        en: "Office",
        fa: "اداری",
      },
      children: [
        {
          id: "workspace",
          name: {
            en: "Workspace",
            fa: "محیط کار",
          },
          children: [],
        },
      ],
    },
    {
      id: "accessories",
      name: {
        en: "Accessories",
        fa: "لوازم جانبی",
      },
      children: [
        {
          id: "bags",
          name: {
            en: "Bags",
            fa: "کیف",
          },
          children: [],
        },
      ],
    },
  ],

  selectedCategoryPath: [
    {
      id: "electronics",
      name: {
        en: "Electronics",
        fa: "لوازم الکترونیکی",
      },
    },
    {
      id: "computers",
      name: {
        en: "Computers",
        fa: "کامپیوتر",
      },
    },
    {
      id: "laptops",
      name: {
        en: "Laptops",
        fa: "لپ‌تاپ",
      },
    },
  ],

  brands: [
    {
      id: "logitech",
      name: {
        en: "Logitech",
        fa: "لاجیتک",
      },
    },
    {
      id: "apple",
      name: {
        en: "Apple",
        fa: "اپل",
      },
    },
    {
      id: "samsung",
      name: {
        en: "Samsung",
        fa: "سامسونگ",
      },
    },
    {
      id: "anker",
      name: {
        en: "Anker",
        fa: "انکر",
      },
    },
  ],

  selectedBrandId: "logitech",

  vendors: [
    {
      id: "main-store",
      name: {
        en: "Main Store",
        fa: "فروشگاه اصلی",
      },
    },
    {
      id: "tech-market",
      name: {
        en: "Tech Market",
        fa: "تک مارکت",
      },
    },
    {
      id: "digital-shop",
      name: {
        en: "Digital Shop",
        fa: "دیجیتال شاپ",
      },
    },
    {
      id: "office-land",
      name: {
        en: "Office Land",
        fa: "آفیس لند",
      },
    },
  ],

  selectedVendorId: "main-store",

  collections: [
    {
      id: "new-arrivals",
      name: {
        en: "New Arrivals",
        fa: "تازه‌واردها",
      },
      selected: true,
    },
    {
      id: "bestsellers",
      name: {
        en: "Bestsellers",
        fa: "پرفروش‌ها",
      },
      selected: true,
    },
    {
      id: "workspace-essential",
      name: {
        en: "Workspace Essential",
        fa: "ملزومات محیط کار",
      },
      selected: false,
    },
    {
      id: "gift-guide",
      name: {
        en: "Gift Guide",
        fa: "راهنمای هدایا",
      },
      selected: false,
    },
    {
      id: "clearance",
      name: {
        en: "Clearance",
        fa: "تخفیف ویژه",
      },
      selected: false,
    },
  ],

  availableTags: [
    {
      id: "wireless",
      name: {
        en: "Wireless",
        fa: "بی‌سیم",
      },
    },
    {
      id: "office",
      name: {
        en: "Office",
        fa: "اداری",
      },
    },
    {
      id: "premium",
      name: {
        en: "Premium",
        fa: "پریمیوم",
      },
    },
    {
      id: "new",
      name: {
        en: "New",
        fa: "جدید",
      },
    },
    {
      id: "productivity",
      name: {
        en: "Productivity",
        fa: "بهره‌وری",
      },
    },
  ],

  selectedTagIds: ["wireless", "office"],
};

export async function GET() {
  return NextResponse.json(organizationData);
}
