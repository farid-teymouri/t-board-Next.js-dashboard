import { headers } from "next/headers";

import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { BlogListHeaderActions } from "@/modules/blog/list/components/blog-list-header-actions";

interface BlogListLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getBlogStats() {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/blog/list`, {
    cache: "no-store",
  });

  return response.json();
}

export default async function BlogListLayout({
  children,
  params,
}: BlogListLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const dictionary = await getDictionary(locale);

  const stats = await getBlogStats();

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.blog.list.page} variables={stats} />

        <BlogListHeaderActions dictionary={dictionary.blog.list} />
      </PageHeaderContent>

      {children}
    </>
  );
}
