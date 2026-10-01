import { NextResponse } from "next/server";

const paymentTypes = [
  {
    id: "online",
    name: "پرداخت آنلاین",
    description:
      "پس از پرداخت موفق، سفارش شما در سریع‌ترین زمان ممکن بررسی و برای ارسال آماده خواهد شد.",
    isDefault: true,
  },
  {
    id: "bank-transfer",
    name: "کارت‌به‌کارت بانکی",
    description:
      "پس از واریز وجه، تصویر رسید پرداخت را در صفحه سفارش بارگذاری کنید. سفارش پس از تأیید پرداخت برای ارسال آماده خواهد شد.",
    isDefault: false,
  },
];
const paymentMethods = [
  {
    id: "mellat",
    name: "بانک ملت",
    logo: "/images/payment/bank-mellat.svg",
    isDefault: false,
  },
  {
    id: "saman",
    name: "بانک سامان",
    logo: "/images/payment/bank-saman.svg",
    isDefault: false,
  },
  {
    id: "zarinpal",
    name: "زرین‌پال",
    logo: "/images/payment/zarinpal.svg",
    isDefault: true,
  },
];

export async function GET() {
  return NextResponse.json({
    data: {
      types: paymentTypes,
      methods: paymentMethods,
    },
  });
}
