"use client";

import { MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { formatCurrency } from "@/utils/currency/formatter";

import type { EcommerceProduct } from "@/types/ecommerce/products";

interface ProductsTableDictionary {
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
}

interface ProductsTableProps {
  products: EcommerceProduct[];
  locale: "fa" | "en";
  dictionary: ProductsTableDictionary;
  selectedProductIds: string[];
  onSelectProduct: (productId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

function ProductStatusBadge({
  product,
  dictionary,
}: {
  product: EcommerceProduct;
  dictionary: ProductsTableDictionary;
}) {
  if (product.status === "out-of-stock") {
    return <Badge variant="destructive">{dictionary.outOfStock}</Badge>;
  }

  if (product.status === "low-stock") {
    return (
      <Badge className="bg-chart-5 text-foreground hover:bg-chart-5">
        {dictionary.lowStock}
      </Badge>
    );
  }

  return (
    <Badge className="bg-chart-3 text-white hover:bg-chart-3">
      {dictionary.inStock}
    </Badge>
  );
}

export function ProductsTable({
  products,
  locale,
  dictionary,
  selectedProductIds,
  onSelectProduct,
  onSelectAll,
  onClearAll,
}: ProductsTableProps) {
  const selectableProducts = products.filter(
    (product) => product.status !== "out-of-stock",
  );

  const selectedSelectableCount = selectableProducts.filter((product) =>
    selectedProductIds.includes(product.id),
  ).length;

  const allSelected =
    selectableProducts.length > 0 &&
    selectedSelectableCount === selectableProducts.length;

  const someSelected = selectedSelectableCount > 0 && !allSelected;

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <label className="relative flex size-4.5 cursor-pointer items-center justify-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(element) => {
                    if (element) {
                      element.indeterminate = someSelected;
                    }
                  }}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll();
                    } else {
                      onClearAll();
                    }
                  }}
                  aria-label={dictionary.selectAll}
                  className="peer sr-only"
                />

                <span
                  className="
      size-4.5 rounded border-2
      border-muted-foreground
      transition-colors

      peer-hover:border-foreground

      peer-checked:border-primary
      peer-checked:bg-primary

      peer-disabled:cursor-not-allowed
    "
                />
              </label>
            </TableHead>

            <TableHead>{dictionary.product}</TableHead>
            <TableHead>{dictionary.category}</TableHead>
            <TableHead>{dictionary.price}</TableHead>
            <TableHead>{dictionary.stock}</TableHead>
            <TableHead>{dictionary.sales}</TableHead>
            <TableHead>{dictionary.status}</TableHead>

            <TableHead className="w-12 text-end">
              <span className="sr-only">{dictionary.actions}</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const isOutOfStock = product.status === "out-of-stock";
            const selected = selectedProductIds.includes(product.id);

            return (
              <TableRow
                key={product.id}
                data-state={selected ? "selected" : undefined}
                className={cn(isOutOfStock && "opacity-60")}
              >
                <TableCell>
                  <label
                    className={cn(
                      "relative flex size-4.5 items-center justify-center",
                      !isOutOfStock && "cursor-pointer",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={isOutOfStock}
                      onChange={() => onSelectProduct(product.id)}
                      aria-label={`${dictionary.selectProduct}: ${product.name}`}
                      className="peer sr-only"
                    />

                    <span
                      className="
      size-4.5 rounded border-2
      border-muted-foreground

      transition-colors

      peer-hover:border-foreground

      peer-checked:border-primary
      peer-checked:bg-primary

      peer-disabled:cursor-not-allowed
      peer-disabled:opacity-50 
    "
                    />
                  </label>
                </TableCell>

                <TableCell>
                  <div className="min-w-48">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.id}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {product.category}
                </TableCell>

                <TableCell className="whitespace-nowrap font-medium">
                  {formatCurrency(product.price, {
                    locale,
                    currency: product.currency,
                  })}
                </TableCell>

                <TableCell>
                  {formatCurrency(product.stock, {
                    locale,
                    currency: product.currency,
                  })}
                </TableCell>

                <TableCell>
                  {formatCurrency(product.sales, {
                    locale,
                    currency: product.currency,
                  })}
                </TableCell>

                <TableCell>
                  <ProductStatusBadge
                    product={product}
                    dictionary={dictionary}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={dictionary.actions}
                  >
                    <MoreVertical />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
