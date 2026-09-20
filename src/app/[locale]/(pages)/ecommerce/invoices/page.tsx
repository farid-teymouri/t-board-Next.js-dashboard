import { EcommerceInvoices } from "@/modules/ecommerce/invoices";

import { getDictionary } from "@/i18n/dictionaries";

interface EcommerceInvoicesPageProps {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}

export default async function EcommerceInvoicesPage({
  params,
}: EcommerceInvoicesPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <EcommerceInvoices
      dictionary={dictionary.ecommerce.invoices}
      locale={locale}
    />
  );
}
