"use client";

import { Paintbrush, XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeModeSelector } from "./theme-mode-selector";
import { ThemePresetSelector } from "./theme-preset-selector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
export function ThemeCustomizer() {
  const { setTheme } = useTheme();
  return (
    <Sheet>
      <SheetTrigger
        className="
          fixed
          top-1/2
          inset-e-0
          z-50
          flex
          size-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-none
          rounded-s-xl
          border
          border-e-0
          bg-background/95
          shadow-lg
          backdrop-blur
          hover:bg-accent
        "
        aria-label="Customize theme"
      >
        <Paintbrush className="size-5" />
      </SheetTrigger>

      <SheetContent
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
              onClick={() => setTheme("system")}
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
          <ThemePresetSelector />
        </div>
      </SheetContent>
    </Sheet>
  );
}
