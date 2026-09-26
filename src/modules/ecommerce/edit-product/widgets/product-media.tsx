"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, Plus } from "lucide-react";
import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { generateVideoThumbnail } from "./utils/generate-video-thumbnail";
import { ProductImageIcon } from "./product-image-icon";
import { ProductMediaItem as ProductMediaThumbnail } from "./product-media-item";
import { ProductMediaLightbox } from "./product-media-lightbox";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type {
  ProductMedia,
  ProductMediaType,
} from "@/types/ecommerce/edit-product";

type ProductMediaItemProps = {
  media: ProductMedia[];
  locale: "fa" | "en";
  dictionary: EcommerceEditProductDictionary["media"];
};

const MEDIA_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

export function ProductMedia({
  media: initialMedia,
  dictionary,
}: ProductMediaItemProps) {
  const [draggedMediaId, setDraggedMediaId] = useState<string | null>(null);

  const [dropTargetMediaId, setDropTargetMediaId] = useState<string | null>(
    null,
  );

  const [media, setMedia] = useState<ProductMedia[]>(initialMedia);

  const [activeId, setActiveId] = useState(initialMedia[0]?.id);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  function clearVideoOverlayTimeout() {
    if (videoOverlayTimeoutRef.current) {
      clearTimeout(videoOverlayTimeoutRef.current);
      videoOverlayTimeoutRef.current = null;
    }
  }

  function showVideoControls() {
    clearVideoOverlayTimeout();

    setShowVideoOverlay(true);

    if (!videoRef.current?.paused) {
      videoOverlayTimeoutRef.current = setTimeout(() => {
        setShowVideoOverlay(false);
      }, 1800);
    }
  }

  function showVideoControlsWhilePlaying() {
    clearVideoOverlayTimeout();

    setShowVideoOverlay(true);

    videoOverlayTimeoutRef.current = setTimeout(() => {
      setShowVideoOverlay(false);
    }, 1800);
  }

  function toggleVideoPlayback() {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  const activeMedia =
    media.find((item) => item.id === activeId) ?? media[0] ?? null;

  const activeMediaIndex = activeMedia
    ? media.findIndex((item) => item.id === activeMedia.id)
    : -1;

  const activeMediaColor =
    activeMediaIndex >= 0
      ? MEDIA_COLORS[activeMediaIndex % MEDIA_COLORS.length]
      : MEDIA_COLORS[0];

  function handleSelectMedia(id: string) {
    clearVideoOverlayTimeout();
    setActiveId(id);
    setVideoPlaying(false);
    setShowVideoOverlay(true);
  }

  function handleRemove(id: string) {
    const item = media.find((media) => media.id === id);

    if (item?.src.startsWith("blob:")) {
      URL.revokeObjectURL(item.src);
    }

    const next = media.filter((media) => media.id !== id);

    setMedia(next);

    if (id === activeId) {
      const nextActiveId = next[0]?.id;

      setActiveId(nextActiveId);
      setVideoPlaying(false);
      setShowVideoOverlay(true);
      clearVideoOverlayTimeout();
    }
  }

  function handleAddMedia() {
    fileInputRef.current?.click();
  }

  function handleDragStart(id: string) {
    setDraggedMediaId(id);
  }

  function handleDragEnd() {
    setDraggedMediaId(null);
    setDropTargetMediaId(null);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>, id: string) {
    event.preventDefault();

    if (draggedMediaId === id) {
      return;
    }

    event.dataTransfer.dropEffect = "move";
    setDropTargetMediaId(id);
  }

  function handleDrop(targetId: string) {
    if (!draggedMediaId || draggedMediaId === targetId) {
      handleDragEnd();
      return;
    }

    setMedia((current) => {
      const draggedIndex = current.findIndex(
        (item) => item.id === draggedMediaId,
      );

      const targetIndex = current.findIndex((item) => item.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return current;
      }

      const next = [...current];

      const [draggedItem] = next.splice(draggedIndex, 1);

      next.splice(targetIndex, 0, draggedItem);

      return next;
    });

    handleDragEnd();
  }

  async function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const currentImageCount = media.filter(
      (item) => item.type === "image",
    ).length;

    const currentVideoCount = media.filter(
      (item) => item.type === "video",
    ).length;

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (!validFiles.length) {
      toast.add({
        type: "error",
        description: dictionary.onlyImageVideo,
        priority: "high",
      });

      event.target.value = "";
      return;
    }

    const availableImages = 5 - currentImageCount;
    const availableVideos = 2 - currentVideoCount;

    const selectedImages = validFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    const selectedVideos = validFiles.filter((file) =>
      file.type.startsWith("video/"),
    );

    if (
      selectedImages.length > availableImages ||
      selectedVideos.length > availableVideos
    ) {
      toast.add({
        type: "error",
        description: dictionary.mediaLimit,
        priority: "high",
      });

      event.target.value = "";
      return;
    }

    const newMedia: ProductMedia[] = await Promise.all(
      validFiles.map(async (file) => {
        const isVideo = file.type.startsWith("video/");

        let thumbnail: string | undefined;

        if (isVideo) {
          try {
            thumbnail = await generateVideoThumbnail(file);
          } catch {
            thumbnail = undefined;
          }
        }

        const type: ProductMediaType = isVideo ? "video" : "image";

        return {
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          type,
          src: URL.createObjectURL(file),
          thumbnail,
          alt: file.name,
        };
      }),
    );

    setMedia((current) => [...current, ...newMedia]);

    if (newMedia[0]) {
      clearVideoOverlayTimeout();
      setActiveId(newMedia[0].id);
      setVideoPlaying(false);
      setShowVideoOverlay(true);
    }

    event.target.value = "";
  }

  useEffect(() => {
    return () => {
      clearVideoOverlayTimeout();
    };
  }, []);

  function handleSetPrimary(id: string) {
    setMedia((current) =>
      current.map((item) => ({
        ...item,
        isPrimary: item.id === id,
      })),
    );
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent>
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">{dictionary.title}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {dictionary.description}
              </p>
            </div>
            {/* Main media */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted/30 p-4">
              {activeMedia ? (
                activeMedia.type === "image" ? (
                  activeMedia.src.startsWith("blob:") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.alt}
                      className="size-full object-contain"
                    />
                  ) : (
                    <div
                      className="flex size-full items-center justify-center bg-muted/20"
                      style={{ color: activeMediaColor }}
                    >
                      <ProductImageIcon className="size-40" />
                    </div>
                  )
                ) : (
                  <div
                    className="group relative size-full"
                    onMouseMove={showVideoControls}
                    onMouseEnter={showVideoControls}
                    onMouseLeave={() => {
                      if (videoPlaying) {
                        clearVideoOverlayTimeout();
                        setShowVideoOverlay(false);
                      }
                    }}
                  >
                    <video
                      ref={videoRef}
                      key={activeMedia.id}
                      src={activeMedia.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="size-full object-contain"
                      onPlay={() => {
                        setVideoPlaying(true);
                        showVideoControlsWhilePlaying();
                      }}
                      onPause={() => {
                        setVideoPlaying(false);
                        setShowVideoOverlay(true);
                        clearVideoOverlayTimeout();
                      }}
                      onEnded={() => {
                        setVideoPlaying(false);
                        setShowVideoOverlay(true);
                        clearVideoOverlayTimeout();
                      }}
                    />

                    <button
                      type="button"
                      onClick={toggleVideoPlayback}
                      aria-label={videoPlaying ? "Pause video" : "Play video"}
                      className={cn(
                        "absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2",
                        "items-center justify-center rounded-full",
                        "bg-background/90 shadow-lg backdrop-blur-sm",
                        "transition-opacity duration-200",
                        showVideoOverlay
                          ? "opacity-100"
                          : "pointer-events-none opacity-0",
                      )}
                    >
                      {videoPlaying ? (
                        <Pause className="size-6 fill-current" />
                      ) : (
                        <Play className="ml-0.5 size-6 fill-current" />
                      )}
                    </button>
                  </div>
                )
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                  {dictionary.noMedia}
                </div>
              )}

              {/* Fullscreen */}
              {activeMedia?.type === "image" && (
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute right-3 top-3 shadow-sm"
                  aria-label="Open fullscreen"
                >
                  <Maximize2 />
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
            {/* Gallery */}
            <div className="flex flex-wrap gap-3 overflow-hidden bg-foreground/1 p-2 rounded-2xl">
              {media.map((item, index) => (
                <ProductMediaThumbnail
                  key={item.id}
                  media={item}
                  color={MEDIA_COLORS[index % MEDIA_COLORS.length]}
                  index={index}
                  active={item.id === activeId}
                  activeDropTarget={item.id === dropTargetMediaId}
                  onSelect={() => handleSelectMedia(item.id)}
                  onRemove={() => handleRemove(item.id)}
                  onSetPrimary={() => handleSetPrimary(item.id)}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(event) => handleDragOver(event, item.id)}
                  onDrop={() => handleDrop(item.id)}
                  dictionary={dictionary}
                />
              ))}
              {/* Add media */}
              <button
                type="button"
                onClick={handleAddMedia}
                className="flex size-[142px] shrink-0 items-center justify-center rounded-xl border border-dashed border-foreground/25 bg-muted/20 text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                aria-label="Add product media"
              >
                <Plus className="size-8 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductMediaLightbox
        media={activeMedia}
        mediaIndex={activeMediaIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </>
  );
}
