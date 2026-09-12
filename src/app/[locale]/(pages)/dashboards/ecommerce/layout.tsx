import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceHeaderActions } from "@/modules/dashboards/ecommerce/components/ecommerce-header-actions";

interface EcommercesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function AnalyticsLayout({
  children,
  params,
}: EcommercesLayoutProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.sidebar} />

        <EcommerceHeaderActions
          dictionary={dictionary.dashboards.ecommerce.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
