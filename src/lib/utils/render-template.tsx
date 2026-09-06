import type { ReactNode } from "react";

type TemplateValues = Record<string, ReactNode>;

export function renderTemplate(
  template: string,
  values: TemplateValues,
): ReactNode[] {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const match = part.match(/^\{(\w+)\}$/);

    if (!match) {
      return part;
    }

    return <span key={`${match[1]}-${index}`}>{values[match[1]]}</span>;
  });
}
