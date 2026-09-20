import { EcommerceProducts } from "@/modules/ecommerce/products";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommerceProductsPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommerceProductsPage({
  params,
}: EcommerceProductsPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceProducts
      dictionary={dictionary.ecommerce.products}
      locale={locale}
    />
  );
}
