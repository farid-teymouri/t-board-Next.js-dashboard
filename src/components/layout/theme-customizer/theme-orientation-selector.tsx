"use client";

import { Check, PanelTop, Rows3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import type { ThemeMenuOrientation } from "./types/theme";

type ThemeOrientationDictionary = {
  label: string;
  description: string;
  vertical: string;
  horizontal: string;
  sidebarNavigation: string;
  topNavigation: string;
};

type ThemeOrientationSelectorProps = {
  activeOrientation: ThemeMenuOrientation;
  onOrientationChange: (orientation: ThemeMenuOrientation) => void;
  dictionary: ThemeOrientationDictionary;
};

const orientations = [
  {
    value: "vertical",
    icon: Rows3,
    descriptionKey: "sidebarNavigation",
  },
  {
    value: "horizontal",
    icon: PanelTop,
    descriptionKey: "topNavigation",
  },
] as const;

export function ThemeOrientationSelector({
  activeOrientation,
  onOrientationChange,
  dictionary,
}: ThemeOrientationSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">{dictionary.label}</h3>

        <p className="text-xs text-muted-foreground">
          {dictionary.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {orientations.map((orientation) => {
          const Icon = orientation.icon;
          const isActive = activeOrientation === orientation.value;

          const orientationLabel = dictionary[orientation.value];
          const orientationDescription = dictionary[orientation.descriptionKey];

          return (
            <Button
              key={orientation.value}
              type="button"
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "relative h-auto min-h-24 flex-col gap-2 border p-3",
                isActive
                  ? "border-primary ring ring-accent"
                  : "border-border hover:ring hover:ring-accent",
              )}
              onClick={() => onOrientationChange(orientation.value)}
              aria-pressed={isActive}
            >
              {isActive && (
                <span className="absolute inset-e-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" />
                </span>
              )}

              <Icon className="size-6" />

              <span className="text-xs font-medium">{orientationLabel}</span>

              <span className="text-[10px] text-muted-foreground">
                {orientationDescription}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
