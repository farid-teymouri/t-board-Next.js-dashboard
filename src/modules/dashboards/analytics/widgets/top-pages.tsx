"use client";

import { formatNumber, formatDuration } from "@/utils/formatters";

import {
  TableWidget,
  type TableWidgetColumn,
} from "@/components/widgets/table-widget";

import type { TopPage } from "@/types/dashboards/analytics/top-pages";
import type { AnalyticsDashboardDictionary } from "@/i18n/dictionaries";

import { useTopPages } from "../hooks/use-top-pages";

type TopPagesProps = {
  translations: AnalyticsDashboardDictionary["topPages"];
  locale: "fa" | "en";
};

const progressColors = ["bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-2"];

export function TopPages({ translations, locale }: TopPagesProps) {
  const { data, isLoading } = useTopPages();

  const pageTitles: Record<string, string> = {
    "/": translations.pageTitles.homepage,
    "/pricing": translations.pageTitles.pricing,
    "/blog/scaling-aurora": translations.pageTitles.scalingAurora,
    "/signup": translations.pageTitles.signup,
    "/docs/api": translations.pageTitles.docsApi,
  };

  const columns: TableWidgetColumn<TopPage>[] = [
    {
      key: "page",
      header: translations.columns.page,
      render: (row) => (
        <div className="min-w-0">
          <div className="font-medium">{row.path}</div>
          <div className="truncate text-xs text-muted-foreground">
            {pageTitles[row.path] ?? row.path}
          </div>
        </div>
      ),
    },
    {
      key: "pageviews",
      header: translations.columns.pageviews,
      className: "w-[110px] whitespace-nowrap",
      render: (row) => formatNumber(row.pageviews, locale),
    },
    {
      key: "avg-time",
      header: translations.columns.avgTime,
      className: "w-[110px] whitespace-nowrap",
      render: (row) => formatDuration(row.avgTime, locale),
    },
    {
      key: "bounce",
      header: translations.columns.bounce,
      className: "w-[90px] whitespace-nowrap",
      render: (row) => `${formatNumber(row.bounce, locale)}%`,
    },
    {
      key: "share",
      header: translations.columns.share,
      type: "progress",
      className: "min-w-[180px]",
      render: (row) => `${formatNumber(row.share, locale)}%`,
    },
  ];

  return (
    <TableWidget
      variant="progress"
      title={translations.title}
      description={translations.description}
      viewAll={{
        label: translations.viewAll,
        href: "#",
      }}
      columns={columns}
      data={data?.data ?? []}
      getRowKey={(row) => row.id}
      progress={{
        getValue: (row) => row.share,
        getClassName: (_, index) =>
          progressColors[index % progressColors.length],
      }}
      isLoading={isLoading}
      skeletonRows={5}
    />
  );
}
