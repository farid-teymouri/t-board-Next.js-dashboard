import { notFound } from "next/navigation";

import { AdminLayout } from "@/components/layout/admin-layout";
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

  return <AdminLayout locale={locale}>{children}</AdminLayout>;
}
