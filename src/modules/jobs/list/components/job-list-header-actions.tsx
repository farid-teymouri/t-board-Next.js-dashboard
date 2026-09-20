"use client";

import { BriefcaseBusiness, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { JobListDictionary } from "@/i18n/dictionaries";

type JobListHeaderActionsProps = {
  dictionary: JobListDictionary;
};

export function JobListHeaderActions({
  dictionary,
}: JobListHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default">
        <BriefcaseBusiness />
        {dictionary.header.postJob}
      </Button>

      <Button variant="secondary">
        <Download />
        {dictionary.header.exportReport}
      </Button>
    </div>
  );
}
