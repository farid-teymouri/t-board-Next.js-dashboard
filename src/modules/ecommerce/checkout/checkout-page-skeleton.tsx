import {
  CheckoutContactAddressSkeleton,
  CheckoutPaymentSkeleton,
  CheckoutReviewSkeleton,
  CheckoutShippingSkeleton,
  CheckoutStepperSkeleton,
  OrderSummarySkeleton,
} from "./widgets";

const CHECKOUT_STORAGE_KEY = "t-board-checkout";

function getStoredStep(): number {
  if (typeof window === "undefined") {
    return 1;
  }

  try {
    const stored = localStorage.getItem(CHECKOUT_STORAGE_KEY);

    if (!stored) {
      return 1;
    }

    const parsed = JSON.parse(stored) as {
      currentStep?: number;
    };

    return typeof parsed.currentStep === "number" ? parsed.currentStep : 1;
  } catch {
    return 1;
  }
}

export function CheckoutPageSkeleton() {
  const currentStep = getStoredStep();

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4 xl:grid-cols-3">
        <section className="col-span-1 lg:col-span-4 xl:col-span-3">
          <CheckoutStepperSkeleton />
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-2">
          {currentStep === 1 && <CheckoutContactAddressSkeleton />}
          {currentStep === 2 && <CheckoutShippingSkeleton />}
          {currentStep === 3 && <CheckoutPaymentSkeleton />}
          {currentStep === 4 && <CheckoutReviewSkeleton />}
        </section>

        <section className="col-span-1 lg:col-span-2 xl:col-span-1">
          <OrderSummarySkeleton />
        </section>
      </div>
    </div>
  );
}
