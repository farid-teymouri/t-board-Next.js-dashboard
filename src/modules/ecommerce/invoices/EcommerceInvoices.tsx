"use client";

import type { EcommerceInvoicesDictionary } from "@/i18n/dictionaries";

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
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Generic: TableWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: SummaryWidget */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Generic: MetricWidget */}
        </section>
      </div>
    </div>
  );
}
