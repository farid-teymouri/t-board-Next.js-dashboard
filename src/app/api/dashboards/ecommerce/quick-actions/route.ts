import { NextResponse } from "next/server";

const quickActions = {
  en: {
    actions: [
      {
        id: "add-product",
        label: "Add product",
        type: "add-product",
      },
      {
        id: "new-order",
        label: "New order",
        type: "new-order",
      },
      {
        id: "export-csv",
        label: "Export CSV",
        type: "export-csv",
      },
      {
        id: "discount",
        label: "Discount",
        type: "discount",
      },
      {
        id: "fulfil",
        label: "Fulfil",
        type: "fulfil",
      },
      {
        id: "collections",
        label: "Collections",
        type: "collections",
      },
    ],
  },

  fa: {
    actions: [
      {
        id: "add-product",
        label: "افزودن محصول",
        type: "add-product",
      },
      {
        id: "new-order",
        label: "سفارش جدید",
        type: "new-order",
      },
      {
        id: "export-csv",
        label: "خروجی CSV",
        type: "export-csv",
      },
      {
        id: "discount",
        label: "تخفیف",
        type: "discount",
      },
      {
        id: "fulfil",
        label: "تکمیل سفارش",
        type: "fulfil",
      },
      {
        id: "collections",
        label: "مجموعه‌ها",
        type: "collections",
      },
    ],
  },
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json(quickActions[locale]);
}
