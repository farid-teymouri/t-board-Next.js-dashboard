import {
  Bell,
  ChartNoAxesCombined,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

import type { SidebarMenuGroup } from "../types/sidebar";

export const sidebarMenuGroups: SidebarMenuGroup[] = [
  {
    id: "overview",
    items: [
      {
        id: "dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        id: "users",
        href: "/users",
        icon: Users,
      },
    ],
  },

  {
    id: "management",
    items: [
      {
        id: "community",
        href: "/community",
        icon: MessageSquare,
        items: [
          {
            id: "forum",
            href: "/community/forum",
          },
          {
            id: "posts",
            href: "/community/posts",
          },
          {
            id: "reports",
            href: "/community/reports",
          },
        ],
      },

      {
        id: "analytics",
        href: "/analytics",
        icon: ChartNoAxesCombined,
        items: [
          {
            id: "analyticsUsers",
            href: "/analytics/users",
          },
          {
            id: "analyticsMusic",
            href: "/analytics/music",
          },
          {
            id: "traffic",
            href: "/analytics/traffic",
          },
        ],
      },
    ],
  },

  {
    id: "system",
    items: [
      {
        id: "notifications",
        href: "/notifications",
        icon: Bell,
      },

      {
        id: "settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
