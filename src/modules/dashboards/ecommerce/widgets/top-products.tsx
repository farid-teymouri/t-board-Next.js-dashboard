"use client";

import { Flower2, Headphones, Shirt, Sparkles } from "lucide-react";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useTopProducts } from "../hooks/use-top-products";

type TopProductsProps = {
  translations: EcommerceDashboardDictionary["topProducts"];
  locale: "fa" | "en";
};

const productIcons = {
  headphones: Headphones,
  shirt: Shirt,
  sparkles: Sparkles,
  flower: Flower2,
};

export function TopProducts({ translations, locale }: TopProductsProps) {
  const { data, isPending, isError } = useTopProducts(locale);

  const items =
    data?.items.map((item) => {
      const Icon = productIcons[item.icon];

      return {
        ...item,
        icon: <Icon className="size-4 text-muted-foreground" />,
      };
    }) ?? [];

  return (
    <ProgressListWidget
      locale={locale}
      translations={translations}
      items={items}
      currency="IRT"
      variant="products"
      isLoading={isPending}
      isError={isError}
      display={{
        rank: "hidden",
        progress: true,
        meta: true,
      }}
    />
  );
}
