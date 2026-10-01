import { headers } from "next/headers";

import { getDictionary } from "@/i18n/dictionaries";

import { formatCurrency } from "@/utils/currency";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";

import { EcommerceInvoicesHeaderActions } from "@/modules/ecommerce/invoices/components/invoices-header-actions";

interface EcommerceInvoicesLayoutProps {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
}

async function getInvoices() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/ecommerce/invoices/invoices-table`,
    {
      cache: "no-store",
    },
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to fetch invoices: ${response.status} ${text}`);
  }

  if (!text) {
    throw new Error("Invoices API returned an empty response.");
  }

  return JSON.parse(text);
}

export default async function EcommerceInvoicesLayout({
  children,
  params,
}: EcommerceInvoicesLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const dictionary = await getDictionary(locale);

  const invoices = await getInvoices();

  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.ecommerce.invoices.page}
          variables={{
            count: invoices.summary.count,
            overdue: invoices.summary.overdue,
            amount: formatCurrency(invoices.summary.amount, {
              locale,
              currency: invoices.summary.currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          }}
        />

        <EcommerceInvoicesHeaderActions
          dictionary={dictionary.ecommerce.invoices.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
