import { getDictionary } from "@/i18n/dictionaries";

import { PageHeader } from "@/components/layout/page-header/page-header";
import { PageHeaderContent } from "@/components/layout/page-header/page-header-content";
import { JobListHeaderActions } from "@/modules/jobs/list/components/job-list-header-actions";
interface JobListLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function JobListLayout({
  children,
  params,
}: JobListLayoutProps) {
  const { locale: routeLocale } = await params;

  const locale = routeLocale === "fa" ? "fa" : "en";

  const dictionary = await getDictionary(locale);

  return (
    <>
      <PageHeaderContent>
        <PageHeader dictionary={dictionary.jobs.list.page} />

        <JobListHeaderActions dictionary={dictionary.jobs.list} />
      </PageHeaderContent>

      {children}
    </>
  );
}
