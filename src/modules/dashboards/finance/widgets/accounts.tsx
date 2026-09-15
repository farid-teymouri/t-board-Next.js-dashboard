"use client";

import { ArrowUp, CreditCard, Landmark } from "lucide-react";

import {
  MetricListWidget,
  MetricListWidgetSkeleton,
} from "@/components/widgets/metric-list-widget";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currency";
import { formatNumber } from "@/utils/formatters";
import type { FinanceDashboardDictionary } from "@/i18n/dictionaries";

import { useAccounts } from "../hooks/use-accounts";

import type { FinanceAccount } from "@/types/dashboards/finance/accounts";

type AccountsProps = {
  locale: "fa" | "en";
  dictionary: FinanceDashboardDictionary["accounts"];
};

const accountIconClasses = {
  checking: "bg-chart-3/20 text-chart-3",
  savings: "bg-chart-4/20 text-chart-4",
  card: "bg-chart-5/20 text-chart-5",
  reserve: "bg-chart-2/20 text-chart-2",
} as const;

function getAccountIcon(type: FinanceAccount["type"]) {
  switch (type) {
    case "card":
      return CreditCard;

    case "checking":
    case "savings":
    case "reserve":
    default:
      return Landmark;
  }
}

function AccountChangeBadge({
  value,
  locale,
}: {
  value: number;
  locale: "fa" | "en";
}) {
  const formattedValue = `${formatNumber(value, locale, "decimal")}%`;

  return (
    <Badge
      variant="secondary"
      className="gap-1 border-0 bg-chart-3/10 text-chart-3"
    >
      <ArrowUp className="size-3" />
      {formattedValue}
    </Badge>
  );
}

export function Accounts({ locale, dictionary }: AccountsProps) {
  const { data, isLoading, isError } = useAccounts(locale);

  if (isLoading) {
    return (
      <MetricListWidgetSkeleton variant="sections" sectionItemCounts={[4]} />
    );
  }

  if (isError || !data) {
    return null;
  }

  return (
    <MetricListWidget
      variant="sections"
      locale={locale}
      sections={[
        {
          id: "accounts",
          title: dictionary.title,
          action: {
            label: dictionary.manage,
          },
          items: data.map((account) => {
            const Icon = getAccountIcon(account.type);

            return {
              id: account.id,
              label: account.name,
              meta:
                locale === "fa"
                  ? `${account.lastFour} ••••`
                  : `•••• ${account.lastFour}`,
              icon: Icon,
              iconClassName: accountIconClasses[account.type],
              valueDisplay: (
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={
                      account.balance < 0
                        ? "text-destructive"
                        : account.type === "reserve"
                          ? undefined
                          : "text-chart-3"
                    }
                  >
                    {formatCurrency(account.balance, {
                      locale,
                      currency: account.currency,
                      maximumFractionDigits: 0,
                      position: "suffix",
                    })}
                  </span>

                  {account.status.type === "change" ? (
                    <AccountChangeBadge
                      value={account.status.value}
                      locale={locale}
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {account.status.value}
                    </span>
                  )}
                </div>
              ),
            };
          }),
        },
      ]}
    />
  );
}
