import { NextResponse } from "next/server";

import type { RecentOrdersResponse } from "@/types/dashboards/ecommerce/recent-orders";

type Locale = "en" | "fa";

const ordersByLocale: Record<Locale, RecentOrdersResponse> = {
  en: {
    columns: {
      order: "Order",
      customer: "Customer",
      date: "Date",
      total: "Total",
      status: "Status",
    },

    data: [
      {
        id: "order-10428",
        orderNumber: "#AX-10428",
        customer: {
          name: "Camila Rossi",
          itemCount: 3,
          itemsLabel: "3 items",
        },
        date: "Jun 12",
        total: {
          value: 3120000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "Delivered",
        },
      },
      {
        id: "order-10427",
        orderNumber: "#AX-10427",
        customer: {
          name: "Henry Whitlock",
          itemCount: 1,
          itemsLabel: "1 item",
        },
        date: "Jun 12",
        total: {
          value: 1290000,
          currency: "IRT",
        },
        status: {
          value: "shipped",
          label: "Shipped",
        },
      },
      {
        id: "order-10426",
        orderNumber: "#AX-10426",
        customer: {
          name: "Aiko Tanaka",
          itemCount: 5,
          itemsLabel: "5 items",
        },
        date: "Jun 11",
        total: {
          value: 4860000,
          currency: "IRT",
        },
        status: {
          value: "processing",
          label: "Processing",
        },
      },
      {
        id: "order-10425",
        orderNumber: "#AX-10425",
        customer: {
          name: "Mateo Alvarez",
          itemCount: 2,
          itemsLabel: "2 items",
        },
        date: "Jun 11",
        total: {
          value: 8490000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "Delivered",
        },
      },
      {
        id: "order-10424",
        orderNumber: "#AX-10424",
        customer: {
          name: "Sofia Lindqvist",
          itemCount: 4,
          itemsLabel: "4 items",
        },
        date: "Jun 10",
        total: {
          value: 2180000,
          currency: "IRT",
        },
        status: {
          value: "refunded",
          label: "Refunded",
        },
      },
      {
        id: "order-10423",
        orderNumber: "#AX-10423",
        customer: {
          name: "Daniel Cho",
          itemCount: 1,
          itemsLabel: "1 item",
        },
        date: "Jun 10",
        total: {
          value: 3800000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "Delivered",
        },
      },
    ],
  },

  fa: {
    columns: {
      order: "سفارش",
      customer: "مشتری",
      date: "تاریخ",
      total: "مبلغ کل",
      status: "وضعیت",
    },

    data: [
      {
        id: "order-10428",
        orderNumber: "#AX-10428",
        customer: {
          name: "کامیلا روسی",
          itemCount: 3,
          itemsLabel: "۳ قلم",
        },
        date: "۲۲ خرداد",
        total: {
          value: 3120000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "تحویل شده",
        },
      },
      {
        id: "order-10427",
        orderNumber: "#AX-10427",
        customer: {
          name: "هنری ویتلاک",
          itemCount: 1,
          itemsLabel: "۱ قلم",
        },
        date: "۲۲ خرداد",
        total: {
          value: 1290000,
          currency: "IRT",
        },
        status: {
          value: "shipped",
          label: "ارسال شده",
        },
      },
      {
        id: "order-10426",
        orderNumber: "#AX-10426",
        customer: {
          name: "آیکو تاناکا",
          itemCount: 5,
          itemsLabel: "۵ قلم",
        },
        date: "۲۱ خرداد",
        total: {
          value: 4860000,
          currency: "IRT",
        },
        status: {
          value: "processing",
          label: "در حال پردازش",
        },
      },
      {
        id: "order-10425",
        orderNumber: "#AX-10425",
        customer: {
          name: "ماتئو آلوارز",
          itemCount: 2,
          itemsLabel: "۲ قلم",
        },
        date: "۲۱ خرداد",
        total: {
          value: 8490000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "تحویل شده",
        },
      },
      {
        id: "order-10424",
        orderNumber: "#AX-10424",
        customer: {
          name: "سوفیا لیندکویست",
          itemCount: 4,
          itemsLabel: "۴ قلم",
        },
        date: "۲۰ خرداد",
        total: {
          value: 2180000,
          currency: "IRT",
        },
        status: {
          value: "refunded",
          label: "مرجوع شده",
        },
      },
      {
        id: "order-10423",
        orderNumber: "#AX-10423",
        customer: {
          name: "دنیل چو",
          itemCount: 1,
          itemsLabel: "۱ قلم",
        },
        date: "۲۰ خرداد",
        total: {
          value: 3800000,
          currency: "IRT",
        },
        status: {
          value: "delivered",
          label: "تحویل شده",
        },
      },
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const requestedLocale = searchParams.get("locale");

  const locale: Locale = requestedLocale === "fa" ? "fa" : "en";

  return NextResponse.json(ordersByLocale[locale]);
}
