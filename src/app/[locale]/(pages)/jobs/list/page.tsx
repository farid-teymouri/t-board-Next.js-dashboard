import { getDictionary } from "@/i18n/dictionaries";

import { JobList } from "@/modules/jobs/list";

export default async function JobListPage({
  params,
}: {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return <JobList dictionary={dictionary.jobs.list} locale={locale} />;
}
