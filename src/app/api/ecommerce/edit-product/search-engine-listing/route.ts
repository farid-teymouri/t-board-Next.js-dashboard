import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    pageTitle: {
      en: "Aperture Desk Lamp | Modern Desk Lighting",
      fa: "چراغ رومیزی Aperture | روشنایی مدرن میز",
    },
    metaDescription: {
      en: "Discover the Aperture Desk Lamp, a modern lighting solution designed to bring focused illumination and a clean look to your workspace.",
      fa: "چراغ رومیزی آپرچر را کشف کنید؛ راهکاری مدرن برای روشنایی که برای ایجاد نور متمرکز و ظاهری ساده و زیبا در فضای کار شما طراحی شده است.",
    },
    breadcrumbs: {
      domain: "mywebsite.com",
      category: "Lighting",
      slug: "aperture-desk-lamp",
    },
  });
}
