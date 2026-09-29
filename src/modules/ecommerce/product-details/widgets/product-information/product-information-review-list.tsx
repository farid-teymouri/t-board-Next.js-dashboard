import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Button } from "@/components/ui/button";

import { ProductInformationReviewItem } from "./product-information-review-item";
import type { ProductInformation } from "./types";

type ProductInformationReviewListProps = {
  data: ProductInformation;
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
};

export function ProductInformationReviewList({
  data,
  dictionary,
  locale,
}: ProductInformationReviewListProps) {
  return (
    <div className="space-y-5">
      <div className="max-h-[460px] space-y-5 overflow-y-auto pe-2">
        {data.reviews.map((review, index) => (
          <ProductInformationReviewItem
            key={review.id}
            review={review}
            dictionary={dictionary}
            locale={locale}
            index={index}
          />
        ))}
      </div>

      <Button variant="outline" className="w-full sm:w-auto">
        {locale === "fa" ? "مشاهده نظرات بیشتر" : "View More Reviews"}
      </Button>
    </div>
  );
}
