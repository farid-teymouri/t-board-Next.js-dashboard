"use client";

import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { apiGet } from "@/lib/api/client";

import type { VisitorDevicesResponse } from "@/types/dashboards/sales/visitor-devices";
import type { SalesDashboardDictionary } from "@/i18n/dictionaries";

type VisitorDevicesProps = {
  locale: "fa" | "en";
  translations: SalesDashboardDictionary["visitorDevices"];
};

function VisitorDevicesSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="items-center pb-0">
        <div className="h-5 w-44 animate-pulse rounded bg-muted" />

        <div className="mt-2 h-4 w-56 animate-pulse rounded bg-muted" />
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full max-w-[250px]">
          <div className="absolute inset-8 animate-pulse rounded-full border-20 border-muted" />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />

            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </CardContent>

      <div className="grid grid-cols-3 gap-4 border-t px-6 py-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function VisitorDevicesError() {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-[420px] items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">
          Unable to load visitor device data.
        </p>
      </CardContent>
    </Card>
  );
}

export function VisitorDevices({ locale, translations }: VisitorDevicesProps) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["dashboards", "sales", "visitor-devices", locale],

    queryFn: () =>
      apiGet<VisitorDevicesResponse>("/api/dashboards/sales/visitor-devices"),

    staleTime: 5 * 60 * 1000,
  });

  if (isPending) {
    return <VisitorDevicesSkeleton />;
  }

  if (isError || !data) {
    return <VisitorDevicesError />;
  }

  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");

  const totalVisitors = data.totalVisitors;

  const mobilePercentage = (data.devices.mobile / totalVisitors) * 100;

  const desktopPercentage = (data.devices.desktop / totalVisitors) * 100;

  const tabletPercentage = (data.devices.tablet / totalVisitors) * 100;

  const chartConfig = {
    mobile: {
      label: translations.mobile,
      color: "var(--chart-2)",
    },

    desktop: {
      label: translations.desktop,
      color: "var(--chart-4)",
    },

    tablet: {
      label: translations.tablet,
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      name: "mobile",
      value: mobilePercentage,
      visitors: data.devices.mobile,
      fill: chartConfig.mobile.color,
    },

    {
      name: "desktop",
      value: desktopPercentage,
      visitors: data.devices.desktop,
      fill: chartConfig.desktop.color,
    },

    {
      name: "tablet",
      value: tabletPercentage,
      visitors: data.devices.tablet,
      fill: chartConfig.tablet.color,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader
        className={`pb-0 ${
          locale === "fa" ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <CardTitle className="text-base font-display">
          {translations.title}
        </CardTitle>

        <CardDescription>{translations.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-2">
        <div className="relative size-[260px] min-w-0 min-h-0 shrink-0">
          <ChartContainer
            config={chartConfig}
            className="size-[260px] min-w-0 min-h-0"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, _name, item) => {
                      const key = item?.payload?.name;

                      const config =
                        typeof key === "string"
                          ? chartConfig[key as keyof typeof chartConfig]
                          : undefined;

                      return (
                        <div className="flex min-w-[160px] items-center justify-between gap-4">
                          <span className="text-muted-foreground">
                            {config?.label ?? ""}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="font-medium tabular-nums">
                              {formatter.format(
                                Number(item?.payload?.visitors ?? 0),
                              )}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {formatter.format(Number(value))}%
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                }
              />

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                startAngle={90}
                endAngle={-270}
                innerRadius={78}
                outerRadius={108}
                paddingAngle={2}
                stroke="none"
              />
            </PieChart>
          </ChartContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold leading-none tabular-nums">
              {formatter.format(totalVisitors)}
            </span>

            <span className="mt-2 text-xs text-muted-foreground">
              {translations.visitors}
            </span>
          </div>
        </div>
      </CardContent>

      <div
        dir={locale === "fa" ? "rtl" : "ltr"}
        className="grid grid-cols-3 gap-4 border-t px-6 py-4"
      >
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-chart-2" />

            <span className="truncate text-xs text-muted-foreground">
              {translations.mobile}
            </span>
          </div>

          <span className="text-sm font-semibold tabular-nums">
            {formatter.format(data.devices.mobile)}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-chart-4" />

            <span className="truncate text-xs text-muted-foreground">
              {translations.desktop}
            </span>
          </div>

          <span className="text-sm font-semibold tabular-nums">
            {formatter.format(data.devices.desktop)}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-chart-5" />

            <span className="truncate text-xs text-muted-foreground">
              {translations.tablet}
            </span>
          </div>

          <span className="text-sm font-semibold tabular-nums">
            {formatter.format(data.devices.tablet)}
          </span>
        </div>
      </div>
    </Card>
  );
}
