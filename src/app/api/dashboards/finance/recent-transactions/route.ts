import { NextResponse } from "next/server";

import type { FinanceTransaction } from "@/types/dashboards/finance/recent-transactions";

const transactions: FinanceTransaction[] = [
  {
    id: "txn-001",
    date: {
      en: "Jun 12",
      fa: "۲۲ خرداد",
    },
    payee: "Stripe Payout",
    category: {
      en: "Revenue",
      fa: "درآمد",
    },
    account: {
      en: "Checking •7045",
      fa: "حساب جاری •••• ۷۰۴۵",
    },
    amount: 18420000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
  {
    id: "txn-002",
    date: {
      en: "Jun 11",
      fa: "۲۱ خرداد",
    },
    payee: "Gusto Payroll",
    category: {
      en: "Payroll",
      fa: "حقوق و دستمزد",
    },
    account: {
      en: "Checking •7045",
      fa: "حساب جاری •••• ۷۰۴۵",
    },
    amount: -13974000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
  {
    id: "txn-003",
    date: {
      en: "Jun 11",
      fa: "۲۱ خرداد",
    },
    payee: "AWS",
    category: {
      en: "Software",
      fa: "نرم‌افزار",
    },
    account: {
      en: "Card •3391",
      fa: "کارت •••• ۳۳۹۱",
    },
    amount: -2840000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
  {
    id: "txn-004",
    date: {
      en: "Jun 10",
      fa: "۲۰ خرداد",
    },
    payee: "Pulse Ads",
    category: {
      en: "Marketing",
      fa: "بازاریابی",
    },
    account: {
      en: "Card •3391",
      fa: "کارت •••• ۳۳۹۱",
    },
    amount: -1640000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
  {
    id: "txn-005",
    date: {
      en: "Jun 09",
      fa: "۱۹ خرداد",
    },
    payee: "Acme Co Invoice",
    category: {
      en: "Revenue",
      fa: "درآمد",
    },
    account: {
      en: "Checking •7045",
      fa: "حساب جاری •••• ۷۰۴۵",
    },
    amount: 9200000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
  {
    id: "txn-006",
    date: {
      en: "Jun 08",
      fa: "۱۸ خرداد",
    },
    payee: "WeWork",
    category: {
      en: "Office",
      fa: "اداری",
    },
    account: {
      en: "Checking •7045",
      fa: "حساب جاری •••• ۷۰۴۵",
    },
    amount: -4129000,
    currency: {
      code: "IRT",
      en: "IRT",
      fa: "تومان",
    },
  },
];

export async function GET() {
  return NextResponse.json(transactions);
}
