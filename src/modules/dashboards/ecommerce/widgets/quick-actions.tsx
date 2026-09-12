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
  dictionary: EcommerceDashboardDictionary["quickActions"];
  locale: "fa" | "en";
};

export function EcommerceQuickActions({
  dictionary,
  locale,
}: EcommerceQuickActionsProps) {
  const actions = [
    {
      label: dictionary.actions.addProduct,
      icon: <Plus className="size-5" />,
    },
    {
      label: dictionary.actions.newOrder,
      icon: <ShoppingCart className="size-5" />,
    },
    {
      label: dictionary.actions.exportCsv,
      icon: <Download className="size-5" />,
    },
    {
      label: dictionary.actions.discount,
      icon: <Percent className="size-5" />,
    },
    {
      label: dictionary.actions.fulfil,
      icon: <CheckCircle className="size-5" />,
    },
    {
      label: dictionary.actions.collections,
      icon: <Grid className="size-5" />,
    },
  ];

  return (
    <QuickActionsWidget
      eyebrow={dictionary.eyebrow}
      title={dictionary.title}
      actionLabel={dictionary.customise}
      actions={actions}
      locale={locale}
    />
  );
}
