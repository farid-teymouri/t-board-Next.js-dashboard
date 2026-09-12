"use client";

import { TargetWidget } from "@/components/widgets/target-widget";
import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useMonthlyTarget } from "../hooks/use-monthly-target";

type MonthlyTargetProps = {
  dictionary: EcommerceDashboardDictionary["monthlyTarget"];
  locale: "fa" | "en";
};

export function MonthlyTarget({ dictionary, locale }: MonthlyTargetProps) {
  const { data, isLoading, isError } = useMonthlyTarget();

  return (
    <TargetWidget
      data={data}
      dictionary={dictionary}
      locale={locale}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
