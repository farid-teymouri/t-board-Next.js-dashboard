import { getDictionary } from "@/i18n/dictionaries";

import { FinanceDashboard } from "@/modules/dashboards/finance";

interface FinancePageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function FinancePage({ params }: FinancePageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <FinanceDashboard
      dictionary={dictionary.dashboards.finance}
      locale={locale}
    />
  );
}
