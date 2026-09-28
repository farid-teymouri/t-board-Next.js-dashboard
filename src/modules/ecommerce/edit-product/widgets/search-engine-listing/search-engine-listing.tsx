"use client";

import { useState } from "react";

import { Globe } from "lucide-react";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSearchEngineListing } from "../../hooks/use-search-engine-listing";

import { SearchEngineListingForm } from "./search-engine-listing-form";
import { SearchEngineListingSkeleton } from "./search-engine-listing-skeleton";

type SearchEngineListingProps = {
  dictionary: EcommerceEditProductDictionary["searchEngineListing"];
  locale: "fa" | "en";
};

export function SearchEngineListing({
  dictionary,
  locale,
}: SearchEngineListingProps) {
  const { data, isLoading } = useSearchEngineListing(locale);

  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  if (isLoading || !data) {
    return <SearchEngineListingSkeleton />;
  }

  const currentPageTitle = pageTitle || data.pageTitle;
  const currentMetaDescription = metaDescription || data.metaDescription;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="rounded-lg border p-5 bg-muted">
          <div className="flex items-start gap-3">
            <Globe className="mt-1 size-5 shrink-0 bg-chart-3/10 w-8 h-8 py-2 rounded-full text-chart-3" />

            <div className="min-w-0 space-y-2">
              <div className="text-sm">
                <span>{dictionary.websiteName}</span>
              </div>

              <div className="text-muted-foreground text-xs">
                {data.breadcrumbs.domain} › {data.breadcrumbs.category} ›{" "}
                {data.breadcrumbs.slug}
              </div>

              <div className="text-xl font-medium text-chart-2">
                {currentPageTitle}
              </div>

              <p className="text-muted-foreground text-sm leading-6">
                {currentMetaDescription}
              </p>
            </div>
          </div>
        </div>

        <SearchEngineListingForm
          dictionary={dictionary}
          pageTitle={currentPageTitle}
          metaDescription={currentMetaDescription}
          onPageTitleChange={setPageTitle}
          onMetaDescriptionChange={setMetaDescription}
        />
      </CardContent>
    </Card>
  );
}
