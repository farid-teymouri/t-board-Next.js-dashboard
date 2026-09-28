import { NextRequest, NextResponse } from "next/server";

const variants = {
  en: {
    baseSku: "APG-000-1",
    options: [
      {
        id: "option-color",
        name: "Color",
        type: "color" as const,
        values: [
          {
            id: "color-graphite",
            label: "Graphite",
            color: "#374151",
          },
          {
            id: "color-white",
            label: "White",
            color: "#ffffff",
          },
        ],
      },
      {
        id: "option-finish",
        name: "Finish",
        type: "text" as const,
        values: [
          {
            id: "finish-matte",
            label: "Matte",
          },
          {
            id: "finish-glossy",
            label: "Glossy",
          },
        ],
      },
      {
        id: "option-ridge",
        name: "Ridge",
        type: "text" as const,
        values: [
          {
            id: "ridge-40",
            label: "40 cm",
          },
          {
            id: "ridge-48",
            label: "48 cm",
          },
        ],
      },
    ],
    variants: [
      {
        id: "variant-1",
        options: ["Graphite", "Matte", "40 cm"],
        price: 128500000,
        sku: "APG-000-1-1",
        quantity: 12,
      },
      {
        id: "variant-2",
        options: ["Graphite", "Matte", "48 cm"],
        price: 136900000,
        sku: "APG-000-1-2",
        quantity: 8,
      },
      {
        id: "variant-3",
        options: ["Graphite", "Glossy", "40 cm"],
        price: 134750000,
        sku: "APG-000-1-3",
        quantity: 6,
      },
      {
        id: "variant-4",
        options: ["Graphite", "Glossy", "48 cm"],
        price: 143500000,
        sku: "APG-000-1-4",
        quantity: 4,
      },
      {
        id: "variant-5",
        options: ["White", "Matte", "40 cm"],
        price: 127900000,
        sku: "APG-000-1-5",
        quantity: 18,
      },
      {
        id: "variant-6",
        options: ["White", "Matte", "48 cm"],
        price: 135800000,
        sku: "APG-000-1-6",
        quantity: 11,
      },
      {
        id: "variant-7",
        options: ["White", "Glossy", "40 cm"],
        price: 133900000,
        sku: "APG-000-1-7",
        quantity: 7,
      },
      {
        id: "variant-8",
        options: ["White", "Glossy", "48 cm"],
        price: 142750000,
        sku: "APG-000-1-8",
        quantity: 3,
      },
    ],
  },

  fa: {
    baseSku: "APG-000-1",
    options: [
      {
        id: "option-color",
        name: "رنگ",
        type: "color" as const,
        values: [
          {
            id: "color-graphite",
            label: "گرافیت",
            color: "#374151",
          },
          {
            id: "color-white",
            label: "سفید",
            color: "#ffffff",
          },
        ],
      },
      {
        id: "option-finish",
        name: "پرداخت",
        type: "text" as const,
        values: [
          {
            id: "finish-matte",
            label: "مات",
          },
          {
            id: "finish-glossy",
            label: "براق",
          },
        ],
      },
      {
        id: "option-ridge",
        name: "برجستگی",
        type: "text" as const,
        values: [
          {
            id: "ridge-40",
            label: "۴۰ سانتی‌متر",
          },
          {
            id: "ridge-48",
            label: "۴۸ سانتی‌متر",
          },
        ],
      },
    ],
    variants: [
      {
        id: "variant-1",
        options: ["گرافیت", "مات", "۴۰ سانتی‌متر"],
        price: 128500000,
        sku: "APG-000-1-1",
        quantity: 12,
      },
      {
        id: "variant-2",
        options: ["گرافیت", "مات", "۴۸ سانتی‌متر"],
        price: 136900000,
        sku: "APG-000-1-2",
        quantity: 8,
      },
      {
        id: "variant-3",
        options: ["گرافیت", "براق", "۴۰ سانتی‌متر"],
        price: 134750000,
        sku: "APG-000-1-3",
        quantity: 6,
      },
      {
        id: "variant-4",
        options: ["گرافیت", "براق", "۴۸ سانتی‌متر"],
        price: 143500000,
        sku: "APG-000-1-4",
        quantity: 4,
      },
      {
        id: "variant-5",
        options: ["سفید", "مات", "۴۰ سانتی‌متر"],
        price: 127900000,
        sku: "APG-000-1-5",
        quantity: 18,
      },
      {
        id: "variant-6",
        options: ["سفید", "مات", "۴۸ سانتی‌متر"],
        price: 135800000,
        sku: "APG-000-1-6",
        quantity: 11,
      },
      {
        id: "variant-7",
        options: ["سفید", "براق", "۴۰ سانتی‌متر"],
        price: 133900000,
        sku: "APG-000-1-7",
        quantity: 7,
      },
      {
        id: "variant-8",
        options: ["سفید", "براق", "۴۸ سانتی‌متر"],
        price: 142750000,
        sku: "APG-000-1-8",
        quantity: 3,
      },
    ],
  },
};

export async function GET(request: NextRequest) {
  const locale =
    request.nextUrl.searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json(variants[locale]);
}
