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
} from "@/components/widgets/kpi-cards-widget";

import type { EcommerceKpiCardId } from "@/types/dashboards/ecommerce/kpi-cards";

import { useKpiCards } from "../hooks/use-kpi-cards";

type KpiCardsProps = {
  translations: {
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
  EcommerceKpiCardId,
  {
    icon: typeof CircleDollarSign;
    color: KpiCardColor;
  }
>;

const kpiCardLabels: Record<EcommerceKpiCardId, KpiCardLabelKey> = {
  "total-sales": "totalSales",
  orders: "orders",
  "average-order-value": "averageOrderValue",
  "cart-abandonment": "cartAbandonment",
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
