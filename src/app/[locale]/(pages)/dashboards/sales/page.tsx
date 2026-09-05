import { getDictionary } from "@/i18n/dictionaries";

import { SalesDashboard } from "@/modules/dashboards/sales";

interface SalesPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function SalesPage({ params }: SalesPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <SalesDashboard dictionary={dictionary.dashboards.sales} locale={locale} />
  );
}
