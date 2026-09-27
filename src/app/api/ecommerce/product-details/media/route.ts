import { NextResponse } from "next/server";

import type { ProductMedia } from "@/types/ecommerce/product-details";

const media: ProductMedia[] = [
  {
    id: "media-1",
    type: "image",
    src: "/mock/ecommerce/product-details/product-image.svg",
    alt: "Aurora Wireless Buds - Front View",
    isPrimary: false,
  },
  {
    id: "media-2",
    type: "image",
    src: "/mock/ecommerce/product-details/product-image.svg",
    alt: "Aurora Wireless Buds - Side View",
    isPrimary: false,
  },
  {
    id: "media-3",
    type: "image",
    src: "/mock/ecommerce/product-details/product-image.svg",
    alt: "Aurora Wireless Buds - Product View",
    isPrimary: false,
  },
  {
    id: "media-4",
    type: "image",
    src: "/mock/ecommerce/product-details/product-image.svg",
    alt: "Aurora Wireless Buds - Lifestyle",
    isPrimary: false,
  },
  {
    id: "media-5",
    type: "image",
    src: "/mock/ecommerce/product-details/product-image.svg",
    alt: "Aurora Wireless Buds - Detail View",
    isPrimary: false,
  },
  {
    id: "media-6",
    type: "video",
    src: "/mock/ecommerce/product-details/nature-forest.mp4",
    alt: "Nature Forest Video",
    isPrimary: false,
  },
  {
    id: "media-7",
    type: "video",
    src: "/mock/ecommerce/product-details/nature-waterfall.mp4",
    alt: "Forest Waterfall Video",
    isPrimary: true,
  },
];

export async function GET() {
  return NextResponse.json(media);
}
