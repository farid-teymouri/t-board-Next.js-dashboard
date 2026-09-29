import type { ProductInformation } from "./types";

type ProductInformationAdditionalProps = {
  data: ProductInformation;
  locale: "fa" | "en";
};

export function ProductInformationAdditional({
  data,
  locale,
}: ProductInformationAdditionalProps) {
  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full text-sm">
        <tbody>
          {data.additionalInformation.map((item, index) => (
            <tr
              key={item.label.en}
              className={index % 2 === 0 ? "bg-muted/50" : "bg-background"}
            >
              <td className="w-1/2 px-4 py-3 font-medium">
                {item.label[locale]}
              </td>
              <td className="w-1/2 px-4 py-3 text-muted-foreground">
                {item.value[locale]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
