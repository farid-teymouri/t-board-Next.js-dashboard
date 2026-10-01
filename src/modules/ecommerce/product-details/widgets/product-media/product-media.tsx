"use client";

import { useMemo, useRef, useState } from "react";

import { Maximize2, Pause, Play } from "lucide-react";

import { useProductMedia } from "../../hooks/use-product-media";

import { Card, CardContent } from "@/components/ui/card";

import { ProductMediaItem } from "./product-media-item";
import { ProductMediaLightbox } from "./product-media-lightbox";
import { ProductMediaSkeleton } from "./product-media-skeleton";
import type { EcommerceProductDetailsDictionary } from "@/i18n/dictionaries";

const MEDIA_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export type ProductMediaProps = {
  dictionary: EcommerceProductDetailsDictionary["media"];
};
export function ProductMedia({ dictionary }: ProductMediaProps) {
  const { data: media = [], isLoading, isError } = useProductMedia();

  const sortedMedia = useMemo(
    () =>
      [...media].sort(
        (a, b) => Number(Boolean(b.isPrimary)) - Number(Boolean(a.isPrimary)),
      ),
    [media],
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeMedia =
    sortedMedia.find((item) => item.id === activeId) ?? sortedMedia[0] ?? null;

  const activeIndex = activeMedia
    ? sortedMedia.findIndex((item) => item.id === activeMedia.id)
    : -1;

  if (isLoading) {
    return <ProductMediaSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center text-sm text-destructive">
          {dictionary.error}
        </CardContent>
      </Card>
    );
  }

  if (!sortedMedia.length || !activeMedia) {
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
      <Card className="flex h-full overflow-hidden">
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div
            data-product-media-stage
            className="group relative flex h-[360px] items-center justify-center overflow-hidden rounded-xl bg-muted/20 sm:h-[420px]"
          >
            {activeMedia.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeMedia.src}
                alt={activeMedia.alt}
                className="size-full object-contain"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  key={activeMedia.id}
                  src={activeMedia.src}
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
                      ? "opacity-0 group-hover:opacity-100"
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

            {activeMedia.type === "image" && (
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={dictionary.openFullscreen}
                className="absolute bottom-4 inset-e-4 flex size-10 items-center justify-center rounded-lg bg-accent shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Maximize2 className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {sortedMedia.map((item, index) => (
              <div key={item.id} className="w-16 sm:w-20">
                <ProductMediaItem
                  media={item}
                  color={MEDIA_COLORS[index % MEDIA_COLORS.length]}
                  index={index}
                  active={item.id === activeMedia.id}
                  onSelect={() => {
                    setVideoPlaying(false);
                    setActiveId(item.id);
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProductMediaLightbox
        media={sortedMedia}
        activeIndex={activeIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={(index) => {
          setVideoPlaying(false);
          setActiveId(sortedMedia[index]?.id ?? null);
        }}
      />
    </>
  );
}
