import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { EcommerceProductDetailsHeaderActions } from "@/modules/ecommerce/product-details/components/product-details-header-actions";
import { headers } from "next/headers";
interface EcommerceProductDetailsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}
async function getProductDetails() {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/ecommerce/product-details`,
    {
      cache: "no-store",
    },
  );

  return response.json();
}
export default async function EcommerceProductDetailsLayout({
  children,
  params,
}: EcommerceProductDetailsLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";
  const dictionary = await getDictionary(locale);
  const product = await getProductDetails();
  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.ecommerce.productDetails.page}
          variables={{
            name: product.name,
            sku: product.sku,
            category: product.category,
          }}
        />
        <EcommerceProductDetailsHeaderActions
          dictionary={dictionary.ecommerce.productDetails.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
