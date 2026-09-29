import { NextResponse } from "next/server";

import type { ProductOverviewVariants } from "@/modules/ecommerce/product-details/widgets/product-overview/types";

const productOverviewVariants: ProductOverviewVariants = {
  options: [
    {
      id: "color",
      name: {
        fa: "رنگ",
        en: "Color",
      },
      type: "color",
      values: [
        {
          id: "silver",
          label: {
            fa: "نقره‌ای",
            en: "Silver",
          },
          color: "#d1d5db",
        },
        {
          id: "graphite",
          label: {
            fa: "گرافیتی",
            en: "Graphite",
          },
          color: "#374151",
        },
        {
          id: "black",
          label: {
            fa: "مشکی",
            en: "Black",
          },
          color: "#111827",
          disabled: true,
        },
        {
          id: "blue",
          label: {
            fa: "آبی",
            en: "Blue",
          },
          color: "#2563eb",
        },
        {
          id: "red",
          label: {
            fa: "قرمز",
            en: "Red",
          },
          color: "#dc2626",
          disabled: true,
        },
      ],
    },
    {
      id: "size",
      name: {
        fa: "اندازه",
        en: "Size",
      },
      type: "text",
      values: [
        {
          id: "30",
          label: {
            fa: "۳۰ سانتیمتر",
            en: "30 cm",
          },
        },
        {
          id: "40",
          label: {
            fa: "۴۰ سانتیمتر",
            en: "40 cm",
          },
          disabled: true,
        },
        {
          id: "50",
          label: {
            fa: "۵۰ سانتیمتر",
            en: "50 cm",
          },
        },
      ],
    },
  ],

  combinations: [
    {
      selections: {
        color: "graphite",
        size: "30",
      },
      price: 120000,
    },
    {
      selections: {
        color: "silver",
        size: "30",
      },
      price: 125000,
      originalPrice: 140000,
    },
    {
      selections: {
        color: "blue",
        size: "30",
      },
      price: 130000,
      originalPrice: 145000,
    },

    {
      selections: {
        color: "graphite",
        size: "50",
      },
      price: 135000,
    },
    {
      selections: {
        color: "silver",
        size: "50",
      },
      price: 145000,
      originalPrice: 160000,
    },
    {
      selections: {
        color: "blue",
        size: "50",
      },
      price: 155000,
      originalPrice: 175000,
    },
  ],
};

export async function GET() {
  return NextResponse.json(productOverviewVariants);
}
