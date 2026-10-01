"use client";

import type { EcommerceInvoicesDictionary } from "@/i18n/dictionaries";

import { InvoicesTable } from "./widgets/invoices-table";

type EcommerceInvoicesProps = {
  dictionary: EcommerceInvoicesDictionary;
  locale: "fa" | "en";
};

export function EcommerceInvoices({
  dictionary,
  locale,
}: EcommerceInvoicesProps) {
  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <InvoicesTable dictionary={dictionary.table} locale={locale} />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1" />

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          {/* → Generic: MetricWidget */}
        </section>
      </div>
    </div>
  );
}
