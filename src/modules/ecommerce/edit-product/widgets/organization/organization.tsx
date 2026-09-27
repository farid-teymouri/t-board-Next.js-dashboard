"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useOrganization } from "../../hooks/use-organization";

import { OrganizationCollections } from "./organization-collections";
import { OrganizationForm } from "./organization-form";
import { OrganizationSkeleton } from "./organization-skeleton";
import { OrganizationTags } from "./organization-tags";

type OrganizationProps = {
  dictionary: EcommerceEditProductDictionary["organization"];
  locale: "fa" | "en";
};

export function Organization({ dictionary, locale }: OrganizationProps) {
  const { data, isLoading, isError } = useOrganization();

  if (isLoading) {
    return <OrganizationSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          {dictionary.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <OrganizationForm
          data={data}
          locale={locale}
          dictionary={dictionary.form}
        />

        <OrganizationCollections
          collections={data.collections}
          locale={locale}
          title={dictionary.collections.title}
        />

        <OrganizationTags
          availableTags={data.availableTags}
          selectedTagIds={data.selectedTagIds}
          locale={locale}
          title={dictionary.tags.title}
          placeholder={dictionary.tags.placeholder}
        />
      </CardContent>
    </Card>
  );
}
