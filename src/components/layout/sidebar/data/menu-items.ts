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
        href: "/dashboards/sales",
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
        href: "/ecommerce/products",
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
        href: "/jobs/dashboards",
        icon: BriefcaseBusiness,
        items: [
          {
            id: "jobsDashboard",
            href: "/jobs/dashboards",
          },
          {
            id: "jobsList",
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
            id: "blogList",
            href: "/blog/list",
          },
          {
            id: "blogDetails",
            href: "/blog/blog-details",
          },
        ],
      },
    ],
  },
];
