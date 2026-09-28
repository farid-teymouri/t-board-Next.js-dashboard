"use client";

import { useState } from "react";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SearchEngineListingFormProps = {
  dictionary: EcommerceEditProductDictionary["searchEngineListing"];
  pageTitle: string;
  metaDescription: string;
  onPageTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
};

export function SearchEngineListingForm({
  dictionary,
  pageTitle,
  metaDescription,
  onPageTitleChange,
  onMetaDescriptionChange,
}: SearchEngineListingFormProps) {
  const pageTitleLimit = 70;
  const metaDescriptionLimit = 160;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="page-title">{dictionary.pageTitle}</Label>

        <Input
          id="page-title"
          maxLength={pageTitleLimit}
          value={pageTitle}
          onChange={(event) => onPageTitleChange(event.target.value)}
        />

        <p className="text-muted-foreground text-xs">
          {dictionary.characters
            .replace("{count}", String(pageTitle.length))
            .replace("{max}", String(pageTitleLimit))}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meta-description">{dictionary.metaDescription}</Label>

        <Textarea
          id="meta-description"
          maxLength={metaDescriptionLimit}
          value={metaDescription}
          onChange={(event) => onMetaDescriptionChange(event.target.value)}
        />

        <p className="text-muted-foreground text-xs">
          {dictionary.characters
            .replace("{count}", String(metaDescription.length))
            .replace("{max}", String(metaDescriptionLimit))}
        </p>
      </div>
    </div>
  );
}
