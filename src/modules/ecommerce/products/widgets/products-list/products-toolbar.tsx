"use client";

import { Grid2X2, List, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type ProductsSort =
  | "featured"
  | "newest"
  | "price-high-to-low"
  | "price-low-to-high"
  | "best-selling"
  | "top-rated"
  | "name-a-z";

export type ProductsViewMode = "grid" | "list";

const sortLabels = {
  featured: "featured",
  newest: "newest",
  "price-high-to-low": "priceHighToLow",
  "price-low-to-high": "priceLowToHigh",
  "best-selling": "bestSelling",
  "top-rated": "topRated",
  "name-a-z": "nameAZ",
} as const;

interface ProductsToolbarDictionary {
  search: string;
  sort: {
    label: string;
    featured: string;
    newest: string;
    priceHighToLow: string;
    priceLowToHigh: string;
    bestSelling: string;
    topRated: string;
    nameAZ: string;
  };
  view: {
    grid: string;
    list: string;
  };
}

interface ProductsToolbarProps {
  dictionary: ProductsToolbarDictionary;
  search: string;
  sort: ProductsSort | undefined;
  onSortChange: (value: ProductsSort | undefined) => void;
  viewMode: ProductsViewMode;
  onSearchChange: (value: string) => void;
  onViewModeChange: (value: ProductsViewMode) => void;
}

export function ProductsToolbar({
  dictionary,
  search,
  sort,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeChange,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={dictionary.search}
          className="ps-9"
        />
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={sort}
          onValueChange={(value) => onSortChange(value as ProductsSort)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder={dictionary.sort.label}>
              {sort ? dictionary.sort[sortLabels[sort]] : dictionary.sort.label}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="featured">{dictionary.sort.featured}</SelectItem>

            <SelectItem value="newest">{dictionary.sort.newest}</SelectItem>

            <SelectItem value="price-high-to-low">
              {dictionary.sort.priceHighToLow}
            </SelectItem>

            <SelectItem value="price-low-to-high">
              {dictionary.sort.priceLowToHigh}
            </SelectItem>

            <SelectItem value="best-selling">
              {dictionary.sort.bestSelling}
            </SelectItem>

            <SelectItem value="top-rated">
              {dictionary.sort.topRated}
            </SelectItem>

            <SelectItem value="name-a-z">{dictionary.sort.nameAZ}</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center rounded-md border p-0">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={dictionary.view.grid}
            aria-pressed={viewMode === "grid"}
            className={cn(
              " rounded-md rounded-e-none p-4",
              viewMode === "grid" && "bg-muted",
            )}
            onClick={() => onViewModeChange("grid")}
          >
            <Grid2X2 />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label={dictionary.view.list}
            aria-pressed={viewMode === "list"}
            className={cn("rounded-s-none", viewMode === "list" && "bg-muted")}
            onClick={() => onViewModeChange("list")}
          >
            <List />
          </Button>
        </div>
      </div>
    </div>
  );
}
