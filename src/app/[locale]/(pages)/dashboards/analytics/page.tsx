import { AnalyticsDashboard } from "@/modules/dashboards/analytics";

import { getDictionary } from "@/i18n/dictionaries";

interface AnalyticsPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <AnalyticsDashboard
      dictionary={dictionary.dashboards.analytics}
      locale={locale}
    />
  );
}
