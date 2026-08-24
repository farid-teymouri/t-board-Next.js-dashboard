import Link from "next/link";

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

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={createLocalePath(item.href)} />}
        tooltip={dictionary.items[item.id]}
        isActive={isActive(item.href)}
        className="h-12 px-3 text-base text-muted-foreground hover:bg-accent hover:text-primary data-active:text-primary group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
      >
        <Icon className="size-5 group-data-[collapsible=icon]:size-6!" />

        <span className="group-data-[collapsible=icon]:hidden">
          {dictionary.items[item.id]}
        </span>
      </SidebarMenuButton>

      {item.items?.length ? (
        <SidebarMenuSub className="gap-0!">
          {item.items.map((subItem) => (
            <SidebarMenuSubItem key={subItem.id}>
              <SidebarMenuSubButton
                isActive={isActive(subItem.href)}
                className="h-9! hover:bg-accent"
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
