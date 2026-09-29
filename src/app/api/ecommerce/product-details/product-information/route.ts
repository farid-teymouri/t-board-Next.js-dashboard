import { NextResponse } from "next/server";

import type { ProductInformation } from "@/modules/ecommerce/product-details/widgets/product-information/types";

const productInformation: ProductInformation = {
  description: {
    paragraphs: [
      {
        fa: "چراغ رومیزی آلومینیومی آرورا با تمرکز بر طراحی مینیمال، کیفیت ساخت بالا و ایجاد نور مناسب برای کار و مطالعه طراحی شده است. بدنه محصول از آلومینیوم ماشین‌کاری‌شده ساخته شده و در کنار ظاهر ساده و مدرن، استحکام و دوام مناسبی را فراهم می‌کند.",
        en: "The Aurora Aluminium Task Lamp is designed around a minimalist form, high-quality construction, and comfortable lighting for focused work and reading. Its body is made from precision-machined aluminium, providing a clean and modern appearance while maintaining a durable and solid structure.",
      },
      {
        fa: "بازوی مفصلی مغناطیسی امکان تنظیم زاویه تابش را در اختیار کاربر قرار می‌دهد و سیستم LED نیز امکان تنظیم شدت نور و دمای رنگ را فراهم می‌کند. به همین دلیل می‌توان نور را متناسب با موقعیت میز و نوع استفاده تنظیم کرد.",
        en: "The magnetic articulating arm allows the lighting angle to be adjusted easily, while the LED system provides adjustable brightness and color temperature. This makes it possible to direct and tune the light according to the desk position and the user's needs.",
      },
    ],

    features: [
      {
        fa: "بدنه ساخته‌شده از آلومینیوم ماشین‌کاری‌شده با طراحی مینیمال",
        en: "Precision-machined aluminium body with a minimalist design",
      },
      {
        fa: "تنظیم شدت نور برای استفاده در شرایط مختلف",
        en: "Adjustable brightness for different lighting conditions",
      },
      {
        fa: "تنظیم دمای رنگ از ۲۷۰۰ تا ۴۰۰۰ کلوین",
        en: "Tunable color temperature from 2700K to 4000K",
      },
      {
        fa: "بازوی مفصلی مغناطیسی برای تنظیم آسان زاویه نور",
        en: "Magnetic articulating arm for easy light positioning",
      },
      {
        fa: "پایه مجهز به عبوردهی USB-C برای مدیریت بهتر کابل",
        en: "USB-C passthrough base for easier cable management",
      },
    ],
  },

  specifications: [
    {
      label: {
        fa: "جنس بدنه",
        en: "Body Material",
      },
      value: {
        fa: "آلومینیوم ماشین‌کاری‌شده",
        en: "Machined Aluminium",
      },
    },
    {
      label: {
        fa: "کشور سازنده",
        en: "Country of Manufacture",
      },
      value: {
        fa: "ایران",
        en: "Iran",
      },
    },
    {
      label: {
        fa: "نوع لامپ",
        en: "Light Type",
      },
      value: {
        fa: "LED",
        en: "LED",
      },
    },
    {
      label: {
        fa: "دمای رنگ",
        en: "Color Temperature",
      },
      value: {
        fa: "۲۷۰۰ تا ۴۰۰۰ کلوین",
        en: "2700K–4000K",
      },
    },
    {
      label: {
        fa: "توان مصرفی",
        en: "Power Consumption",
      },
      value: {
        fa: "۱۲ وات",
        en: "12W",
      },
    },
    {
      label: {
        fa: "نوع اتصال",
        en: "Connection Type",
      },
      value: {
        fa: "USB-C",
        en: "USB-C",
      },
    },
    {
      label: {
        fa: "قابلیت تنظیم نور",
        en: "Dimming",
      },
      value: {
        fa: "دارد",
        en: "Yes",
      },
    },
    {
      label: {
        fa: "وزن",
        en: "Weight",
      },
      value: {
        fa: "۱.۸ کیلوگرم",
        en: "1.8 kg",
      },
    },
  ],

  additionalInformation: [
    {
      label: {
        fa: "نوع نصب",
        en: "Installation Type",
      },
      value: {
        fa: "رومیزی",
        en: "Desk Mounted",
      },
    },
    {
      label: {
        fa: "محتویات بسته",
        en: "Package Contents",
      },
      value: {
        fa: "چراغ، پایه، کابل USB-C و دفترچه راهنما",
        en: "Lamp, base, USB-C cable, and user manual",
      },
    },
    {
      label: {
        fa: "کاربری پیشنهادی",
        en: "Recommended Use",
      },
      value: {
        fa: "کار، مطالعه و استفاده روزمره",
        en: "Work, reading, and everyday use",
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
      rating: 4,
      date: "2026-09-24",
      verified: true,
      content: {
        fa: "محصول بسیار خوبی است و کیفیت ساخت آن کاملاً قابل قبول است.",
        en: "Really nice product with excellent build quality. It works very well for my desk.",
      },
      helpfulCount: 24,
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
        fa: "طراحی محصول خیلی خوب است و نور آن برای کار طولانی مدت مناسب است.",
        en: "The design is excellent and the light works really well for long working sessions.",
      },
      helpfulCount: 18,
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
        fa: "ظاهر ساده و کیفیت خوبی دارد. تنظیم شدت نور هم بسیار کاربردی است.",
        en: "Simple design and good quality. The brightness adjustment is also very useful.",
      },
      helpfulCount: 12,
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
        fa: "برای میز کار من انتخاب بسیار خوبی بود و از خرید آن راضی هستم.",
        en: "It has been a great addition to my desk and I am very happy with the purchase.",
      },
      helpfulCount: 9,
    },
  ],
  vendor: {
    name: {
      fa: "مغازه آنلاین من",
      en: "My Online Store",
    },
    logo: "/images/vendors/my-online-store.jpeg",
    rating: 4.8,
    reviewCount: 32,
    address: "قشم، دریاکنار، پاساژ آفتاب، فروشگاه ۱۲",
    phone: "0098 021 000 0000",
    instagram: "@my_online_store",
    telegram: "@my_online_store",
    description: {
      fa: "مغازه آنلاین من فعالیت خود را با علاقه به طراحی، نورپردازی و ساخت محصولات کاربردی برای فضای کار آغاز کرد. هدف ما از ابتدا ارائه محصولاتی بوده است که علاوه بر ظاهر ساده و مدرن، کیفیت ساخت و تجربه استفاده خوبی داشته باشند. در طول این سال‌ها تلاش کرده‌ایم با شناخت نیازهای مشتریان و توجه به جزئیات، مجموعه‌ای از محصولات کاربردی و متفاوت را ارائه کنیم و مسیر خود را با تمرکز بر کیفیت و رضایت مشتری ادامه دهیم.",
      en: "My Online Store started with a passion for design, lighting, and creating practical products for modern workspaces. From the beginning, our goal has been to offer products that combine a clean, modern appearance with reliable build quality and a great user experience. Over the years, we have focused on understanding our customers' needs, paying attention to details, and building a collection of practical products that we are proud to offer.",
    },
  },
};

export async function GET() {
  return NextResponse.json(productInformation);
}
