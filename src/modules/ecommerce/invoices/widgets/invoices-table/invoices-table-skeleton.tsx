import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoicesTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max items-center gap-1 border-b px-4 pt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-7 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Search + Calendar */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:max-w-sm" />

        <Skeleton className="size-9 rounded-md" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 px-4">
                <Skeleton className="size-4" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                {/* Select */}
                <TableCell className="w-12 px-4">
                  <Skeleton className="size-4" />
                </TableCell>

                {/* Invoice */}
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>

                {/* Client */}
                <TableCell>
                  <div className="flex min-w-52 items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-full" />

                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                </TableCell>

                {/* Issue Date */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* Due */}
                <TableCell>
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </TableCell>

                {/* Amount */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
