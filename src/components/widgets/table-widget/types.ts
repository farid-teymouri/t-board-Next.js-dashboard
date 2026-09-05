import type { ReactNode } from "react";

export type TableWidgetColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export type TableWidgetProps<T> = {
  title: string;
  description: string;
  viewAll?: {
    label: string;
    href: string;
  };
  columns: TableWidgetColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  isLoading?: boolean;
  skeletonRows?: number;
};
