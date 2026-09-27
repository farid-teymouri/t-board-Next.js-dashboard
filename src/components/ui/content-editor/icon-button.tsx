"use client";

import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ContentEditorIconButtonProps = ComponentProps<typeof Button> & {
  tooltip: string;
};

export function ContentEditorIconButton({
  tooltip,
  children,
  ...props
}: ContentEditorIconButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button {...props}>{children}</Button>} />
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
