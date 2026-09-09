"use client";

import {
  ComposedChartWidget,
  ComposedChartWidgetSkeleton,
  formatChartValue,
} from "@/components/widgets/composed-chart-widget";

import { useAcquisition } from "../hooks/use-acquisition";
import { getAcquisitionChartLabel } from "../utils/chart-label";

interface AcquisitionChartTranslations {
  label: string;
  title: string;
  description: string;
  period: {
    year: string;
    month: string;
    week: string;
  };
  series: {
    sessions: string;
    newVisitors: string;
    returning: string;
  };
  error: string;
}

interface AcquisitionChartProps {
  translations: AcquisitionChartTranslations;
  locale: "fa" | "en";
}

export function AcquisitionChart({
  translations,
  locale,
}: AcquisitionChartProps) {
  const { data, availablePeriods, period, setPeriod, isLoading, isError } =
    useAcquisition();

  if (isLoading) {
    return <ComposedChartWidgetSkeleton locale={locale} />;
  }

  if (isError || !data || !period) {
    return (
      <div className="rounded-lg border p-6 text-sm text-destructive">
        {translations.error}
      </div>
    );
  }

  const chartData = data.data.map((item) => ({
    ...item,
    label: getAcquisitionChartLabel(period, item.key, locale),
  }));

  const periodOptions = availablePeriods.map((value) => ({
    value,
    label: translations.period[value],
  }));

  return (
    <ComposedChartWidget
      data={chartData}
      xAxisDataKey="label"
      locale={locale}
      header={{
        label: translations.label,
        title: translations.title,
        description: translations.description,
      }}
      series={[
        {
          dataKey: "newVisitors",
          label: translations.series.newVisitors,
          type: "bar",
          color: "var(--chart-4)",
          radius: 4,
        },
        {
          dataKey: "returning",
          label: translations.series.returning,
          type: "bar",
          color: "var(--chart-5)",
          radius: 4,
        },
        {
          dataKey: "sessions",
          label: translations.series.sessions,
          type: "line",
          color: "var(--chart-3)",
        },
      ]}
      periods={
        periodOptions.length >= 2
          ? {
              value: period,
              onChange: setPeriod,
              options: periodOptions,
            }
          : undefined
      }
      formatter={formatChartValue}
    />
  );
}
