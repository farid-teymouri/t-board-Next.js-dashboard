import { EcommerceProductDetails } from "@/modules/ecommerce/product-details";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommerceProductDetailsPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommerceProductDetailsPage({
  params,
}: EcommerceProductDetailsPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceProductDetails
      dictionary={dictionary.ecommerce.productDetails}
      locale={locale}
    />
  );
}
