"use client";

import {
  BreakdownWidget,
  BreakdownWidgetSkeleton,
} from "@/components/widgets/breakdown-widget";

import { useSpendingByCategory } from "../hooks/use-spending-by-category";

type SpendingByCategoryProps = {
  dictionary: {
    title: string;
    totalLabel: string;
    categories: Record<string, string>;
  };
  locale: "fa" | "en";
};

export function SpendingByCategory({
  dictionary,
  locale,
}: SpendingByCategoryProps) {
  const { data, isLoading, isError } = useSpendingByCategory();

  if (isLoading) {
    return <BreakdownWidgetSkeleton itemCount={5} variant="list" />;
  }

  if (isError || !data) {
    return null;
  }

  const items = data.items.map((item) => ({
    ...item,
    label: dictionary.categories[item.id] ?? item.label,
  }));

  return (
    <BreakdownWidget
      locale={locale}
      title={dictionary.title}
      total={{
        ...data.total,
        label: dictionary.totalLabel,
      }}
      items={items}
      variant="list"
    />
  );
}
