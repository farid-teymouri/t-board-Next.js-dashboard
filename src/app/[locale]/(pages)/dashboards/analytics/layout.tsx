import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { AnalyticsHeaderActions } from "@/modules/dashboards/analytics/components/analytics-header-actions";

interface AnalyticsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function AnalyticsLayout({
  children,
  params,
}: AnalyticsLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.dashboards.analytics.page} />

        <AnalyticsHeaderActions
          dictionary={dictionary.dashboards.analytics.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
