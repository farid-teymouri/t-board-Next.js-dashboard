"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { SalesPerformanceResponse } from "@/types/dashboards/sales/performance";

interface PerformanceProps {
  locale: "en" | "fa";
  translations: {
    title: string;
    description: string;
    thisPeriod: string;
    previousPeriod: string;
    year: string;
    month: string;
    week: string;
    months: string[];
  };
}

type ZoomLevel = 12 | 6 | 4 | 3;

const ZOOM_LEVELS: ZoomLevel[] = [12, 6, 4, 3];

async function fetchPerformance(): Promise<SalesPerformanceResponse> {
  const response = await fetch(
    "/api/dashboards/sales/performance?period=month",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sales performance.");
  }

  return response.json();
}

function formatValue(value: number, locale: "en" | "fa") {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
    value,
  );
}
function PerformanceTooltip({
  active,
  payload,
  label,
  locale,
  translations,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    value?: number;
  }>;
  label?: number;
  locale: "en" | "fa";
  translations: PerformanceProps["translations"];
}) {
  if (!active || !payload?.length || typeof label !== "number") {
    return null;
  }

  const thisPeriod = payload.find(
    (item) => item.dataKey === "thisPeriod",
  )?.value;

  const previousPeriod = payload.find(
    (item) => item.dataKey === "previousPeriod",
  )?.value;

  return (
    <div className="min-w-[190px] overflow-hidden rounded-lg border bg-background p-0 shadow-xl">
      <div className="border-b px-3 py-2 text-sm font-medium">
        {translations.months[label - 1]}
      </div>
      <div className="space-y-2 px-3 py-3">
        <div className="flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-chart-3" />

            <span className="text-muted-foreground">
              {translations.thisPeriod}
            </span>
          </div>

          <span className="font-medium tabular-nums">
            {typeof thisPeriod === "number"
              ? formatValue(thisPeriod, locale)
              : "-"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-chart-2" />

            <span className="text-muted-foreground">
              {translations.previousPeriod}
            </span>
          </div>

          <span className="font-medium tabular-nums">
            {typeof previousPeriod === "number"
              ? formatValue(previousPeriod, locale)
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Performance({ locale, translations }: PerformanceProps) {
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(12);
  const [centerIndex, setCenterIndex] = useState(5);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboards", "sales", "performance", locale],
    queryFn: fetchPerformance,
    staleTime: 5 * 60 * 1000,
  });

  /*

* Capture the wheel event natively with a non-passive listener.
*
* This is important because React's synthetic wheel handler alone
* does not reliably prevent the browser document from scrolling.
  */
  useEffect(() => {
    const element = chartContainerRef.current;

    if (!element) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!data?.data?.length) {
        return;
      }

      const element = chartContainerRef.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();

      // Position of the mouse inside the chart container (0 → 1)
      const relativeX = Math.max(
        0,
        Math.min(event.clientX - rect.left, rect.width),
      );

      const position = rect.width > 0 ? relativeX / rect.width : 0;

      setZoomLevel((currentZoom) => {
        const currentIndex = ZOOM_LEVELS.indexOf(currentZoom);

        let nextZoom = currentZoom;

        // Scroll up → Zoom in
        if (event.deltaY < 0) {
          if (currentIndex >= ZOOM_LEVELS.length - 1) {
            return currentZoom;
          }

          nextZoom = ZOOM_LEVELS[currentIndex + 1];
        }

        // Scroll down → Zoom out
        if (event.deltaY > 0) {
          if (currentIndex <= 0) {
            return currentZoom;
          }

          nextZoom = ZOOM_LEVELS[currentIndex - 1];
        }

        if (nextZoom === currentZoom) {
          return currentZoom;
        }

        const total = data.data.length;

        // Current visible range
        let currentStart = centerIndex - Math.floor(currentZoom / 2);
        let currentEnd = currentStart + currentZoom;

        if (currentStart < 0) {
          currentStart = 0;
          currentEnd = currentZoom;
        }

        if (currentEnd > total) {
          currentEnd = total;
          currentStart = total - currentZoom;
        }

        const currentVisibleCount = currentEnd - currentStart;

        // Find the data index under the mouse
        const pointerOffset = Math.round(
          position * Math.max(currentVisibleCount - 1, 0),
        );

        const pointerIndex = Math.max(
          0,
          Math.min(currentStart + pointerOffset, total - 1),
        );

        // Keep the mouse position as the center of the next zoom
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
  }, [data, centerIndex]);

  const visibleData = useMemo(() => {
    if (!data?.data?.length) {
      return [];
    }

    const total = data.data.length;

    if (zoomLevel >= total) {
      return data.data;
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

    return data.data.slice(start, end);
  }, [data, zoomLevel, centerIndex]);

  function handlePeriodChange(period: "year" | "month" | "week") {
    if (period !== "month") {
      return;
    }

    setZoomLevel(12);
    setCenterIndex(5);
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded-md bg-muted/50" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-base font-semibold">{translations.title} </h3>
          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Unable to load performance data.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">{translations.title} </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {translations.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center rounded-lg border p-0.5 py-1 gap-1">
            <button
              type="button"
              disabled
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground/50 cursor-pointer hover:bg-secondary hover:text-foreground"
            >
              {translations.year}
            </button>

            <button
              type="button"
              onClick={() => handlePeriodChange("month")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                "bg-primary text-primary-foreground",
              )}
            >
              {translations.month}
            </button>

            <button
              type="button"
              disabled
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground/50 cursor-pointer hover:bg-secondary hover:text-foreground"
            >
              {translations.week}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={chartContainerRef}
          className="select-none overscroll-contain min-w-0"
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          <div className="h-[360px] min-h-[360px] min-w-0 w-full">
            <ResponsiveContainer width="100%" height={360} minWidth={0}>
              <AreaChart
                data={visibleData}
                margin={{
                  top: 12,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="performance-this-period"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-chart-3)"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--color-chart-3)"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="performance-previous-period"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="100%"
                      stopColor="var(--color-chart-2)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="1 12"
                  className="stroke-ring/50"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{
                    fontSize: 12,
                  }}
                  tickFormatter={(month: number) =>
                    locale === "fa"
                      ? new Intl.NumberFormat("fa-IR").format(month)
                      : month.toString()
                  }
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={14}
                  tickMargin={8}
                  tick={{
                    fontSize: 13,
                    fill: "var(--ring)",
                  }}
                  tickFormatter={(value: number) => {
                    const number = Math.round(value / 1000);

                    if (number === 0) {
                      return locale === "fa" ? "۰" : "0";
                    }

                    return locale === "fa"
                      ? `${new Intl.NumberFormat("fa-IR").format(number)} هزار`
                      : `${new Intl.NumberFormat("en-US").format(number)}k`;
                  }}
                />

                <Tooltip
                  cursor={{
                    stroke: "var(--color-muted-foreground)",
                    strokeDasharray: "4 4",
                  }}
                  content={
                    <PerformanceTooltip
                      locale={locale}
                      translations={translations}
                    />
                  }
                />

                <Area
                  type="monotone"
                  dataKey="previousPeriod"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="url(#performance-previous-period)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />

                <Area
                  type="monotone"
                  dataKey="thisPeriod"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2.5}
                  fill="url(#performance-this-period)"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-chart-3" />

              <span>{translations.thisPeriod}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-chart-2" />

              <span>{translations.previousPeriod}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
