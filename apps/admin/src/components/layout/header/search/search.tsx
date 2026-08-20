"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  SearchCategory,
  SearchSettingsPopover,
} from "./search-settings-popover";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] =
    useState<SearchCategory>("content");

  return (
    <InputGroup className="flex h-full">
      <InputGroupAddon align="inline-end">
        <Search className="size-4 ms-1 me-1" />
      </InputGroupAddon>

      <InputGroupInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search..."
        aria-label="Search"
      />

      <InputGroupAddon align="inline-start">
        <SearchSettingsPopover
          searchCategory={searchCategory}
          onSearchCategoryChange={setSearchCategory}
        />
      </InputGroupAddon>
    </InputGroup>
  );
}
