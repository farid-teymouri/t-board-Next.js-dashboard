"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { ProductImageIcon } from "./product-image-icon";

import type { ProductMedia } from "@/types/ecommerce/product-details";

type ProductMediaLightboxProps = {
  media: ProductMedia[];
  activeIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
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
  activeIndex,
  open,
  onOpenChange,
  onIndexChange,
}: ProductMediaLightboxProps) {
  const activeMedia = media[activeIndex] ?? null;

  const isRtl = document.documentElement.dir === "rtl";

  const goToPrevious = useCallback(() => {
    if (!media.length) return;

    const nextIndex = isRtl
      ? activeIndex === media.length - 1
        ? 0
        : activeIndex + 1
      : activeIndex === 0
        ? media.length - 1
        : activeIndex - 1;

    onIndexChange(nextIndex);
  }, [activeIndex, isRtl, media.length, onIndexChange]);

  const goToNext = useCallback(() => {
    if (!media.length) return;

    const nextIndex = isRtl
      ? activeIndex === 0
        ? media.length - 1
        : activeIndex - 1
      : activeIndex === media.length - 1
        ? 0
        : activeIndex + 1;

    onIndexChange(nextIndex);
  }, [activeIndex, isRtl, media.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, goToNext, goToPrevious]);

  if (!activeMedia) {
    return null;
  }

  const mediaColor = MEDIA_COLORS[activeIndex % MEDIA_COLORS.length];

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
        <DialogTitle className="sr-only">{activeMedia.alt}</DialogTitle>

        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-xl bg-muted/20">
          {activeMedia.type === "image" ? (
            activeMedia.src.startsWith("blob:") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeMedia.src}
                alt={activeMedia.alt}
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
              key={activeMedia.id}
              src={activeMedia.src}
              controls
              autoPlay
              playsInline
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          )}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous media"
                className="absolute inset-s-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next media"
                className="absolute inset-e-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
                {activeIndex + 1} / {media.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
