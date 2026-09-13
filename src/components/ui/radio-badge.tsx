import { cn } from "@/lib/utils";

type RadioBadgeProps = {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
};

export function RadioBadge({
  children,
  className,
  animated = true,
}: RadioBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full",
        "border border-border bg-muted/50 px-2.5",
        "text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full bg-current",
          animated && "animate-pulse",
        )}
      />

      {children}
    </span>
  );
}
