import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { formatDuration, formatNumber } from "@/utils/formatters";

import { MetricListItem } from "./components/metric-list-item";
import type {
  MetricListItem as MetricListItemType,
  MetricListWidgetProps,
} from "./types";

const iconColors = [
  "bg-chart-2/20 text-chart-2",
  "bg-chart-3/20 text-chart-3",
  "bg-chart-4/20 text-chart-4",
  "bg-chart-5/20 text-chart-5",
];

function formatMetricValue(
  value: number,
  valueType: MetricListItemType["valueType"],
  locale: "fa" | "en",
) {
  switch (valueType) {
    case "duration":
      return formatDuration(value, locale);

    case "decimal":
    case "number":
    default:
      return formatNumber(value, locale);
  }
}

export function MetricListWidget({
  header,
  items,
  locale,
}: MetricListWidgetProps) {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader className="space-y-1">
        {header.label && (
          <p className="text-xs text-muted-foreground">{header.label}</p>
        )}

        <h3 className="text-lg font-semibold">{header.title}</h3>

        {header.description && (
          <p className="text-sm text-muted-foreground">{header.description}</p>
        )}
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {items.map((item, index) => (
            <MetricListItem
              key={item.id}
              {...item}
              value={formatMetricValue(item.value, item.valueType, locale)}
              iconClassName={iconColors[index % iconColors.length]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
