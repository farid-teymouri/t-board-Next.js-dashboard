"use client";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { sidebarMenuGroups } from "./data/menu-items";
import { AdminSidebarMenuGroup } from "./components/sidebar-menu-group";
import { createLocalePath } from "./utils/sidebar-path";

import type { SidebarDictionary } from "./types/sidebar";

type AdminSidebarProps = {
  side: "left" | "right";
  locale: "fa" | "en";
  dictionary: SidebarDictionary;
};

export function AdminSidebar({ side, locale, dictionary }: AdminSidebarProps) {
  const pathname = usePathname();

  const getLocalePath = (href: string) => createLocalePath(href, locale);

  const isActive = (href: string) => pathname === getLocalePath(href);

  return (
    <Sidebar side={side} collapsible="icon" className="border-none!">
      <SidebarContent>
        {sidebarMenuGroups.map((group, index) => (
          <AdminSidebarMenuGroup
            key={group.id}
            group={group}
            dictionary={dictionary}
            isActive={isActive}
            createLocalePath={getLocalePath}
            showSeparator={index > 0}
          />
        ))}
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
