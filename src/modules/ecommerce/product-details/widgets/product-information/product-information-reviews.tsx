import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import type { ProductInformation } from "./types";

import { ProductInformationReviewList } from "./product-information-review-list";
import { ProductInformationReviewSummary } from "./product-information-review-summary";

type ProductInformationReviewsProps = {
  data: ProductInformation;
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
};

export function ProductInformationReviews({
  data,
  dictionary,
  locale,
}: ProductInformationReviewsProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
      <ProductInformationReviewSummary
        data={data}
        dictionary={dictionary}
        locale={locale}
      />

      <ProductInformationReviewList
        data={data}
        dictionary={dictionary}
        locale={locale}
      />
    </div>
  );
}
