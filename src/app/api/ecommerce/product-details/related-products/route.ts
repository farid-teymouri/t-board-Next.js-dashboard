import { NextResponse } from "next/server";

import type { RelatedProductsData } from "@/modules/ecommerce/product-details/widgets/related-products/types";

const relatedProducts: RelatedProductsData = {
  products: [
    {
      id: "related-001",
      name: {
        fa: "ژاکت مارگریتا",
        en: "Marguerita Jacket",
      },
      description: {
        fa: "ژاکت بدون آستین از خز مصنوعی به رنگ شکلاتی",
        en: "Chocolate faux fur sleeveless jacket",
      },
      category: {
        fa: "لباس‌های بیرونی",
        en: "Outerwear",
      },
      price: 18999000,
      rating: 4.8,
      reviews: 124,
      badges: [
        {
          type: "new",
          label: {
            fa: "جدید",
            en: "New",
          },
          className: "bg-chart-3 text-chart-3",
        },
      ],
      image: "/images/related/related-001.jpg",
    },

    {
      id: "related-002",
      name: {
        fa: "بلوز بکا",
        en: "Beca Blouse",
      },
      description: {
        fa: "بلوز آزاد و روان به رنگ شیری با آستین‌های بلند",
        en: "Flowy off-white blouse with long sleeves",
      },
      category: {
        fa: "تاپ و بلوز",
        en: "Tops",
      },
      price: 1795000,
      rating: 4.6,
      reviews: 86,
      badges: [
        {
          type: "bestseller",
          label: {
            fa: "پرفروش",
            en: "Bestseller",
          },
          className: "bg-chart-3 text-chart-3",
        },
      ],
      image: "/images/related/related-002.jpg",
    },

    {
      id: "related-003",
      name: {
        fa: "جین پیا",
        en: "Jean Pia",
      },
      description: {
        fa: "شلوار جین کتان آبی با فرم Barrel و سبک وینتیج",
        en: "Vintage blue cotton barrel jeans",
      },
      category: {
        fa: "شلوار جین",
        en: "Jeans",
      },
      price: 1199000,
      rating: 4.7,
      reviews: 92,
      badges: [],
      image: "/images/related/related-003.jpg",
    },

    {
      id: "related-004",
      name: {
        fa: "جین نیو جیس",
        en: "Jean New Jayce",
      },
      description: {
        fa: "شلوار جین راسته از کتان آبی خام",
        en: "Straight-leg jeans in raw blue cotton",
      },
      category: {
        fa: "شلوار جین",
        en: "Jeans",
      },
      price: 1200000,
      rating: 4.5,
      reviews: 75,
      badges: [
        {
          type: "discount",
          label: {
            fa: "۱۶٪ تخفیف",
            en: "-16%",
          },
          className: "bg-destructive text-destructive",
        },
      ],
      image: "/images/related/related-004.jpg",
    },

    {
      id: "related-005",
      name: {
        fa: "ژاکت نون",
        en: "Noun Cardigan",
      },
      description: {
        fa: "ژاکت بافتنی کرم‌رنگ با بافت راه‌راه و زیپ",
        en: "Cream ribbed knit zip-up vest",
      },
      category: {
        fa: "لباس‌های بافتنی",
        en: "Knitwear",
      },
      price: 980000,
      rating: 4.9,
      reviews: 140,
      badges: [],
      image: "/images/related/related-005.jpg",
    },

    {
      id: "related-006",
      name: {
        fa: "تاپ تارو",
        en: "Top Taro",
      },
      description: {
        fa: "تاپ آستین‌بلند به رنگ اکرو با یقه بلند",
        en: "Ecru long-sleeved top with a high neck",
      },
      category: {
        fa: "تاپ و بلوز",
        en: "Tops",
      },
      price: 1600000,
      rating: 4.4,
      reviews: 64,
      badges: [],
      image: "/images/related/related-006.jpg",
    },

    {
      id: "related-007",
      name: {
        fa: "پالتو میراندا",
        en: "Miranda Coat",
      },
      description: {
        fa: "پالتوی بلند از ترکیب پشم به رنگ شکلاتی",
        en: "Long coat in chocolate wool blend",
      },
      category: {
        fa: "پالتو و کت",
        en: "Coats",
      },
      price: 2400000,
      rating: 4.8,
      reviews: 112,
      badges: [
        {
          type: "new",
          label: {
            fa: "جدید",
            en: "New",
          },
          className: "bg-chart-3 text-chart-3",
        },
      ],
      image: "/images/related/related-007.jpg",
    },

    {
      id: "related-008",
      name: {
        fa: "شلوار پوزی",
        en: "Posy Pants",
      },
      description: {
        fa: "شلوار آزاد بنددار با نوارهای سفید در کناره‌ها",
        en: "Flowing drawstring trousers with white side stripes",
      },
      category: {
        fa: "شلوار",
        en: "Pants",
      },
      price: 8500000,
      rating: 4.5,
      reviews: 71,
      badges: [],
      image: "/images/related/related-008.jpg",
    },

    {
      id: "related-009",
      name: {
        fa: "پالتو کلودیا",
        en: "Claudia Coat",
      },
      description: {
        fa: "شنل پشمی خاکستری ملانژ با یقه پیراهنی",
        en: "Heather grey wool cape with a shirt collar",
      },
      category: {
        fa: "پالتو و کت",
        en: "Coats",
      },
      price: 2100000,
      rating: 4.7,
      reviews: 98,
      badges: [
        {
          type: "bestseller",
          label: {
            fa: "پرفروش",
            en: "Bestseller",
          },
          className: "bg-chart-3 text-chart-3",
        },
      ],
      image: "/images/related/related-009.jpg",
    },

    {
      id: "related-010",
      name: {
        fa: "شلوار پیر",
        en: "Pierre Pants",
      },
      description: {
        fa: "شلوار پاچه‌گشاد به رنگ شب",
        en: "Night flare pants",
      },
      category: {
        fa: "شلوار",
        en: "Pants",
      },
      price: 1400000,
      rating: 4.3,
      reviews: 52,
      badges: [],
      image: "/images/related/related-010.jpg",
    },

    {
      id: "related-011",
      name: {
        fa: "کمربند کراون",
        en: "Crown Belt",
      },
      description: {
        fa: "کمربند چرمی بافته‌شده به رنگ شکلاتی",
        en: "Chocolate braided leather belt",
      },
      category: {
        fa: "اکسسوری",
        en: "Accessories",
      },
      price: 1540000,
      rating: 4.6,
      reviews: 83,
      badges: [
        {
          type: "discount",
          label: {
            fa: "۱۶٪ تخفیف",
            en: "-16%",
          },
          className: "bg-destructive text-destructive",
        },
      ],
      image: "/images/related/related-011.jpg",
    },

    {
      id: "related-012",
      name: {
        fa: "پارکا پایا",
        en: "Parka Paia",
      },
      description: {
        fa: "پارکای کوتاه به رنگ شکلاتی",
        en: "Chocolate short parka",
      },
      category: {
        fa: "لباس‌های بیرونی",
        en: "Outerwear",
      },
      price: 1730000,
      rating: 4.7,
      reviews: 105,
      badges: [],
      image: "/images/related/related-012.jpg",
    },
  ],
};

export async function GET() {
  return NextResponse.json(relatedProducts);
}
