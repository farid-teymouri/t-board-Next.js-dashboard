"use client";
import { useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { useRouter } from "next/navigation";
import { Paintbrush, XIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type {
  ThemePresetId,
  ThemeWidth,
  ThemeMenuOrientation,
} from "./types/theme";

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
import { ThemeWidthSelector } from "./theme-width-selector";
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

import { ThemeOrientationSelector } from "./theme-orientation-selector";

import {
  getStoredThemeMenuOrientation,
  setStoredThemeMenuOrientation,
  applyThemeMenuOrientation,
} from "./utils/theme-orientation";

type ThemeCustomizerProps = {
  side: "left" | "right";
  locale: "fa" | "en";
  dictionary: Dictionary["themeCustomizer"];
};

export function ThemeCustomizer({
  side,
  locale,
  dictionary,
}: ThemeCustomizerProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [activePreset, setActivePreset] = useState<ThemePresetId>(
    getStoredThemePreset(),
  );
  const [activeWidth, setActiveWidth] = useState<ThemeWidth>(
    getStoredThemeWidth(),
  );
  const [activeOrientation, setActiveOrientation] =
    useState<ThemeMenuOrientation>(getStoredThemeMenuOrientation());

  const handleOrientationChange = (orientation: ThemeMenuOrientation) => {
    setActiveOrientation(orientation);

    setStoredThemeMenuOrientation(orientation);
    applyThemeMenuOrientation(orientation);

    router.refresh();
  };

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

    setActiveOrientation("vertical");
    setStoredThemeMenuOrientation("vertical");
    applyThemeMenuOrientation("vertical");

    router.refresh();
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
            <SheetTitle>{dictionary.themeCustomizer.title}</SheetTitle>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              type="button"
              variant="destructive"
              size="lg"
              onClick={handleReset}
            >
              {dictionary.themeCustomizer.reset}
            </Button>

            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="lg"
                  className="border-0 ring ring-accent"
                />
              }
              aria-label={dictionary.themeCustomizer.close}
            >
              <XIcon />
              <span className="sr-only">
                {dictionary.themeCustomizer.close}
              </span>
            </SheetClose>
          </div>
        </SheetHeader>

        <Separator />

        <div className="p-4">
          <ThemeModeSelector dictionary={dictionary.themeCustomizer.mode} />
        </div>

        <Separator />

        <div className="p-4">
          <ThemePresetSelector
            activePreset={activePreset}
            onPresetChange={handlePresetChange}
            dictionary={dictionary.themeCustomizer.preset}
          />
        </div>

        <Separator />

        <div className="p-4">
          <ThemeWidthSelector
            activeWidth={activeWidth}
            onWidthChange={handleWidthChange}
            dictionary={dictionary.themeCustomizer.width}
          />
        </div>

        <Separator />

        <div className="p-4">
          <ThemeOrientationSelector
            activeOrientation={activeOrientation}
            onOrientationChange={handleOrientationChange}
            dictionary={dictionary.themeCustomizer.orientation}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
