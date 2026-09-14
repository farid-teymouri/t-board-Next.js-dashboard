"use client";

import { useState } from "react";

import {
  ComposedChartWidget,
  ComposedChartWidgetSkeleton,
  type ChartPeriodOption,
  type ChartValueFormatter,
} from "@/components/widgets/composed-chart-widget";
import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";

import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";
import type { CashFlowPeriod } from "@/types/dashboards/finance/cash-flow";

import { useCashFlow } from "../hooks/use-cash-flow";

type CashFlowProps = {
  dictionary: FinanceDashboardDictionary["cashFlow"];
  locale: "fa" | "en";
};

export function CashFlow({ dictionary, locale }: CashFlowProps) {
  const [period, setPeriod] = useState<CashFlowPeriod>("12M");

  const { data, isLoading } = useCashFlow(period);

  const periods: ChartPeriodOption[] = [
    {
      label: dictionary.periods.sixMonths,
      value: "week",
    },
    {
      label: dictionary.periods.twelveMonths,
      value: "month",
    },
    {
      label: dictionary.periods.ytd,
      value: "year",
    },
  ];

  const formatter: ChartValueFormatter = (value, currentLocale) =>
    formatCurrency(value, {
      locale: currentLocale,
      currency: "IRT",
      maximumFractionDigits: 0,
    });

  const axisFormatter: ChartValueFormatter = (value, currentLocale) => {
    const millions = value / 1_000_000;

    return currentLocale === "fa"
      ? `${formatNumber(millions, currentLocale)} میلیون`
      : `${formatNumber(millions, currentLocale)}M`;
  };

  const selectedPeriod =
    period === "6M" ? "week" : period === "12M" ? "month" : "year";

  if (isLoading || !data) {
    return <ComposedChartWidgetSkeleton locale={locale} />;
  }

  const chartData = data.data.map((item) => ({
    ...item,
    monthLabel: locale === "fa" ? item.month : item.monthEn,
  }));

  return (
    <ComposedChartWidget
      locale={locale}
      data={chartData}
      xAxisDataKey="monthLabel"
      header={{
        label: dictionary.label,
        title: dictionary.title,
        description: dictionary.description,
      }}
      series={[
        {
          dataKey: "income",
          label: dictionary.income,
          color: "var(--chart-2)",
          type: "bar",
          radius: 4,
          barSize: 20,
          formatter,
        },
        {
          dataKey: "expenses",
          label: dictionary.expenses,
          color: "var(--destructive)",
          type: "bar",
          radius: 4,
          barSize: 20,
          formatter,
        },
        {
          dataKey: "net",
          label: dictionary.net,
          color: "var(--chart-1)",
          type: "line",
          formatter,
        },
      ]}
      periods={{
        options: periods,
        value: selectedPeriod,
        onChange: (value) => {
          if (value === "week") {
            setPeriod("6M");
          }

          if (value === "month") {
            setPeriod("12M");
          }

          if (value === "year") {
            setPeriod("YTD");
          }
        },
      }}
      yAxes={[
        {
          id: "cash-flow",
          position: "left",
          ticks: [-40000000, -20000000, 0, 20000000, 40000000, 60000000],
          domain: [-40000000, 60000000],
          formatter: axisFormatter,
        },
      ]}
      formatter={formatter}
    />
  );
}
