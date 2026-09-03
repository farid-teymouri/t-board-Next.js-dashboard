"use client";

import type { ReactNode } from "react";

import { useSidebar } from "@/components/ui/sidebar";

type DashboardGridProps = {
  children: ReactNode;
  menuOrientation: "vertical" | "horizontal";
};

export function DashboardGrid({
  children,
  menuOrientation,
}: DashboardGridProps) {
  const { state } = useSidebar();

  return (
    <div
      data-sidebar-state={state}
      data-menu-orientation={menuOrientation}
      className="
        group/dashboard-grid
        flex
        min-w-0
        flex-1
        flex-col
      "
    >
      {children}
    </div>
  );
}
