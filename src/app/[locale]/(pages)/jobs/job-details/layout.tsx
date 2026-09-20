import { headers } from "next/headers";

import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { JobDetailsHeaderActions } from "@/modules/jobs/job-details/components/job-details-header-actions";

interface JobDetailsLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

async function getJobDetails() {
  const headersList = await headers();

  const host = headersList.get("host");

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/jobs/job-details`, {
    cache: "no-store",
  });

  return response.json();
}

export default async function JobDetailsLayout({
  children,
  params,
}: JobDetailsLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const dictionary = await getDictionary(locale);

  const job = await getJobDetails();

  return (
    <>
      <PageHeaderContent>
        <PageHeader
          dictionary={dictionary.jobs.jobDetails.page}
          variables={{
            title: job.title,
            company: job.company,
            department: job.department,
            applicants: job.applicants,
          }}
        />

        <JobDetailsHeaderActions dictionary={dictionary.jobs.jobDetails} />
      </PageHeaderContent>

      {children}
    </>
  );
}
