import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json({
    topReferrers: [
      {
        id: "google",
        domain: "google.com",
        category: locale === "fa" ? "جستجو" : "Search",
        value: 31204,
      },
      {
        id: "reddit",
        domain: "reddit.com",
        category: locale === "fa" ? "انجمن" : "Community",
        value: 8940,
      },
      {
        id: "x",
        domain: "x.com",
        category: locale === "fa" ? "اجتماعی" : "Social",
        value: 6512,
      },
      {
        id: "linkedin",
        domain: "linkedin.com",
        category: locale === "fa" ? "حرفه‌ای" : "Professional",
        value: 4108,
      },
    ],

    recentEvents: [
      {
        id: "conversion-spike",
        type: "success",
        label:
          locale === "fa"
            ? "افزایش ناگهانی تبدیل در صفحه"
            : "Conversion spike on",
        emphasized: "/pricing",
        meta: locale === "fa" ? "۶ دقیقه پیش" : "6m ago",
      },
      {
        id: "demo-request",
        type: "info",
        label: locale === "fa" ? "درخواست دمو تکمیل شد" : "Goal completed",
        emphasized: locale === "fa" ? "درخواست دمو" : "Demo request",
        suffix: "41×",
        meta: locale === "fa" ? "۲۴ دقیقه پیش" : "24m ago",
      },
      {
        id: "bounce-rate",
        type: "warning",
        label:
          locale === "fa" ? "هشدار نرخ پرش در صفحه" : "Bounce rate alert on",
        emphasized: "/checkout",
        meta: locale === "fa" ? "۱ ساعت پیش" : "1h ago",
      },
    ],
  });
}
