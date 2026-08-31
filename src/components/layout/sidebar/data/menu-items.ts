import {
  BriefcaseBusiness,
  LayoutDashboard,
  Newspaper,
  ShoppingCart,
} from "lucide-react";

import type { SidebarMenuGroup } from "../types/sidebar";

export const sidebarMenuGroups: SidebarMenuGroup[] = [
  {
    id: "overview",
    items: [
      {
        id: "dashboards",
        href: "/dashboards",
        icon: LayoutDashboard,
        items: [
          {
            id: "sales",
            href: "/dashboards/sales",
          },
          {
            id: "analytics",
            href: "/dashboards/analytics",
          },
          {
            id: "ecommerce",
            href: "/dashboards/ecommerce",
          },
          {
            id: "finance",
            href: "/dashboards/finance",
          },
        ],
      },
    ],
  },

  {
    id: "applications",
    items: [
      {
        id: "ecommerce",
        href: "/ecommerce",
        icon: ShoppingCart,
        items: [
          {
            id: "products",
            href: "/ecommerce/products",
          },
          {
            id: "productDetails",
            href: "/ecommerce/product-details",
          },
          {
            id: "checkout",
            href: "/ecommerce/checkout",
          },
          {
            id: "invoices",
            href: "/ecommerce/invoices",
          },
        ],
      },
    ],
  },

  {
    id: "modules",
    items: [
      {
        id: "jobs",
        icon: BriefcaseBusiness,
        items: [
          {
            id: "dashboards",
            href: "/jobs/dashboards",
          },
          {
            id: "list",
            href: "/jobs/list",
          },
          {
            id: "jobDetails",
            href: "/jobs/job-details",
          },
        ],
      },

      {
        id: "blog",
        icon: Newspaper,
        items: [
          {
            id: "list",
            href: "/blog/list",
          },
          {
            id: "blog-details",
            href: "/blog/blog-details",
          },
        ],
      },
    ],
  },
];
