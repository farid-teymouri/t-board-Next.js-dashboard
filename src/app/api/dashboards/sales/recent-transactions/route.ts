import { NextResponse } from "next/server";

import type { RecentTransactionsResponse } from "@/types/dashboards/sales/recent-transactions";

type Locale = "en" | "fa";

const transactionsByLocale: Record<Locale, RecentTransactionsResponse> = {
  en: {
    columns: {
      merchant: "Merchant",
      category: "Category",
      date: "Date",
      amount: "Amount",
      status: "Status",
    },
    data: [
      {
        id: "txn-001",
        merchant: { name: "Ali Rezaei", provider: "Stripe", icon: "stripe" },
        category: "Order payment",
        date: "Jun 11",
        amount: {
          value: -1250000,
          currency: "IRT",
          type: "negative",
        },
        status: { value: "completed", label: "Completed" },
      },
      {
        id: "txn-002",
        merchant: {
          name: "Maryam Ahmadi",
          provider: "Subscription",
          icon: "linear",
        },
        category: "Software",
        date: "Jun 9",
        amount: {
          value: 850000,
          currency: "IRT",
          type: "positive",
        },
        status: { value: "pending", label: "Pending" },
      },
      {
        id: "txn-003",
        merchant: { name: "Sara Karimi", provider: "PayPal", icon: "paypal" },
        category: "Marketing",
        date: "Jun 7",
        amount: {
          value: -420000,
          currency: "IRT",
          type: "negative",
        },
        status: { value: "failed", label: "Failed" },
      },
      {
        id: "txn-004",
        merchant: { name: "Amir Hosseini", provider: "Stripe", icon: "stripe" },
        category: "Payroll",
        date: "Jun 5",
        amount: {
          value: 2300000,
          currency: "IRT",
          type: "positive",
        },
        status: { value: "completed", label: "Completed" },
      },
      {
        id: "txn-005",
        merchant: {
          name: "Negar Mohammadi",
          provider: "Linear",
          icon: "linear",
        },
        category: "Software",
        date: "Jun 2",
        amount: {
          value: -680000,
          currency: "IRT",
          type: "negative",
        },
        status: { value: "completed", label: "Completed" },
      },
    ],
  },

  fa: {
    columns: {
      merchant: "فروشنده",
      category: "دسته‌بندی",
      date: "تاریخ",
      amount: "مبلغ",
      status: "وضعیت",
    },

    data: [
      {
        id: "txn-001",
        merchant: {
          name: "علی رضایی",
          provider: "استرایپ",
          icon: "stripe",
        },
        category: "پرداخت سفارش",
        date: "۲۱ خرداد",
        amount: {
          value: -1250000,
          currency: "IRT",
          type: "negative",
        },
        status: {
          value: "completed",
          label: "تکمیل شده",
        },
      },
      {
        id: "txn-002",
        merchant: {
          name: "مریم احمدی",
          provider: "اشتراک",
          icon: "linear",
        },
        category: "نرم‌افزار",
        date: "۱۹ خرداد",
        amount: {
          value: 850000,
          currency: "IRT",
          type: "positive",
        },
        status: {
          value: "pending",
          label: "در انتظار",
        },
      },
      {
        id: "txn-003",
        merchant: {
          name: "سارا کریمی",
          provider: "پی‌پل",
          icon: "paypal",
        },
        category: "بازاریابی",
        date: "۱۷ خرداد",
        amount: {
          value: -420000,
          currency: "IRT",
          type: "negative",
        },
        status: {
          value: "failed",
          label: "ناموفق",
        },
      },
      {
        id: "txn-004",
        merchant: {
          name: "امیر حسینی",
          provider: "استرایپ",
          icon: "stripe",
        },
        category: "حقوق و دستمزد",
        date: "۱۵ خرداد",
        amount: {
          value: 2300000,
          currency: "IRT",
          type: "positive",
        },
        status: {
          value: "completed",
          label: "تکمیل شده",
        },
      },
      {
        id: "txn-005",
        merchant: {
          name: "نگار محمدی",
          provider: "لینیر",
          icon: "linear",
        },
        category: "نرم‌افزار",
        date: "۱۲ خرداد",
        amount: {
          value: -680000,
          currency: "IRT",
          type: "negative",
        },
        status: {
          value: "completed",
          label: "تکمیل شده",
        },
      },
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const requestedLocale = searchParams.get("locale");

  const locale: Locale = requestedLocale === "fa" ? "fa" : "en";

  return NextResponse.json(transactionsByLocale[locale]);
}
