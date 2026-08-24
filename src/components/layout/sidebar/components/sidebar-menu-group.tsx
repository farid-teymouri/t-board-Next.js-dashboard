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
  showSeparator?: boolean;
};

export function AdminSidebarMenuGroup({
  group,
  dictionary,
  isActive,
  createLocalePath,
  showSeparator = false,
}: AdminSidebarMenuGroupProps) {
  return (
    <>
      {showSeparator && <SidebarSeparator />}

      <SidebarGroup>
        <SidebarGroupLabel>{dictionary.groups[group.id]}</SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => (
              <AdminSidebarMenuItem
                key={item.id}
                item={item}
                dictionary={dictionary}
                isActive={isActive}
                createLocalePath={createLocalePath}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
