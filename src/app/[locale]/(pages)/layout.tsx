import { notFound } from "next/navigation";

import { UserLayout } from "@/components/layout/user-layout";
import { Breadcrumbs } from "@/components/layout/breadcrumb/breadcrumb";
import { PageHeader } from "@/components/layout/page-header/page-header";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <UserLayout locale={locale}>
      <div className="space-y-5">
        <Breadcrumbs dictionary={dictionary.sidebar} locale={locale} />

        <PageHeader dictionary={dictionary.sidebar} />
      </div>

      {children}
    </UserLayout>
  );
}
