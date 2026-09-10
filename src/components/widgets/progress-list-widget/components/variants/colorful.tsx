import type { Currency } from "@/utils/currency";

import { ProgressListItem } from "../progress-list-item";

import type {
  ProgressListItem as ProgressListItemData,
  ProgressListRank,
  ProgressListValueMode,
} from "../../types";

type ColorfulProgressListProps = {
  items: ProgressListItemData[];
  locale: "fa" | "en";
  valueMode: ProgressListValueMode;
  rank: ProgressListRank;
  showProgress: boolean;
  showMeta: boolean;
  valueSuffix?: string;
  currency?: Currency;
};

const progressColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ColorfulProgressList({
  items,
  locale,
  valueMode,
  rank,
  showProgress,
  showMeta,
  valueSuffix,
  currency,
}: ColorfulProgressListProps) {
  return (
    <div className="flex flex-col h-full">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-xl p-3 first:pt-0 last:pb-0">
          <ProgressListItem
            item={item}
            index={index}
            locale={locale}
            valueMode={valueMode}
            rank={rank}
            showProgress={showProgress}
            showMeta={showMeta}
            valueSuffix={valueSuffix}
            currency={currency}
            progressColor={progressColors[index % progressColors.length]}
          />
        </div>
      ))}
    </div>
  );
}
