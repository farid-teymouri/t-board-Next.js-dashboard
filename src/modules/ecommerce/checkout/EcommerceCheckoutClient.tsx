"use client";

import type { EcommerceCheckoutDictionary } from "@/i18n/dictionaries";
import type { CheckoutContactAddressFormValues } from "./widgets/checkout-contact-address/types";
import { useSyncExternalStore } from "react";
import {
  CheckoutContactAddress,
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
  CheckoutStepper,
  OrderSummary,
} from "./widgets";
import { CheckoutPageSkeleton } from "./checkout-page-skeleton";
type CheckoutShippingData = {
  id: string;
  name: string;
  description: string;
  price?: number;
  currency?: string;
};

type CheckoutStorage = {
  currentStep: number;
  shippingMethodId: string;
  paymentMethodId: string;
  contactAddress: CheckoutContactAddressFormValues;
  shippingMethod?: CheckoutShippingData;
};

type EcommerceCheckoutClientProps = {
  dictionary: EcommerceCheckoutDictionary;
  locale: "fa" | "en";
};

const CHECKOUT_STORAGE_KEY = "t-board-checkout";

const DEFAULT_CHECKOUT_STATE: CheckoutStorage = {
  currentStep: 1,
  shippingMethodId: "",
  paymentMethodId: "",
  shippingMethod: undefined,
  contactAddress: {
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
  },
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readCheckoutState(): CheckoutStorage {
  if (typeof window === "undefined") {
    return DEFAULT_CHECKOUT_STATE;
  }

  const stored = localStorage.getItem(CHECKOUT_STORAGE_KEY);

  if (!stored) {
    return DEFAULT_CHECKOUT_STATE;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<CheckoutStorage>;

    const contact: Record<string, unknown> = isObject(parsed.contactAddress)
      ? parsed.contactAddress
      : {};

    return {
      currentStep:
        typeof parsed.currentStep === "number" ? parsed.currentStep : 1,
      shippingMethodId:
        typeof parsed.shippingMethodId === "string"
          ? parsed.shippingMethodId
          : "",
      paymentMethodId:
        typeof parsed.paymentMethodId === "string"
          ? parsed.paymentMethodId
          : "",
      shippingMethod: isObject(parsed.shippingMethod)
        ? {
            id:
              typeof parsed.shippingMethod.id === "string"
                ? parsed.shippingMethod.id
                : "",
            name:
              typeof parsed.shippingMethod.name === "string"
                ? parsed.shippingMethod.name
                : "",
            description:
              typeof parsed.shippingMethod.description === "string"
                ? parsed.shippingMethod.description
                : "",
            price:
              typeof parsed.shippingMethod.price === "number"
                ? parsed.shippingMethod.price
                : undefined,
            currency:
              typeof parsed.shippingMethod.currency === "string"
                ? parsed.shippingMethod.currency
                : undefined,
          }
        : undefined,
      contactAddress: {
        email: typeof contact.email === "string" ? contact.email : "",
        firstName:
          typeof contact.firstName === "string" ? contact.firstName : "",
        lastName: typeof contact.lastName === "string" ? contact.lastName : "",
        address1: typeof contact.address1 === "string" ? contact.address1 : "",
        address2: typeof contact.address2 === "string" ? contact.address2 : "",
        province: typeof contact.province === "string" ? contact.province : "",
        city: typeof contact.city === "string" ? contact.city : "",
        phone: typeof contact.phone === "string" ? contact.phone : "",
        postcode: typeof contact.postcode === "string" ? contact.postcode : "",
        companyName:
          typeof contact.companyName === "string" ? contact.companyName : "",
        additionalInformation:
          typeof contact.additionalInformation === "string"
            ? contact.additionalInformation
            : "",
      },
    };
  } catch {
    return DEFAULT_CHECKOUT_STATE;
  }
}

let currentCheckoutState = readCheckoutState();

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return currentCheckoutState;
}

// Because this component is loaded with ssr: false, getServerSnapshot
// also runs on the client — so we can safely read localStorage here.
function getServerSnapshot() {
  return DEFAULT_CHECKOUT_STATE;
}
function updateCheckoutState(updates: Partial<CheckoutStorage>) {
  currentCheckoutState = {
    ...currentCheckoutState,
    ...updates,
  };

  localStorage.setItem(
    CHECKOUT_STORAGE_KEY,
    JSON.stringify(currentCheckoutState),
  );

  listeners.forEach((listener) => {
    listener();
  });
}

export function EcommerceCheckoutClient({
  dictionary,
  locale,
}: EcommerceCheckoutClientProps) {
  const checkout = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <CheckoutStepper
            dictionary={dictionary.checkout.stepper}
            locale={locale}
            currentStep={checkout.currentStep}
          />
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-2">
          {checkout.currentStep === 1 && (
            <CheckoutContactAddress
              dictionary={dictionary.checkout.contactAddress}
              locale={locale}
              defaultValues={checkout.contactAddress}
              onValuesChange={(data) =>
                updateCheckoutState({
                  contactAddress: data,
                })
              }
              onContinue={(data) =>
                updateCheckoutState({
                  contactAddress: data,
                  currentStep: 2,
                })
              }
            />
          )}

          {checkout.currentStep === 2 && (
            <CheckoutShipping
              dictionary={dictionary.checkout.shipping}
              locale={locale}
              selectedMethod={checkout.shippingMethodId}
              onMethodChange={(methodId) =>
                updateCheckoutState({
                  shippingMethodId: methodId,
                })
              }
              onBack={() =>
                updateCheckoutState({
                  currentStep: 1,
                })
              }
              onContinue={(data) =>
                updateCheckoutState({
                  shippingMethod: data,
                  shippingMethodId: data.id,
                  currentStep: 3,
                })
              }
            />
          )}

          {checkout.currentStep === 3 && (
            <CheckoutPayment
              dictionary={dictionary.checkout.payment}
              locale={locale}
              selectedMethod={checkout.paymentMethodId}
              onMethodChange={(methodId) =>
                updateCheckoutState({
                  paymentMethodId: methodId,
                })
              }
              onBack={() =>
                updateCheckoutState({
                  currentStep: 2,
                })
              }
              onContinue={() =>
                updateCheckoutState({
                  currentStep: 4,
                })
              }
            />
          )}

          {checkout.currentStep === 4 && (
            <CheckoutReview
              dictionary={dictionary.checkout.review}
              locale={locale}
              onBack={() =>
                updateCheckoutState({
                  currentStep: 3,
                })
              }
            />
          )}
        </section>
        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          <OrderSummary dictionary={dictionary.orderSummary} locale={locale} />
        </section>
      </div>
    </div>
  );
}
