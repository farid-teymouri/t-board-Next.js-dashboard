import { NextResponse } from "next/server";

const reviewData = {
  contact: {
    email: "farid@example.com",
    phone: "0912 123 4567",
  },

  shippingAddress: {
    firstName: "فرید",
    lastName: "تیموری",
    address1:
      "خیابان ولیعصر، بلوار کریم خان، محله‌ی باغ فردوس، آپارتمان مالک ، طبقه اول، واحد دو",
    province: "تهران",
    city: "تهران",
    postcode: "1435812345",
  },

  shipping: {
    name: "تیپاکس",
    description: "۵ تا ۷ روز کاری",
    price: 412000,
    currency: "IRT",
  },

  payment: {
    type: "online",
    typeName: "پرداخت آنلاین",
    methodName: "زرین‌پال",
  },

  products: [
    {
      id: "product-001",
      name: {
        fa: "ژاکت مارگریتا",
        en: "Marguerita Jacket",
      },
      description: {
        fa: "ژاکت بدون آستین از خز مصنوعی به رنگ شکلاتی",
        en: "Chocolate faux fur sleeveless jacket",
      },
      image: "/images/related/related-001.jpg",
      price: 18999000,
      currency: "IRT",
      quantity: 1,
      size: {
        fa: "سایز S",
        en: "Size S",
      },
      color: {
        fa: "شکلاتی",
        en: "Chocolate",
      },
    },
    {
      id: "product-002",
      name: {
        fa: "بلوز بکا",
        en: "Beca Blouse",
      },
      description: {
        fa: "بلوز آزاد و روان به رنگ شیری با آستین‌های بلند",
        en: "Flowy off-white blouse with long sleeves",
      },
      image: "/images/related/related-002.jpg",
      price: 1795000,
      currency: "IRT",
      quantity: 1,
      size: {
        fa: "سایز M",
        en: "Size M",
      },
      color: {
        fa: "شیری",
        en: "Milky",
      },
    },
    {
      id: "product-003",
      name: {
        fa: "جین پیا",
        en: "Jean Pia",
      },
      description: {
        fa: "شلوار جین کتان آبی با فرم Barrel و سبک وینتیج",
        en: "Vintage blue cotton barrel jeans",
      },
      image: "/images/related/related-003.jpg",
      price: 1199000,
      currency: "IRT",
      quantity: 1,
      size: {
        fa: "سایز M",
        en: "Size M",
      },
      color: {
        fa: "آبی",
        en: "Blue",
      },
    },
  ],

  summary: {
    subtotal: 21993000,
    shipping: 412000,
    total: 22405000,
    currency: "IRT",
  },
};

export async function GET() {
  return NextResponse.json({
    data: reviewData,
  });
}
