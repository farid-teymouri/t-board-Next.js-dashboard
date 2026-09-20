"use client";

import { usePathname } from "next/navigation";

import { sidebarMenuGroups } from "@/components/layout/sidebar/data/menu-items";
import { findBreadcrumbPath } from "@/components/layout/breadcrumb/utils/breadcrumb-path";
import { renderTemplate } from "@/lib/utils/render-template";
type PageHeaderProps = {
  dictionary: {
    title: string;
    description: string;
  };

  variables?: Record<string, string | number>;
};

export function PageHeader({ dictionary, variables = {} }: PageHeaderProps) {
  const pathname = usePathname();

  const normalizedPathname = pathname.replace(/^\/(fa|en)/, "");

  const items = findBreadcrumbPath(sidebarMenuGroups, normalizedPathname);

  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-semibold tracking-tight">
        {renderTemplate(dictionary.title, variables)}
      </h1>

      <p className="text-sm text-muted-foreground">
        {renderTemplate(dictionary.description, variables)}
      </p>
    </div>
  );
}
