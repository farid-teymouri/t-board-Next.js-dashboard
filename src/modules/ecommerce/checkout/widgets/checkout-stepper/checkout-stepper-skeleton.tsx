import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutStepperSkeleton() {
  return (
    <div className="mt-6 w-full">
      {/* Mobile / Tablet */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative flex min-w-0 flex-col items-center"
          >
            {index < 3 && (
              <div className="absolute start-1/2 top-4 h-px w-full">
                <Skeleton className="h-px w-full" />
              </div>
            )}

            <Skeleton className="relative z-10 size-8 shrink-0 rounded-full sm:size-9" />

            <Skeleton className="mt-3 hidden h-4 w-24 max-w-full sm:block" />

            <Skeleton className="mt-2 h-5 w-16 rounded-full sm:w-20" />
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden items-center lg:flex">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex items-start gap-3">
              <Skeleton className="size-9 shrink-0 rounded-full" />

              <div className="flex flex-col items-start gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>

            {index < 3 && (
              <Skeleton className="mx-4 h-px flex-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}