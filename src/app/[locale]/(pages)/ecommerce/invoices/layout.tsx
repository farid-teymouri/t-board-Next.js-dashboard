import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceInvoicesHeaderActions } from "@/modules/ecommerce/invoices/components/invoices-header-actions";

interface EcommerceInvoicesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function EcommerceInvoicesLayout({
  children,
  params,
}: EcommerceInvoicesLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.ecommerce.invoices.page} />

        <EcommerceInvoicesHeaderActions
          dictionary={dictionary.ecommerce.invoices.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
