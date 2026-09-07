import { Card } from "@/components/ui/card";

import { MetricGroupItem } from "./metric-group-item";
import { MetricGroupSkeleton } from "./metric-group-skeleton";
import type { MetricGroupProps } from "./types";

export function MetricGroup({
  items,
  locale,
  isLoading = false,
}: MetricGroupProps) {
  if (isLoading) {
    return <MetricGroupSkeleton count={items.length || 5} />;
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap divide-x divide-y divide-border xl:divide-y-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5"
          >
            <MetricGroupItem item={item} locale={locale} />
          </div>
        ))}
      </div>
    </Card>
  );
}
