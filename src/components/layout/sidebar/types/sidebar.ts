import type { LucideIcon } from "lucide-react";

export type SidebarSubItem = {
  id: string;
  href: string;
};

export type SidebarMenuItem = {
  id: string;
  icon: LucideIcon;
  href?: string;
  items?: SidebarSubItem[];
};

export type SidebarMenuGroup = {
  id: string;
  items: SidebarMenuItem[];
};

export type SidebarDictionary = {
  groups: Record<string, string>;
  items: Record<string, string>;
  pages: Record<
    string,
    {
      title: string;
      description: string;
    }
  >;
};
