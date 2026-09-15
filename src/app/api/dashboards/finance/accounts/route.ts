import { NextResponse } from "next/server";

import type {
  AccountType,
  FinanceAccount,
} from "@/types/dashboards/finance/accounts";

type AccountLocale = "fa" | "en";

type AccountMock = {
  id: string;
  type: AccountType;
  balance: number;
  currency: "IRT";
  status:
    | {
        type: "change";
        value: number;
      }
    | {
        type: "text";
        value: Record<AccountLocale, string>;
      };
  translations: Record<
    AccountLocale,
    {
      name: string;
      lastFour: string;
    }
  >;
};

const accounts = [
  {
    id: "operating-checking",
    type: "checking",
    balance: 184_210_000,
    currency: "IRT",
    status: {
      type: "change",
      value: 2.4,
    },
    translations: {
      en: {
        name: "Operating Checking",
        lastFour: "7045",
      },
      fa: {
        name: "حساب جاری عملیاتی",
        lastFour: "۷۰۴۵",
      },
    },
  },
  {
    id: "high-yield-savings",
    type: "savings",
    balance: 96_400_000,
    currency: "IRT",
    status: {
      type: "change",
      value: 4.0,
    },
    translations: {
      en: {
        name: "High-Yield Savings",
        lastFour: "2208",
      },
      fa: {
        name: "حساب پس‌انداز پربازده",
        lastFour: "۲۲۰۸",
      },
    },
  },
  {
    id: "corporate-card",
    type: "card",
    balance: -8_420_000,
    currency: "IRT",
    status: {
      type: "text",
      value: {
        en: "due Jun 28",
        fa: "سررسید ۷ تیر",
      },
    },
    translations: {
      en: {
        name: "Corporate Card",
        lastFour: "3391",
      },
      fa: {
        name: "کارت شرکتی",
        lastFour: "۳۳۹۱",
      },
    },
  },
  {
    id: "tax-reserve",
    type: "reserve",
    balance: 40_350_000,
    currency: "IRT",
    status: {
      type: "text",
      value: {
        en: "locked",
        fa: "قفل شده",
      },
    },
    translations: {
      en: {
        name: "Tax Reserve",
        lastFour: "0117",
      },
      fa: {
        name: "ذخیره مالیاتی",
        lastFour: "۰۱۱۷",
      },
    },
  },
] satisfies AccountMock[];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale: AccountLocale =
    searchParams.get("locale") === "fa" ? "fa" : "en";

  const localizedAccounts: FinanceAccount[] = accounts.map((account) => ({
    id: account.id,
    name: account.translations[locale].name,
    type: account.type,
    lastFour: account.translations[locale].lastFour,
    balance: account.balance,
    currency: account.currency,
    status:
      account.status.type === "change"
        ? {
            type: "change",
            value: account.status.value,
          }
        : {
            type: "text",
            value: account.status.value[locale],
          },
  }));

  return NextResponse.json(localizedAccounts);
}
