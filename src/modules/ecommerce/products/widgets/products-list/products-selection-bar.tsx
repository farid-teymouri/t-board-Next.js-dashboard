"use client";

import { Button } from "@/components/ui/button";

interface ProductsSelectionBarDictionary {
  selected: string;
  setStatus: string;
  setCategory: string;
  remove: string;
  clear: string;
}

interface ProductsSelectionBarProps {
  dictionary: ProductsSelectionBarDictionary;
  count: number;
  onClearAll: () => void;
}

export function ProductsSelectionBar({
  dictionary,
  count,
  onClearAll,
}: ProductsSelectionBarProps) {
  return (
    <div className="flex xl:flex-row lg:flex-col  gap-3 rounded-lg border bg-muted/40 p-3 lg:items-center lg:justify-between ">
      <p className="text-sm font-medium">
        {dictionary.selected.replace("{count}", count.toLocaleString())}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="secondary" size="sm">
          {dictionary.setStatus}
        </Button>

        <Button type="button" variant="secondary" size="sm">
          {dictionary.setCategory}
        </Button>

        <Button type="button" variant="destructive" size="sm">
          {dictionary.remove}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onClearAll}
        >
          {dictionary.clear}
        </Button>
      </div>
    </div>
  );
}
