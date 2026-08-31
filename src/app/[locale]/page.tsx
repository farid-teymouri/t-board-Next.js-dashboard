import { redirect } from "next/navigation";

type HomePageProps = {
  params: Promise<{
    locale: "fa" | "en";
  }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  redirect(`/${locale}/dashboards/sales`);
}
