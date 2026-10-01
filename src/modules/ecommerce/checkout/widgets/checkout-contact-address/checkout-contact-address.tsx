"use client";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

import type {
  CheckoutContactAddressFormValues,
  CheckoutContactAddressProps,
} from "./types";

const createCheckoutContactAddressSchema = (
  dictionary: CheckoutContactAddressProps["dictionary"],
) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, dictionary.validation.required)
      .email(dictionary.validation.invalidEmail),

    firstName: z.string().trim().min(1, dictionary.validation.required),

    lastName: z.string().trim().min(1, dictionary.validation.required),

    address1: z.string().trim().min(1, dictionary.validation.required),

    address2: z.string().trim(),

    province: z.string().min(1, dictionary.validation.required),

    city: z.string().trim().min(1, dictionary.validation.required),

    phone: z.string().trim().min(1, dictionary.validation.required),

    postcode: z.string().trim().min(1, dictionary.validation.required),

    companyName: z.string().trim(),

    additionalInformation: z.string().trim(),
  });

const EMPTY_DEFAULTS: CheckoutContactAddressFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  province: "",
  city: "",
  phone: "",
  postcode: "",
  companyName: "",
  additionalInformation: "",
};

export function CheckoutContactAddress({
  dictionary,
  locale,
  defaultValues,
  onValuesChange,
  onContinue,
}: CheckoutContactAddressProps) {
  const checkoutContactAddressSchema =
    createCheckoutContactAddressSchema(dictionary);
  const [provinceOpen, setProvinceOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutContactAddressFormValues>({
    resolver: zodResolver(checkoutContactAddressSchema),
    defaultValues: defaultValues ?? EMPTY_DEFAULTS,
  });

  useEffect(() => {
    if (!triggerRef.current) return;

    const updateWidth = () => {
      setTriggerWidth(triggerRef.current?.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, []);

  const selectedProvince = watch("province");
  const formValues = watch();

  // Persist every change (debounced) so refresh / step navigation keeps data
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!onValuesChange) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onValuesChange(formValues);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [formValues, onValuesChange]);

  const onSubmit = (data: CheckoutContactAddressFormValues) => {
    onContinue(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {dictionary.step}
            </p>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                {dictionary.title}
              </h2>

              <p className="text-sm text-muted-foreground">
                {dictionary.description}
              </p>
            </div>
          </div>

          <section className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h3 className="text-base font-semibold">
                {dictionary.contactInformation}
              </h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{dictionary.alreadyHaveAccount}</span>

                <Button type="button" variant="link" className="h-auto p-0">
                  {dictionary.login}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-email">
                {dictionary.email}
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <div className="grid gap-4 xl:grid-cols-2 grid-cols-1">
                <div className="space-y-1">
                  <Input
                    id="checkout-email"
                    type="email"
                    placeholder={dictionary.emailPlaceholder}
                    autoComplete="email"
                    className="h-11 w-full"
                    dir="ltr"
                    {...register("email")}
                  />

                  {errors.email && (
                    <p className="text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground">
                    {dictionary.emailDescription}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-semibold">
                {dictionary.shippingAddress}
              </h3>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="checkout-first-name">
                  {dictionary.firstName}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="checkout-first-name"
                  className="h-11"
                  placeholder={dictionary.firstNamePlaceholder}
                  {...register("firstName")}
                />

                {errors.firstName && (
                  <p className="text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkout-last-name">
                  {dictionary.lastName}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="checkout-last-name"
                  className="h-11"
                  placeholder={dictionary.lastNamePlaceholder}
                  {...register("lastName")}
                />

                {errors.lastName && (
                  <p className="text-xs text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-address-1">
                {dictionary.address1}
                <span className="ml-1 text-destructive">*</span>
              </Label>

              <Input
                id="checkout-address-1"
                className="h-11"
                placeholder={dictionary.address1Placeholder}
                {...register("address1")}
              />

              {errors.address1 && (
                <p className="text-xs text-destructive">
                  {errors.address1.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-address-2">{dictionary.address2}</Label>

              <Input
                id="checkout-address-2"
                className="h-11"
                placeholder={dictionary.address2Placeholder}
                {...register("address2")}
              />

              {errors.address2 && (
                <p className="text-xs text-destructive">
                  {errors.address2.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 xl:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="checkout-province">
                  {dictionary.province}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Popover open={provinceOpen} onOpenChange={setProvinceOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        ref={triggerRef}
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={provinceOpen}
                        className="h-11! w-full justify-between font-normal"
                      >
                        {selectedProvince
                          ? dictionary.provinces.find(
                              (province) => province.value === selectedProvince,
                            )?.label
                          : dictionary.provincePlaceholder}

                        <ChevronsUpDown className="size-4 opacity-50" />
                      </Button>
                    }
                  />

                  <PopoverPositioner>
                    <PopoverContent
                      className="p-0"
                      style={triggerWidth ? { width: triggerWidth } : undefined}
                    >
                      <Command>
                        <CommandInput
                          placeholder={dictionary.provinceSearchPlaceholder}
                        />

                        <CommandList>
                          <CommandEmpty>
                            {dictionary.provinceNotFound}
                          </CommandEmpty>

                          <CommandGroup>
                            {dictionary.provinces.map((province) => (
                              <CommandItem
                                key={province.value}
                                value={province.label}
                                onSelect={() => {
                                  setValue("province", province.value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  });
                                  setProvinceOpen(false);
                                }}
                              >
                                {province.label}

                                <Check
                                  className={[
                                    "ml-auto size-4",
                                    selectedProvince === province.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  ].join(" ")}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </PopoverPositioner>
                </Popover>

                {errors.province && (
                  <p className="text-xs text-destructive">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkout-city">
                  {dictionary.city}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="checkout-city"
                  className="h-11"
                  placeholder={dictionary.cityPlaceholder}
                  {...register("city")}
                />

                {errors.city && (
                  <p className="text-xs text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="checkout-phone">
                  {dictionary.phone}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="checkout-phone"
                  type="tel"
                  autoComplete="tel"
                  className="h-11"
                  placeholder={dictionary.phonePlaceholder}
                  {...register("phone")}
                />

                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkout-postcode">
                  {dictionary.postcode}
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <Input
                  id="checkout-postcode"
                  inputMode="numeric"
                  className="h-11"
                  placeholder={dictionary.postcodePlaceholder}
                  {...register("postcode")}
                />

                {errors.postcode && (
                  <p className="text-xs text-destructive">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="checkout-company-name">
                  {dictionary.companyName}
                </Label>

                <Input
                  id="checkout-company-name"
                  className="h-11"
                  placeholder={dictionary.companyNamePlaceholder}
                  {...register("companyName")}
                />

                {errors.companyName && (
                  <p className="text-xs text-destructive">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-additional-information">
                {dictionary.additionalInformation}
              </Label>

              <Textarea
                id="checkout-additional-information"
                placeholder={dictionary.additionalInformationPlaceholder}
                className="min-h-28"
                {...register("additionalInformation")}
              />

              {errors.additionalInformation && (
                <p className="text-xs text-destructive">
                  {errors.additionalInformation.message}
                </p>
              )}
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="h-11 w-full px-6 text-sm font-medium sm:w-fit"
              >
                {dictionary.continueToShipping}

                {locale === "fa" ? (
                  <ArrowLeft className="size-4" />
                ) : (
                  <ArrowRight className="size-4" />
                )}
              </Button>
            </div>
          </section>
        </CardContent>
      </Card>
    </form>
  );
}
