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
          id: "chocolate",
          label: {
            fa: "شکلاتی",
            en: "Chocolate",
          },
          color: "#6b442f",
        },

        {
          id: "black",
          label: {
            fa: "مشکی",
            en: "Black",
          },
          color: "#171717",
        },

        {
          id: "beige",
          label: {
            fa: "بژ",
            en: "Beige",
          },
          color: "#d6c2a8",
          disabled: true,
        },

        {
          id: "cream",
          label: {
            fa: "کرم",
            en: "Cream",
          },
          color: "#e8dfd2",
        },
      ],
    },

    {
      id: "size",
      name: {
        fa: "سایز",
        en: "Size",
      },
      type: "text",
      values: [
        {
          id: "s",
          label: {
            fa: "S",
            en: "S",
          },
        },

        {
          id: "m",
          label: {
            fa: "M",
            en: "M",
          },
        },

        {
          id: "l",
          label: {
            fa: "L",
            en: "L",
          },
        },

        {
          id: "xl",
          label: {
            fa: "XL",
            en: "XL",
          },
          disabled: true,
        },
      ],
    },
  ],

  combinations: [
    {
      selections: {
        color: "chocolate",
        size: "s",
      },
      price: 3420000,
      originalPrice: 5250000,
    },

    {
      selections: {
        color: "chocolate",
        size: "m",
      },
      price: 3420000,
      originalPrice: 5250000,
    },

    {
      selections: {
        color: "chocolate",
        size: "l",
      },
      price: 3420000,
      originalPrice: 5250000,
    },

    {
      selections: {
        color: "black",
        size: "s",
      },
      price: 3490000,
      originalPrice: 5350000,
    },

    {
      selections: {
        color: "black",
        size: "m",
      },
      price: 3490000,
      originalPrice: 5350000,
    },

    {
      selections: {
        color: "black",
        size: "l",
      },
      price: 3490000,
      originalPrice: 5350000,
    },

    {
      selections: {
        color: "beige",
        size: "s",
      },
      price: 3590000,
      originalPrice: 5450000,
    },

    {
      selections: {
        color: "beige",
        size: "m",
      },
      price: 3590000,
      originalPrice: 5450000,
    },

    {
      selections: {
        color: "cream",
        size: "s",
      },
      price: 3350000,
      originalPrice: 5150000,
    },

    {
      selections: {
        color: "cream",
        size: "m",
      },
      price: 3350000,
      originalPrice: 5150000,
    },

    {
      selections: {
        color: "cream",
        size: "l",
      },
      price: 3350000,
      originalPrice: 5150000,
    },
  ],
};

export async function GET() {
  return NextResponse.json(productOverviewVariants);
}
