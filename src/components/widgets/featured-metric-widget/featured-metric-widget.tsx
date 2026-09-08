import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CardPresentation } from "./components/card-presentation/card-presentation";
import { CardPresentationSkeleton } from "./components/card-presentation/card-presentation-skeleton";
import { CurrencySelector } from "./components/currency-selector";
import type { FeaturedMetricWidgetProps } from "./types";

export function FeaturedMetricWidget({
  header,
  content,
  footer,
}: FeaturedMetricWidgetProps) {
  const isLoading = content?.type === "card" && content.loading;

  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden">
      {isLoading ? (
        <CardPresentationSkeleton />
      ) : (
        <>
          {header && (
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-semibold">{header.title}</h3>

                {header.selector && (
                  <CurrencySelector
                    currencies={header.selector.options}
                    value={header.selector.value}
                    onChange={header.selector.onChange}
                  />
                )}
              </div>
            </CardHeader>
          )}

          <CardContent className="space-y-5">
            {content?.type === "card" && <CardPresentation {...content} />}

            {footer}
          </CardContent>
        </>
      )}
    </Card>
  );
}
