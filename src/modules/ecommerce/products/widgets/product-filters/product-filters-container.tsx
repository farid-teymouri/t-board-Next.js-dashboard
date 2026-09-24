"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ProductFilters,
  type ProductFiltersDictionary,
} from "./product-filters";

import type {
  EcommerceProductsFilters,
  ProductStatus,
} from "@/types/ecommerce/products";

interface ProductFiltersContainerProps {
  filters?: EcommerceProductsFilters;

  selectedCategories: string[];
  priceRange: [number, number] | null;
  selectedStatuses: ProductStatus[];
  selectedRating: number | null;

  dictionary: ProductFiltersDictionary;
  locale: "fa" | "en";

  onCategoriesChange: (value: string[]) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onStatusesChange: (value: ProductStatus[]) => void;
  onRatingChange: (value: number | null) => void;
  onReset: () => void;
}

export function ProductFiltersContainer({
  filters,
  selectedCategories,
  priceRange,
  selectedStatuses,
  selectedRating,
  dictionary,
  locale,
  onCategoriesChange,
  onPriceRangeChange,
  onStatusesChange,
  onRatingChange,
  onReset,
}: ProductFiltersContainerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden xl:block">
        <ProductFilters
          filters={filters}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          selectedStatuses={selectedStatuses}
          selectedRating={selectedRating}
          dictionary={dictionary}
          locale={locale}
          onCategoriesChange={onCategoriesChange}
          onPriceRangeChange={onPriceRangeChange}
          onStatusesChange={onStatusesChange}
          onRatingChange={onRatingChange}
          onReset={onReset}
        />
      </aside>

      {/* Tablet / Mobile */}
      <div className="xl:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                variant="secondary"
                className="bg-background! hover:text-chart-3"
              >
                <SlidersHorizontal />
                {dictionary.title}
              </Button>
            }
          />

          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{dictionary.title}</DialogTitle>
            </DialogHeader>

            <ProductFilters
              filters={filters}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              selectedStatuses={selectedStatuses}
              selectedRating={selectedRating}
              dictionary={dictionary}
              locale={locale}
              onCategoriesChange={onCategoriesChange}
              onPriceRangeChange={onPriceRangeChange}
              onStatusesChange={onStatusesChange}
              onRatingChange={onRatingChange}
              onReset={onReset}
            />

            <div className="flex gap-2 border-t pt-4">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={onReset}
              >
                {dictionary.reset}
              </Button>

              <Button className="flex-1" onClick={() => setOpen(false)}>
                اعمال فیلتر
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
