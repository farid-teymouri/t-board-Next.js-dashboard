"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuPositioner,
  NavigationMenuPopup,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import { sidebarMenuGroups } from "./data/menu-items";
import { createLocalePath } from "./utils/sidebar-path";

import type { SidebarDictionary } from "./types/sidebar";

type AdminNavigationMenuProps = {
  locale: "fa" | "en";
  dictionary: SidebarDictionary;
};

const MAX_VISIBLE_ITEMS = 5;

export function AdminNavigationMenu({
  locale,
  dictionary,
}: AdminNavigationMenuProps) {
  const pathname = usePathname();

  const getLocalePath = (href: string) => createLocalePath(href, locale);

  const isActive = (href: string) => {
    const path = getLocalePath(href);

    if (href === "/") {
      return pathname === path;
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const menuItems = sidebarMenuGroups.flatMap((group) => group.items);

  const visibleItems = menuItems.slice(0, MAX_VISIBLE_ITEMS);
  const moreItems = menuItems.slice(MAX_VISIBLE_ITEMS);

  const renderIcon = (item: (typeof menuItems)[number]) => {
    const Icon = item.icon;

    return (
      <Icon
        className="size-4 shrink-0 hover:text-sidebar-accent-foreground"
        aria-hidden="true"
      />
    );
  };

  const renderMenuItem = (item: (typeof menuItems)[number]) => {
    const label = dictionary.items[item.id];
    const subItems = item.items ?? [];
    const hasSubItems = subItems.length > 0;

    const active = hasSubItems
      ? subItems.some((subItem) => isActive(subItem.href))
      : item.href
        ? isActive(item.href)
        : false;

    if (!hasSubItems && item.href) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuLink
            render={<Link href={getLocalePath(item.href)} />}
            className={cn(
              "flex h-10 w-max flex-row items-center gap-2 px-3 text-sm font-medium rounded-xl",
              "text-muted-foreground",
              "hover:bg-accent hover:text-sidebar-accent-foreground",
              active &&
                "bg-primary focus:bg-primary focus:text-muted text-muted hover:bg-primary hover:text-muted",
            )}
          >
            {renderIcon(item)}
            <span>{label}</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    }

    if (hasSubItems) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger
            className={cn(
              "flex h-10 w-max flex-row items-center gap-2 px-3 text-sm font-medium",
              "text-muted-foreground",
              "hover:bg-accent hover:text-sidebar-accent-foreground",
              active &&
                "bg-primary focus:bg-primary focus:text-muted text-muted",
            )}
          >
            {renderIcon(item)}
            <span>{label}</span>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="flex w-[220px] flex-col gap-1 p-2">
              {subItems.map((subItem) => {
                const subActive = isActive(subItem.href);

                return (
                  <li key={subItem.id}>
                    <NavigationMenuLink
                      render={<Link href={getLocalePath(subItem.href)} />}
                      className={cn(
                        "flex w-full flex-row items-center gap-2",
                        "rounded-lg px-3 py-2 text-sm",
                        "text-muted-foreground",
                        "hover:bg-accent hover:text-sidebar-accent-foreground",
                        subActive &&
                          "bg-primary focus:bg-primary focus:text-muted text-muted",
                      )}
                    >
                      <span>{dictionary.items[subItem.id]}</span>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return null;
  };
  const hasActiveMoreItem = moreItems.some(
    (item) => item.href !== undefined && isActive(item.href),
  );
  return (
    <NavigationMenu
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="h-16 w-full max-w-none justify-start"
    >
      <NavigationMenuList className={cn("w-full flex-1 justify-start gap-2")}>
        {visibleItems.map(renderMenuItem)}

        {moreItems.length > 0 && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "flex h-10 w-max flex-row items-center gap-2 px-3 text-sm font-medium",
                "text-muted-foreground",
                "hover:bg-accent hover:text-sidebar-accent-foreground",
                hasActiveMoreItem &&
                  "bg-primary focus:bg-primary focus:text-muted text-muted hover:bg-primary hover:text-muted",
              )}
            >
              <MoreHorizontal className="size-4 shrink-0" aria-hidden="true" />

              <span>{locale === "fa" ? "موارد بیشتر" : "More items"}</span>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="flex w-[220px] flex-col gap-1 p-2">
                {moreItems.map((item) => {
                  if (!item.href) return null;

                  const label = dictionary.items[item.id];
                  const active = isActive(item.href);

                  return (
                    <li key={item.id}>
                      <NavigationMenuLink
                        render={<Link href={getLocalePath(item.href)} />}
                        className={cn(
                          "flex w-full flex-row items-center gap-2",
                          "rounded-lg px-3 py-2 text-sm",
                          "text-muted-foreground",
                          "hover:bg-accent hover:text-sidebar-accent-foreground",
                          active &&
                            "bg-primary focus:bg-primary focus:text-muted text-muted",
                        )}
                      >
                        {renderIcon(item)}
                        <span>{label}</span>
                      </NavigationMenuLink>
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>

      <NavigationMenuPositioner align="start" sideOffset={4}>
        <NavigationMenuPopup />
      </NavigationMenuPositioner>
    </NavigationMenu>
  );
}
