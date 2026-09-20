import { getDictionary } from "@/i18n/dictionaries";

import { BlogList } from "@/modules/blog/list";

export default async function BlogListPage({
  params,
}: {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return <BlogList dictionary={dictionary.blog.list} locale={locale} />;
}
