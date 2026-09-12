"use client";

import {
  CheckCircle,
  Download,
  Grid,
  Percent,
  Plus,
  ShoppingCart,
} from "@deemlol/next-icons";

import { QuickActionsWidget } from "@/components/widgets/quick-actions-widget";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

type EcommerceQuickActionsProps = {
  translations: EcommerceDashboardDictionary["quickActions"];
  locale: "fa" | "en";
};

export function EcommerceQuickActions({
  translations,
  locale,
}: EcommerceQuickActionsProps) {
  const actions = [
    {
      label: translations.actions.addProduct,
      icon: <Plus className="size-5" />,
    },
    {
      label: translations.actions.newOrder,
      icon: <ShoppingCart className="size-5" />,
    },
    {
      label: translations.actions.exportCsv,
      icon: <Download className="size-5" />,
    },
    {
      label: translations.actions.discount,
      icon: <Percent className="size-5" />,
    },
    {
      label: translations.actions.fulfil,
      icon: <CheckCircle className="size-5" />,
    },
    {
      label: translations.actions.collections,
      icon: <Grid className="size-5" />,
    },
  ];

  return (
    <QuickActionsWidget
      eyebrow={translations.eyebrow}
      title={translations.title}
      actionLabel={translations.customise}
      actions={actions}
      locale={locale}
    />
  );
}
