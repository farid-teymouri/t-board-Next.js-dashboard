import { NextResponse } from "next/server";

import type { TopPage } from "@/types/dashboards/analytics/top-pages";

const data: TopPage[] = [
  {
    id: "1",
    path: "/",
    pageviews: 41820,
    avgTime: 108,
    bounce: 38.4,
    share: 100,
  },
  {
    id: "2",
    path: "/pricing",
    pageviews: 28740,
    avgTime: 96,
    bounce: 42.1,
    share: 68.7,
  },
  {
    id: "3",
    path: "/blog/scaling-aurora",
    pageviews: 21360,
    avgTime: 164,
    bounce: 31.8,
    share: 51.1,
  },
  {
    id: "4",
    path: "/signup",
    pageviews: 16820,
    avgTime: 72,
    bounce: 47.6,
    share: 40.2,
  },
  {
    id: "5",
    path: "/docs/api",
    pageviews: 12480,
    avgTime: 186,
    bounce: 28.5,
    share: 29.8,
  },
];
export async function GET() {
  return NextResponse.json({
    data,
  });
}
