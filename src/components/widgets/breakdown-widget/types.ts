export type BreakdownWidgetVariant = "default" | "list";

export type BreakdownWidgetItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type BreakdownWidgetProps = {
  locale: "fa" | "en";
  title: string;
  description?: string;
  total: {
    value: number;
    label: string;
  };
  items: BreakdownWidgetItem[];
  variant?: BreakdownWidgetVariant;
};
