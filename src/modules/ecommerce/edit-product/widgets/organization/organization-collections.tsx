"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { Collection, OrganizationLocale } from "./types";

type OrganizationCollectionsProps = {
  collections: Collection[];
  locale: OrganizationLocale;
  title: string;
};

function getName(item: Collection, locale: OrganizationLocale) {
  return item.name[locale];
}

export function OrganizationCollections({
  collections: initialCollections,
  locale,
  title,
}: OrganizationCollectionsProps) {
  const [collections, setCollections] =
    useState<Collection[]>(initialCollections);

  function toggleCollection(id: string) {
    setCollections((current) =>
      current.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              selected: !collection.selected,
            }
          : collection,
      ),
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>

      <div className="space-y-3">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="group flex cursor-pointer items-center gap-2"
          >
            <Checkbox
              id={`collection-${collection.id}`}
              checked={collection.selected}
              onCheckedChange={() => toggleCollection(collection.id)}
              className="border-foreground/15 group-hover:border-foreground"
            />

            <Label
              htmlFor={`collection-${collection.id}`}
              className="cursor-pointer font-normal"
            >
              {getName(collection, locale)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
