"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
import { AdminSidebarFooter } from "./sidebar-footer";
import type { SidebarDictionary } from "./types/sidebar";

type AdminSidebarProps = {
  side: "left" | "right";
  locale: "fa" | "en";
  dictionary: SidebarDictionary;
};

export function AdminSidebar({ side, locale, dictionary }: AdminSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const getLocalePath = (href: string) => createLocalePath(href, locale);

  const isActive = (href: string) => pathname === getLocalePath(href);

  return (
    <Sidebar
      side={side}
      collapsible="icon"
      className="z-10 border-none! md:mx-2 mx-1 "
    >
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
        className="data-[scrollable=true]:overflow-y-auto data-[scrollable=true]:overflow-x-hidden bg-background pt-5"
        data-scrollable="true"
      >
        {sidebarMenuGroups.map((group, index) => (
          <AdminSidebarMenuGroup
            key={group.id}
            group={group}
            dictionary={dictionary}
            isActive={isActive}
            createLocalePath={getLocalePath}
            side={side}
            openPopoverId={openPopoverId}
            setOpenPopoverId={setOpenPopoverId}
            showSeparator={index > 0}
          />
        ))}
      </SidebarContent>

      <SidebarFooter className="p-0 bg-background">
        <div className="rounded-t-lg  bg-foreground/5 py-6 group-data-[collapsible=icon]:py-4 p-2 ">
          <AdminSidebarFooter logoutLabel={dictionary.logout} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
