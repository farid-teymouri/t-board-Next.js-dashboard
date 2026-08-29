"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const themeModes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
] as const;

export function ThemeModeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-between">
      <Label>Theme mode</Label>

      <div className="grid grid-cols-3 gap-2">
        {themeModes.map((themeMode) => {
          const Icon = themeMode.icon;
          const isActive = theme === themeMode.value;

          return (
            <Button
              key={themeMode.value}
              type="button"
              variant={isActive ? "secondary" : "ghost"}
              className={`${isActive ? "ring ring-accent" : "hover:ring hover:ring-accent"} h-auto flex-col gap-2 border-0 py-3`}
              onClick={() => setTheme(themeMode.value)}
            >
              <Icon className="size-5" />
              <span className="text-xs">{themeMode.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
