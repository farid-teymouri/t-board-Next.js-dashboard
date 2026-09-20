"use client";

import { Plus, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BlogListDictionary } from "@/i18n/dictionaries";

type BlogListHeaderActionsProps = {
  dictionary: BlogListDictionary;
};

export function BlogListHeaderActions({
  dictionary,
}: BlogListHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default">
        <Plus />
        {dictionary.header.newPost}
      </Button>

      <Button variant="secondary">
        <Tags />
        {dictionary.header.manageTags}
      </Button>
    </div>
  );
}
