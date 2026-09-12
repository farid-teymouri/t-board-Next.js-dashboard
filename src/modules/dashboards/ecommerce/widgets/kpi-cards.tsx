"use client";

import {
  CircleDollarSign,
  ReceiptText,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";

import {
  KpiCardsWidget,
  type KpiCardColor,
  type KpiCardId,
} from "@/components/widgets/kpi-cards-widget";

import { useKpiCards } from "../hooks/use-kpi-cards";

type KpiCardsProps = {
  dictionary: {
    totalSales: string;
    orders: string;
    averageOrderValue: string;
    cartAbandonment: string;
  };
  locale: "fa" | "en";
};

type KpiCardLabelKey =
  | "totalSales"
  | "orders"
  | "averageOrderValue"
  | "cartAbandonment";

const kpiCardConfig = {
  "total-sales": {
    icon: CircleDollarSign,
    color: "chart-3" as KpiCardColor,
  },
  orders: {
    icon: ShoppingCart,
    color: "chart-2" as KpiCardColor,
  },
  "average-order-value": {
    icon: ReceiptText,
    color: "chart-4" as KpiCardColor,
  },
  "cart-abandonment": {
    icon: ShoppingBasket,
    color: "chart-5" as KpiCardColor,
  },
} satisfies Record<
  KpiCardId,
  {
    icon: typeof CircleDollarSign;
    color: KpiCardColor;
  }
>;

const kpiCardLabels: Record<KpiCardId, KpiCardLabelKey> = {
  "total-sales": "totalSales",
  orders: "orders",
  "average-order-value": "averageOrderValue",
  "cart-abandonment": "cartAbandonment",
};

export function KpiCards({ dictionary, locale }: KpiCardsProps) {
  const { data, isLoading } = useKpiCards();

  const items =
    data?.items
      .map((item) => {
        const config = kpiCardConfig[item.id];
        const labelKey = kpiCardLabels[item.id];

        return {
          ...item,
          label: dictionary[labelKey],
          icon: config.icon,
          color: config.color,
        };
      })
      .slice(0, 4) ?? [];

  return <KpiCardsWidget items={items} locale={locale} isLoading={isLoading} />;
}
