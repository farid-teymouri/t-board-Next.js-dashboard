"use client";

import { useMemo, useState } from "react";

import { z } from "zod";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { formatInputNumber } from "@/utils/formatters/number";

import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { currencies, formatCurrency } from "@/utils/currency";

import type {
  InstallmentData,
  InstallmentPaymentInterval,
  PricingData,
} from "./types";

type PricingFormProps = {
  data: PricingData;
  dictionary: EcommerceEditProductDictionary["pricing"];
  locale: "fa" | "en";
};

const pricingSchema = z.object({
  price: z.number().positive(),
  discount: z.number().min(0).max(100),
  installment: z.object({
    enabled: z.boolean(),
    months: z.number().int().positive(),
    paymentInterval: z.union([z.literal(1), z.literal(3), z.literal(6)]),
    downPaymentPercent: z.number().min(0).max(100),
    interestRate: z.number().min(0),
  }),
  chargeTax: z.boolean(),
  floatingPrice: z.boolean(),
});

const installmentMonths = [6, 8, 12, 24, 36, 48, 60];

const paymentIntervals: InstallmentPaymentInterval[] = [1, 3, 6];

function normalizeDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function sanitizeNumber(value: string, allowDecimal: boolean) {
  const normalized = normalizeDigits(value).replace(/,/g, "").replace(/٬/g, "");

  if (!allowDecimal) {
    return normalized.replace(/\D/g, "");
  }

  const sanitized = normalized.replace(/[^\d.]/g, "");

  const [integerPart, ...decimalParts] = sanitized.split(".");

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalParts.join("")}`;
}

function parseNumber(value: string) {
  if (!value) {
    return 0;
  }

  const normalized = normalizeDigits(value)
    .replace(/,/g, "")
    .replace(/٬/g, "")
    .trim();

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];

const teens = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const tens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const hundreds = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

const scales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

function threeDigitToWords(value: number) {
  const parts: string[] = [];

  const hundred = Math.floor(value / 100);
  const remainder = value % 100;

  if (hundred > 0) {
    parts.push(hundreds[hundred]);
  }

  if (remainder > 0 && remainder < 10) {
    parts.push(ones[remainder]);
  } else if (remainder >= 10 && remainder < 20) {
    parts.push(teens[remainder - 10]);
  } else if (remainder >= 20) {
    parts.push(tens[Math.floor(remainder / 10)]);

    if (remainder % 10 > 0) {
      parts.push(ones[remainder % 10]);
    }
  }

  return parts.join(" و ");
}

function numberToPersianWords(value: number): string {
  if (value === 0) {
    return "صفر";
  }

  if (value < 0) {
    return `منفی ${numberToPersianWords(Math.abs(value))}`;
  }

  const parts: string[] = [];

  let remaining = Math.floor(value);
  let scaleIndex = 0;

  while (remaining > 0) {
    const group = remaining % 1000;

    if (group > 0) {
      const words = threeDigitToWords(group);
      const scale = scales[scaleIndex];

      parts.unshift(scale ? `${words} ${scale}` : words);
    }

    remaining = Math.floor(remaining / 1000);
    scaleIndex += 1;
  }

  return parts.join(" و ");
}

export function PricingForm({ data, dictionary, locale }: PricingFormProps) {
  const currency = "IRT";

  const currencyDisplay = currencies[currency][locale];

  const [price, setPrice] = useState(formatInputNumber(data.price, locale));

  const [discount, setDiscount] = useState(
    formatInputNumber(data.discount, locale),
  );

  const [installment, setInstallment] = useState<InstallmentData>({
    enabled: false,
    months: 12,
    paymentInterval: 1,
    downPaymentPercent: 50,
    interestRate: 15,
  });

  const [chargeTax, setChargeTax] = useState(data.chargeTax);

  const [floatingPrice, setFloatingPrice] = useState(data.floatingPrice);

  const priceValue = parseNumber(price);

  const discountValue = Math.min(100, parseNumber(discount));

  const salePrice = useMemo(() => {
    return priceValue * (1 - discountValue / 100);
  }, [priceValue, discountValue]);

  const availablePaymentIntervals = paymentIntervals.filter(
    (interval) => installment.months % interval === 0,
  );

  const installmentCalculation = useMemo(() => {
    const downPayment = salePrice * (installment.downPaymentPercent / 100);

    const interest = salePrice * (installment.interestRate / 100);

    const totalInstallmentPrice = salePrice + interest;

    const remainingAmount = Math.max(0, totalInstallmentPrice - downPayment);

    const paymentPeriods = installment.months / installment.paymentInterval;

    const paymentAmount =
      paymentPeriods > 0 ? remainingAmount / paymentPeriods : 0;

    /**
     * We keep the regular payment as a whole number
     * for currency display and move the rounding
     * remainder to the final payment.
     *
     * Example:
     * 5,000,000 / 24 = 208,333.333...
     *
     * 23 × 208,333 = 4,791,659
     * Last payment = 208,341
     *
     * Total = exactly 5,000,000
     */
    const basePaymentAmount =
      paymentPeriods > 0 ? Math.floor(paymentAmount) : 0;

    const lastPaymentAmount =
      paymentPeriods > 1
        ? remainingAmount - basePaymentAmount * (paymentPeriods - 1)
        : remainingAmount;

    const regularPaymentCount =
      paymentPeriods > 1 ? Math.floor(paymentPeriods) - 1 : 0;

    const hasFinalPaymentAdjustment =
      regularPaymentCount > 0 && lastPaymentAmount !== basePaymentAmount;
    return {
      downPayment,
      interest,
      totalInstallmentPrice,
      remainingAmount,
      paymentPeriods,
      paymentAmount,
      basePaymentAmount,
      regularPaymentCount,
      lastPaymentAmount,
      hasFinalPaymentAdjustment,
    };
  }, [salePrice, installment]);

  const validationResult = useMemo(() => {
    return pricingSchema.safeParse({
      price: priceValue,
      discount: discountValue,
      installment,
      chargeTax,
      floatingPrice,
    });
  }, [priceValue, discountValue, installment, chargeTax, floatingPrice]);

  const handlePriceChange = (value: string) => {
    const sanitized = sanitizeNumber(value, locale === "en");

    if (!sanitized) {
      setPrice("");
      return;
    }

    setPrice(formatInputNumber(sanitized, locale));
  };

  const handleDiscountChange = (value: string) => {
    const sanitized = sanitizeNumber(value, false);

    const numericValue = Math.min(100, parseNumber(sanitized));

    setDiscount(
      numericValue ? formatInputNumber(String(numericValue), locale) : "",
    );
  };

  const handleInstallmentChange = (
    key: keyof InstallmentData,
    value: boolean | number,
  ) => {
    setInstallment((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleMonthsChange = (value: string | null) => {
    if (value === null) {
      return;
    }

    const months = Number(value);
    const currentInterval = installment.paymentInterval;
    const isCurrentIntervalValid = months % currentInterval === 0;

    setInstallment((current) => ({
      ...current,
      months,
      paymentInterval: isCurrentIntervalValid ? current.paymentInterval : 1,
    }));
  };

  const priceWords =
    locale === "fa" && priceValue > 0
      ? `${numberToPersianWords(priceValue)} ${currencyDisplay.symbol}`
      : null;

  const currencyFormatOptions = {
    locale,
    currency,
    minimumFractionDigits: locale === "en" ? 2 : 0,
    maximumFractionDigits: locale === "en" ? 2 : 0,
  } as const;

  const formattedSalePrice = formatCurrency(salePrice, currencyFormatOptions);

  const formattedDownPayment = formatCurrency(
    installmentCalculation.downPayment,
    currencyFormatOptions,
  );

  const formattedRemainingAmount = formatCurrency(
    installmentCalculation.remainingAmount,
    currencyFormatOptions,
  );

  const formattedInterest = formatCurrency(
    installmentCalculation.interest,
    currencyFormatOptions,
  );

  const formattedTotalInstallmentPrice = formatCurrency(
    installmentCalculation.totalInstallmentPrice,
    currencyFormatOptions,
  );

  const formattedPaymentAmount = formatCurrency(
    installmentCalculation.basePaymentAmount,
    currencyFormatOptions,
  );

  const formattedLastPaymentAmount = formatCurrency(
    installmentCalculation.lastPaymentAmount,
    currencyFormatOptions,
  );

  const hasPaymentAdjustment =
    installmentCalculation.paymentPeriods > 1 &&
    installmentCalculation.lastPaymentAmount !==
      installmentCalculation.basePaymentAmount;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="product-price">
          {dictionary.price}
          <span className="text-destructive"> *</span>
        </Label>

        <div className="relative">
          <span className="absolute inset-y-0 inset-s-3 flex items-center text-sm text-muted-foreground">
            {currencyDisplay.symbol}
          </span>

          <Input
            id="product-price"
            value={price}
            onChange={(event) => handlePriceChange(event.target.value)}
            inputMode="decimal"
            className="ps-14"
            aria-invalid={priceValue <= 0}
          />
        </div>

        {priceWords && (
          <p className="text-sm text-muted-foreground">
            {dictionary.priceInWords}:
            <span className="text-chart-2 ms-1">{priceWords}</span>
          </p>
        )}

        {priceValue <= 0 && (
          <p className="text-sm text-destructive">{dictionary.invalidPrice}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-discount">{dictionary.discount}</Label>

        <div className="relative w-32">
          <Input
            id="product-discount"
            value={discount}
            onChange={(event) => handleDiscountChange(event.target.value)}
            inputMode="numeric"
            className="pe-10"
          />

          <span className="absolute inset-y-0 inset-e-3 flex items-center text-sm text-muted-foreground">
            %
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {formatInputNumber(discountValue, locale)}%{" "}
          {dictionary.discountDescription}
        </p>

        <div className="rounded-md bg-muted/50 p-3 text-sm">
          <span className="text-muted-foreground">
            {dictionary.salePrice}:{" "}
          </span>

          <span className="font-medium">{formattedSalePrice}</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">{dictionary.installment}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {dictionary.installmentDescription}
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="enable-installment"
            checked={installment.enabled}
            onCheckedChange={(checked) =>
              handleInstallmentChange("enabled", checked === true)
            }
          />

          <Label htmlFor="enable-installment" className="cursor-pointer">
            {dictionary.enableInstallment}
          </Label>
        </div>

        {installment.enabled && (
          <div className="flex flex-wrap gap-5 rounded-lg border p-4">
            <div className="space-y-2">
              <Label>{dictionary.months}</Label>

              <Select
                value={String(installment.months)}
                onValueChange={handleMonthsChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {installmentMonths.map((months) => (
                    <SelectItem key={months} value={String(months)}>
                      {formatInputNumber(months, locale)}{" "}
                      {months === 1
                        ? dictionary.month
                        : dictionary.monthsSuffix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{dictionary.paymentInterval}</Label>

              <Select
                value={String(installment.paymentInterval)}
                onValueChange={(value) => {
                  if (value === null) {
                    return;
                  }

                  handleInstallmentChange(
                    "paymentInterval",
                    Number(value) as InstallmentPaymentInterval,
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {availablePaymentIntervals.map((interval) => {
                    const labels: Record<InstallmentPaymentInterval, string> = {
                      1: dictionary.monthly,
                      3: dictionary.everyThreeMonths,
                      6: dictionary.everySixMonths,
                    };

                    return (
                      <SelectItem key={interval} value={String(interval)}>
                        {labels[interval]}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{dictionary.downPayment}</Label>

              <div className="relative w-32">
                <Input
                  value={formatInputNumber(
                    installment.downPaymentPercent,
                    locale,
                  )}
                  onChange={(event) => {
                    const value = Math.min(
                      100,
                      parseNumber(sanitizeNumber(event.target.value, false)),
                    );

                    handleInstallmentChange("downPaymentPercent", value);
                  }}
                  inputMode="numeric"
                  className="pe-10"
                />

                <span className="absolute inset-y-0 inset-e-3 flex items-center text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{dictionary.interestRate}</Label>

              <div className="relative w-32">
                <Input
                  value={formatInputNumber(installment.interestRate, locale)}
                  onChange={(event) => {
                    const value = parseNumber(
                      sanitizeNumber(event.target.value, false),
                    );

                    handleInstallmentChange("interestRate", value);
                  }}
                  inputMode="numeric"
                  className="pe-10"
                />

                <span className="absolute inset-y-0 inset-e-3 flex items-center text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 rounded-lg bg-muted/50 p-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  {dictionary.downPayment}{" "}
                  {formatInputNumber(installment.downPaymentPercent, locale)}%
                </span>

                <span className="font-medium">{formattedDownPayment}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  {dictionary.remainingAmount}
                </span>

                <span className="font-medium">{formattedRemainingAmount}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  {dictionary.interestRate}{" "}
                  {formatInputNumber(installment.interestRate, locale)}%
                </span>

                <span className="font-medium">({formattedInterest})</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">
                  {dictionary.totalInstallmentPrice}
                </span>

                <span className="font-medium">
                  {formattedTotalInstallmentPrice}
                </span>
              </div>

              <Separator />

              {installmentCalculation.hasFinalPaymentAdjustment ? (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {dictionary.regularPayment}{" "}
                      {formatInputNumber(
                        installmentCalculation.regularPaymentCount,
                        locale,
                      )}{" "}
                      {dictionary.monthsSuffix}
                    </span>

                    <span className="font-semibold">
                      {formattedPaymentAmount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      {dictionary.finalPayment}{" "}
                      {formatInputNumber(installment.paymentInterval, locale)}{" "}
                      {dictionary.monthsSuffix}
                    </span>

                    <span className="font-medium">
                      {formattedLastPaymentAmount}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">
                    {dictionary.paymentAmount}
                  </span>

                  <span className="font-semibold">
                    {formattedPaymentAmount}
                  </span>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {dictionary.installmentSummary}
              </p>
            </div>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <Checkbox
            id="charge-tax"
            checked={chargeTax}
            onCheckedChange={(checked) => setChargeTax(checked === true)}
          />

          <div className="grid gap-1">
            <Label htmlFor="charge-tax" className="cursor-pointer">
              {dictionary.chargeTax}
            </Label>

            <p className="text-sm text-muted-foreground">
              {dictionary.chargeTaxDescription}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="floating-price"
            checked={floatingPrice}
            onCheckedChange={(checked) => setFloatingPrice(checked === true)}
          />

          <div className="grid gap-1">
            <Label htmlFor="floating-price" className="cursor-pointer">
              {dictionary.floatingPrice}
            </Label>

            <p className="text-sm text-muted-foreground">
              {dictionary.floatingPriceDescription}
            </p>
          </div>
        </div>
      </div>

      {!validationResult.success && (
        <p className="text-xs text-muted-foreground">{dictionary.error}</p>
      )}
    </div>
  );
}
