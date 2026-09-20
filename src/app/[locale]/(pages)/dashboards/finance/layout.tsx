import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { FinanceHeaderActions } from "@/modules/dashboards/finance/components/finance-header-actions";

interface FinanceLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function FinanceLayout({
  children,
  params,
}: FinanceLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.dashboards.finance.page} />

        <FinanceHeaderActions
          dictionary={dictionary.dashboards.finance.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
