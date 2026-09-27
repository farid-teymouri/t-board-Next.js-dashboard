"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { OrganizationLocale, Tag } from "./types";

type OrganizationTagsProps = {
  availableTags: Tag[];
  selectedTagIds: string[];
  locale: OrganizationLocale;
  title: string;
  placeholder: string;
};

function getName(tag: Tag, locale: OrganizationLocale) {
  return tag.name[locale];
}

export function OrganizationTags({
  availableTags,
  selectedTagIds: initialSelectedTagIds,
  locale,
  title,
  placeholder,
}: OrganizationTagsProps) {
  const [selectedTagIds, setSelectedTagIds] = useState(initialSelectedTagIds);

  const [customTags, setCustomTags] = useState<Tag[]>([]);

  const [inputValue, setInputValue] = useState("");

  const [open, setOpen] = useState(false);

  const allTags = [...availableTags, ...customTags];

  const selectedTags = allTags.filter((tag) => selectedTagIds.includes(tag.id));

  function toggleTag(id: string) {
    setSelectedTagIds((current) =>
      current.includes(id)
        ? current.filter((tagId) => tagId !== id)
        : [...current, id],
    );
  }

  function removeTag(id: string) {
    setSelectedTagIds((current) => current.filter((tagId) => tagId !== id));
  }

  function addCustomTag() {
    const value = inputValue.trim();

    if (!value) {
      return;
    }

    const existingTag = allTags.find(
      (tag) =>
        tag.name.en.toLowerCase() === value.toLowerCase() ||
        tag.name.fa === value,
    );

    if (existingTag) {
      toggleTag(existingTag.id);
      setInputValue("");
      return;
    }

    const newTag: Tag = {
      id: `custom-${crypto.randomUUID()}`,
      name: {
        en: value,
        fa: value,
      },
    };

    setCustomTags((current) => [...current, newTag]);

    setSelectedTagIds((current) => [...current, newTag.id]);

    setInputValue("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCustomTag();
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>

      <div className="relative">
        <div className="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 ">
          {selectedTags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="gap-1 p-2">
              {getName(tag, locale)}

              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="rounded-full outline-none hover:bg-muted hover:text-destructive p-px"
                aria-label={`Remove ${getName(tag, locale)}`}
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}

          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-7 min-w-32 flex-1 border-0 px-1 shadow-none focus-visible:ring-0 bg-transparent! items-center "
          />
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="absolute inset-e-1 top-1 size-8"
              />
            }
            aria-label={placeholder}
          >
            <ChevronDown className="size-4" />
          </PopoverTrigger>
          <PopoverPositioner>
            <PopoverContent className="w-64 p-2">
              <div className="space-y-1">
                {availableTags.map((tag) => {
                  const selected = selectedTagIds.includes(tag.id);

                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                    >
                      <span>{getName(tag, locale)}</span>

                      {selected && (
                        <span className="text-xs text-muted-foreground">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </div>
    </div>
  );
}
