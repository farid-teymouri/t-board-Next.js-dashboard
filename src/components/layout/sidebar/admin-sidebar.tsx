"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { sidebarMenuGroups } from "./data/menu-items";
import { AdminSidebarMenuGroup } from "./components/sidebar-menu-group";
import { SidebarLogo } from "./sidebar-logo";
import { createLocalePath } from "./utils/sidebar-path";

import type { SidebarDictionary } from "./types/sidebar";

type AdminSidebarProps = {
  side: "left" | "right";
  locale: "fa" | "en";
  dictionary: SidebarDictionary;
};

export function AdminSidebar({ side, locale, dictionary }: AdminSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const getLocalePath = (href: string) => createLocalePath(href, locale);

  const isActive = (href: string) => pathname === getLocalePath(href);

  return (
    <Sidebar side={side} collapsible="icon" className="z-10 border-none!">
      <SidebarHeader className="p-4 md:hidden">
        <div className="flex items-center justify-between gap-2">
          <SidebarLogo />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar"
          >
            <X className="size-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent
        className="data-[scrollable=true]:overflow-y-auto data-[scrollable=true]:overflow-x-hidden"
        data-scrollable="true"
      >
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
