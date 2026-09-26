import { NextResponse } from "next/server";

import type { EcommerceProductDetailsData } from "@/types/ecommerce/product-details";

const productDetails: EcommerceProductDetailsData = {
  id: "prod-001",
  name: "Aurora Wireless Buds",
  sku: "AWB-2026",
  category: "Electronics",

  info: {
    brand: "Aurora",
    description:
      "Premium wireless earbuds with active noise cancellation, high-fidelity audio, and a compact charging case.",
    shortDescription:
      "Premium wireless earbuds with active noise cancellation.",
    status: "in-stock",
    condition: "new",
    tags: ["wireless", "audio", "bluetooth", "premium"],
  },

  pricing: {
    currency: "USD",
    price: 129.99,
    compareAtPrice: 159.99,
    discountPercentage: 19,
  },

  inventory: {
    stock: 124,
    reserved: 12,
    available: 112,
    lowStockThreshold: 20,
    warehouse: "Main Warehouse",
  },

  metrics: {
    views: 18420,
    orders: 438,
    unitsSold: 612,
    revenue: 79552.38,
    conversionRate: 2.38,
    averageRating: 4.7,
    reviewCount: 186,
  },

  sales: {
    totalUnitsSold: 612,
    totalRevenue: 79552.38,
    averageOrderValue: 129.99,
    data: [
      {
        date: "2026-09-01",
        sales: 18,
        revenue: 2339.82,
      },
      {
        date: "2026-09-02",
        sales: 24,
        revenue: 3119.76,
      },
      {
        date: "2026-09-03",
        sales: 21,
        revenue: 2729.79,
      },
      {
        date: "2026-09-04",
        sales: 31,
        revenue: 4029.69,
      },
      {
        date: "2026-09-05",
        sales: 28,
        revenue: 3639.72,
      },
      {
        date: "2026-09-06",
        sales: 35,
        revenue: 4549.65,
      },
      {
        date: "2026-09-07",
        sales: 29,
        revenue: 3769.71,
      },
    ],
  },

  attributes: [
    {
      id: "attr-1",
      label: "Color",
      value: "Midnight Black",
    },
    {
      id: "attr-2",
      label: "Connectivity",
      value: "Bluetooth 5.3",
    },
    {
      id: "attr-3",
      label: "Battery Life",
      value: "32 hours",
    },
    {
      id: "attr-4",
      label: "Noise Cancellation",
      value: "Active ANC",
    },
    {
      id: "attr-5",
      label: "Water Resistance",
      value: "IPX4",
    },
  ],

  media: [
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
  ],

  recentOrders: [
    {
      id: "ord-10482",
      customer: "Alex Morgan",
      quantity: 2,
      total: 259.98,
      currency: "USD",
      status: "completed",
      createdAt: "2026-09-25T14:32:00Z",
    },
    {
      id: "ord-10481",
      customer: "Sarah Wilson",
      quantity: 1,
      total: 129.99,
      currency: "USD",
      status: "processing",
      createdAt: "2026-09-25T11:18:00Z",
    },
    {
      id: "ord-10479",
      customer: "Daniel Carter",
      quantity: 3,
      total: 389.97,
      currency: "USD",
      status: "completed",
      createdAt: "2026-09-24T16:42:00Z",
    },
    {
      id: "ord-10476",
      customer: "Emma Thompson",
      quantity: 1,
      total: 129.99,
      currency: "USD",
      status: "refunded",
      createdAt: "2026-09-24T09:25:00Z",
    },
  ],
};

export async function GET() {
  return NextResponse.json(productDetails);
}
