"use client";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Card, CardContent } from "@/components/ui/card";

import { useEditProduct } from "../../hooks/use-basic-information";

import { BasicInformationForm } from "./basic-information-form";
import { BasicInformationSkeleton } from "./basic-information-skeleton";

import type { ContentEditorDictionary } from "@/components/ui/content-editor/dictionary";

type BasicInformationProps = {
  dictionary: EcommerceEditProductDictionary["basicInformation"];
  contentEditorDictionary: ContentEditorDictionary;
  locale: "fa" | "en";
};
export function BasicInformation({
  dictionary,
  contentEditorDictionary,
  locale,
}: BasicInformationProps) {
  const { data, isLoading, isError } = useEditProduct(locale);

  if (isLoading) {
    return <BasicInformationSkeleton />;
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center text-sm text-destructive">
          {dictionary.error}
        </CardContent>
      </Card>
    );
  }

  return (
    <BasicInformationForm
      dictionary={dictionary}
      contentEditorDictionary={contentEditorDictionary}
      initialData={data.basicInformation}
    />
  );
}
