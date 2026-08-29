import { Check, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

export const searchCategories = [
  {
    id: "content",
  },
  {
    id: "community",
  },
  {
    id: "management",
  },
  {
    id: "infrastructure",
  },
  {
    id: "system",
  },
] as const;

export type SearchCategory = (typeof searchCategories)[number]["id"];

export type SearchDictionary = {
  placeholder: string;
  ariaLabel: string;
  settings: string;
  searchIn: string;
  close: string;
  categories: Record<SearchCategory, string>;
};

type SearchSettingsPopoverProps = {
  searchCategory: SearchCategory;
  onSearchCategoryChange: (category: SearchCategory) => void;
  dictionary: SearchDictionary;
};

export function SearchSettingsPopover({
  searchCategory,
  onSearchCategoryChange,
  dictionary,
}: SearchSettingsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label={dictionary.settings}
          />
        }
      >
        <SlidersHorizontal />
      </PopoverTrigger>

      <PopoverPositioner align="start">
        <PopoverContent className="relative top-2 w-72 p-4">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">{dictionary.searchIn}</h3>

              <div className="grid gap-1">
                {searchCategories.map((category) => {
                  const isActive = searchCategory === category.id;

                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant={isActive ? "default" : "secondary"}
                      className={
                        isActive
                          ? "w-full justify-between"
                          : "w-full justify-between hover:bg-accent!"
                      }
                      onClick={() => onSearchCategoryChange(category.id)}
                    >
                      <span>{dictionary.categories[category.id]}</span>

                      {isActive && <Check className="size-4" />}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
