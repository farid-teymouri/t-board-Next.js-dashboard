import { NextResponse } from "next/server";

import type { ProductMedia } from "@/modules/ecommerce/product-details/widgets/product-media/types";

const media: ProductMedia[] = [
  {
    id: "media-1",
    type: "image",
    src: "/mock/ecommerce/product-details/product-1.jpeg",
    alt: "Valou Jacket - Front View",
    isPrimary: true,
  },
  {
    id: "media-2",
    type: "image",
    src: "/mock/ecommerce/product-details/product-2.jpeg",
    alt: "Valou Jacket - Side View",
    isPrimary: false,
  },
  {
    id: "media-6",
    type: "video",
    src: "/mock/ecommerce/product-details/valou-jacket-lifestyle.mp4",
    alt: "Valou Jacket - Lifestyle Video",
    isPrimary: false,
  },
  {
    id: "media-3",
    type: "image",
    src: "/mock/ecommerce/product-details/product-3.jpeg",
    alt: "Valou Jacket - Back View",
    isPrimary: false,
  },
  {
    id: "media-4",
    type: "image",
    src: "/mock/ecommerce/product-details/product-4.jpeg",
    alt: "Valou Jacket - Detail View",
    isPrimary: false,
  },
  {
    id: "media-5",
    type: "image",
    src: "/mock/ecommerce/product-details/product-5.jpeg",
    alt: "Valou Jacket - Lifestyle",
    isPrimary: false,
  },
];

export async function GET() {
  return NextResponse.json(media);
}
