export type SegmentedProgressSegment = {
  id: string;
  label: string;
  value: number;
  className?: string;
};

export type SegmentedProgressWidgetTranslations = {
  title: string;
  subtitle?: string;
  alert?: string;
};

export type SegmentedProgressWidgetProps = {
  translations: SegmentedProgressWidgetTranslations;
  segments: SegmentedProgressSegment[];
  total?: number;
  locale: "fa" | "en";
  isLoading?: boolean;
  isError?: boolean;
  showLegend?: boolean;
  showAlert?: boolean;
  alert?: string;
};
