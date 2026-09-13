import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableWidgetSkeletonProps = {
  columnCount: number;
  rowCount?: number;
};

const columnWidths = ["w-24", "w-40", "w-20", "w-28", "w-16"];

export function TableWidgetSkeleton({
  columnCount,
  rowCount = 5,
}: TableWidgetSkeletonProps) {
  return (
    <Table className="min-w-[760px]">
      <TableHeader className="bg-muted/40">
        <TableRow className="border-b hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, index) => (
            <TableHead key={`skeleton-head-${index}`} className="h-11 px-4">
              <Skeleton className={`h-3.5 ${columnWidths[index] ?? "w-24"}`} />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow
            key={`skeleton-row-${rowIndex}`}
            className="border-b border-border/60"
          >
            {Array.from({ length: columnCount }).map((_, columnIndex) => (
              <TableCell
                key={`skeleton-cell-${rowIndex}-${columnIndex}`}
                className="px-4 py-4 align-middle"
              >
                {columnIndex === 1 ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ) : columnIndex === 4 ? (
                  <Skeleton className="h-6 w-20 rounded-full" />
                ) : (
                  <Skeleton
                    className={`h-4 ${
                      columnIndex === 0
                        ? "w-24"
                        : columnIndex === 2
                          ? "w-16"
                          : columnIndex === 3
                            ? "w-28"
                            : "w-24"
                    }`}
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
