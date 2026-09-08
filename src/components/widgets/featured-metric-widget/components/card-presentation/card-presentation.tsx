import { Card, CardContent, CardHeader } from "@/components/ui/card";

import type { FeaturedMetricCardContent } from "../../types";

type CardPresentationProps = FeaturedMetricCardContent;

export function CardPresentation(props: CardPresentationProps) {
  if (props.loading) {
    return <CardPresentationSkeleton />;
  }

  const {
    label,
    amountLabel,
    amount,
    currency,
    identifier,
    direction = "ltr",
  } = props;

  return (
    <div
      dir={direction}
      className="
        relative
        min-h-[210px]
        overflow-hidden
        rounded-2xl
        bg-linear-to-br
        from-primary
        via-primary/70
        to-primary/60
        p-6
        text-primary-foreground
        shadow-lg
        shadow-primary/20
        dark:from-primary
        dark:via-primary/90
        dark:to-primary/70
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          size-56
          rounded-full
          bg-sky-400/10
          blur-3xl
          dark:bg-sky-500/30
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-12
          size-48
          rounded-full
          bg-rose-400/10
          blur-3xl
          dark:bg-rose-500/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          bg-linear-to-br
          from-rose-400/50
          via-transparent
          to-sky-300/50
          dark:from-rose-400/90
          dark:to-sky-400/70
        "
      />

      <div className="relative z-10 flex h-full min-h-[198px] flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="text-lg font-semibold tracking-[0.18em]">{label}</div>

          <div className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-md font-medium uppercase tracking-wider">
            {currency}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium text-primary-foreground/70">
            {amountLabel}
          </p>

          <div className="mt-2">
            <span className="text-3xl font-bold tracking-tight">{amount}</span>
          </div>
        </div>

        <div className="mt-8">
          <div
            dir="ltr"
            className="
              text-sm
              font-medium
              tracking-[0.22em]
              text-primary-foreground/90
            "
          >
            {identifier}
          </div>
        </div>
      </div>
    </div>
  );
}

type CardPresentationSkeletonProps = {
  selectorCount?: number;
  summaryCount?: number;
};

export function CardPresentationSkeleton({
  selectorCount = 4,
  summaryCount = 3,
}: CardPresentationSkeletonProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />

          <div className="flex gap-1 rounded-lg border p-1">
            {Array.from({ length: selectorCount }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-12 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="relative h-[210px] overflow-hidden rounded-2xl bg-muted/50">
          <div className="absolute inset-0 animate-pulse bg-muted/60" />

          <div className="absolute inset-x-5 top-5 space-y-3">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-4 w-36 animate-pulse rounded bg-muted" />
            <div className="h-8 w-44 animate-pulse rounded bg-muted" />

            <div className="pt-16">
              <div className="h-5 w-52 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
          <div className="h-10 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: summaryCount }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
