"use client";

import { Headphones, RotateCcw, Truck } from "lucide-react";

import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

import { Card, CardContent } from "@/components/ui/card";

import { useProductServiceFeatures } from "../../hooks/use-product-service-features";
import { ProductServiceFeaturesSkeleton } from "./product-service-features-skeleton";

import type { ProductServiceFeature } from "./types";

type ProductServiceFeaturesProps = {
  dictionary: EcommerceProductDetailsDictionary["serviceFeatures"];
  locale: "fa" | "en";
};

const featureStyles = {
  support: {
    container: "bg-chart-2/15",
    icon: "text-chart-2",
  },
  returns: {
    container: "bg-chart-4/15",
    icon: "text-chart-4",
  },
  shipping: {
    container: "bg-chart-5/15",
    icon: "text-chart-5",
  },
} as const;

const iconMap = {
  support: Headphones,
  returns: RotateCcw,
  shipping: Truck,
} as const;

export function ProductServiceFeatures({
  dictionary,
  locale,
}: ProductServiceFeaturesProps) {
  const { data, isLoading, isError } = useProductServiceFeatures();

  if (isLoading) {
    return <ProductServiceFeaturesSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="flex min-h-32 items-center justify-center text-sm text-destructive">
          {dictionary.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-wrap gap-6 ">
        {data.features.map((feature) => (
          <ProductServiceFeatureItem
            key={feature.id}
            feature={feature}
            locale={locale}
          />
        ))}
      </CardContent>
    </Card>
  );
}

type ProductServiceFeatureItemProps = {
  feature: ProductServiceFeature;
  locale: "fa" | "en";
};

function ProductServiceFeatureItem({
  feature,
  locale,
}: ProductServiceFeatureItemProps) {
  const Icon = iconMap[feature.icon];

  return (
    <div className="flex items-start gap-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${featureStyles[feature.icon].container}`}
      >
        <Icon className={`size-5 ${featureStyles[feature.icon].icon}`} />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium">{feature.title[locale]}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {feature.description[locale]}
        </p>
      </div>
    </div>
  );
}
