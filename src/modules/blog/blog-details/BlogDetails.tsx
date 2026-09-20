"use client";

import type { BlogDetailsDictionary } from "@/i18n/dictionaries";

type BlogDetailsProps = {
  dictionary: BlogDetailsDictionary;
  locale: "fa" | "en";
};

export function BlogDetails({ dictionary, locale }: BlogDetailsProps) {
  return <div className="space-y-8">{/* Blog details */}</div>;
}
