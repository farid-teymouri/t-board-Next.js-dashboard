import type { ReactNode } from "react";

type PageHeaderContentProps = {
  children: ReactNode;
};

export function PageHeaderContent({ children }: PageHeaderContentProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {children}
    </div>
  );
}
