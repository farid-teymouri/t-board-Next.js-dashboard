"use client";

import { useState } from "react";

import { useProducts } from "./hooks/use-products";

import {
  ProductsList,
  type ProductsSort,
  type ProductsViewMode,
} from "./widgets/products-list";

import { ProductFiltersContainer } from "./widgets/product-filters";

import type {
  EcommerceProduct,
  ProductStatus,
} from "@/types/ecommerce/products";

import type { EcommerceProductsDictionary } from "@/i18n/dictionaries";

interface EcommerceProductsProps {
  dictionary: EcommerceProductsDictionary;
  locale: "fa" | "en";
}

function sortProducts(
  products: EcommerceProduct[],
  sort: ProductsSort,
): EcommerceProduct[] {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.id.localeCompare(a.id));

    case "price-high-to-low":
      return sorted.sort((a, b) => b.price - a.price);

    case "price-low-to-high":
      return sorted.sort((a, b) => a.price - b.price);

    case "best-selling":
      return sorted.sort((a, b) => b.sales - a.sales);

    case "top-rated":
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }

        return b.reviewCount - a.reviewCount;
      });

    case "name-a-z":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        }),
      );

    case "featured":
    default:
      return sorted;
  }
}

export function EcommerceProducts({
  locale,
  dictionary,
}: EcommerceProductsProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductsSort>();
  const [viewMode, setViewMode] = useState<ProductsViewMode>("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>();
  const [selectedStatuses, setSelectedStatuses] = useState<ProductStatus[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const productsQuery = useProducts(locale);

  const products = productsQuery.data?.products ?? [];
  const filters = productsQuery.data?.filters;

  const activePriceRange =
    priceRange ??
    (filters
      ? ([filters.price.min, filters.price.max] as [number, number])
      : undefined);
  const [page, setPage] = useState(1);

  const pageSize = 12;

  const categoryNameById = new Map(
    productsQuery.data?.filters.categories.map((category) => [
      category.id,
      category.name,
    ]) ?? [],
  );

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLocaleLowerCase();

    const matchesSearch =
      !query ||
      product.name.toLocaleLowerCase().includes(query) ||
      product.id.toLocaleLowerCase().includes(query) ||
      product.category.toLocaleLowerCase().includes(query);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (categoryId) => categoryNameById.get(categoryId) === product.category,
      );

    const matchesPrice =
      !priceRange ||
      (product.price >= priceRange[0] && product.price <= priceRange[1]);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(product.status);

    const matchesRating =
      selectedRating === null || product.rating >= selectedRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesStatus &&
      matchesRating
    );
  });
  const visibleProducts = sortProducts(filteredProducts, sort ?? "featured");

  const totalItems = visibleProducts.length;

  const paginatedProducts = visibleProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleSortChange(value: ProductsSort | undefined) {
    setSort(value);
    setPage(1);
  }

  function handleSelectProduct(productId: string) {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function handleSelectAll(products: EcommerceProduct[]) {
    const selectableIds = products
      .filter((product) => product.status !== "out-of-stock")
      .map((product) => product.id);

    setSelectedProductIds((current) => [
      ...new Set([...current, ...selectableIds]),
    ]);
  }

  function handleClearAll() {
    setSelectedProductIds([]);
  }

  function handleCategoriesChange(categories: string[]) {
    setSelectedCategories(categories);
    setPage(1);
  }

  function handlePriceRangeChange(range: [number, number]) {
    setPriceRange(range);
    setPage(1);
  }

  function handleStatusesChange(statuses: ProductStatus[]) {
    setSelectedStatuses(statuses);
    setPage(1);
  }

  function handleRatingChange(rating: number | null) {
    setSelectedRating(rating);
    setPage(1);
  }

  function handleResetFilters() {
    setSelectedCategories([]);
    setPriceRange(undefined);
    setSelectedStatuses([]);
    setSelectedRating(null);
    setPage(1);
  }

  if (productsQuery.isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {dictionary.list.loading}
        </p>
      </div>
    );
  }

  if (productsQuery.isError) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-destructive">{dictionary.list.error}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
      <ProductFiltersContainer
        filters={productsQuery.data?.filters}
        selectedCategories={selectedCategories}
        priceRange={activePriceRange ?? null}
        selectedStatuses={selectedStatuses}
        selectedRating={selectedRating}
        dictionary={dictionary.filters}
        locale={locale}
        onCategoriesChange={handleCategoriesChange}
        onPriceRangeChange={handlePriceRangeChange}
        onStatusesChange={handleStatusesChange}
        onRatingChange={handleRatingChange}
        onReset={handleResetFilters}
      />

      <ProductsList
        products={paginatedProducts}
        locale={locale}
        dictionary={dictionary.list}
        selectedProductIds={selectedProductIds}
        search={search}
        sort={sort}
        viewMode={viewMode}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onViewModeChange={setViewMode}
        onPageChange={setPage}
        onSelectProduct={handleSelectProduct}
        onSelectAll={() => handleSelectAll(paginatedProducts)}
        onClearAll={handleClearAll}
      />
    </div>
  );
}
