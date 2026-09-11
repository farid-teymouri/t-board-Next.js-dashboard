import { NextResponse } from "next/server";

import type {
  RightNowGoal,
  RightNowPoint,
  RightNowResponse,
} from "@/types/dashboards/analytics/right-now";

const POINT_COUNT = 30;
const INTERVAL_MS = 2000;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function getLiveValue(timestamp: number) {
  const base = 180;
  const wave = Math.sin(timestamp / 8000) * 28;
  const secondaryWave = Math.sin(timestamp / 1700) * 8;

  return clamp(Math.round(base + wave + secondaryWave), 120, 260);
}

export async function GET() {
  const now = Date.now();

  const points: RightNowPoint[] = Array.from(
    { length: POINT_COUNT },
    (_, index) => {
      const timestamp = now - (POINT_COUNT - 1 - index) * INTERVAL_MS;

      return {
        timestamp: new Date(timestamp).toISOString(),
        value: getLiveValue(timestamp),
      };
    },
  );

  const currentPoint = points[points.length - 1];

  const goals: RightNowGoal[] = [
    {
      id: "newsletter",
      value: 82,
    },
    {
      id: "demo",
      value: 64,
    },
    {
      id: "checkout",
      value: 47,
    },
  ];

  const response: RightNowResponse = {
    currentValue: currentPoint.value,
    timestamp: currentPoint.timestamp,
    points,
    goals,
  };

  return NextResponse.json(response);
}
