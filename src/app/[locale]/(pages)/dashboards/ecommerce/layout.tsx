import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceHeaderActions } from "@/modules/dashboards/ecommerce/components/ecommerce-header-actions";

interface EcommercesLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function EcommercesLayout({
  children,
  params,
}: EcommercesLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.dashboards.ecommerce.page} />

        <EcommerceHeaderActions
          dictionary={dictionary.dashboards.ecommerce.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
