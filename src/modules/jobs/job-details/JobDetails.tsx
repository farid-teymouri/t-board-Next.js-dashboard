"use client";

import type { JobDetailsDictionary } from "@/i18n/dictionaries";

type JobDetailsProps = {
  dictionary: JobDetailsDictionary;
  locale: "fa" | "en";
};

export function JobDetails({ dictionary, locale }: JobDetailsProps) {
  return <div className="space-y-8">{/* Job details */}</div>;
}
