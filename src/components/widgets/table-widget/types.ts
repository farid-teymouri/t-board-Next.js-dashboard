import type { ReactNode } from "react";

export type TableWidgetVariant = "default" | "progress";

export type TableWidgetColumn<T> = {
  key: string;
  header: string;
  type?: "text" | "progress";
  render: (row: T, index: number) => ReactNode;
  className?: string;
};

export type TableWidgetProps<T> = {
  variant?: TableWidgetVariant;

  title: string;
  description: string;

  viewAll?: {
    label: string;
    href: string;
  };

  columns: TableWidgetColumn<T>[];
  data: T[];

  getRowKey: (row: T) => string | number;

  progress?: TableWidgetProgressConfig<T>;

  isLoading?: boolean;
  skeletonRows?: number;
};

export type TableWidgetProgressConfig<T> = {
  getValue: (row: T) => number;
  getClassName?: (row: T, index: number) => string;
};
