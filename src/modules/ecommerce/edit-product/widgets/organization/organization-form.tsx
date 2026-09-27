"use client";

import { useState } from "react";
import { OrganizationCategoryTree } from "./organization-category-tree";
import { ChevronDown, ChevronRight, HelpCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type {
  Brand,
  Category,
  CategoryPathItem,
  OrganizationData,
  OrganizationLocale,
  Vendor,
} from "./types";

type OrganizationFormProps = {
  data: OrganizationData;
  locale: OrganizationLocale;
  dictionary: {
    category: string;
    brand: string;
    vendor: string;
    categoryRequired: string;
    categoryHint: string;
    vendorHint: string;
    selectBrand: string;
    selectVendor: string;
    addBrand: string;
    addCategory: string;
  };
};
function findCategoryPath(
  categories: Category[],
  targetId: string,
  path: CategoryPathItem[] = [],
): CategoryPathItem[] | undefined {
  for (const category of categories) {
    const nextPath = [
      ...path,
      {
        id: category.id,
        name: category.name,
      },
    ];

    if (category.id === targetId) {
      return nextPath;
    }

    const childPath = findCategoryPath(category.children, targetId, nextPath);

    if (childPath) {
      return childPath;
    }
  }

  return undefined;
}
function getName(
  item: { name: { en: string; fa: string } },
  locale: OrganizationLocale,
) {
  return item.name[locale];
}

function addCategoryToTree(
  categories: Category[],
  parentId: string | undefined,
  category: Category,
): Category[] {
  if (!parentId) {
    return [...categories, category];
  }

  return categories.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [...item.children, category],
      };
    }

    return {
      ...item,
      children: addCategoryToTree(item.children, parentId, category),
    };
  });
}

export function OrganizationForm({
  data,
  locale,
  dictionary,
}: OrganizationFormProps) {
  const [categoryHintOpen, setCategoryHintOpen] = useState(false);
  const [vendorHintOpen, setVendorHintOpen] = useState(false);

  const [selectedPath, setSelectedPath] = useState<CategoryPathItem[]>(
    data.selectedCategoryPath,
  );

  const [categoryTree, setCategoryTree] = useState<Category[]>(
    data.categoryTree,
  );

  const [brandId, setBrandId] = useState<string | null>(data.selectedBrandId);

  const [vendorId, setVendorId] = useState<string | null>(
    data.selectedVendorId,
  );

  const [brands, setBrands] = useState<Brand[]>(data.brands);

  const selectedBrand = brands.find((brand) => brand.id === brandId);
  const selectedVendor = data.vendors.find((vendor) => vendor.id === vendorId);

  const [categoryOpen, setCategoryOpen] = useState(false);

  function handleCategorySelect(category: Category) {
    const categoryPath = findCategoryPath(categoryTree, category.id);

    if (!categoryPath) {
      return;
    }

    const isSelected = selectedPath.some((item) => item.id === category.id);

    if (isSelected) {
      const index = selectedPath.findIndex((item) => item.id === category.id);

      setSelectedPath((current) => current.slice(0, index));
      return;
    }

    setSelectedPath(categoryPath);
  }

  function handleAddCategory(name: string) {
    const parentId = selectedPath.at(-1)?.id;

    const newCategory: Category = {
      id: `custom-${crypto.randomUUID()}`,
      name: {
        en: name,
        fa: name,
      },
      children: [],
    };

    setCategoryTree((current) =>
      addCategoryToTree(current, parentId, newCategory),
    );

    setSelectedPath((current) => [
      ...current,
      {
        id: newCategory.id,
        name: newCategory.name,
      },
    ]);
  }

  function addBrand() {
    const name = window.prompt(dictionary.addBrand);

    if (!name?.trim()) {
      return;
    }

    const newBrand: Brand = {
      id: `custom-${Date.now()}`,
      name: {
        en: name.trim(),
        fa: name.trim(),
      },
    };

    setBrands((current) => [...current, newBrand]);
    setBrandId(newBrand.id);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="flex items-center gap-1.5">
          <Label>{dictionary.category}</Label>

          <span className="text-destructive">*</span>

          <Tooltip open={categoryHintOpen} onOpenChange={setCategoryHintOpen}>
            <TooltipTrigger
              type="button"
              className="cursor-help text-muted-foreground"
              aria-label={dictionary.categoryHint}
              onClick={() => setCategoryHintOpen((current) => !current)}
            >
              <HelpCircle className="size-4" />
            </TooltipTrigger>

            <TooltipContent>
              <p>{dictionary.categoryHint}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {selectedPath.map((category, index) => (
              <div key={category.id} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
                )}

                <span className="text-sm">{getName(category, locale)}</span>
              </div>
            ))}
          </div>

          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                />
              }
            >
              <span className="truncate">
                {selectedPath.length > 0
                  ? selectedPath
                      .map((category) => getName(category, locale))
                      .join(" > ")
                  : dictionary.addCategory}
              </span>

              <ChevronDown className="size-4 shrink-0" />
            </PopoverTrigger>

            <PopoverPositioner>
              <PopoverContent className="w-(--anchor-width) min-w-80 p-2 border-foreground/15 rounded-none">
                <OrganizationCategoryTree
                  categories={categoryTree}
                  selectedPath={selectedPath}
                  locale={locale}
                  placeholder={dictionary.addCategory}
                  addLabel={dictionary.addCategory}
                  onSelect={handleCategorySelect}
                  onAdd={handleAddCategory}
                />
              </PopoverContent>
            </PopoverPositioner>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{dictionary.brand}</Label>

        <Select value={brandId ?? undefined} onValueChange={setBrandId}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedBrand
                ? getName(selectedBrand, locale)
                : dictionary.selectBrand}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {getName(brand, locale)}
              </SelectItem>
            ))}

            <Button
              type="button"
              variant="ghost"
              className="mt-1 w-full justify-start"
              onClick={addBrand}
            >
              <Plus className="size-4" />
              {dictionary.addBrand}
            </Button>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Label>{dictionary.vendor}</Label>

          <Tooltip open={vendorHintOpen} onOpenChange={setVendorHintOpen}>
            <TooltipTrigger
              type="button"
              className="cursor-help text-muted-foreground"
              aria-label={dictionary.vendorHint}
              onClick={() => setVendorHintOpen((current) => !current)}
            >
              <HelpCircle className="size-4" />
            </TooltipTrigger>

            <TooltipContent>
              <p>{dictionary.vendorHint}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Select value={vendorId ?? undefined} onValueChange={setVendorId}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedVendor
                ? getName(selectedVendor, locale)
                : dictionary.selectVendor}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {data.vendors.map((vendor: Vendor) => (
              <SelectItem key={vendor.id} value={vendor.id}>
                {getName(vendor, locale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
