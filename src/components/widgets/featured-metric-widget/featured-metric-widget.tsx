import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CardPresentation } from "./components/card-presentation";
import type { FeaturedMetricWidgetProps } from "./types";

export function FeaturedMetricWidget({
  header,
  content,
  footer,
}: FeaturedMetricWidgetProps) {
  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden">
      {header && <CardHeader>{header}</CardHeader>}

      <CardContent className="space-y-5">
        {content?.type === "card" && <CardPresentation {...content} />}

        {footer}
      </CardContent>
    </Card>
  );
}
