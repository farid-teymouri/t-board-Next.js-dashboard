"use client";

import { useState } from "react";

import { Minus, Plus, ShoppingCart, CreditCard } from "lucide-react";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Button } from "@/components/ui/button";

import type { ProductOverview } from "./types";

type ProductOverviewActionsProps = {
  data: ProductOverview;
  dictionary: EcommerceProductDetailsDictionary["overview"];
  locale: "fa" | "en";
};

export function ProductOverviewActions({
  data,
  dictionary,
  locale,
}: ProductOverviewActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((value) => Math.max(1, value - 1));
  };

  const increaseQuantity = () => {
    setQuantity((value) => value + 1);
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex gap-4 items-center justify-between flex-wrap">
        <div className="w-full sm:w-auto">
          <div className="flex w-full overflow-hidden rounded-lg border">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-none"
              aria-label={dictionary.actions.increaseQuantity}
              onClick={increaseQuantity}
            >
              <Plus />
            </Button>

            <div className="flex flex-1 items-center justify-center border-x px-4 text-sm font-medium">
              {quantity}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-none"
              aria-label={dictionary.actions.decreaseQuantity}
              onClick={decreaseQuantity}
              disabled={quantity === 1}
            >
              <Minus />
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-0">
          <Button
            type="button"
            variant="default"
            className="w-full rounded-lg px-5 py-4 sm:w-auto sm:rounded-e-none"
          >
            <ShoppingCart />
            {dictionary.actions.addToCart}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full rounded-lg px-5 py-4 sm:w-auto sm:rounded-s-none sm:rounded-e-md"
          >
            {dictionary.actions.buyItNow}
            <CreditCard />
          </Button>
        </div>
      </div>
      {/* Product Details */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div className="space-y-1">
          <div className="text-muted-foreground">
            {dictionary.actions.details.sku}
          </div>
          <div className="font-medium">{data.sku}</div>
        </div>

        <div className="space-y-1">
          <div className="text-muted-foreground">
            {dictionary.actions.details.category}
          </div>
          <div className="font-medium">{data.category[locale]}</div>
        </div>

        <div className="space-y-1">
          <div className="text-muted-foreground">
            {dictionary.actions.details.vendor}
          </div>
          <div className="font-medium">{data.vendor[locale]}</div>
        </div>

        <div className="space-y-1">
          <div className="text-muted-foreground">
            {dictionary.actions.details.warranty}
          </div>
          <div className="font-medium">{data.warranty[locale]}</div>
        </div>
      </div>
    </div>
  );
}
