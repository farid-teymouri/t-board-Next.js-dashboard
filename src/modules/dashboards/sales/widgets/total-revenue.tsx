"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { apiGet } from "@/lib/api/client";

import type { TotalRevenue } from "@/types/dashboards/sales/total-revenue";

type Props = {
  locale: "fa" | "en";
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function TotalRevenueSkeleton() {
  return (
    <Card className="pb-0 w-full sm:w-[385px] xl:w-full">
      <CardHeader>
        <div className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-9 w-36 animate-pulse rounded bg-muted" />
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[122px] animate-pulse rounded-md bg-muted/50 mb-3" />
      </CardContent>
    </Card>
  );
}
export function TotalRevenueWidget({ locale }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["dashboards", "sales", "total-revenue", locale],
    queryFn: () =>
      apiGet<TotalRevenue>(
        `/api/dashboards/sales/total-revenue?locale=${locale}`,
      ),
  });

  if (isPending) {
    return <TotalRevenueSkeleton />;
  }

  if (!data) {
    return null;
  }

  const formatter = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");

  return (
    <Card className="pb-0  h-full w-full sm:w-[385px] xl:w-full flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="rtl:text-right flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">{data.labels.title}</p>
            <h2 className=" text-3xl font-bold">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="sm:text-3xl text-xl  font-bold">
                  {formatter.format(data.totalRevenue)}
                </h2>

                <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium">
                  {data.currency.label}
                </span>
              </div>
            </h2>
            <p className="flex flex-wrap text-green-600 items-center gap-2">
              <span className="bg-background py-1 px-2 rounded-lg flex items-center gap-0">
                <ChevronUp className="h-4 w-4" />
                {formatter.format(data.growth)}%
              </span>

              <span className="text-muted-foreground">
                {data.labels.comparison}
              </span>
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[122px] w-full">
          <AreaChart
            data={data.points}
            margin={{
              top: 0,
              right: 18,
              left: 18,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} horizontal={false} />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `${formatter.format(Number(value))} ${data.currency.label}`
                  }
                />
              }
            />

            <Area
              dataKey="value"
              type="natural"
              stroke="var(--color-revenue)"
              fill="url(#fillRevenue)"
              fillOpacity={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
