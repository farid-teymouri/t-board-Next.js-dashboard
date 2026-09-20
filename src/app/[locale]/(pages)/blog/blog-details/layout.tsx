import { headers } from "next/headers";

import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { BlogDetailsHeaderActions } from "@/modules/blog/blog-details/components/blog-details-header-actions";

interface BlogDetailsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getBlogDetails(locale: string) {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/blog/blog-details?locale=${locale}`,
    {
      cache: "no-store",
    },
  );

  return response.json();
}

export default async function BlogDetailsLayout({
  children,
  params,
}: BlogDetailsLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const dictionary = await getDictionary(locale);

  const blog = await getBlogDetails(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.blog.blogDetails.page}
          variables={blog}
        />

        <BlogDetailsHeaderActions dictionary={dictionary.blog.blogDetails} />
      </PageHeaderContent>

      {children}
    </>
  );
}
