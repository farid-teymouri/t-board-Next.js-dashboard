"use client";

import {
  ComposedChartWidget,
  ComposedChartWidgetSkeleton,
} from "@/components/widgets/composed-chart-widget";

import type { ChartPeriod } from "@/components/widgets/composed-chart-widget";

import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { EcommerceDashboardDictionary } from "@/i18n/dictionaries";

import { useRevenueOrders } from "../hooks/use-revenue-orders";

type RevenueOrdersProps = {
  dictionary: EcommerceDashboardDictionary["revenueOrders"];
  locale: "fa" | "en";
};

const revenueFormatter = (value: number, locale: "fa" | "en") =>
  formatCurrency(value, {
    locale,
    currency: "IRT",
    maximumFractionDigits: 0,
  });

const ordersFormatter = (value: number, locale: "fa" | "en") =>
  formatNumber(value, locale, "default");
function getRevenueOrdersLabel(
  period: ChartPeriod,
  key: string,
  locale: "fa" | "en",
) {
  if (locale === "en") {
    return key;
  }

  if (period === "week") {
    const days: Record<string, string> = {
      Mon: "دوشنبه",
      Tue: "سه‌شنبه",
      Wed: "چهارشنبه",
      Thu: "پنجشنبه",
      Fri: "جمعه",
      Sat: "شنبه",
      Sun: "یکشنبه",
    };

    return days[key] ?? key;
  }

  if (period === "month") {
    const months: Record<string, string> = {
      Jan: "فروردین",
      Feb: "اردیبهشت",
      Mar: "خرداد",
      Apr: "تیر",
      May: "مرداد",
      Jun: "شهریور",
      Jul: "مهر",
      Aug: "آبان",
      Sep: "آذر",
      Oct: "دی",
      Nov: "بهمن",
      Dec: "اسفند",
    };

    return months[key] ?? key;
  }

  return key;
}

export function RevenueOrders({ dictionary, locale }: RevenueOrdersProps) {
  const { data, availablePeriods, period, setPeriod, isLoading, isError } =
    useRevenueOrders();

  if (isLoading) {
    return <ComposedChartWidgetSkeleton locale={locale} />;
  }

  if (isError || !data || !period) {
    return (
      <div className="rounded-lg border p-6 text-sm text-destructive">
        {dictionary.error}
      </div>
    );
  }

  const periodOptions = (["week", "month", "year"] as const)
    .filter((value) => availablePeriods.includes(value))
    .map((value) => ({
      value,
      label: dictionary.period[value],
    }));

  const chartData = data.data.map((item) => ({
    ...item,
    label: getRevenueOrdersLabel(period, item.key, locale),
  }));

  return (
    <ComposedChartWidget
      data={chartData}
      xAxisDataKey="label"
      locale={locale}
      header={{
        label: dictionary.label,
        title: dictionary.title,
        description: dictionary.description,
      }}
      series={[
        {
          dataKey: "orders",
          label: dictionary.series.orders,
          type: "bar",
          color: "var(--chart-2)",
          radius: 4,
          barSize: 40,
          yAxisId: "orders",
          formatter: ordersFormatter,
        },
        {
          dataKey: "revenue",
          label: dictionary.series.revenue,
          type: "line",
          color: "var(--chart-3)",
          yAxisId: "revenue",
          formatter: revenueFormatter,
        },
      ]}
      yAxes={[
        {
          id: "revenue",
          position: "left",
          formatter: revenueFormatter,
          domain: [0, 160_000_000],
        },
        {
          id: "orders",
          position: "right",
          formatter: ordersFormatter,
          domain: [0, 8_000],
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
    />
  );
}
