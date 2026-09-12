import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { SalesHeaderActions } from "@/modules/dashboards/sales/components/sales-header-actions";

interface SalesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function SalesLayout({
  children,
  params,
}: SalesLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.sidebar} />

        <SalesHeaderActions dictionary={dictionary.dashboards.sales.header} />
      </PageHeaderContent>

      {children}
    </>
  );
}
