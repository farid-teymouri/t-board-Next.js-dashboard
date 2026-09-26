import { headers } from "next/headers";

import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { RadioBadge } from "@/components/ui/radio-badge";
import { EcommerceEditProductHeaderActions } from "@/modules/ecommerce/edit-product/components/edit-product-header-actions";

import type { EcommerceEditProductData } from "@/types/ecommerce/edit-product";

interface EcommerceEditProductLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getEditProduct(): Promise<EcommerceEditProductData> {
  const requestHeaders = await headers();
  const isolate = (value: string | number) => `\u2068${value}\u2069`;
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host = requestHeaders.get("host");

  if (!host) {
    throw new Error("Unable to determine request host");
  }

  const response = await fetch(
    `${protocol}://${host}/api/ecommerce/edit-product`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch edit product");
  }

  return response.json();
}

export default async function EcommerceEditProductLayout({
  children,
  params,
}: EcommerceEditProductLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const [dictionary, product] = await Promise.all([
    getDictionary(locale),
    getEditProduct(),
  ]);
  const isolate = (value: string | number) => `\u2068${value}\u2069`;
  const lastSavedDate = new Date(product.lastSavedAt);

  const date = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(lastSavedDate);

  const time = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: locale === "en",
  }).format(lastSavedDate);

  const formattedStock = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
  ).format(product.stock);

  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.ecommerce.editProduct.page}
          variables={{
            sku: isolate(product.id),
            stock: isolate(formattedStock),
            date: isolate(date),
            time: isolate(time),
          }}
          badge={
            <RadioBadge className="bg-chart-3/20 text-chart-3">
              {product.status === "active"
                ? dictionary.ecommerce.editProduct.header.active
                : dictionary.ecommerce.editProduct.header.inactive}
            </RadioBadge>
          }
        />

        <EcommerceEditProductHeaderActions
          dictionary={dictionary.ecommerce.editProduct.header}
        />
      </PageHeaderContent>

      {children}
    </>
  );
}
