import { getDictionary } from "@/i18n/dictionaries";

import { BlogDetails } from "@/modules/blog/blog-details";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return (
    <BlogDetails dictionary={dictionary.blog.blogDetails} locale={locale} />
  );
}
