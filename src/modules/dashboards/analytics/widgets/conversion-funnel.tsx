"use client";

import { ProgressListWidget } from "@/components/widgets/progress-list-widget";

import { useConversionFunnel } from "../hooks/use-conversion-funnel";

interface ConversionFunnelTranslations {
  title: string;
  description: string;
  stages: string[];
  conversionLabel: string;
}

type ConversionFunnelProps = {
  translations: ConversionFunnelTranslations;
  locale: "fa" | "en";
};

export function ConversionFunnel({
  translations,
  locale,
}: ConversionFunnelProps) {
  const { data, isPending, isError } = useConversionFunnel(locale);

  return (
    <ProgressListWidget
      locale={locale}
      translations={translations}
      items={data?.items ?? []}
      variant="funnel"
      valueMode="value"
      display={{
        rank: "hidden",
        progress: true,
        meta: false,
      }}
      isLoading={isPending}
      isError={isError}
    />
  );
}
