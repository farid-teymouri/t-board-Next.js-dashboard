import type { Currency } from "@/utils/currency";

import { ProgressListItem } from "../progress-list-item";

import type {
  ProgressListItem as ProgressListItemData,
  ProgressListRank,
  ProgressListValueMode,
} from "../../types";

type ClassicProgressListProps = {
  items: ProgressListItemData[];
  locale: "fa" | "en";
  valueMode: ProgressListValueMode;
  rank: ProgressListRank;
  showProgress: boolean;
  showMeta: boolean;
  valueSuffix?: string;
  currency?: Currency;
};

export function ClassicProgressList({
  items,
  locale,
  valueMode,
  rank,
  showProgress,
  showMeta,
  valueSuffix,
  currency,
}: ClassicProgressListProps) {
  return (
    <div className="flex flex-col h-full">
      {items.map((item, index) => (
        <ProgressListItem
          key={item.id}
          item={item}
          index={index}
          locale={locale}
          valueMode={valueMode}
          rank={rank}
          showProgress={showProgress}
          showMeta={showMeta}
          valueSuffix={valueSuffix}
          currency={currency}
          progressColor="var(--primary)"
        />
      ))}
    </div>
  );
}
