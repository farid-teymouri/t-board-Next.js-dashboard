import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { FinanceHeaderActions } from "@/modules/dashboards/finance/components/finance-header-actions";

interface FinanceLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function AnalyticsLayout({
  children,
  params,
}: FinanceLayoutProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.sidebar} />

        <FinanceHeaderActions
          dictionary={dictionary.dashboards.finance.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
