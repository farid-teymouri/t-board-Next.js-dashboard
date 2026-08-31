"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import type {
  SidebarDictionary,
  SidebarMenuItem as SidebarMenuItemType,
} from "../types/sidebar";

type AdminSidebarMenuItemProps = {
  item: SidebarMenuItemType;
  dictionary: SidebarDictionary;
  isActive: (href: string) => boolean;
  createLocalePath: (href: string) => string;
};

export function AdminSidebarMenuItem({
  item,
  dictionary,
  isActive,
  createLocalePath,
}: AdminSidebarMenuItemProps) {
  const Icon = item.icon;
  const hasSubItems = Boolean(item.items?.length);

  const hasActiveSubItem =
    item.items?.some((subItem) => isActive(subItem.href)) ?? false;

  const [isOpen, setIsOpen] = useState(hasActiveSubItem);

  return (
    <SidebarMenuItem>
      {hasSubItems ? (
        <SidebarMenuButton
          type="button"
          tooltip={dictionary.items[item.id]}
          isActive={hasActiveSubItem}
          onClick={() => setIsOpen((open) => !open)}
          className="h-10 px-3 text-base text-muted-foreground hover:bg-accent hover:text-sidebar-accent-foreground data-active:text-primary rounded-xl group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
        >
          <div className="flex group-data-[collapsible=icon]:w-fit w-full flex-row items-center gap-1">
            <Icon className="size-5 shrink-0 group-data-[collapsible=icon]:size-6!" />

            <span className="leading-none group-data-[collapsible=icon]:hidden">
              {dictionary.items[item.id]}
            </span>

            <ChevronDown
              className={`ms-auto size-4 transition-transform group-data-[collapsible=icon]:hidden ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </SidebarMenuButton>
      ) : item.href ? (
        <SidebarMenuButton
          render={<Link href={createLocalePath(item.href)} />}
          tooltip={dictionary.items[item.id]}
          isActive={isActive(item.href)}
          className="h-10 px-3 text-base text-muted-foreground hover:bg-accent hover:text-sidebar-accent-foreground data-active:text-primary rounded-xl group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
        >
          <div className="flex group-data-[collapsible=icon]:w-fit w-full flex-row items-center gap-1">
            <Icon className="size-5 shrink-0 group-data-[collapsible=icon]:size-6!" />

            <span className="leading-none group-data-[collapsible=icon]:hidden">
              {dictionary.items[item.id]}
            </span>
          </div>
        </SidebarMenuButton>
      ) : null}

      {hasSubItems && isOpen ? (
        <SidebarMenuSub className="gap-1 py-1">
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.id}>
              <SidebarMenuSubButton
                isActive={isActive(subItem.href)}
                className="h-8! hover:bg-accent rounded-lg"
                render={<Link href={createLocalePath(subItem.href)} />}
              >
                <span>{dictionary.items[subItem.id]}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
