"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const themeModes = [
  {
    value: "light",
    icon: Sun,
  },
  {
    value: "dark",
    icon: Moon,
  },
  {
    value: "system",
    icon: Monitor,
  },
] as const;

type ThemeModeDictionary = {
  label: string;
  light: string;
  dark: string;
  system: string;
};

type ThemeModeSelectorProps = {
  dictionary: ThemeModeDictionary;
};

export function ThemeModeSelector({ dictionary }: ThemeModeSelectorProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-between">
      <Label>{dictionary.label}</Label>

      <div className="grid grid-cols-3 gap-2">
        {themeModes.map((themeMode) => {
          const Icon = themeMode.icon;
          const isActive = theme === themeMode.value;
          const label = dictionary[themeMode.value];

          return (
            <Button
              key={themeMode.value}
              type="button"
              variant={isActive ? "default" : "ghost"}
              className={`${isActive ? "ring ring-accent" : "hover:ring hover:ring-accent"} h-auto flex-col gap-2 border-0 py-3`}
              onClick={() => setTheme(themeMode.value)}
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
