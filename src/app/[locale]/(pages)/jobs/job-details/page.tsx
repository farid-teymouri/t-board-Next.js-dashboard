import { getDictionary } from "@/i18n/dictionaries";

import { JobDetails } from "@/modules/jobs/job-details";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{
    locale: "en" | "fa";
  }>;
}) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale);

  return <JobDetails dictionary={dictionary.jobs.jobDetails} locale={locale} />;
}
