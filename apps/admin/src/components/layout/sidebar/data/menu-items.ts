import {
  Bell,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Monitor,
  Server,
  Settings,
  Shield,
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
            id: "comments",
            href: "/community/comments",
          },
          {
            id: "reports",
            href: "/community/reports",
          },
          {
            id: "moderation",
            href: "/community/moderation",
          },
        ],
      },

      {
        id: "finance",
        href: "/finance",
        icon: CircleDollarSign,
        items: [
          {
            id: "revenue",
            href: "/finance/revenue",
          },
          {
            id: "transactions",
            href: "/finance/transactions",
          },
          {
            id: "subscriptions",
            href: "/finance/subscriptions",
          },
          {
            id: "payments",
            href: "/finance/payments",
          },
          {
            id: "refunds",
            href: "/finance/refunds",
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
            id: "analyticsMedia",
            href: "/analytics/media",
          },
          {
            id: "downloads",
            href: "/analytics/downloads",
          },
          {
            id: "traffic",
            href: "/analytics/traffic",
          },
          {
            id: "analyticsRevenue",
            href: "/analytics/revenue",
          },
        ],
      },
    ],
  },

  {
    id: "infrastructure",
    items: [
      {
        id: "infrastructure",
        href: "/infrastructure",
        icon: Server,
        items: [
          {
            id: "servers",
            href: "/infrastructure/servers",
          },
          {
            id: "storage",
            href: "/infrastructure/storage",
          },
          {
            id: "cpu",
            href: "/infrastructure/cpu",
          },
          {
            id: "ram",
            href: "/infrastructure/ram",
          },
          {
            id: "bandwidth",
            href: "/infrastructure/bandwidth",
          },
          {
            id: "services",
            href: "/infrastructure/services",
          },
          {
            id: "monitoring",
            href: "/infrastructure/monitoring",
          },
        ],
      },

      {
        id: "notifications",
        href: "/notifications",
        icon: Bell,
      },
    ],
  },

  {
    id: "administration",
    items: [
      {
        id: "security",
        href: "/security",
        icon: Shield,
        items: [
          {
            id: "loginActivity",
            href: "/security/login-activity",
          },
          {
            id: "adminActivity",
            href: "/security/admin-activity",
          },
          {
            id: "auditLogs",
            href: "/security/audit-logs",
          },
          {
            id: "suspiciousActivity",
            href: "/security/suspicious-activity",
          },
          {
            id: "ipManagement",
            href: "/security/ip-management",
          },
        ],
      },

      {
        id: "system",
        href: "/system",
        icon: Settings,
        items: [
          {
            id: "settings",
            href: "/system/settings",
          },
          {
            id: "roles",
            href: "/system/roles",
          },
          {
            id: "permissions",
            href: "/system/permissions",
          },
          {
            id: "featureFlags",
            href: "/system/feature-flags",
          },
          {
            id: "configuration",
            href: "/system/configuration",
          },
        ],
      },

      {
        id: "cms",
        href: "/cms",
        icon: FileText,
        items: [
          {
            id: "pages",
            href: "/cms/pages",
          },
          {
            id: "banners",
            href: "/cms/banners",
          },
          {
            id: "seo",
            href: "/cms/seo",
          },
          {
            id: "announcements",
            href: "/cms/announcements",
          },
          {
            id: "homepage",
            href: "/cms/homepage",
          },
        ],
      },
    ],
  },
];
