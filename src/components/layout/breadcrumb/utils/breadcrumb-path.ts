import type {
  SidebarMenuGroup,
  SidebarMenuItem,
  SidebarSubItem,
} from "@/components/layout/sidebar/types/sidebar";

type BreadcrumbItem = SidebarMenuItem | SidebarSubItem;

// Finds the navigation hierarchy for the current route.
export function findBreadcrumbPath(
  groups: SidebarMenuGroup[],
  pathname: string,
): BreadcrumbItem[] | null {
  for (const group of groups) {
    const result = findInItems(group.items, pathname);

    if (result) {
      return result;
    }
  }

  return null;
}

function findInItems(
  items: SidebarMenuItem[],
  pathname: string,
): BreadcrumbItem[] | null {
  for (const item of items) {
    if (item.items) {
      const result = item.items.find((subItem) => subItem.href === pathname);

      if (result) {
        // Dashboards is rendered as the fixed root icon and is omitted from the path.
        if (item.id === "dashboards") {
          return [result];
        }

        return [item, result];
      }
    }

    if (item.href === pathname) {
      return [item];
    }
  }

  return null;
}
