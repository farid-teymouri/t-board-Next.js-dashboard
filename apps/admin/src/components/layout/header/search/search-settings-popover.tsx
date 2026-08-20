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
    title: "Content",
  },
  {
    id: "community",
    title: "Community",
  },
  {
    id: "management",
    title: "Management",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
  },
  {
    id: "system",
    title: "System",
  },
] as const;

export type SearchCategory = (typeof searchCategories)[number]["id"];

type SearchSettingsPopoverProps = {
  searchCategory: SearchCategory;
  onSearchCategoryChange: (category: SearchCategory) => void;
};

export function SearchSettingsPopover({
  searchCategory,
  onSearchCategoryChange,
}: SearchSettingsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Search settings"
          />
        }
      >
        <SlidersHorizontal />
      </PopoverTrigger>

      <PopoverPositioner align="start">
        <PopoverContent className="w-72 p-4 relative top-2">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <h3 className="text-sm font-medium">Search in</h3>

              <div className="grid gap-1">
                {searchCategories.map((category) => {
                  const isActive = searchCategory === category.id;

                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant={isActive ? "secondary" : "ghost"}
                      className="justify-between"
                      onClick={() => onSearchCategoryChange(category.id)}
                    >
                      <span>{category.title}</span>

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
