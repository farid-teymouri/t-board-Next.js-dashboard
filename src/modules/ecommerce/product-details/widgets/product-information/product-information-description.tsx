import type { ProductInformation } from "./types";

type ProductInformationDescriptionProps = {
  data: ProductInformation;
  locale: "fa" | "en";
};

export function ProductInformationDescription({
  data,
  locale,
}: ProductInformationDescriptionProps) {
  return (
    <div className="space-y-5 text-sm leading-7 text-muted-foreground">
      {data.description.paragraphs.slice(0, 2).map((paragraph, index) => (
        <p key={index}>{paragraph[locale]}</p>
      ))}

      <ul className="list-disc space-y-2 ps-5">
        {data.description.features.map((feature, index) => (
          <li key={index}>{feature[locale]}</li>
        ))}
      </ul>

      {data.description.paragraphs.slice(2).map((paragraph, index) => (
        <p key={index}>{paragraph[locale]}</p>
      ))}
    </div>
  );
}
