"use client";

import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Clock3,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import { formatCurrency } from "@/utils/currency";

import { useInvoices } from "../../hooks/use-invoices";

import { InvoicesSummarySkeleton } from "./invoices-summary-skeleton";

import type { InvoiceSummaryDirection, InvoicesSummaryProps } from "./types";

type SummaryCardProps = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
  badgeValue?: string;
  badgeDirection?: InvoiceSummaryDirection;
  badgeClassName?: string;
  changeLabel?: string;
};

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  badgeValue,
  badgeDirection,
  badgeClassName,
  changeLabel,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="size-5" />
        </div>
      </div>

      {badgeValue && badgeDirection ? (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              badgeClassName ?? "bg-muted text-muted-foreground"
            }`}
          >
            {badgeDirection === "up" ? (
              <ArrowUp className="size-3" />
            ) : (
              <ArrowDown className="size-3" />
            )}

            {badgeValue}
          </span>

          {changeLabel ? (
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function InvoicesSummary({ locale, dictionary }: InvoicesSummaryProps) {
  const { data, isLoading, isError } = useInvoices();

  if (isLoading) {
    return <InvoicesSummarySkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-card p-6 text-destructive">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const summary = data.summary;

  const formatAmount = (amount: number) =>
    formatCurrency(amount, {
      locale,
      currency: summary.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title={dictionary.outstanding}
        value={formatAmount(summary.outstanding.amount)}
        icon={Clock3}
        iconClassName="bg-chart-3/10 text-chart-3"
        badgeValue={`${summary.outstanding.change.toFixed(1)}%`}
        badgeDirection={summary.outstanding.direction}
        badgeClassName="bg-chart-3/10 text-chart-3"
        changeLabel={dictionary.change}
      />

      <SummaryCard
        title={dictionary.overdue}
        value={formatAmount(summary.overdue.amount)}
        icon={AlertTriangle}
        iconClassName="bg-chart-5/10 text-chart-5"
        badgeValue={`${summary.overdue.count} ${dictionary.invoices}`}
        badgeDirection="up"
        badgeClassName="bg-chart-5/10 text-chart-5"
      />

      <SummaryCard
        title={dictionary.paid30Days}
        value={formatAmount(summary.paid30Days.amount)}
        icon={ShieldCheck}
        iconClassName="bg-chart-2/10 text-chart-2"
        badgeValue={`${summary.paid30Days.change.toFixed(1)}%`}
        badgeDirection={summary.paid30Days.direction}
        badgeClassName="bg-chart-2/10 text-chart-2"
        changeLabel={dictionary.change}
      />

      <SummaryCard
        title={dictionary.drafts}
        value={String(summary.drafts.count)}
        icon={Pencil}
        iconClassName="bg-chart-4/10 text-chart-4"
      />
    </div>
  );
}
