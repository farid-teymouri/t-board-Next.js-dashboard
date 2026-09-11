import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { formatDuration, formatNumber } from "@/utils/formatters";

import { MetricListItem } from "./components/metric-list-item";
import { MetricListSection } from "./components/metric-list-section";

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

function MetricsVariant({
  header,
  items,
  locale,
}: Extract<MetricListWidgetProps, { variant?: "metrics" }>) {
  return (
    <>
      <CardHeader>
        {header.label && (
          <p className="text-sm text-muted-foreground">{header.label}</p>
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
              locale={locale}
            />
          ))}
        </div>
      </CardContent>
    </>
  );
}

function SectionsVariant({
  sections,
  locale,
}: Extract<MetricListWidgetProps, { variant: "sections" }>) {
  return (
    <CardContent className="space-y-6">
      {sections.map((section, index) => (
        <div key={section.id}>
          {index > 0 && <div className="mb-6 border-t" />}

          <MetricListSection {...section} locale={locale} />
        </div>
      ))}
    </CardContent>
  );
}

export function MetricListWidget(props: MetricListWidgetProps) {
  if (props.variant === "sections") {
    return (
      <Card className="h-full">
        <SectionsVariant {...props} />
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <MetricsVariant {...props} />
    </Card>
  );
}
