"use client";

import Link from "next/link";
import { Bookmark, Pencil, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { JobDetailsDictionary } from "@/i18n/dictionaries";

type JobDetailsHeaderActionsProps = {
  dictionary: JobDetailsDictionary;
};

export function JobDetailsHeaderActions({
  dictionary,
}: JobDetailsHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default">
        <Pencil />
        {dictionary.header.edit}
      </Button>

      <Button variant="secondary">
        <Bookmark />
        {dictionary.header.save}
      </Button>

      <Button variant="secondary">
        <Link href="/jobs/list" className="flex items-center gap-2">
          <Briefcase />
          {dictionary.header.allJobs}
        </Link>
      </Button>
    </div>
  );
}
