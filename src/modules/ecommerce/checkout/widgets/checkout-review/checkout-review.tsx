"use client";

import { useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "@/utils/currency";

import { CheckoutReviewSkeleton } from "./checkout-review-skeleton";

import type { CheckoutReviewData, CheckoutReviewProps } from "./types";

import { toast } from "@/components/ui/toast";

async function fetchCheckoutReview(): Promise<CheckoutReviewData> {
  const response = await fetch("/api/ecommerce/checkout/review");

  if (!response.ok) {
    throw new Error("Failed to fetch checkout review.");
  }

  const result: { data: CheckoutReviewData } = await response.json();

  return result.data;
}

export function CheckoutReview({
  dictionary,
  locale,
  onBack,
}: CheckoutReviewProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["checkout", "review"],
    queryFn: fetchCheckoutReview,
  });

  if (isLoading) {
    return <CheckoutReviewSkeleton />;
  }

  if (!data) {
    return null;
  }

  const { contact, shippingAddress, shipping, payment, products, summary } =
    data;

  return (
    <Card>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {dictionary.step}
          </p>

          <h2 className="text-xl font-semibold tracking-tight">
            {dictionary.title}
          </h2>

          <div className="flex items-start gap-2 text-sm text-amber-500">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <p>{dictionary.description}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <h3 className="text-sm text-muted-foreground">
                {dictionary.contact}
              </h3>

              <div className="space-y-2 text-sm">
                <p className="space-x-1.5">
                  <span className="text-muted-foreground">
                    {dictionary.email}:
                  </span>

                  <span dir="ltr">{contact.email}</span>
                </p>

                <p className="space-x-1.5">
                  <span className="text-muted-foreground">
                    {dictionary.phone}:
                  </span>

                  <span dir="ltr">{contact.phone}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <h3 className="text-sm text-muted-foreground">
                {dictionary.shipToAddress}
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>

                <p>
                  <span className="text-muted-foreground">
                    {dictionary.address}:
                  </span>{" "}
                  {shippingAddress.address1}
                  {shippingAddress.address2 && ` - ${shippingAddress.address2}`}
                </p>

                <p>
                  <span className="text-muted-foreground">
                    {dictionary.province}:
                  </span>{" "}
                  {shippingAddress.province}
                </p>

                <p>
                  <span className="text-muted-foreground">
                    {dictionary.city}:
                  </span>{" "}
                  {shippingAddress.city}
                </p>

                <p>
                  <span className="text-muted-foreground">
                    {dictionary.postcode}:
                  </span>{" "}
                  {shippingAddress.postcode}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <h3 className="text-sm font-semibold">{dictionary.shipping}</h3>

              <div className="space-y-1 text-sm">
                <p className="font-medium">{shipping.name}</p>
                <p className="text-muted-foreground">{shipping.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="py-2!">
            <CardContent className="space-y-2 px-4">
              <h3 className="text-sm font-semibold">
                {dictionary.paymentMethod}
              </h3>

              <div className="space-y-1 text-sm">
                <p className="font-medium">{payment.typeName}</p>

                {payment.methodName && (
                  <p className="text-muted-foreground">{payment.methodName}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-6">
          <h3 className="text-sm font-semibold">{dictionary.products}</h3>

          <div className="space-y-6 divide-y">
            {products.map((product) => {
              const productName = product.name[locale];
              const productDescription = product.description[locale];

              const details = [
                product.size?.[locale],
                product.color?.[locale],
              ].filter(Boolean);

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 space-y-4"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
                    <Image
                      src={product.image}
                      alt={productName}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 space-y-2">
                        <h4 className="font-medium">{productName}</h4>

                        <p className="text-sm text-muted-foreground">
                          {productDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                          {details.map((detail, index) => (
                            <span key={detail}>
                              {index > 0 && " / "}
                              {detail}
                            </span>
                          ))}

                          {details.length > 0 && " - "}

                          <span>
                            {product.quantity} {dictionary.item}
                          </span>
                        </div>
                      </div>

                      <p dir="ltr" className="shrink-0 text-sm font-semibold">
                        {formatCurrency(product.price, {
                          locale,
                          currency: product.currency,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border p-4">
          <Checkbox
            id="checkout-terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />

          <span className="text-sm leading-5">{dictionary.terms}</span>
        </label>

        <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
          <Button
            type="button"
            variant="outline"
            className="h-11 text-sm font-medium sm:w-fit w-full"
            onClick={onBack}
          >
            {locale === "fa" ? (
              <ArrowRight className="size-4" />
            ) : (
              <ArrowLeft className="size-4" />
            )}

            <span>{dictionary.backToPayment}</span>
          </Button>

          <Button
            type="button"
            className="h-11 text-sm font-medium sm:w-fit w-full"
            onClick={() => {
              if (!termsAccepted) {
                toast.add({
                  type: "error",
                  description: dictionary.termsError,
                  priority: "high",
                });

                return;
              }
            }}
          >
            <span>{dictionary.placeOrder}</span>

            <span>
              {formatCurrency(summary.total, {
                locale,
                currency: summary.currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
