"use client";

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

export function TableWidget<T>({
  title,
  description,
  viewAll,
  columns,
  data,
  getRowKey,
  isLoading = false,
  skeletonRows = 5,
}: TableWidgetProps<T>) {
  return (
    <Card className="flex h-full flex-col gap-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="min-w-0 space-y-1">
          <h2 className="font-display text-base font-medium">{title}</h2>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {viewAll ? (
          <Link
            href={viewAll.href}
            className={cn(
              "shrink-0 text-sm font-medium text-primary",
              "underline-offset-4 transition-colors hover:underline",
            )}
          >
            {viewAll.label}
          </Link>
        ) : null}
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
                {data.map((row) => (
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
                        {column.render(row)}
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
