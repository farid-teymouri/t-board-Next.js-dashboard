import { NextResponse } from "next/server";

const shippingMethods = [
  {
    id: "tipax",
    name: "تیپاکس",
    description: "۱ تا ۵ روز کاری",
    price: 412000,
    currency: "IRT",
    logo: "/images/shipping/tipax-logo.svg",
    isDefault: true,
  },
  {
    id: "post-pishtaz",
    name: "پست پیشتاز",
    description: "۳ تا ۴ روز کاری",
    price: 100000,
    currency: "IRT",
    logo: "/images/shipping/post-iran.svg",
    isDefault: false,
  },
];

export async function GET() {
  return NextResponse.json({
    data: shippingMethods,
  });
}
