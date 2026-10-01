"use client";

import { useMemo, useState } from "react";

import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoreVertical,
  Pencil,
  Search,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { DateRange } from "@daypicker/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { InvoicesTableSkeleton } from "./invoices-table-skeleton";
import { faIR } from "@daypicker/persian";
import { enUS } from "@daypicker/react/locale";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import { formatCurrency } from "@/utils/currency";

import { useInvoices } from "../../hooks/use-invoices";

import type {
  Invoice,
  InvoiceSort,
  InvoiceStatus,
  InvoiceTab,
  InvoicesTableProps,
} from "./types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function getPaginationPages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ] as const;
}

function getClientInitials(client: Invoice["client"], locale: "fa" | "en") {
  const firstName = client.firstName[locale];
  const lastName = client.lastName[locale];

  if (locale === "fa") {
    return `${firstName.charAt(0)} ${lastName.charAt(0)}`;
  }

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
export function InvoicesTable({ dictionary, locale }: InvoicesTableProps) {
  const { data, isLoading, isError } = useInvoices();

  const [activeTab, setActiveTab] = useState<InvoiceTab>("all");
  const [search, setSearch] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const [sort, setSort] = useState<InvoiceSort>("newest");

  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const filteredInvoices = useMemo(() => {
    if (!data) {
      return [];
    }

    const normalizedSearch = search.trim().toLowerCase();

    const rangeStart = selectedDateRange?.from
      ? new Date(selectedDateRange.from)
      : undefined;

    const rangeEnd = selectedDateRange?.to
      ? new Date(selectedDateRange.to)
      : undefined;

    if (rangeStart) {
      rangeStart.setHours(0, 0, 0, 0);
    }

    if (rangeEnd) {
      rangeEnd.setHours(23, 59, 59, 999);
    }

    return data.invoices.filter((invoice) => {
      const firstName = invoice.client.firstName[locale].toLowerCase();
      const lastName = invoice.client.lastName[locale].toLowerCase();
      const fullName = `${firstName} ${lastName}`;

      const matchesSearch =
        !normalizedSearch ||
        invoice.id.toLowerCase().includes(normalizedSearch) ||
        invoice.client.email.toLowerCase().includes(normalizedSearch) ||
        firstName.includes(normalizedSearch) ||
        lastName.includes(normalizedSearch) ||
        fullName.includes(normalizedSearch);

      if (!matchesSearch) {
        return false;
      }

      if (activeTab === "paid") {
        if (invoice.status !== "paid") {
          return false;
        }
      }

      if (activeTab === "unpaid") {
        if (invoice.status !== "unpaid") {
          return false;
        }
      }

      if (activeTab === "draft") {
        if (invoice.status !== "draft") {
          return false;
        }
      }

      if (activeTab === "overdue") {
        if (invoice.status !== "overdue") {
          return false;
        }
      }

      if (rangeStart && rangeEnd) {
        const issueDate = new Date(invoice.issueDate);

        if (issueDate < rangeStart || issueDate > rangeEnd) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, data, locale, search, selectedDateRange]);

  const sortedInvoices = useMemo(() => {
    const invoices = [...filteredInvoices];

    invoices.sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
          );

        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

        case "amountHigh":
          return b.amount - a.amount;

        case "amountLow":
          return a.amount - b.amount;

        case "client": {
          const clientA =
            `${a.client.firstName[locale]} ${a.client.lastName[locale]}`.toLocaleLowerCase(
              locale === "fa" ? "fa-IR" : "en-US",
            );

          const clientB =
            `${b.client.firstName[locale]} ${b.client.lastName[locale]}`.toLocaleLowerCase(
              locale === "fa" ? "fa-IR" : "en-US",
            );

          return clientA.localeCompare(clientB, locale === "fa" ? "fa" : "en");
        }

        case "status":
          return a.status.localeCompare(b.status);

        default:
          return 0;
      }
    });

    return invoices;
  }, [filteredInvoices, locale, sort]);

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const paginationPages = getPaginationPages(currentPage, totalPages);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedInvoices.slice(startIndex, endIndex);
  }, [currentPage, sortedInvoices]);

  const visibleInvoiceIds = paginatedInvoices.map((invoice) => invoice.id);

  const allVisibleSelected =
    visibleInvoiceIds.length > 0 &&
    visibleInvoiceIds.every((id) => selectedInvoices.includes(id));

  const someVisibleSelected =
    visibleInvoiceIds.some((id) => selectedInvoices.includes(id)) &&
    !allVisibleSelected;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices((current) => [
        ...new Set([...current, ...visibleInvoiceIds]),
      ]);
      return;
    }

    setSelectedInvoices((current) =>
      current.filter((id) => !visibleInvoiceIds.includes(id)),
    );
  };

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices((current) => [...current, invoiceId]);
      return;
    }

    setSelectedInvoices((current) => current.filter((id) => id !== invoiceId));
  };

  if (isLoading) {
    return <InvoicesTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border bg-card p-6 text-destructive">
        {dictionary.error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const displayedTotal = paginatedInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0,
  );

  const displayedPaidTotal = paginatedInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((total, invoice) => total + invoice.amount, 0);

  const displayedOutstandingTotal = paginatedInvoices
    .filter(
      (invoice) => invoice.status === "unpaid" || invoice.status === "overdue",
    )
    .reduce((total, invoice) => total + invoice.amount, 0);

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max items-center gap-1 border-b px-4 pt-2">
          {data.tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                className={[
                  "relative flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span>{dictionary.tabs[tab.id]}</span>

                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className="min-w-5 justify-center px-1.5"
                >
                  {tab.count}
                </Badge>

                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Calendar */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className={[
              "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
              locale === "fa" ? "right-3" : "left-3",
            ].join(" ")}
          />

          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder={dictionary.searchPlaceholder}
            className={locale === "fa" ? "pr-9" : "pl-9"}
          />
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  aria-label={dictionary.calendar}
                  title={dictionary.calendar}
                  className={[
                    "w-full",
                    selectedDateRange?.from ? "border-primary" : undefined,
                  ].join(" ")}
                >
                  <CalendarDays className="size-4" />
                  <span>{dictionary.calendar}</span>
                </Button>
              }
            />

            <PopoverPositioner>
              <PopoverContent
                className="w-auto p-0"
                dir={locale === "fa" ? "rtl" : "ltr"}
              >
                <Calendar
                  mode="range"
                  locale={locale === "fa" ? faIR : enUS}
                  dir={locale === "fa" ? "rtl" : "ltr"}
                  numerals={locale === "fa" ? "arabext" : "latn"}
                  selected={selectedDateRange}
                  onSelect={(range) => {
                    setSelectedDateRange(range);
                    setCurrentPage(1);
                  }}
                  defaultMonth={selectedDateRange?.from}
                  formatters={{
                    formatWeekdayName: (date) =>
                      new Intl.DateTimeFormat(
                        locale === "fa" ? "fa-IR" : "en-US",
                        {
                          weekday: "long",
                        },
                      ).format(date),
                  }}
                />

                <div className="border-t p-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedDateRange(undefined);
                      setCurrentPage(1);
                    }}
                    disabled={!selectedDateRange?.from}
                  >
                    {dictionary.reset}
                  </Button>
                </div>
              </PopoverContent>
            </PopoverPositioner>
          </Popover>

          {/* Data Sort */}
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value as InvoiceSort);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger
              className="w-full sm:w-44"
              aria-label={dictionary.sort.label}
            >
              <SelectValue>
                {sort === "newest" && dictionary.sort.newest}
                {sort === "dueDate" && dictionary.sort.dueDate}
                {sort === "amountHigh" && dictionary.sort.amountHigh}
                {sort === "amountLow" && dictionary.sort.amountLow}
                {sort === "client" && dictionary.sort.client}
                {sort === "status" && dictionary.sort.status}
              </SelectValue>
            </SelectTrigger>

            <SelectContent dir={locale === "fa" ? "rtl" : "ltr"}>
              <SelectItem value="newest">{dictionary.sort.newest}</SelectItem>

              <SelectItem value="dueDate">{dictionary.sort.dueDate}</SelectItem>

              <SelectItem value="amountHigh">
                {dictionary.sort.amountHigh}
              </SelectItem>

              <SelectItem value="amountLow">
                {dictionary.sort.amountLow}
              </SelectItem>

              <SelectItem value="client">{dictionary.sort.client}</SelectItem>

              <SelectItem value="status">{dictionary.sort.status}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-12 px-4">
                <Checkbox
                  checked={allVisibleSelected}
                  indeterminate={someVisibleSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true)
                  }
                  aria-label={dictionary.selectAll}
                  className="border-foreground/40!"
                />
              </TableHead>

              <TableHead>{dictionary.columns.invoice}</TableHead>

              <TableHead>{dictionary.columns.client}</TableHead>

              <TableHead>{dictionary.columns.issueDate}</TableHead>

              <TableHead>{dictionary.columns.due}</TableHead>

              <TableHead>{dictionary.columns.amount}</TableHead>

              <TableHead>{dictionary.columns.status}</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">{dictionary.columns.actions}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <InvoiceTableRow
                key={invoice.id}
                invoice={invoice}
                locale={locale}
                dictionary={dictionary}
                selected={selectedInvoices.includes(invoice.id)}
                onSelect={(checked) => handleSelectInvoice(invoice.id, checked)}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} />

              <TableCell className="whitespace-nowrap font-semibold">
                {formatCurrency(displayedTotal, {
                  locale,
                  currency: locale === "fa" ? "IRT" : "USD",
                })}
              </TableCell>

              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground">
                      {dictionary.summary.paid}
                    </span>
                    <span className="font-semibold text-chart-3">
                      {formatCurrency(displayedPaidTotal, {
                        locale,
                        currency: locale === "fa" ? "IRT" : "USD",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground">
                      {dictionary.summary.outstanding}
                    </span>
                    <span className="font-semibold text-destructive">
                      {formatCurrency(displayedOutstandingTotal, {
                        locale,
                        currency: locale === "fa" ? "IRT" : "USD",
                      })}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground  w-full">
            {dictionary.pagination.showing
              .replace("{from}", String((currentPage - 1) * ITEMS_PER_PAGE + 1))
              .replace(
                "{to}",
                String(
                  Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredInvoices.length,
                  ),
                ),
              )
              .replace("{total}", String(filteredInvoices.length))}
          </p>

          <Pagination
            className={["w-fit", locale === "fa" ? "rtl" : undefined].join(" ")}
          >
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();

                    if (currentPage > 1) {
                      setCurrentPage((page) => page - 1);
                    }
                  }}
                  aria-label={dictionary.pagination.previous}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                >
                  {locale === "fa" ? (
                    <>
                      <ChevronRight className="size-4" />
                      {dictionary.pagination.previous}
                    </>
                  ) : (
                    <>
                      <ChevronLeft className="size-4" />
                      {dictionary.pagination.previous}
                    </>
                  )}
                </PaginationPrevious>
              </PaginationItem>

              {paginationPages.map((page, index) => {
                if (page === "ellipsis") {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(event) => {
                        event.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();

                    if (currentPage < totalPages) {
                      setCurrentPage((page) => page + 1);
                    }
                  }}
                  aria-label={dictionary.pagination.next}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                >
                  {locale === "fa" ? (
                    <>
                      {dictionary.pagination.next}
                      <ChevronLeft className="size-4" />
                    </>
                  ) : (
                    <>
                      {dictionary.pagination.next}
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

type InvoiceTableRowProps = {
  invoice: Invoice;
  locale: "fa" | "en";
  dictionary: InvoicesTableProps["dictionary"];
  selected: boolean;
  onSelect: (checked: boolean) => void;
};

function InvoiceTableRow({
  invoice,
  locale,
  dictionary,
  selected,
  onSelect,
}: InvoiceTableRowProps) {
  const issueDate = new Date(invoice.issueDate);
  const dueDate = new Date(invoice.dueDate);

  const formattedIssueDate = new Intl.DateTimeFormat(
    locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(issueDate);

  const formattedDueDate = new Intl.DateTimeFormat(
    locale === "fa" ? "fa-IR-u-ca-persian" : "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  ).format(dueDate);

  const formattedAmount = formatCurrency(invoice.amount, {
    locale,
    currency: "IRT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <TableRow data-state={selected ? "selected" : undefined}>
      {/* Select */}
      <TableCell className="w-12 px-4">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelect(checked === true)}
          aria-label={dictionary.selectInvoice.replace("{id}", invoice.id)}
          className="border-foreground/40!"
        />
      </TableCell>

      {/* Invoice */}
      <TableCell className="whitespace-nowrap">
        <a
          href="#"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          #{invoice.id}
        </a>
      </TableCell>

      {/* Client */}
      <TableCell>
        <div className="flex min-w-52 items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback
              className={`text-xs font-medium ${invoice.client.avatarColor}`}
            >
              {getClientInitials(invoice.client, locale)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="truncate font-medium">
              {invoice.client.firstName[locale]}{" "}
              {invoice.client.lastName[locale]}
            </div>

            <div dir="ltr" className="truncate text-xs text-muted-foreground">
              {invoice.client.email}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Issue Date */}
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {formattedIssueDate}
      </TableCell>

      {/* Due */}
      <TableCell className="whitespace-nowrap">
        {invoice.status === "overdue" ? (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-destructive">
              {formattedDueDate}
            </span>

            <span className="text-xs font-medium text-destructive">
              {dictionary.overdue.replace(
                "{days}",
                String(invoice.overdueDays),
              )}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">{formattedDueDate}</span>
        )}
      </TableCell>

      {/* Amount */}
      <TableCell className="whitespace-nowrap font-medium">
        {formattedAmount}
      </TableCell>

      {/* Status */}
      <TableCell>
        <InvoiceStatusBadge status={invoice.status} dictionary={dictionary} />
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={dictionary.columns.actions}
          title={dictionary.columns.actions}
        >
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function InvoiceStatusBadge({
  status,
  dictionary,
}: {
  status: InvoiceStatus;
  dictionary: InvoicesTableProps["dictionary"];
}) {
  const config = {
    unpaid: {
      label: dictionary.status.unpaid,
      icon: Clock3,
      className: "border-chart-2/30 bg-chart-2/10 text-chart-2",
    },
    paid: {
      label: dictionary.status.paid,
      icon: Check,
      className: "border-chart-3/30 bg-chart-3/10 text-chart-3",
    },
    overdue: {
      label: dictionary.status.overdue,
      icon: AlertTriangle,
      className: "border-destructive/30 bg-destructive/10 text-destructive",
    },
    draft: {
      label: dictionary.status.draft,
      icon: Pencil,
      className: "border-chart-1/30 bg-chart-1/10 text-chart-1",
    },
  } as const;

  const current = config[status];
  const Icon = current.icon;

  return (
    <Badge variant="outline" className={`gap-1.5 ${current.className}`}>
      <Icon className="size-3.5" />
      <span>{current.label}</span>
    </Badge>
  );
}
