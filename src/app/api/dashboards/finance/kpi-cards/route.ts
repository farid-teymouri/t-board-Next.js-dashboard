import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      {
        id: "total-balance",
        value: 284600000,
        valueType: "currency",
        currency: "IRT",
        change: {
          value: 3.1,
          direction: "up",
          tone: "positive",
        },
        chart: [
          { value: 152000000 },
          { value: 165500000 },
          { value: 174000000 },
          { value: 188500000 },
          { value: 161000000 },
          { value: 209500000 },
          { value: 206500000 },
          { value: 220000000 },
          { value: 239500000 },
          { value: 246500000 },
          { value: 261000000 },
          { value: 284600000 },
        ],
      },

      {
        id: "monthly-income",
        value: 128400000,
        valueType: "currency",
        currency: "IRT",
        change: {
          value: 4.0,
          direction: "up",
          tone: "positive",
        },
        chart: [
          { value: 78000000 },
          { value: 86500000 },
          { value: 82000000 },
          { value: 97000000 },
          { value: 91000000 },
          { value: 108500000 },
          { value: 102000000 },
          { value: 116500000 },
          { value: 111000000 },
          { value: 124500000 },
          { value: 119000000 },
          { value: 128400000 },
        ],
      },

      {
        id: "monthly-expenses",
        value: 74600000,
        valueType: "currency",
        currency: "IRT",
        change: {
          value: 6.7,
          direction: "down",
          tone: "negative",
        },
        chart: [
          { value: 42000000 },
          { value: 51500000 },
          { value: 47800000 },
          { value: 63200000 },
          { value: 55800000 },
          { value: 69400000 },
          { value: 61200000 },
          { value: 78100000 },
          { value: 66800000 },
          { value: 82400000 },
          { value: 70500000 },
          { value: 74600000 },
        ],
      },

      {
        id: "net-savings-rate",
        value: 41.9,
        valueType: "percentage",
        change: {
          value: 1.5,
          direction: "up",
          tone: "positive",
        },
        chart: [
          { value: 32.4 },
          { value: 35.8 },
          { value: 34.1 },
          { value: 37.6 },
          { value: 36.2 },
          { value: 39.8 },
          { value: 38.1 },
          { value: 42.4 },
          { value: 40.3 },
          { value: 44.1 },
          { value: 40.8 },
          { value: 41.9 },
        ],
      },
    ],
  });
}
