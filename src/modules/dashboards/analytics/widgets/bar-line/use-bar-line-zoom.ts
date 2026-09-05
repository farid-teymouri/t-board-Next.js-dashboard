"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ZoomLevel = 12 | 6 | 4 | 3;

const ZOOM_LEVELS: ZoomLevel[] = [12, 6, 4, 3];

interface UseBarLineZoomOptions {
  dataLength: number;
}

export function useBarLineZoom({ dataLength }: UseBarLineZoomOptions) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(12);
  const [centerIndex, setCenterIndex] = useState(5);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element || dataLength === 0) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const rect = element.getBoundingClientRect();

      const relativeX = Math.max(
        0,
        Math.min(event.clientX - rect.left, rect.width),
      );

      const position = rect.width > 0 ? relativeX / rect.width : 0;

      setZoomLevel((currentZoom) => {
        const currentZoomIndex = ZOOM_LEVELS.indexOf(currentZoom);

        let nextZoom: ZoomLevel = currentZoom;

        // Scroll up → Zoom In
        if (event.deltaY < 0) {
          if (currentZoomIndex < ZOOM_LEVELS.length - 1) {
            nextZoom = ZOOM_LEVELS[currentZoomIndex + 1];
          }
        }

        // Scroll down → Zoom Out
        if (event.deltaY > 0) {
          if (currentZoomIndex > 0) {
            nextZoom = ZOOM_LEVELS[currentZoomIndex - 1];
          }
        }

        // No zoom level change.
        if (nextZoom === currentZoom) {
          return currentZoom;
        }

        // Find the data index currently under the mouse.
        let currentStart = centerIndex - Math.floor(currentZoom / 2);
        let currentEnd = currentStart + currentZoom;

        if (currentStart < 0) {
          currentStart = 0;
          currentEnd = currentZoom;
        }

        if (currentEnd > dataLength) {
          currentEnd = dataLength;
          currentStart = dataLength - currentZoom;
        }

        const currentVisibleCount = currentEnd - currentStart;

        const pointerOffset = Math.round(
          position * Math.max(currentVisibleCount - 1, 0),
        );

        const pointerIndex = Math.max(
          0,
          Math.min(currentStart + pointerOffset, dataLength - 1),
        );

        // Keep the mouse position as the center of the next zoom level.
        setCenterIndex(pointerIndex);

        return nextZoom;
      });
    };

    element.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      element.removeEventListener("wheel", handleWheel, {
        capture: true,
      });
    };
  }, [centerIndex, dataLength]);

  const visibleRange = useMemo(() => {
    if (dataLength === 0) {
      return {
        start: 0,
        end: 0,
      };
    }

    if (zoomLevel >= dataLength) {
      return {
        start: 0,
        end: dataLength,
      };
    }

    const half = Math.floor(zoomLevel / 2);

    let start = centerIndex - half;
    let end = start + zoomLevel;

    if (start < 0) {
      start = 0;
      end = zoomLevel;
    }

    if (end > dataLength) {
      end = dataLength;
      start = dataLength - zoomLevel;
    }

    return {
      start,
      end,
    };
  }, [dataLength, zoomLevel, centerIndex]);

  return {
    containerRef,
    visibleRange,
    zoomLevel,
  };
}
