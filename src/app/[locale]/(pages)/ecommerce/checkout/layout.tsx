import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceCheckoutHeaderActions } from "@/modules/ecommerce/checkout/components/checkout-header-actions";
import { headers } from "next/headers";
interface EcommerceCheckoutLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}
async function getCheckoutData() {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/ecommerce/checkout`, {
    cache: "no-store",
  });

  return response.json();
}
export default async function EcommerceCheckoutLayout({
  children,
  params,
}: EcommerceCheckoutLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);
  const checkout = await getCheckoutData();
  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.ecommerce.checkout.page}
          variables={{
            count: checkout.itemsCount,
          }}
        />

        <EcommerceCheckoutHeaderActions
          dictionary={dictionary.ecommerce.checkout.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
