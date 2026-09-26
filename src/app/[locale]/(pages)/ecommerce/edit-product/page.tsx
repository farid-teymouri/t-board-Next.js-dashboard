import { EcommerceEditProduct } from "@/modules/ecommerce/edit-product";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommerceEditProductPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommerceEditProductPage({
  params,
}: EcommerceEditProductPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceEditProduct
      dictionary={dictionary.ecommerce.editProduct}
      locale={locale}
    />
  );
}
