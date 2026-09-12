import type { ReactNode } from "react";

export type QuickAction = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

export type QuickActionsWidgetProps = {
  eyebrow?: string;
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
  actions: QuickAction[];
  locale: "fa" | "en";
};
