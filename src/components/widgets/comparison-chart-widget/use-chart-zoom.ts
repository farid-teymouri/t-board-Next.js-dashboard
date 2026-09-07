"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ZoomLevel = 12 | 6 | 4 | 3;

const ZOOM_LEVELS: ZoomLevel[] = [12, 6, 4, 3];

export function useChartZoom<T>(data: T[]) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(12);
  const [centerIndex, setCenterIndex] = useState(5);

  const containerRef = useRef<HTMLDivElement>(null);

  const visibleData = useMemo(() => {
    if (!data.length) {
      return [];
    }

    const total = data.length;

    if (zoomLevel >= total) {
      return data;
    }

    const half = Math.floor(zoomLevel / 2);

    let start = centerIndex - half;
    let end = start + zoomLevel;

    if (start < 0) {
      start = 0;
      end = zoomLevel;
    }

    if (end > total) {
      end = total;
      start = total - zoomLevel;
    }

    return data.slice(start, end);
  }, [data, zoomLevel, centerIndex]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || data.length <= 1) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const rect = container.getBoundingClientRect();

      const pointerRatio = Math.min(
        1,
        Math.max(0, (event.clientX - rect.left) / rect.width),
      );

      const currentZoom = Math.min(zoomLevel, data.length);

      const currentHalf = currentZoom / 2;

      let currentStart = centerIndex - currentHalf;

      if (currentStart < 0) {
        currentStart = 0;
      }

      if (currentStart + currentZoom > data.length) {
        currentStart = data.length - currentZoom;
      }

      const pointerIndex = Math.round(
        currentStart + pointerRatio * Math.max(currentZoom - 1, 0),
      );

      setZoomLevel((current) => {
        const currentIndex = ZOOM_LEVELS.indexOf(current);

        const nextIndex =
          event.deltaY < 0 ? currentIndex + 1 : currentIndex - 1;

        const nextZoom = ZOOM_LEVELS[nextIndex];

        if (!nextZoom) {
          return current;
        }

        const actualNextZoom = Math.min(nextZoom, data.length) as ZoomLevel;

        setCenterIndex(Math.min(data.length - 1, Math.max(0, pointerIndex)));

        return actualNextZoom;
      });
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel, true);
    };
  }, [data.length, zoomLevel, centerIndex]);

  return {
    containerRef,
    visibleData,
    zoomLevel,
    centerIndex,
    setCenterIndex,
    setZoomLevel,
  };
}
