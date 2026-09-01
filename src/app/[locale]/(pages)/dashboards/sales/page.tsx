import { getDictionary } from "@/i18n/dictionaries";

import { SalesDashboard } from "@/modules/dashboards/sales";

export default async function SalesPage({
  params,
}: {
  params: Promise<{
    locale: "fa" | "en";
  }>;
}) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <SalesDashboard dictionary={dictionary.dashboards.sales} locale={locale} />
  );
}
