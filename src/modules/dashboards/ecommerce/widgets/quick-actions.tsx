"use client";

import {
  CheckCircle,
  Download,
  Grid,
  Percent,
  Plus,
  ShoppingCart,
} from "@deemlol/next-icons";

import {
  QuickActionsWidget,
  type QuickAction,
} from "@/components/widgets/quick-actions-widget";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useQuickActions } from "../hooks/use-quick-actions";
import type { QuickActionType } from "@/types/dashboards/ecommerce/quick-actions";

type EcommerceQuickActionsProps = {
  translations: EcommerceDashboardDictionary["quickActions"];
  locale: "fa" | "en";
};

const actionIcons: Record<QuickActionType, QuickAction["icon"]> = {
  "add-product": <Plus className="size-5" />,
  "new-order": <ShoppingCart className="size-5" />,
  "export-csv": <Download className="size-5" />,
  discount: <Percent className="size-5" />,
  fulfil: <CheckCircle className="size-5" />,
  collections: <Grid className="size-5" />,
};

export function EcommerceQuickActions({
  translations,
  locale,
}: EcommerceQuickActionsProps) {
  const { data, isLoading } = useQuickActions(locale);

  const actions =
    data?.actions.map((action) => ({
      label: action.label,
      icon: actionIcons[action.type],
    })) ?? [];

  return (
    <QuickActionsWidget
      eyebrow={translations.eyebrow}
      title={translations.title}
      actionLabel={translations.customise}
      actions={actions}
      locale={locale}
      isLoading={isLoading}
      actionCount={6}
    />
  );
}
