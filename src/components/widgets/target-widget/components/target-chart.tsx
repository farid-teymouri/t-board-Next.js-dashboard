"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type TargetChartProps = {
  percentage: number;
  locale: "fa" | "en";
  ofTarget: string;
};

export function TargetChart({
  percentage,
  locale,
  ofTarget,
}: TargetChartProps) {
  const chartData = [
    {
      name: "target",
      value: percentage,
      fill: "var(--color-target)",
    },
  ];

  const chartConfig = {
    target: {
      label: "Target",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const formattedPercentage = new Intl.NumberFormat(
    locale === "fa" ? "fa-IR" : "en-US",
    {
      maximumFractionDigits: 1,
    },
  )
    .format(percentage)
    .replace(/٫/g, "/");

  return (
    <div className="relative mx-auto size-38">
      <ChartContainer config={chartConfig} className="size-full">
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius="72%"
          outerRadius="100%"
          barSize={14}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <RadialBar dataKey="value" background cornerRadius={999} />
        </RadialBarChart>
      </ChartContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight">
          {formattedPercentage}%
        </span>

        <span className="text-muted-foreground text-sm">{ofTarget}</span>
      </div>
    </div>
  );
}
