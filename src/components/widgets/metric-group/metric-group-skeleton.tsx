import { Card } from "@/components/ui/card";

type MetricGroupSkeletonProps = {
  count?: number;
};

export function MetricGroupSkeleton({ count = 5 }: MetricGroupSkeletonProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap divide-x divide-y divide-border xl:divide-y-0">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5"
          >
            <div className="flex min-w-0 flex-1">
              <div className="flex w-full items-center gap-4 px-3 py-3">
                <div className="size-9 shrink-0 rounded-xl bg-muted" />

                <div className="min-w-0 flex-1">
                  <div className="h-4 w-24 rounded bg-muted" />

                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <div className="h-6 w-20 rounded bg-muted" />

                    <div className="h-4 w-10 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
