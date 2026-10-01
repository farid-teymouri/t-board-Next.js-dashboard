"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/utils/currency";

import { CheckoutShippingSkeleton } from "./checkout-shipping-skeleton";
import type { CheckoutShippingMethod, CheckoutShippingProps } from "./types";

async function fetchShippingMethods(): Promise<CheckoutShippingMethod[]> {
  const response = await fetch("/api/ecommerce/checkout/shipping");

  if (!response.ok) {
    throw new Error("Failed to fetch shipping methods.");
  }

  const result: { data: CheckoutShippingMethod[] } = await response.json();

  return result.data;
}

export function CheckoutShipping({
  dictionary,
  locale,
  selectedMethod,
  onMethodChange,
  onBack,
  onContinue,
}: CheckoutShippingProps) {
  const { data: methods = [], isLoading } = useQuery({
    queryKey: ["checkout", "shipping-methods"],
    queryFn: fetchShippingMethods,
  });
  const activeMethod =
    selectedMethod || methods.find((method) => method.isDefault)?.id || "";
  if (isLoading) {
    return <CheckoutShippingSkeleton />;
  }

  return (
    <Card className="h-full">
      <CardContent className="h-full space-y-8 flex flex-col justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {dictionary.step}
          </p>

          <h2 className="text-xl font-semibold tracking-tight">
            {dictionary.title}
          </h2>
        </div>
        <RadioGroup
          value={activeMethod}
          onValueChange={onMethodChange}
          className="space-y-3"
        >
          {methods.map((method) => {
            const isSelected = activeMethod === method.id;

            return (
              <label
                key={method.id}
                htmlFor={`checkout-shipping-${method.id}`}
                className={[
                  "flex cursor-pointer flex-col gap-4 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50",
                ].join(" ")}
              >
                <div className="flex items-center gap-4 sm:contents">
                  <RadioGroupItem
                    id={`checkout-shipping-${method.id}`}
                    value={method.id}
                  />

                  <div className="flex size-10 shrink-0 items-center justify-center">
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={56}
                      height={56}
                      className="size-14 object-contain"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{method.name}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {method.description}
                      </p>
                    </div>

                    <p dir="ltr" className="shrink-0 text-sm font-semibold">
                      {formatCurrency(method.price, {
                        locale,
                        currency: method.currency,
                      })}
                    </p>
                  </div>
                </div>
              </label>
            );
          })}
        </RadioGroup>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11 w-full px-6 text-sm font-medium sm:w-fit"
          >
            <ArrowRight className="size-4" />
            {dictionary.back}
          </Button>

          <Button
            type="button"
            onClick={() => {
              const selectedShippingMethod = methods.find(
                (method) => method.id === activeMethod,
              );

              if (!selectedShippingMethod) {
                return;
              }

              onContinue(selectedShippingMethod);
            }}
            className="h-11 w-full px-6 text-sm font-medium sm:w-fit"
          >
            {dictionary.continueToPayment}
            <ArrowLeft className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
