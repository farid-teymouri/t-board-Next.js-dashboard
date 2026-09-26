"use client";

import { Copy, Ellipsis, Eye, EyeOff, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

type EcommerceEditProductHeaderActionsProps = {
  dictionary: EcommerceEditProductDictionary["header"];
};

export function EcommerceEditProductHeaderActions({
  dictionary,
}: EcommerceEditProductHeaderActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-row sm:items-center">
      <Button variant="secondary">
        <Eye />
        {dictionary.preview}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="secondary"
              size="icon"
              aria-label={dictionary.actions}
            />
          }
        >
          <Ellipsis />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem>
            <Copy />
            {dictionary.duplicate}
          </DropdownMenuItem>

          <DropdownMenuItem>
            <EyeOff />
            {dictionary.unpublish}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem variant="destructive">
            <Trash2 />
            {dictionary.deleteProduct}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
