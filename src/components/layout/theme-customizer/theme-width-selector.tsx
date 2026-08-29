"use client";

import { Maximize2, MoveHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { ThemeWidth } from "./types/theme";

type ThemeWidthSelectorProps = {
  activeWidth: ThemeWidth;
  onWidthChange: (width: ThemeWidth) => void;
};

const themeWidths = [
  {
    value: "container",
    label: "Container",
    icon: Maximize2,
  },
  {
    value: "fluid",
    label: "Fluid",
    icon: MoveHorizontal,
  },
] as const;

export function ThemeWidthSelector({
  activeWidth,
  onWidthChange,
}: ThemeWidthSelectorProps) {
  return (
    <div className="flex md:flex-row flex-col md:items-center justify-between gap-4">
      <div>
        <Label>Theme width</Label>

        <p className="text-xs text-muted-foreground">
          Choose the width of your dashboard content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {themeWidths.map((themeWidth) => {
          const Icon = themeWidth.icon;
          const isActive = activeWidth === themeWidth.value;

          return (
            <Button
              key={themeWidth.value}
              type="button"
              variant={isActive ? "default" : "secondary"}
              className={
                isActive
                  ? "h-auto flex-col gap-2 border-0 py-3 ring ring-accent"
                  : "h-auto flex-col gap-2 border-0 py-3 hover:ring hover:ring-accent ring ring-accent hover:bg-accent"
              }
              onClick={() => onWidthChange(themeWidth.value)}
            >
              <Icon className="size-5" />
              <span className="text-xs">{themeWidth.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
