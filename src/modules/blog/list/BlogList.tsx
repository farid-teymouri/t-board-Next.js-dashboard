"use client";

import type { BlogListDictionary } from "@/i18n/dictionaries";

type BlogListProps = {
  dictionary: BlogListDictionary;
  locale: "fa" | "en";
};

export function BlogList({ dictionary, locale }: BlogListProps) {
  return <div className="space-y-8">{/* Blog listings */}</div>;
}
