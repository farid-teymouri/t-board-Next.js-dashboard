import { EcommerceDashboard } from "@/modules/dashboards/ecommerce";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommercePageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommercePage({ params }: EcommercePageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceDashboard
      dictionary={dictionary.dashboards.ecommerce}
      locale={locale}
    />
  );
}
