"use client";

import { Maximize2, MoveHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import type { ThemeWidth } from "./types/theme";

type ThemeWidthDictionary = {
  label: string;
  description: string;
  container: string;
  fluid: string;
};

type ThemeWidthSelectorProps = {
  activeWidth: ThemeWidth;
  onWidthChange: (width: ThemeWidth) => void;
  dictionary: ThemeWidthDictionary;
};

const themeWidths = [
  {
    value: "container",
    icon: Maximize2,
  },
  {
    value: "fluid",
    icon: MoveHorizontal,
  },
] as const;

export function ThemeWidthSelector({
  activeWidth,
  onWidthChange,
  dictionary,
}: ThemeWidthSelectorProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <Label>{dictionary.label}</Label>

        <p className="text-xs text-muted-foreground">
          {dictionary.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {themeWidths.map((themeWidth) => {
          const Icon = themeWidth.icon;
          const isActive = activeWidth === themeWidth.value;
          const label = dictionary[themeWidth.value];

          return (
            <Button
              key={themeWidth.value}
              type="button"
              variant={isActive ? "default" : "secondary"}
              className={
                isActive
                  ? "h-auto flex-col gap-2 border-0 py-3 ring ring-accent"
                  : "h-auto flex-col gap-2 border-0 py-3 ring ring-accent hover:ring-accent"
              }
              onClick={() => onWidthChange(themeWidth.value)}
            >
              <Icon className="size-5" />
              <span className="text-xs">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
