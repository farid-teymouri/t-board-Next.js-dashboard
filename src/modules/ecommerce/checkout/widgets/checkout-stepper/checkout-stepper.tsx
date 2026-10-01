"use client";

import { Badge } from "@/components/ui/badge";

import type { CheckoutStepperProps } from "./types";

export function CheckoutStepper({
  dictionary,
  currentStep,
}: CheckoutStepperProps) {
  const steps = [
    {
      id: 1,
      title: dictionary.steps.contactAddress,
    },
    {
      id: 2,
      title: dictionary.steps.shipping,
    },
    {
      id: 3,
      title: dictionary.steps.payment,
    },
    {
      id: 4,
      title: dictionary.steps.review,
    },
  ];

  return (
    <div className="mt-6 w-full">
      {/* Mobile / Tablet */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:hidden">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative flex min-w-0 flex-col items-center"
            >
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={[
                    "absolute start-1/2 top-4 h-px w-full",
                    isCompleted ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              )}

              {/* Step Number */}
              <span
                className={[
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background text-xs font-medium transition-colors sm:size-9 sm:text-sm",
                  isCompleted || isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                ].join(" ")}
              >
                {step.id}
              </span>

              {/* Status */}
              {(isCompleted || isCurrent) && (
                <Badge
                  variant="outline"
                  className={[
                    "mt-2 h-5 px-1.5 text-[10px] sm:text-xs",
                    isCompleted
                      ? "border-transparent bg-chart-3/10 text-chart-3"
                      : "border-transparent bg-chart-1/10 text-chart-1",
                  ].join(" ")}
                >
                  {isCompleted
                    ? dictionary.status.complete
                    : dictionary.status.inProgress}
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden items-center lg:flex">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex items-start gap-3">
                <span
                  className={[
                    "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                    isCompleted || isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground",
                  ].join(" ")}
                >
                  {step.id}
                </span>

                <div className="flex flex-col items-start gap-2">
                  <span
                    className={[
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {step.title}
                  </span>

                  {(isCompleted || isCurrent) && (
                    <Badge
                      variant="outline"
                      className={
                        isCompleted
                          ? "border-transparent bg-chart-3/10 text-chart-3"
                          : "border-transparent bg-chart-1/10 text-chart-1"
                      }
                    >
                      {isCompleted
                        ? dictionary.status.complete
                        : dictionary.status.inProgress}
                    </Badge>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={[
                    "mx-4 h-px flex-1",
                    isCompleted ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
