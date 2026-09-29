"use client";

import { ImageIcon, Play } from "lucide-react";
import type { ProductMedia } from "./types";

type ProductMediaItemProps = {
  media: ProductMedia;
  color: string;
  index: number;
  active: boolean;
  onSelect: () => void;
};

export function ProductMediaItem({
  media,
  color,
  index,
  active,
  onSelect,
}: ProductMediaItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={media.alt}
      className={[
        "group relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border bg-muted/20 text-left transition-all sm:w-20",
        "hover:border-foreground/30 hover:bg-muted/40",
        active ? "border-primary ring-2 ring-primary/20" : "border-border",
      ].join(" ")}
    >
      {media.type === "image" ? (
        media.src.startsWith("blob:") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.src}
            alt={media.alt}
            className="size-full object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center"
            style={{ color }}
          >
            <ImageIcon className="size-10 stroke-[1.25]" />
          </div>
        )
      ) : media.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.thumbnail}
          alt={media.alt}
          className="size-full object-cover"
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

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/60 to-transparent p-2 pt-6">
        <span className="text-xs font-medium text-white">{index + 1}</span>

        {media.type === "image" ? (
          <ImageIcon className="size-4 text-white" />
        ) : (
          <span className="flex size-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
            <Play className="size-3.5 fill-current" />
          </span>
        )}
      </div>
    </button>
  );
}
