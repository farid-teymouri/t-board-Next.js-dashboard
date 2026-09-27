"use client";

import Image from "next/image";
import { ImageIcon, Play, Star, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { ProductImageIcon } from "./product-image-icon";

import type { ProductMedia } from "./type";
import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";

type ProductMediaItemProps = {
  media: ProductMedia;
  color: string;
  index: number;
  active: boolean;
  activeDropTarget: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onSetPrimary: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  dictionary: EcommerceEditProductDictionary["media"];
};

export function ProductMediaItem({
  media,
  color,
  index,
  active,
  activeDropTarget,
  onSelect,
  onRemove,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onSetPrimary,
  dictionary,
}: ProductMediaItemProps) {
  const isUploadedMedia = media.src.startsWith("blob:");

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        onDragOver(event);
      }}
      onDrop={(event) => {
        event.preventDefault();
        onDrop();
      }}
      className="relative size-[142px] shrink-0"
    >
      <button
        type="button"
        draggable
        onClick={onSelect}
        onDragStart={(event) => {
          event.stopPropagation();

          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", media.id);

          onDragStart();
        }}
        onDragEnd={(event) => {
          event.stopPropagation();
          onDragEnd();
        }}
        aria-label={media.alt}
        className={cn(
          "group relative size-full cursor-grab overflow-hidden rounded-xl border bg-muted/30 transition-all",
          "active:cursor-grabbing",
          active
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-primary/50",
          activeDropTarget && "border-primary ring-2 ring-primary/30",
        )}
      >
        {media.type === "image" ? (
          isUploadedMedia ? (
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="99px"
              className="object-cover"
              unoptimized
              draggable={false}
            />
          ) : (
            <div
              className="flex size-full items-center justify-center bg-muted/20"
              style={{ color }}
            >
              <ProductImageIcon className="size-12" />
            </div>
          )
        ) : (
          <>
            {media.thumbnail ? (
              <Image
                src={media.thumbnail}
                alt={media.alt}
                fill
                sizes="99px"
                className="object-cover"
                unoptimized
                draggable={false}
              />
            ) : (
              <video
                src={`${media.src}#t=0.1`}
                muted
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
            )}

            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15">
              <span className="flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm">
                <Play className="ml-0.5 size-4 fill-current" />
              </span>
            </span>
          </>
        )}

        {/* Drag indicator */}

        {/* Media number */}
        <span
          className={cn(
            "pointer-events-none absolute bottom-1.5 left-1.5 z-10 flex size-6",
            "items-center justify-center rounded-md",
            "bg-background/90 text-xs font-medium text-foreground shadow-sm backdrop-blur",
          )}
        >
          {index + 1}
        </span>

        {/* Image type */}
        {media.type === "image" && (
          <span className="pointer-events-none absolute bottom-1.5 left-8 z-10 flex size-6 items-center justify-center rounded-md bg-background/90">
            <ImageIcon className="size-3.5" style={{ color }} />
          </span>
        )}

        {/* Remove */}
        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onRemove();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              onRemove();
            }
          }}
          aria-label={dictionary.removeMedia}
          className={cn(
            "absolute right-1.5 top-1.5 z-10 flex size-7 items-center justify-center rounded-md",
            "bg-background/90 text-destructive shadow-sm backdrop-blur",
            "opacity-0 transition-opacity group-hover:opacity-100",
            "hover:bg-destructive hover:text-destructive-foreground",
          )}
        >
          <Trash2 className="size-3.5" />
        </span>
      </button>
      {/* Set Primary */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSetPrimary();
        }}
        className={cn(
          "absolute left-2 top-2 z-10 flex items-center gap-1 rounded-md",
          "bg-background/90 px-2 py-1 text-xs font-medium shadow-sm",
          "backdrop-blur-sm transition-colors",
          media.isPrimary
            ? "text-primary"
            : "text-muted-foreground hover:text-primary",
        )}
        aria-label={
          media.isPrimary ? dictionary.primary : dictionary.setAsPrimary
        }
      >
        <Star className={cn("size-3.5", media.isPrimary && "fill-current")} />

        {media.isPrimary && dictionary.primary}
      </button>
    </div>
  );
}
