import { NextResponse } from "next/server";

const product = {
  en: {
    basicInformation: {
      title: "Aperture Desk Lamp",
      handle: "aperture-desk-lamp",
      shortDescription:
        "Precision aluminium task lamp with stepless dimming and tunable white.",
      description:
        "<p>The Aperture Desk Lamp pairs a precision aluminium body with a frictionless magnetic joint, letting you angle light exactly where you need it. A stepless dimmer and tunable colour temperature take it from a crisp 4000K work light to a relaxed 2700K glow. USB-C passthrough charging is built into the weighted base.</p>",
    },
  },

  fa: {
    basicInformation: {
      title: "چراغ رومیزی Aperture",
      handle: "aperture-desk-lamp",
      shortDescription:
        "چراغ رومیزی آلومینیومی دقیق با تنظیم نور پیوسته و دمای رنگ قابل تنظیم.",
      description:
        "<p>چراغ رومیزی Aperture بدنه‌ای از آلومینیوم دقیق را با یک مفصل مغناطیسی روان ترکیب می‌کند تا بتوانید نور را دقیقاً در جهت مورد نیاز خود تنظیم کنید. دیمر پیوسته و دمای رنگ قابل تنظیم، امکان تغییر نور از روشنایی کاری شفاف ۴۰۰۰ کلوین تا نور گرم و آرام ۲۷۰۰ کلوین را فراهم می‌کنند. قابلیت شارژ عبوری USB-C نیز در پایه سنگین محصول تعبیه شده است.</p>",
    },
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const locale = searchParams.get("locale") === "fa" ? "fa" : "en";

  return NextResponse.json(product[locale]);
}
