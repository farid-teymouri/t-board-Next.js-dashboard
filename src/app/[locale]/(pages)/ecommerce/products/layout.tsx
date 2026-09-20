import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceProductsHeaderActions } from "@/modules/ecommerce/products/components/products-header-actions";
import { headers } from "next/headers";
interface EcommerceProductsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getProductsCount() {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/ecommerce/products`, {
    cache: "no-store",
  });

  return res.json();
}
export default async function EcommerceProductsLayout({
  children,
  params,
}: EcommerceProductsLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);
  const products = await getProductsCount();
  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.ecommerce.products.page}
          variables={{
            count: products.count,
          }}
        />

        <EcommerceProductsHeaderActions
          dictionary={dictionary.ecommerce.products.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
