"use client";

import { Badge } from "@/components/ui/badge";
import {
  TableWidget,
  type TableWidgetColumn,
} from "@/components/widgets/table-widget";

import { useRecentTransactions } from "../hooks/use-recent-transactions";

import type { FinanceTransaction } from "@/types/dashboards/finance/recent-transactions";

type RecentTransactionsDictionary = {
  title: string;
  description: string;
  viewAll: string;
  columns: {
    date: string;
    payee: string;
    category: string;
    account: string;
    amount: string;
  };
};

type RecentTransactionsProps = {
  dictionary: RecentTransactionsDictionary;
  locale: "fa" | "en";
};

const formatAmount = (
  amount: number,
  locale: "fa" | "en",
  currency: FinanceTransaction["currency"],
) => {
  const formatted = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(Math.abs(amount));

  const sign = amount >= 0 ? "+" : "−";

  return `${sign}${formatted} ${currency[locale]}`;
};

export function RecentTransactions({
  dictionary,
  locale,
}: RecentTransactionsProps) {
  const { data = [], isLoading } = useRecentTransactions();

  const columns: TableWidgetColumn<FinanceTransaction>[] = [
    {
      key: "date",
      header: dictionary.columns.date,
      className: "w-[14%] whitespace-nowrap",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.date[locale]}
        </span>
      ),
    },
    {
      key: "payee",
      header: dictionary.columns.payee,
      className: "w-[24%]",
      render: (row) => <span className="text-sm font-medium">{row.payee}</span>,
    },
    {
      key: "category",
      header: dictionary.columns.category,
      className: "w-[18%]",
      render: (row) => (
        <Badge variant="secondary">{row.category[locale]}</Badge>
      ),
    },
    {
      key: "account",
      header: dictionary.columns.account,
      className: "w-[22%]",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {row.account[locale]}
        </span>
      ),
    },
    {
      key: "amount",
      header: dictionary.columns.amount,
      className: "w-[22%] text-right",
      render: (row) => (
        <span
          className={
            row.amount >= 0
              ? "text-sm font-medium text-chart-3"
              : "text-sm font-medium text-destructive"
          }
        >
          {formatAmount(row.amount, locale, row.currency)}
        </span>
      ),
    },
  ];

  return (
    <TableWidget
      title={dictionary.title}
      description={dictionary.description}
      viewAll={{
        label: dictionary.viewAll,
      }}
      columns={columns}
      data={data}
      getRowKey={(row) => row.id}
      isLoading={isLoading}
      skeletonRows={6}
    />
  );
}
