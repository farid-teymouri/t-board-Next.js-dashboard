"use client";

import type { EcommerceCheckoutDictionary } from "@/i18n/dictionaries";

type EcommerceCheckoutProps = {
  dictionary: EcommerceCheckoutDictionary;
  locale: "fa" | "en";
};

export function EcommerceCheckout({
  dictionary,
  locale,
}: EcommerceCheckoutProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-4 grid-cols-1 w-full">
        <section className="xl:col-span-2 lg:col-span-4 col-span-1">
          {/* → Checkout Form */}
        </section>

        <section className="xl:col-span-1 lg:col-span-2 col-span-1">
          {/* → Order Summary */}
        </section>
      </div>
    </div>
  );
}
