"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { sidebarMenuGroups } from "@/components/layout/sidebar/data/menu-items";
import type { SidebarDictionary } from "@/components/layout/sidebar/types/sidebar";
import { createLocalePath } from "@/components/layout/sidebar/utils/sidebar-path";

import { findBreadcrumbPath } from "./utils/breadcrumb-path";
import type { Locale } from "@/i18n/config";

type BreadcrumbsProps = {
  dictionary: SidebarDictionary;
  locale: Locale;
};

export function Breadcrumbs({ dictionary, locale }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Remove the locale prefix before matching the current route against navigation items.
  const normalizedPathname = pathname.replace(/^\/(fa|en)/, "");

  const items = findBreadcrumbPath(sidebarMenuGroups, normalizedPathname);

  if (!items) {
    return null;
  }

  // The dashboard item is used as the fixed root link of the breadcrumb.
  const dashboardsItem = sidebarMenuGroups
    .flatMap((group) => group.items)
    .find((item) => item.id === "dashboards");

  const dashboardsHref = dashboardsItem?.href
    ? createLocalePath(dashboardsItem.href, locale)
    : null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-row md:gap-3 gap-1">
        {dashboardsHref && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={dashboardsHref} />}>
                <LayoutDashboard className="size-4" />

                <span className="sr-only">{dictionary.items.dashboards}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="rtl:rotate-180" />
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          const label = dictionary.items[item.id];

          const href = item.href
            ? createLocalePath(item.href, locale)
            : undefined;

          return (
            <div key={item.id} className="contents">
              {index > 0 && <BreadcrumbSeparator className="rtl:rotate-180" />}

              <BreadcrumbItem>
                {isLast || !href ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={href} />}>
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
