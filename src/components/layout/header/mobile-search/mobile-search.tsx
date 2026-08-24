"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { SearchDictionary } from "../search/search-settings-popover";

import { SearchInput } from "../search/search";

type MobileSearchProps = {
  dictionary: SearchDictionary;
};

export function MobileSearch({ dictionary }: MobileSearchProps) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="absolute inset-0 z-50 flex h-16 items-center bg-background px-4">
        <div className="w-full">
          <SearchInput dictionary={dictionary} onClose={() => setOpen(false)} />
        </div>
      </div>
    );
  }

  return (
    <Button
      className="h-8.5 w-8.5 hover:text-primary"
      variant="outline"
      size="icon"
      aria-label={dictionary.ariaLabel}
      onClick={() => setOpen(true)}
    >
      <Search />
    </Button>
  );
}
