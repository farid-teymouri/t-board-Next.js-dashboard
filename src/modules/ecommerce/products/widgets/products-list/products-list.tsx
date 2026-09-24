"use client";

import { ProductCard } from "./product-card";
import {
  ProductsToolbar,
  type ProductsSort,
  type ProductsViewMode,
} from "./products-toolbar";
import { ProductsSelectionBar } from "./products-selection-bar";
import { ProductsTable } from "./products-table";
import { ProductsPagination } from "./products-pagination";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductCardDictionary } from "./product-card";
import type { EcommerceProduct } from "@/types/ecommerce/products";

interface ProductsListDictionary {
  title: string;
  empty: string;
  search: string;

  selection: {
    selected: string;
    setStatus: string;
    setCategory: string;
    remove: string;
    clear: string;
  };

  resultCount: string;

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

  table: {
    product: string;
    category: string;
    price: string;
    stock: string;
    sales: string;
    status: string;
    inStock: string;
    outOfStock: string;
    lowStock: string;
    selectAll: string;
    selectProduct: string;
    actions: string;
  };

  pagination: {
    showing: string;
    previous: string;
    next: string;
  };
  card: ProductCardDictionary;
}

interface ProductsListProps {
  products: EcommerceProduct[];
  locale: "fa" | "en";
  dictionary: ProductsListDictionary;
  selectedProductIds: string[];
  search: string;
  sort: ProductsSort | undefined;
  viewMode: ProductsViewMode;
  page: number;
  pageSize: number;
  totalItems: number;

  onSearchChange: (value: string) => void;
  onViewModeChange: (value: ProductsViewMode) => void;
  onSelectProduct: (productId: string) => void;
  onSortChange: (value: ProductsSort | undefined) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onPageChange: (page: number) => void;
}

export function ProductsList({
  products,
  locale,
  dictionary,
  selectedProductIds,
  search,
  sort,
  viewMode,
  page,
  pageSize,
  totalItems,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onPageChange,
  onSelectProduct,
  onSelectAll,
  onClearAll,
}: ProductsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4">
          <span>{dictionary.title}</span>

          <span className="text-sm font-normal text-muted-foreground">
            {dictionary.resultCount.replace(
              "{count}",
              totalItems.toLocaleString(locale),
            )}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {selectedProductIds.length > 0 && (
          <ProductsSelectionBar
            dictionary={dictionary.selection}
            count={selectedProductIds.length}
            onClearAll={onClearAll}
          />
        )}

        <ProductsToolbar
          dictionary={dictionary}
          search={search}
          sort={sort}
          viewMode={viewMode}
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
          onViewModeChange={onViewModeChange}
        />

        {products.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">{dictionary.empty}</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    selected={selectedProductIds.includes(product.id)}
                    onSelect={onSelectProduct}
                    dictionary={dictionary.card}
                  />
                ))}
              </div>
            )}

            {viewMode === "list" && (
              <ProductsTable
                products={products}
                locale={locale}
                dictionary={dictionary.table}
                selectedProductIds={selectedProductIds}
                onSelectProduct={onSelectProduct}
                onSelectAll={onSelectAll}
                onClearAll={onClearAll}
              />
            )}

            <ProductsPagination
              page={page}
              pageSize={pageSize}
              totalItems={totalItems}
              dictionary={dictionary.pagination}
              locale={locale}
              onPageChange={onPageChange}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
