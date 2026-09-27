import { Card, CardContent } from "@/components/ui/card";

export function ProductMediaSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />

            <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />
          </div>

          {/* Main media */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/30 p-4">
            <div className="size-full animate-pulse rounded-lg bg-muted" />

            <div className="absolute right-3 top-3 size-9 animate-pulse rounded-md bg-muted" />
          </div>

          {/* Gallery */}
          <div className="flex flex-wrap gap-3 overflow-hidden rounded-2xl bg-foreground/1 p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="size-[142px] shrink-0 animate-pulse rounded-xl bg-muted"
              />
            ))}

            {/* Add media */}
            <div className="flex size-[142px] shrink-0 items-center justify-center rounded-xl border border-dashed border-foreground/10 bg-muted/20">
              <div className="size-8 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
