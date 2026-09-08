import { CardContent, CardHeader } from "@/components/ui/card";

type CardPresentationSkeletonProps = {
  selectorCount?: number;
  summaryCount?: number;
};

export function CardPresentationSkeleton({
  selectorCount = 4,
  summaryCount = 3,
}: CardPresentationSkeletonProps) {
  return (
    <>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />

          <div className="flex w-fit max-w-full flex-wrap gap-1 rounded-lg border p-1">
            {Array.from({ length: selectorCount }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-12 shrink-0 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="relative min-h-[210px] overflow-hidden rounded-2xl bg-muted/50 p-5 sm:p-6">
          <div className="absolute inset-0 animate-pulse bg-muted/60" />

          <div className="absolute inset-x-5 top-5 space-y-3 sm:inset-x-6 sm:top-6">
            <div className="h-5 w-24 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-36 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-8 w-44 max-w-full animate-pulse rounded bg-muted" />

            <div className="pt-10">
              <div className="h-5 w-52 max-w-full animate-pulse rounded bg-muted float-left" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        </div>
        <hr className="border-border" />
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3">
          {Array.from({ length: summaryCount }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-16 max-w-full animate-pulse rounded bg-muted" />
              <div className="h-6 w-24 max-w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
