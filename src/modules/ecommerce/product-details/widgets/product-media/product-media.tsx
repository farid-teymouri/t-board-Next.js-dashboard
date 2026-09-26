"use client";

import { useState } from "react";
import { Maximize2, Pause, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ProductImageIcon } from "./product-image-icon";
import { ProductMediaItem } from "./product-media-item";
import { ProductMediaLightbox } from "./product-media-lightbox";
import type { ProductMediaProps } from "./type";

const MEDIA_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export function ProductMedia({ media, dictionary }: ProductMediaProps) {
  const sortedMedia = [...media].sort(
    (a, b) => Number(Boolean(b.isPrimary)) - Number(Boolean(a.isPrimary)),
  );

  const [activeId, setActiveId] = useState(sortedMedia[0]?.id ?? "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const activeMedia =
    sortedMedia.find((item) => item.id === activeId) ?? sortedMedia[0] ?? null;

  const activeIndex = activeMedia
    ? sortedMedia.findIndex((item) => item.id === activeMedia.id)
    : -1;

  if (!sortedMedia.length) {
    return (
      <Card>
        <CardContent className="flex min-h-96 items-center justify-center text-sm text-muted-foreground">
          {dictionary.noMedia}
        </CardContent>
      </Card>
    );
  }

  const activeColor =
    activeIndex >= 0
      ? MEDIA_COLORS[activeIndex % MEDIA_COLORS.length]
      : MEDIA_COLORS[0];

  const toggleVideoPlayback = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    const video = event.currentTarget
      .closest("[data-product-media-stage]")
      ?.querySelector("video");

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div
            data-product-media-stage
            className="relative flex items-center justify-center overflow-hidden rounded-xl bg-muted/20"
          >
            {activeMedia?.type === "image" ? (
              activeMedia.src.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  className="size-full object-contain"
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center"
                  style={{ color: activeColor }}
                >
                  <div
                    className="flex size-full items-center justify-center"
                    style={{ color: activeColor }}
                  >
                    <ProductImageIcon className="size-[min(45vw,45vh)]" />
                  </div>
                </div>
              )
            ) : (
              <>
                <video
                  key={activeMedia?.id}
                  src={activeMedia?.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="size-full object-contain"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={() => setVideoPlaying(false)}
                />

                <button
                  type="button"
                  onClick={toggleVideoPlayback}
                  aria-label={
                    videoPlaying ? dictionary.pauseVideo : dictionary.playVideo
                  }
                  className={[
                    "absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                    "items-center justify-center rounded-full",
                    "bg-background/80 shadow-lg backdrop-blur-sm",
                    "transition-opacity hover:bg-background",
                    videoPlaying
                      ? "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                      : "opacity-100",
                  ].join(" ")}
                >
                  {videoPlaying ? (
                    <Pause className="size-6" />
                  ) : (
                    <Play className="ml-0.5 size-6 fill-current" />
                  )}
                </button>
              </>
            )}

            {activeMedia?.type === "image" && (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={dictionary.openFullscreen}
                className="absolute bottom-4 inset-e-4 flex size-10 items-center justify-center rounded-lg bg-background/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Maximize2 className="size-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {sortedMedia.map((item, index) => (
              <ProductMediaItem
                key={item.id}
                media={item}
                color={MEDIA_COLORS[index % MEDIA_COLORS.length]}
                index={index}
                active={item.id === activeId}
                onSelect={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <ProductMediaLightbox
        media={sortedMedia}
        activeIndex={activeIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={(index) => setActiveId(sortedMedia[index]?.id ?? "")}
      />
    </>
  );
}
