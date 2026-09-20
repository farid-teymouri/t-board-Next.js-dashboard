"use client";

import type { JobListDictionary } from "@/i18n/dictionaries";

type JobListProps = {
  dictionary: JobListDictionary;
  locale: "fa" | "en";
};

export function JobList({ dictionary, locale }: JobListProps) {
  return <div className="space-y-8">{/* Job listings */}</div>;
}
