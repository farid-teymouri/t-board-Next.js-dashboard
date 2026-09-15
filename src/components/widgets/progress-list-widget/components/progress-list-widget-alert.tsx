import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProgressListAlert } from "../types";

type ProgressListWidgetAlertProps = {
  alert: ProgressListAlert;
};

export function ProgressListWidgetAlert({
  alert,
}: ProgressListWidgetAlertProps) {
  const isDestructive = alert.variant === "destructive";

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm",
        isDestructive
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-border bg-muted text-foreground",
      )}
    >
      {alert.icon ?? <AlertTriangle className="size-4 shrink-0" />}

      <span className="min-w-0">{alert.message}</span>
    </div>
  );
}
