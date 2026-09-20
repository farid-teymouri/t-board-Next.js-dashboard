import { EcommerceCheckout } from "@/modules/ecommerce/checkout";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommerceCheckoutPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommerceCheckoutPage({
  params,
}: EcommerceCheckoutPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceCheckout
      dictionary={dictionary.ecommerce.checkout}
      locale={locale}
    />
  );
}
