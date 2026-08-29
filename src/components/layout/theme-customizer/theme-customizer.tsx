"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Paintbrush, XIcon } from "lucide-react";
import { ThemeWidthSelector } from "./theme-width-selector";
import type { ThemePresetId, ThemeWidth } from "./types/theme";

import {
  getStoredThemePreset,
  setStoredThemePreset,
  applyThemePreset,
} from "./utils/theme-preset";

import {
  getStoredThemeWidth,
  setStoredThemeWidth,
  applyThemeWidth,
} from "./utils/theme-width";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ThemeModeSelector } from "./theme-mode-selector";
import { ThemePresetSelector } from "./theme-preset-selector";

type ThemeCustomizerProps = {
  side: "left" | "right";
  locale: "fa" | "en";
};

export function ThemeCustomizer({ side, locale }: ThemeCustomizerProps) {
  const { setTheme } = useTheme();

  const [activePreset, setActivePreset] = useState<ThemePresetId>(
    getStoredThemePreset(),
  );
  const [activeWidth, setActiveWidth] = useState<ThemeWidth>(
    getStoredThemeWidth(),
  );
  const handlePresetChange = (preset: ThemePresetId) => {
    setActivePreset(preset);
    setStoredThemePreset(preset);
    applyThemePreset(preset);
  };
  const handleWidthChange = (width: ThemeWidth) => {
    setActiveWidth(width);
    setStoredThemeWidth(width);
    applyThemeWidth(width);
  };
  const handleReset = () => {
    setTheme("system");

    setActivePreset("default");
    setStoredThemePreset("default");
    applyThemePreset("default");

    setActiveWidth("container");
    setStoredThemeWidth("container");
    applyThemeWidth("container");
  };

  const triggerSide = locale === "fa" ? "left" : "right";

  return (
    <Sheet>
      <SheetTrigger
        dir="ltr"
        className={cn(
          "fixed top-1/2 z-50 flex size-12 -translate-y-1/2 items-center justify-center",
          "border bg-background/95 shadow-lg backdrop-blur hover:bg-accent",
          triggerSide === "right"
            ? "inset-e-0 rounded-s-xl border-e-0"
            : "inset-s-0 rounded-e-xl border-s-0",
        )}
        aria-label="Customize theme"
      >
        <Paintbrush className="size-5" />
      </SheetTrigger>

      <SheetContent
        side={side === "right" ? "left" : "right"}
        dir={locale === "fa" ? "rtl" : "ltr"}
        showCloseButton={false}
        className="w-full gap-2 p-0 sm:max-w-sm"
      >
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle>Theme settings</SheetTitle>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={handleReset}
            >
              Reset
            </Button>

            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="lg"
                  className="border-0 ring ring-accent"
                />
              }
              aria-label="Close"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        <Separator />

        <div className="p-4">
          <ThemeModeSelector />
        </div>

        <Separator />

        <div className="p-4">
          <ThemePresetSelector
            activePreset={activePreset}
            onPresetChange={handlePresetChange}
          />
        </div>
        <Separator />

        <div className="p-4">
          <ThemeWidthSelector
            activeWidth={activeWidth}
            onWidthChange={handleWidthChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
