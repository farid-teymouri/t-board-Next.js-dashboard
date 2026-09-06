"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  TableWidget,
  type TableWidgetColumn,
} from "@/components/widgets/table-widget";
import { CreditCard, Layers3, Mail, Shapes, ShoppingBag } from "lucide-react";
import type { RecentTransaction } from "@/types/dashboards/sales/recent-transactions";

import { useRecentTransactions } from "../hooks/use-recent-transactions";

type RecentTransactionsTranslations = {
  title: string;
  description: string;
  viewAll: string;
};

type RecentTransactionsProps = {
  locale: "fa" | "en";
  translations: RecentTransactionsTranslations;
};

function MerchantIcon({
  icon,
}: {
  icon: RecentTransaction["merchant"]["icon"];
}) {
  switch (icon) {
    case "stripe":
      return <CreditCard className="size-4" strokeWidth={1.8} />;
    case "linear":
      return <Layers3 className="size-4" strokeWidth={1.8} />;
    case "figma":
      return <Shapes className="size-4" strokeWidth={1.8} />;
    case "shopify":
      return <ShoppingBag className="size-4" strokeWidth={1.8} />;
    case "paypal":
      return <Mail className="size-4" strokeWidth={1.8} />;
    default:
      return <CreditCard className="size-4" strokeWidth={1.8} />;
  }
}

export function RecentTransactions({
  locale,
  translations,
}: RecentTransactionsProps) {
  const { data, isLoading, isError } = useRecentTransactions({
    locale,
  });

  const columns: TableWidgetColumn<RecentTransaction>[] = [
    {
      key: "merchant",
      header: data?.columns.merchant ?? "",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground">
            <MerchantIcon icon={row.merchant.icon} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{row.merchant.name}</p>

            <p className="truncate text-xs text-muted-foreground">
              {row.merchant.provider}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      header: data?.columns.category ?? "",
      render: (row) => <span className="text-sm">{row.category}</span>,
    },

    {
      key: "date",
      header: data?.columns.date ?? "",
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.date}</span>
      ),
    },

    {
      key: "amount",
      header: data?.columns.amount ?? "",
      render: (row) => {
        const isPositive = row.amount.type === "positive";

        return (
          <div
            className={
              isPositive
                ? "flex items-center gap-1.5 text-sm font-medium text-chart-3 dark:text-chart-3"
                : "flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400"
            }
          >
            {isPositive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownLeft className="size-3.5" />
            )}

            <span>{row.amount.formatted}</span>
          </div>
        );
      },
    },

    {
      key: "status",
      header: data?.columns.status ?? "",
      render: (row) => {
        const statusClassName = {
          completed:
            "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-chart-3",

          pending:
            "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",

          failed:
            "border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        }[row.status.value];

        return (
          <Badge variant="outline" className={statusClassName}>
            {row.status.label}
          </Badge>
        );
      },
    },
  ];

  if (isError) {
    return null;
  }

  return (
    <TableWidget
      title={translations.title}
      description={translations.description}
      viewAll={{
        label: translations.viewAll,
        href: "",
      }}
      columns={columns}
      data={data?.data ?? []}
      getRowKey={(row) => row.id}
      isLoading={isLoading}
      skeletonRows={5}
    />
  );
}
