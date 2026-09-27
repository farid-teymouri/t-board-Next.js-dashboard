import { EcommerceEditProduct } from "@/modules/ecommerce/edit-product";
import { getDictionary } from "@/i18n/dictionaries";
import { contentEditorDictionaries } from "@/components/ui/content-editor/dictionary";

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
  const contentEditorDictionary = contentEditorDictionaries[locale];

  return (
    <EcommerceEditProduct
      dictionary={dictionary.ecommerce.editProduct}
      contentEditorDictionary={contentEditorDictionary}
      locale={locale}
    />
  );
}
