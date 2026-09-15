"use client";
import { Skeleton } from "@/components/ui/skeleton";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { TableWidgetSkeleton } from "./table-widget-skeleton";

import type { TableWidgetProps } from "./types";

function TableWidgetProgress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-all", className)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export function TableWidget<T>({
  variant = "default",
  title,
  description,
  viewAll,
  columns,
  data,
  getRowKey,
  progress,
  isLoading = false,
  skeletonRows = 5,
}: TableWidgetProps<T>) {
  return (
    <Card className="flex h-full flex-col gap-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        {isLoading ? (
          <>
            <div className="min-w-0 space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {viewAll && <Skeleton className="h-4 w-16 shrink-0" />}
          </>
        ) : (
          <>
            <div className="min-w-0 space-y-1">
              <h2 className="font-display text-base font-medium">{title}</h2>

              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {viewAll ? (
              viewAll.href ? (
                <Link
                  href={viewAll.href}
                  className={cn(
                    "shrink-0 text-sm font-medium text-primary",
                    "underline-offset-4 transition-colors hover:underline",
                  )}
                >
                  {viewAll.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "shrink-0 text-sm font-medium text-primary",
                    "cursor-default",
                  )}
                >
                  {viewAll.label}
                </span>
              )
            ) : null}
          </>
        )}
      </CardHeader>

      <CardContent className="min-w-0">
        <div className="w-full overflow-x-auto">
          {isLoading ? (
            <TableWidgetSkeleton
              columnCount={columns.length}
              rowCount={skeletonRows}
            />
          ) : (
            <Table className="min-w-[760px]">
              <TableHeader className="bg-muted/40">
                <TableRow className="border-b hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead
                      key={column.key}
                      className={cn(
                        "h-11 px-4 text-xs font-medium text-muted-foreground",
                        column.className,
                      )}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow
                    key={getRowKey(row)}
                    className={cn(
                      "border-b border-border/60",
                      "transition-colors hover:bg-muted/30",
                    )}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        className={cn(
                          "px-4 py-4 align-middle",
                          column.className,
                        )}
                      >
                        {variant === "progress" &&
                        column.type === "progress" &&
                        progress ? (
                          <TableWidgetProgress
                            value={progress.getValue(row)}
                            className={progress.getClassName?.(row, rowIndex)}
                          />
                        ) : (
                          column.render(row, rowIndex)
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
