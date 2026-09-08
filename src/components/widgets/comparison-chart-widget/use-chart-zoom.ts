"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const MIN_ZOOM_LEVEL = 3;

function getZoomLevels(total: number) {
  if (total <= MIN_ZOOM_LEVEL) {
    return [total];
  }

  const levels = new Set<number>([
    total,
    Math.ceil(total / 2),
    Math.ceil(total / 3),
    MIN_ZOOM_LEVEL,
  ]);

  return Array.from(levels)
    .filter((level) => level >= MIN_ZOOM_LEVEL && level <= total)
    .sort((a, b) => b - a);
}

export function useChartZoom<T>(data: T[]) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const zoomLevels = useMemo(() => getZoomLevels(data.length), [data.length]);

  const [zoomLevel, setZoomLevel] = useState(data.length);

  const [centerIndex, setCenterIndex] = useState(() =>
    Math.max(0, Math.floor((data.length - 1) / 2)),
  );

  const effectiveZoomLevel = Math.min(zoomLevel, data.length);

  const effectiveCenterIndex = Math.min(
    Math.max(0, centerIndex),
    Math.max(0, data.length - 1),
  );

  const visibleData = useMemo(() => {
    if (!data.length) {
      return [];
    }

    if (effectiveZoomLevel >= data.length) {
      return data;
    }

    const half = Math.floor(effectiveZoomLevel / 2);

    let start = effectiveCenterIndex - half;
    let end = start + effectiveZoomLevel;

    if (start < 0) {
      start = 0;
      end = effectiveZoomLevel;
    }

    if (end > data.length) {
      end = data.length;
      start = Math.max(0, data.length - effectiveZoomLevel);
    }

    return data.slice(start, end);
  }, [data, effectiveZoomLevel, effectiveCenterIndex]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || data.length <= MIN_ZOOM_LEVEL) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const rect = container.getBoundingClientRect();

      const pointerRatio = Math.min(
        1,
        Math.max(0, (event.clientX - rect.left) / rect.width),
      );

      const currentZoom = Math.min(effectiveZoomLevel, data.length);

      let currentStart = effectiveCenterIndex - Math.floor(currentZoom / 2);

      if (currentStart < 0) {
        currentStart = 0;
      }

      if (currentStart + currentZoom > data.length) {
        currentStart = Math.max(0, data.length - currentZoom);
      }

      const pointerIndex = Math.round(
        currentStart + pointerRatio * Math.max(currentZoom - 1, 0),
      );

      const currentIndex = zoomLevels.indexOf(currentZoom);

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = event.deltaY < 0 ? currentIndex + 1 : currentIndex - 1;

      const nextZoom = zoomLevels[nextIndex];

      if (!nextZoom) {
        return;
      }

      setCenterIndex(Math.min(data.length - 1, Math.max(0, pointerIndex)));

      setZoomLevel(nextZoom);
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [data.length, effectiveZoomLevel, effectiveCenterIndex, zoomLevels]);

  return {
    containerRef,
    visibleData,
    zoomLevel: effectiveZoomLevel,
    centerIndex: effectiveCenterIndex,
    setCenterIndex,
    setZoomLevel,
  };
}
