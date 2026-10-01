"use client";

import dynamic from "next/dynamic";

import type { EcommerceCheckoutDictionary } from "@/i18n/dictionaries";

import { CheckoutPageSkeleton } from "./checkout-page-skeleton";

type EcommerceCheckoutProps = {
  dictionary: EcommerceCheckoutDictionary;
  locale: "fa" | "en";
};

const EcommerceCheckoutClient = dynamic(
  () =>
    import("./EcommerceCheckoutClient").then(
      (mod) => mod.EcommerceCheckoutClient,
    ),
  {
    ssr: false,
    loading: () => <CheckoutPageSkeleton />,
  },
);

export function EcommerceCheckout(props: EcommerceCheckoutProps) {
  return <EcommerceCheckoutClient {...props} />;
}
