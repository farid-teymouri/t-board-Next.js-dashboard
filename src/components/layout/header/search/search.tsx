"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  SearchCategory,
  SearchDictionary,
  SearchSettingsPopover,
} from "./search-settings-popover";

type SearchInputProps = {
  onClose?: () => void;
  dictionary: SearchDictionary;
};

export function SearchInput({ onClose, dictionary }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] =
    useState<SearchCategory>("content");

  return (
    <InputGroup className="flex h-full">
      <InputGroupAddon align="inline-start">
        <Search className="size-4 ms-1 me-1" />
      </InputGroupAddon>

      <InputGroupInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={dictionary.placeholder}
        aria-label={dictionary.ariaLabel}
        autoFocus={Boolean(onClose)}
      />

      <InputGroupAddon align="inline-end">
        <SearchSettingsPopover
          searchCategory={searchCategory}
          onSearchCategoryChange={setSearchCategory}
          dictionary={dictionary}
        />

        {onClose && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="text-red-500 hover:bg-red-500/10 hover:text-red-600 rtl:ml-1 ltr:mr-1"
            onClick={onClose}
            aria-label={dictionary.close}
          >
            <X />
          </Button>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
