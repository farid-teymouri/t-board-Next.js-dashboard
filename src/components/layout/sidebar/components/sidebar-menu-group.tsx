import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { AdminSidebarMenuItem } from "./sidebar-menu-item";

import type { SidebarDictionary, SidebarMenuGroup } from "../types/sidebar";

type AdminSidebarMenuGroupProps = {
  group: SidebarMenuGroup;
  dictionary: SidebarDictionary;
  isActive: (href: string) => boolean;
  createLocalePath: (href: string) => string;
  side: "left" | "right";
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  showSeparator?: boolean;
};

export function AdminSidebarMenuGroup({
  group,
  dictionary,
  isActive,
  createLocalePath,
  side,
  openPopoverId,
  setOpenPopoverId,
  showSeparator = false,
}: AdminSidebarMenuGroupProps) {
  return (
    <>
      {showSeparator && (
        <SidebarSeparator className="group-data-[collapsible=icon]:hidden mx-auto mt-2 w-full" />
      )}

      <SidebarGroup>
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          {dictionary.groups[group.id]}
        </SidebarGroupLabel>

        <SidebarGroupContent className="w-full justify-center">
          <SidebarMenu className="space-y-2">
            {group.items.map((item) => (
              <AdminSidebarMenuItem
                key={item.id}
                item={item}
                dictionary={dictionary}
                isActive={isActive}
                createLocalePath={createLocalePath}
                side={side}
                openPopoverId={openPopoverId}
                setOpenPopoverId={setOpenPopoverId}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
