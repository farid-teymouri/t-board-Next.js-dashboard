"use client";

import {
  CornerLeftDown,
  CornerRightUp,
  PiggyBank,
  WalletCards,
} from "lucide-react";
import {
  KpiCardsWidget,
  type KpiCardColor,
} from "@/components/widgets/kpi-cards-widget";
import { useKpiCards } from "../hooks/use-kpi-cards";

type KpiCardsProps = {
  translations: {
    totalBalance: string;
    monthlyIncome: string;
    monthlyExpenses: string;
    netSavingsRate: string;
  };
  locale: "fa" | "en";
};

type FinanceKpiCardId =
  | "total-balance"
  | "monthly-income"
  | "monthly-expenses"
  | "net-savings-rate";

type KpiCardLabelKey =
  | "totalBalance"
  | "monthlyIncome"
  | "monthlyExpenses"
  | "netSavingsRate";

const kpiCardConfig = {
  "total-balance": {
    icon: WalletCards,
    color: "chart-3" as KpiCardColor,
  },
  "monthly-income": {
    icon: CornerLeftDown,
    color: "chart-2" as KpiCardColor,
  },
  "monthly-expenses": {
    icon: CornerRightUp,
    color: "chart-4" as KpiCardColor,
  },
  "net-savings-rate": {
    icon: PiggyBank,
    color: "chart-5" as KpiCardColor,
  },
} satisfies Record<
  FinanceKpiCardId,
  {
    icon: typeof WalletCards;
    color: KpiCardColor;
  }
>;

const kpiCardLabels: Record<FinanceKpiCardId, KpiCardLabelKey> = {
  "total-balance": "totalBalance",
  "monthly-income": "monthlyIncome",
  "monthly-expenses": "monthlyExpenses",
  "net-savings-rate": "netSavingsRate",
};

export function KpiCards({ translations, locale }: KpiCardsProps) {
  const { data, isLoading } = useKpiCards();

  const items =
    data?.items
      .map((item) => {
        const config = kpiCardConfig[item.id];
        const labelKey = kpiCardLabels[item.id];

        return {
          ...item,
          label: translations[labelKey],
          icon: config.icon,
          color: config.color,
        };
      })
      .slice(0, 4) ?? [];

  return <KpiCardsWidget items={items} locale={locale} isLoading={isLoading} />;
}
