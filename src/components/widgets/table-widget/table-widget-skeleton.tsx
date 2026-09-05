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

export function TableWidgetSkeleton({
  columnCount,
  rowCount = 5,
}: TableWidgetSkeletonProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnCount }).map((_, index) => (
            <TableHead key={`skeleton-head-${index}`}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow key={`skeleton-row-${rowIndex}`}>
            {Array.from({ length: columnCount }).map((_, columnIndex) => (
              <TableCell key={`skeleton-cell-${rowIndex}-${columnIndex}`}>
                <Skeleton
                  className={columnIndex === 0 ? "h-4 w-40" : "h-4 w-24"}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
