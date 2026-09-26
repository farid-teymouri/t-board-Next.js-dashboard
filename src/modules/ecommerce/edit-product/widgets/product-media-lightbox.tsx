"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { ProductImageIcon } from "./product-image-icon";

import type { ProductMedia } from "@/types/ecommerce/edit-product";

type ProductMediaLightboxProps = {
  media: ProductMedia | null;
  mediaIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MEDIA_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export function ProductMediaLightbox({
  media,
  mediaIndex,
  open,
  onOpenChange,
}: ProductMediaLightboxProps) {
  if (!media) {
    return null;
  }

  const mediaColor = MEDIA_COLORS[mediaIndex % MEDIA_COLORS.length];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
      h-screen! w-screen! max-w-none!
      border-0 bg-background/95 p-4 sm:p-6
      [&>button]:size-10!
      [&>button]:rounded-lg!
      [&>button]:opacity-100!
      [&>button_svg]:size-6!
      [&>button]:bg-secondary!
      [&>button]:hover:text-destructive!
        "
        showCloseButton
      >
        <DialogTitle className="sr-only">{media.alt}</DialogTitle>

        <div className="flex size-full items-center justify-center overflow-hidden rounded-xl bg-muted/20">
          {media.type === "image" ? (
            media.src.startsWith("blob:") ? (
              <img
                src={media.src}
                alt={media.alt}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center"
                style={{ color: mediaColor }}
              >
                <ProductImageIcon className="size-[min(70vw,70vh)]" />
              </div>
            )
          ) : (
            <video
              src={media.src}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
