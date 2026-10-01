"use client";

import { useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CheckoutPaymentSkeleton } from "./checkout-payment-skeleton";

import type {
  CheckoutPaymentMethod,
  CheckoutPaymentProps,
  CheckoutPaymentType,
} from "./types";

type CheckoutPaymentResponse = {
  types: CheckoutPaymentType[];
  methods: CheckoutPaymentMethod[];
};

async function fetchPaymentMethods(): Promise<CheckoutPaymentResponse> {
  const response = await fetch("/api/ecommerce/checkout/payment");

  if (!response.ok) {
    throw new Error("Failed to fetch payment methods.");
  }

  const result: { data: CheckoutPaymentResponse } = await response.json();

  return result.data;
}

export function CheckoutPayment({
  dictionary,
  selectedMethod,
  onMethodChange,
  onBack,
  onContinue,
}: CheckoutPaymentProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["checkout", "payment-methods"],
    queryFn: fetchPaymentMethods,
  });

  const [selectedPaymentType, setSelectedPaymentType] = useState<
    CheckoutPaymentType["id"] | ""
  >("");

  if (isLoading) {
    return <CheckoutPaymentSkeleton />;
  }

  const paymentTypes = data?.types ?? [];
  const paymentMethods = data?.methods ?? [];

  const activePaymentType =
    selectedPaymentType ||
    paymentTypes.find((type) => type.isDefault)?.id ||
    "";

  const activeMethod =
    selectedMethod ||
    paymentMethods.find((method) => method.isDefault)?.id ||
    "";

  const handlePaymentTypeChange = (paymentType: CheckoutPaymentType["id"]) => {
    setSelectedPaymentType(paymentType);

    if (paymentType === "bank-transfer") {
      onMethodChange("");
    }
  };

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

          <p className="text-sm text-muted-foreground">
            {dictionary.description}
          </p>
        </div>

        <RadioGroup
          value={activePaymentType}
          onValueChange={handlePaymentTypeChange}
          className="space-y-3"
        >
          {paymentTypes.map((type) => {
            const isActive = activePaymentType === type.id;

            return (
              <div
                key={type.id}
                className={[
                  "rounded-lg border p-4 transition-colors",
                  isActive ? "border-primary/50" : "",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    id={`checkout-payment-type-${type.id}`}
                    value={type.id}
                    className="mt-0.5"
                  />

                  <label
                    htmlFor={`checkout-payment-type-${type.id}`}
                    className="min-w-0 flex-1 cursor-pointer"
                  >
                    <p className="text-sm font-medium">{type.name}</p>

                    {type.description && (
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {type.description}
                      </p>
                    )}
                  </label>
                </div>

                {type.id === "online" && isActive && (
                  <div className="mt-4 flex flex-wrap gap-3 ps-7">
                    {paymentMethods.map((method) => {
                      const isSelected = activeMethod === method.id;

                      return (
                        <Button
                          key={method.id}
                          type="button"
                          variant="outline"
                          onClick={() => onMethodChange(method.id)}
                          className={[
                            "h-auto min-h-11 gap-3 px-4 flex flex-col",
                            isSelected ? "ring-2 ring-black ring-offset-2" : "",
                          ].join(" ")}
                        >
                          <div className="flex size-16 shrink-0 items-center justify-center">
                            <Image
                              src={method.logo}
                              alt={method.name}
                              width={64}
                              height={64}
                              className="size-16 object-contain"
                            />
                          </div>

                          <span>{method.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
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
            onClick={onContinue}
            className="h-11 w-full px-6 text-sm font-medium sm:w-fit"
          >
            {dictionary.continueToReview}
            <ArrowLeft className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
