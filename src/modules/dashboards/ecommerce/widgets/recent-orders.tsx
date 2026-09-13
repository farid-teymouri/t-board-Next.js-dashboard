"use client";

import {
  TableWidget,
  type TableWidgetColumn,
} from "@/components/widgets/table-widget";
import { RadioBadge } from "@/components/ui/radio-badge";

import { formatCurrency } from "@/utils/currency";

import type { RecentOrder } from "@/types/dashboards/ecommerce/recent-orders";

import { useRecentOrders } from "../hooks/use-recent-orders";

type RecentOrdersTranslations = {
  title: string;
  description: string;
};

type RecentOrdersProps = {
  locale: "fa" | "en";
  translations: RecentOrdersTranslations;
};

const statusClassNames: Record<RecentOrder["status"]["value"], string> = {
  delivered: "border-chart-3/20 bg-chart-3/10 text-chart-3",
  shipped: "border-chart-2/20 bg-chart-2/10 text-chart-2",
  processing: "border-chart-5/20 bg-chart-5/10 text-chart-5",
  refunded: "border-destructive/20 bg-destructive/10 text-destructive",
};

export function RecentOrders({ locale, translations }: RecentOrdersProps) {
  const { data, isLoading, isError } = useRecentOrders({
    locale,
  });

  const columns: TableWidgetColumn<RecentOrder>[] = [
    {
      key: "order",
      header: data?.columns.order ?? "",
      render: (row) => (
        <span className="text-sm font-medium">{row.orderNumber}</span>
      ),
    },
    {
      key: "customer",
      header: data?.columns.customer ?? "",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{row.customer.name}</p>

          <p className="text-xs text-muted-foreground">
            {row.customer.itemsLabel}
          </p>
        </div>
      ),
    },
    {
      key: "date",
      header: data?.columns.date ?? "",
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.date}</span>
      ),
    },
    {
      key: "total",
      header: data?.columns.total ?? "",
      render: (row) => (
        <span className="text-sm font-medium">
          {formatCurrency(row.total.value, {
            locale,
            currency: row.total.currency,
          })}
        </span>
      ),
    },
    {
      key: "status",
      header: data?.columns.status ?? "",
      className: "w-[110px]",
      render: (row) => (
        <RadioBadge
          animated={false}
          className={statusClassNames[row.status.value]}
        >
          {row.status.label}
        </RadioBadge>
      ),
    },
  ];

  if (isError) {
    return null;
  }

  return (
    <TableWidget
      title={translations.title}
      description={translations.description}
      columns={columns}
      data={data?.data ?? []}
      getRowKey={(row) => row.id}
      isLoading={isLoading}
      skeletonRows={6}
    />
  );
}
