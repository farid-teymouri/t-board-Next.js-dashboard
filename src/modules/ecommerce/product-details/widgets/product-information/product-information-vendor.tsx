import { Headphones, MapPin, Send, Star } from "lucide-react";
import { Instagram } from "@deemlol/next-icons";
import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatNumber } from "@/utils/formatters";

import type { ProductInformation } from "./types";

type ProductInformationVendorProps = {
  data: ProductInformation;
  dictionary: EcommerceProductDetailsDictionary["information"];
  locale: "fa" | "en";
};

export function ProductInformationVendor({
  data,
  dictionary,
  locale,
}: ProductInformationVendorProps) {
  const { vendor } = data;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-16 rounded-xl">
          <AvatarImage src={vendor.logo} />
          <AvatarFallback className="rounded-xl text-lg font-semibold">
            {vendor.name[locale].slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold">{vendor.name[locale]}</h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`size-4 ${
                    index < Math.round(vendor.rating)
                      ? "fill-amber-500 text-amber-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {formatNumber(vendor.rating, locale, "decimal")}
            </span>

            <span className="text-muted-foreground">•</span>

            <span className="text-sm text-muted-foreground">
              {formatNumber(vendor.reviewCount, locale)}{" "}
              {dictionary.vendor.reviews}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <VendorContactItem
          icon={MapPin}
          label={dictionary.vendor.address}
          value={vendor.address}
        />

        <VendorContactItem
          icon={Headphones}
          label={dictionary.vendor.contactSeller}
          value={vendor.phone}
          dir="ltr"
        />

        <VendorContactItem
          icon={Instagram}
          label={dictionary.vendor.instagram}
          value={vendor.instagram}
          dir="ltr"
        />

        <VendorContactItem
          icon={Send}
          label={dictionary.vendor.telegram}
          value={vendor.telegram}
          dir="ltr"
        />
      </div>

      <div className="border-t pt-6">
        <h4 className="text-sm font-semibold">{dictionary.vendor.about}</h4>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
          {vendor.description[locale]}
        </p>
      </div>
    </div>
  );
}

type VendorContactItemProps = {
  icon: typeof MapPin;
  label: string;
  value: string;
  dir?: "ltr" | "rtl";
};

function VendorContactItem({
  icon: Icon,
  label,
  value,
  dir,
}: VendorContactItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p dir={dir} className="mt-1 wrap-break-word text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}
