"use client";

import Link from "next/link";
import { Bookmark, Pencil, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { BlogDetailsDictionary } from "@/i18n/dictionaries";

type BlogDetailsHeaderActionsProps = {
  dictionary: BlogDetailsDictionary;
};

export function BlogDetailsHeaderActions({
  dictionary,
}: BlogDetailsHeaderActionsProps) {
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
        <Link href="/blog/list" className="flex items-center gap-2">
          <FileText />
          {dictionary.header.allPosts}
        </Link>
      </Button>
    </div>
  );
}
