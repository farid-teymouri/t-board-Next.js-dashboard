"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductsPaginationDictionary {
  showing: string;
  previous: string;
  next: string;
}

interface ProductsPaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  dictionary: ProductsPaginationDictionary;
  locale: "fa" | "en";
  onPageChange: (page: number) => void;
}

export function ProductsPagination({
  page,
  pageSize,
  totalItems,
  dictionary,
  locale,
  onPageChange,
}: ProductsPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  if (totalItems === 0) {
    return null;
  }

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pageNumbers = getPageNumbers(page, totalPages);

  const showing = dictionary.showing
    .replace("{from}", start.toLocaleString(locale))
    .replace("{to}", end.toLocaleString(locale))
    .replace("{total}", totalItems.toLocaleString(locale));

  const isRtl = locale === "fa";

  return (
    <div className="flex flex-col gap-4 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{showing}</p>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          disabled={page === 1}
          aria-label={dictionary.previous}
          onClick={() => onPageChange(page - 1)}
        >
          {isRtl ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>

        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="flex size-8 items-center justify-center text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <Button
              key={pageNumber}
              type="button"
              variant={pageNumber === page ? "default" : "outline"}
              size="icon"
              className={cn(
                "size-8",
                pageNumber !== page && "border-transparent",
              )}
              aria-current={pageNumber === page ? "page" : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber.toLocaleString(locale)}
            </Button>
          ),
        )}

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          disabled={page === totalPages}
          aria-label={dictionary.next}
          onClick={() => onPageChange(page + 1)}
        >
          {isRtl ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}
