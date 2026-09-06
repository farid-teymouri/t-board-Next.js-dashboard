"use client";

import { useMemo, useState } from "react";

import {
  ComposedChartWidget,
  ComposedChartWidgetSkeleton,
  formatChartValue,
} from "@/components/widgets/composed-chart-widget";

import { useAcquisition } from "../hooks/use-acquisition";

import { getMonthLabel } from "../utils/date-label";

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
  const [period, setPeriod] = useState("month");
  const { data, isLoading, isError } = useAcquisition();

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.data.map((item) => ({
      label: getMonthLabel(item.month, locale),
      sessions: item.sessions,
      newVisitors: item.newVisitors,
      returning: item.returning,
    }));
  }, [data, locale]);

  if (isLoading) {
    return <ComposedChartWidgetSkeleton locale={locale} />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-6 text-sm text-destructive">
        {translations.error}
      </div>
    );
  }

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
      periods={{
        value: period,
        onChange: setPeriod,
        options: [
          {
            value: "year",
            label: translations.period.year,
            disabled: true,
          },
          {
            value: "month",
            label: translations.period.month,
          },
          {
            value: "week",
            label: translations.period.week,
            disabled: true,
          },
        ],
      }}
      formatter={formatChartValue}
    />
  );
}
