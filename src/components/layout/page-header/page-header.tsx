"use client";

import { usePathname } from "next/navigation";

import { sidebarMenuGroups } from "@/components/layout/sidebar/data/menu-items";
import type { SidebarDictionary } from "@/components/layout/sidebar/types/sidebar";

import { findBreadcrumbPath } from "@/components/layout/breadcrumb/utils/breadcrumb-path";

type PageHeaderProps = {
  dictionary: SidebarDictionary;
};

export function PageHeader({ dictionary }: PageHeaderProps) {
  const pathname = usePathname();

  // Remove the locale prefix before matching the current route.
  const normalizedPathname = pathname.replace(/^\/(fa|en)/, "");

  const items = findBreadcrumbPath(sidebarMenuGroups, normalizedPathname);

  if (!items?.length) {
    return null;
  }

  const currentItem = items[items.length - 1];

  const page = dictionary.pages[currentItem.id];

  if (!page) {
    return null;
  }

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight">{page.title}</h1>

      <p className="text-sm text-muted-foreground">{page.description}</p>
    </div>
  );
}
