import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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

      {/* Search + Calendar + Sort */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-9 w-full sm:max-w-sm" />

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Skeleton className="h-9 w-full sm:w-40" />
          <Skeleton className="h-9 w-full sm:w-44" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              {/* Select */}
              <TableHead className="w-12 px-4">
                <Skeleton className="size-4" />
              </TableHead>

              {/* Invoice */}
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              {/* Client */}
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              {/* Issue Date */}
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>

              {/* Due */}
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              {/* Amount */}
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              {/* Status */}
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>

              {/* Actions */}
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
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

                {/* Actions */}
                <TableCell className="w-12">
                  <Skeleton className="size-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Summary */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} />

              {/* Amount total */}
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              {/* Paid + Outstanding */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
