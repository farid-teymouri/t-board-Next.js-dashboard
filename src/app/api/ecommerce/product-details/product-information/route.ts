import { NextResponse } from "next/server";

import type { ProductInformation } from "@/modules/ecommerce/product-details/widgets/product-information/types";

const productInformation: ProductInformation = {
  description: {
    paragraphs: [
      {
        fa: "ژاکت والُو، یکی از مدل‌های شاخص این برند، برای این فصل با خز مصنوعی نرم و لطیف به سبک تدی بازطراحی شده است. رنگ شکلاتی غنی این مدل، استایلی راحت و شیک به آن می‌بخشد و به‌راحتی با انواع لباس‌های روزمره هماهنگ می‌شود.",
        en: "Meet the VALOU jacket — a signature piece reimagined for the season. Crafted in irresistibly soft teddy-style faux fur and finished in a rich chocolate shade, it brings effortless style and cozy sophistication to every look.",
      },
      {
        fa: "یقه ایستاده و نوارهای کشباف، ظاهری مدرن و جذاب به ژاکت می‌دهند، در حالی که فرم کاربردی و همه‌کاره آن، این مدل را به گزینه‌ای ایده‌آل برای پوشیدن در طول روز تا شب تبدیل می‌کند. ژاکت والُو انتخابی راحت و شیک برای تکمیل استایل‌های روزمره است.",
        en: "The stand-up collar and ribbed trims add a modern edge, while its versatile silhouette makes it the perfect layer from day to night. Your everyday wardrobe just found its new favorite.",
      },
    ],

    features: [
      {
        fa: "ژاکت کوتاه از خز مصنوعی نرم به سبک تدی",
        en: "Short faux fur jacket",
      },
      {
        fa: "یقه ایستاده با حلقه‌های کمربند",
        en: "Stand-up collar with belt loops",
      },
      {
        fa: "بسته‌شدن با زیپ",
        en: "Zip closure",
      },
      {
        fa: "جیب‌های کناری کاربردی",
        en: "Side pockets",
      },
      {
        fa: "نوار کشباف در سرآستین‌ها و لبه پایینی",
        en: "Ribbed trim at the cuffs and hem",
      },
      {
        fa: "رنگ شکلاتی",
        en: "Chocolate color",
      },
    ],
  },

  specifications: [
    {
      label: {
        fa: "جنس",
        en: "Material",
      },
      value: {
        fa: "خز مصنوعی به سبک تدی",
        en: "Teddy-style faux fur",
      },
    },

    {
      label: {
        fa: "رنگ",
        en: "Color",
      },
      value: {
        fa: "شکلاتی",
        en: "Chocolate",
      },
    },

    {
      label: {
        fa: "مدل",
        en: "Style",
      },
      value: {
        fa: "ژاکت کوتاه",
        en: "Short jacket",
      },
    },

    {
      label: {
        fa: "نوع بسته‌شدن",
        en: "Closure Type",
      },
      value: {
        fa: "زیپ",
        en: "Zip",
      },
    },

    {
      label: {
        fa: "نوع یقه",
        en: "Collar Type",
      },
      value: {
        fa: "یقه ایستاده",
        en: "Stand-up collar",
      },
    },

    {
      label: {
        fa: "جیب‌ها",
        en: "Pockets",
      },
      value: {
        fa: "جیب‌های کناری",
        en: "Side pockets",
      },
    },

    {
      label: {
        fa: "جزئیات لبه‌ها",
        en: "Trim Details",
      },
      value: {
        fa: "نوار کشباف در سرآستین‌ها و لبه پایین",
        en: "Ribbed trim at cuffs and hem",
      },
    },

    {
      label: {
        fa: "مناسب برای",
        en: "Suitable For",
      },
      value: {
        fa: "استایل روزمره",
        en: "Everyday wear",
      },
    },
  ],

  additionalInformation: [
    {
      label: {
        fa: "نوع لباس",
        en: "Garment Type",
      },
      value: {
        fa: "ژاکت کوتاه",
        en: "Short jacket",
      },
    },

    {
      label: {
        fa: "مناسب برای",
        en: "Recommended Use",
      },
      value: {
        fa: "استفاده روزمره و استایل روز و شب",
        en: "Everyday wear and day-to-night styling",
      },
    },

    {
      label: {
        fa: "فصل",
        en: "Season",
      },
      value: {
        fa: "فصل جاری",
        en: "Current season",
      },
    },

    {
      label: {
        fa: "سبک",
        en: "Style",
      },
      value: {
        fa: "راحت و روزمره",
        en: "Casual and versatile",
      },
    },
  ],
  reviewCount: 128,

  rating: 4.5,

  ratingDistribution: {
    5: 96,
    4: 21,
    3: 7,
    2: 3,
    1: 1,
  },

  reviews: [
    {
      id: "review-001",

      user: {
        initials: "ZR",
        name: "Zahra Rezaei",
      },

      rating: 5,
      date: "2026-09-24",
      verified: true,

      content: {
        fa: "خیلی خوشگل‌تر از چیزیه که تو عکس به نظر میاد 😍 رنگ شکلاتیش واقعاً قشنگه و خیلی راحت با لباسای مختلف ست میشه.",
        en: "Honestly looks even better in person 😍 The chocolate color is gorgeous and it goes really well with so many outfits.",
      },

      helpfulCount: 31,
    },

    {
      id: "review-002",

      user: {
        initials: "AM",
        name: "Ali Mohammadi",
      },

      rating: 5,
      date: "2026-09-21",
      verified: true,

      content: {
        fa: "خیلی نرم و راحته. فکر می‌کردم یه کم سنگین باشه ولی اتفاقاً سبک‌تر از چیزی بود که انتظار داشتم.",
        en: "Really soft and comfortable. I thought it would feel heavy, but it's actually lighter than I expected.",
      },

      helpfulCount: 24,
    },

    {
      id: "review-003",

      user: {
        initials: "NS",
        name: "Nika Shafiei",
      },

      rating: 4,
      date: "2026-09-18",
      verified: true,

      content: {
        fa: "تنها چیزی که یکم اذیتم کرد اینه که آستین‌ها برای من کمی بلند بود، ولی خود ژاکت خیلی خوش‌فرمه و جنسش رو دوست داشتم.",
        en: "The sleeves were a little long for me, but the jacket has a really nice fit and I love the feel of the faux fur.",
      },

      helpfulCount: 18,
    },

    {
      id: "review-004",

      user: {
        initials: "RK",
        name: "Reza Karimi",
      },

      rating: 5,
      date: "2026-09-15",
      verified: false,

      content: {
        fa: "برای پاییز خیلی گزینه خوبیه. هم گرم و نرمه، هم اون‌قدر رسمی نیست که نتونی هر روز بپوشیش.",
        en: "Such a good jacket for fall. It's warm and soft without feeling too dressy for everyday wear.",
      },

      helpfulCount: 15,
    },

    {
      id: "review-005",

      user: {
        initials: "SM",
        name: "Sara Mohammadi",
      },

      rating: 5,
      date: "2026-09-12",
      verified: true,

      content: {
        fa: "من عاشق یقه و مدل کوتاهش شدم. با شلوار جین خیلی خوب میشه و رنگش هم دقیقاً همون چیزی بود که می‌خواستم.",
        en: "I love the collar and the cropped fit. It looks so good with jeans, and the color was exactly what I was hoping for.",
      },

      helpfulCount: 27,
    },

    {
      id: "review-006",

      user: {
        initials: "MP",
        name: "Maryam Pouri",
      },

      rating: 4,
      date: "2026-09-09",
      verified: true,

      content: {
        fa: "جنسش خیلی نرمه و ظاهرش هم شیکه. فقط کاش جیب‌ها یه مقدار بزرگ‌تر بودن، ولی در کل خیلی راضیم.",
        en: "The material is super soft and it looks really stylish. I just wish the pockets were a little bigger, but overall I'm very happy with it.",
      },

      helpfulCount: 21,
    },
  ],
  vendor: {
    name: {
      fa: "بوتیک زاپا",
      en: "ZAPA Boutique",
    },

    logo: "/images/vendors/my-online-store.jpeg",

    rating: 4.7,

    reviewCount: 86,

    address: "پاریس، فرانسه",

    phone: "+33 1 00 00 00 00",

    instagram: "@zapa_paris",

    telegram: "@zapa_paris",

    description: {
      fa: "بوتیک زاپا مجموعه‌ای از لباس‌های زنانه با تمرکز بر طراحی مدرن، کیفیت مناسب و استایل روزمره ارائه می‌کند. این مجموعه با انتخاب مدل‌هایی کاربردی و قابل استفاده در موقعیت‌های مختلف، تلاش می‌کند میان راحتی، ظاهر شیک و جزئیات طراحی تعادل ایجاد کند. ژاکت والُو نیز با فرم کوتاه، خز مصنوعی نرم و رنگ شکلاتی، یکی از مدل‌های این مجموعه برای استایل‌های روزمره و فصل سرد است.",

      en: "ZAPA Boutique offers a curated selection of women's clothing focused on modern design, quality, and everyday style. The collection brings together versatile pieces designed to balance comfort, effortless elegance, and thoughtful details. The Valou Jacket, with its short silhouette, soft faux fur, and rich chocolate color, is one of the collection's versatile pieces for everyday and cooler-season styling.",
    },
  },
};

export async function GET() {
  return NextResponse.json(productInformation);
}
