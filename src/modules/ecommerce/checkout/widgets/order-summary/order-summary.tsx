"use client";

import { useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { formatCurrency } from "@/utils/currency";

import { OrderSummarySkeleton } from "./order-summary-skeleton";

import type { OrderSummaryData, OrderSummaryProps } from "./types";

async function fetchOrderSummary(): Promise<OrderSummaryData> {
  const response = await fetch("/api/ecommerce/checkout/order-summary");

  if (!response.ok) {
    throw new Error("Failed to fetch order summary.");
  }

  const result: { data: OrderSummaryData } = await response.json();

  return result.data;
}

export function OrderSummary({ dictionary, locale }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["checkout", "order-summary"],
    queryFn: fetchOrderSummary,
  });

  if (isLoading) {
    return <OrderSummarySkeleton />;
  }

  if (!data) {
    return null;
  }

  const { products, summary } = data;

  const tax = Math.max(summary.total - summary.subtotal - summary.shipping, 0);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          {dictionary.title}
        </h2>

        <Badge variant="secondary" className="rounded-full px-3">
          {products.reduce((total, product) => total + product.quantity, 0)}{" "}
          {dictionary.items}
        </Badge>
      </div>

      {/* Products */}
      <div className="mt-6 space-y-5">
        {products.map((product) => (
          <div key={product.id} className="flex items-start gap-3">
            {/* Image + Quantity */}
            <div className="relative size-[60px] shrink-0">
              <div className="relative size-full overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={product.image}
                  alt={product.name[locale]}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>

              <Badge
                variant="default"
                className="absolute -right-2 -top-2 size-5 rounded-full border p-0 text-[10px] font-semibold"
              >
                {product.quantity}
              </Badge>
            </div>

            {/* Product Info */}
            <div
              dir={locale === "fa" ? "rtl" : "ltr"}
              className="min-w-0 flex-1"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {product.name[locale]}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.color[locale]} · {product.size[locale]}
                  </p>
                </div>

                <p dir="ltr" className="shrink-0 text-sm font-semibold">
                  {formatCurrency(product.price, {
                    locale,
                    currency: product.currency,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      <div className="mt-6">
        <div className="flex h-11 items-center rounded-md border bg-background shadow-chart-2">
          <Input
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder={dictionary.promoCodePlaceholder}
            className="h-full flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!promoCode.trim()}
            className="me-1 h-9 shrink-0 px-4"
          >
            {dictionary.apply}
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 space-y-4">
        <Separator />

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{dictionary.subtotal}</span>

          <span dir="ltr" className="font-medium">
            {formatCurrency(summary.subtotal, {
              locale,
              currency: summary.currency,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{dictionary.shipping}</span>

          <span dir="ltr" className="font-medium">
            {summary.shipping === 0
              ? dictionary.free
              : formatCurrency(summary.shipping, {
                  locale,
                  currency: summary.currency,
                })}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">{dictionary.tax}</span>

          <span dir="ltr" className="font-medium">
            {formatCurrency(tax, {
              locale,
              currency: summary.currency,
            })}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold">{dictionary.total}</span>

          <span dir="ltr" className="text-lg font-bold tracking-tight">
            {formatCurrency(summary.total, {
              locale,
              currency: summary.currency,
            })}
          </span>
        </div>
      </div>

      {/* Refund Guarantee */}
      <div className="mt-6 flex flex-row items-center justify-center gap-2 text-center text-chart-3">
        <ShieldCheck className="size-5 " />

        <p className="max-w-xs text-xs leading-5 ">
          {dictionary.refundGuarantee}
        </p>
      </div>
    </div>
  );
}
