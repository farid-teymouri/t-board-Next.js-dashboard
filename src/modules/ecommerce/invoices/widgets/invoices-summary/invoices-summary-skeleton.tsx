import { Skeleton } from "@/components/ui/skeleton";

export function InvoicesSummarySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-3 h-8 w-32" />
            </div>

            <Skeleton className="size-10 shrink-0 rounded-lg" />
          </div>

          <Skeleton className="mt-3 h-5 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}
