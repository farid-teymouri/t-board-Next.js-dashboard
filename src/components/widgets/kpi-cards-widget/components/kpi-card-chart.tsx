"use client";

import { Line, LineChart, Tooltip } from "recharts";

import type { KpiCardColor, KpiCardDataPoint } from "../types";

type KpiCardChartProps = {
  data: KpiCardDataPoint[];
  color: KpiCardColor;
};

export function KpiCardChart({ data, color }: KpiCardChartProps) {
  return (
    <div className="h-12 w-full min-w-0 overflow-hidden">
      <LineChart
        width={300}
        height={48}
        data={data}
        margin={{
          top: 4,
          right: 2,
          bottom: 2,
          left: 2,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Tooltip cursor={false} content={() => null} />

        <Line
          type="monotone"
          dataKey="value"
          stroke={`var(--${color})`}
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}
