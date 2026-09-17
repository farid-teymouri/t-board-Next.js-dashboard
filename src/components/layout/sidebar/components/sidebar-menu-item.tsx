"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import type {
  SidebarDictionary,
  SidebarMenuItem as SidebarMenuItemType,
} from "../types/sidebar";

type UserSidebarMenuItemProps = {
  item: SidebarMenuItemType;
  dictionary: SidebarDictionary;
  isActive: (href: string) => boolean;
  createLocalePath: (href: string) => string;
  side: "left" | "right";
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
};

export function UserSidebarMenuItem({
  item,
  dictionary,
  isActive,
  createLocalePath,
  side,
  openPopoverId,
  setOpenPopoverId,
}: UserSidebarMenuItemProps) {
  const Icon = item.icon;
  const hasSubItems = Boolean(item.items?.length);

  const { state, isMobile, setOpenMobile } = useSidebar();

  const handleMobileNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }

    setOpenPopoverId(null);
  };

  const hasActiveSubItem =
    item.items?.some((subItem) => isActive(subItem.href)) ?? false;

  const [isOpen, setIsOpen] = useState(hasActiveSubItem);

  const isCollapsed = state === "collapsed" && !isMobile;
  const isPopoverOpen = openPopoverId === item.id;

  const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    if (isCollapsed && hasSubItems && event.pointerType === "mouse") {
      setOpenPopoverId(item.id);
    }
  };

  const handlePointerLeave = () => {
    if (isCollapsed && hasSubItems) {
      setOpenPopoverId(null);
    }
  };

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isCollapsed || !hasSubItems) {
      return;
    }

    event.preventDefault();
    setOpenPopoverId(isPopoverOpen ? null : item.id);
  };

  if (isCollapsed && hasSubItems) {
    return (
      <SidebarMenuItem>
        <Popover
          open={isPopoverOpen}
          onOpenChange={(open) => setOpenPopoverId(open ? item.id : null)}
        >
          <PopoverTrigger
            render={
              <SidebarMenuButton
                type="button"
                isActive={hasActiveSubItem}
                onPointerEnter={handlePointerEnter}
                onClick={handleTriggerClick}
                className="group-data-[collapsible=icon]:h-10! group-data-[collapsible=icon]:w-10! group-data-[collapsible=icon]:min-w-6! mx-auto group-data-[collapsible=icon]:p-0! flex justify-center rounded-xl text-muted-foreground hover:bg-accent hover:text-sidebar-accent-foreground data-active:text-primary"
              >
                <Icon className="size-6! shrink-0" />
              </SidebarMenuButton>
            }
          />

          <PopoverPositioner
            side={side === "left" ? "right" : "left"}
            align="start"
            sideOffset={8}
          >
            <PopoverContent
              className="w-56 p-2"
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground">
                <Icon className="size-4 shrink-0" />
                <span>{dictionary.items[item.id]}</span>
              </div>

              <div className="mt-1 flex flex-col gap-1">
                {item.items?.map((subItem) => {
                  const active = isActive(subItem.href);

                  return (
                    <Link
                      key={subItem.id}
                      href={createLocalePath(subItem.href)}
                      onClick={handleMobileNavigation}
                      className={[
                        "flex w-full items-center rounded-lg px-3 py-2 text-sm",
                        "text-muted-foreground transition-colors",
                        "hover:bg-accent hover:text-sidebar-accent-foreground",
                        active &&
                          "bg-primary text-primary-foreground hover:bg-primary",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {dictionary.items[subItem.id]}
                    </Link>
                  );
                })}
              </div>
            </PopoverContent>
          </PopoverPositioner>
        </Popover>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem className="group-data-[collapsible=icon]:w-12">
      {hasSubItems ? (
        <SidebarMenuButton
          type="button"
          tooltip={dictionary.items[item.id]}
          isActive={hasActiveSubItem}
          onClick={() => setIsOpen((open) => !open)}
          className="h-10 rounded-xl px-3 text-base text-muted-foreground hover:bg-accent hover:text-sidebar-accent-foreground data-active:text-primary group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
        >
          <div className="flex w-full flex-row items-center gap-1 group-data-[collapsible=icon]:w-fit">
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
          render={
            <Link
              href={createLocalePath(item.href)}
              onClick={handleMobileNavigation}
            />
          }
          tooltip={dictionary.items[item.id]}
          isActive={isActive(item.href)}
          className="h-10 rounded-xl px-3 text-base text-muted-foreground hover:bg-accent hover:text-sidebar-accent-foreground data-active:text-primary group-data-[collapsible=icon]:h-12! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0!"
        >
          <div className="flex w-full flex-row items-center gap-1 group-data-[collapsible=icon]:w-fit">
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
                className="h-8! rounded-lg hover:bg-accent"
                render={
                  <Link
                    href={createLocalePath(subItem.href)}
                    onClick={handleMobileNavigation}
                  />
                }
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
