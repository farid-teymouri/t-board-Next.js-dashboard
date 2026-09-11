import { Button } from "@/components/ui/button";

import { MetricListSectionItem } from "./metric-list-section-item";

import type { MetricListSection as MetricListSectionType } from "../types";

interface MetricListSectionProps extends MetricListSectionType {
  locale: "fa" | "en";
}

export function MetricListSection({
  title,
  action,
  items,
  locale,
}: MetricListSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold">{title}</h3>

        {action && (
          <Button
            type="button"
            variant="link"
            size="sm"
            className="h-auto shrink-0 p-0"
          >
            {action.label}
          </Button>
        )}
      </div>

      <div className="mt-2">
        {items.map((item, index) => (
          <MetricListSectionItem
            key={item.id}
            {...item}
            locale={locale}
            iconClassName={
              item.iconClassName ??
              [
                "bg-chart-2/10 text-chart-2",
                "bg-chart-3/10 text-chart-3",
                "bg-chart-4/10 text-chart-4",
                "bg-chart-5/10 text-chart-5",
              ][index % 4]
            }
          />
        ))}
      </div>
    </section>
  );
}
