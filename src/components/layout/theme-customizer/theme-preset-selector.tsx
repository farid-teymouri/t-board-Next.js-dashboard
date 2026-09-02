"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

import { themePresets } from "./presets";
import type { ThemePresetId } from "./types/theme";

type ThemePresetDictionary = {
  label: string;
  description: string;
  default: string;
  amberMinimal: string;
  rosePine: string;
  boldTech: string;
  bubblegum: string;
  caffeine: string;
};

type ThemePresetSelectorProps = {
  activePreset: ThemePresetId;
  onPresetChange: (preset: ThemePresetId) => void;
  dictionary: ThemePresetDictionary;
};

const presetDictionaryKeys: Record<ThemePresetId, keyof ThemePresetDictionary> =
  {
    default: "default",
    "amber-minimal": "amberMinimal",
    "rose-pine": "rosePine",
    "bold-tech": "boldTech",
    bubblegum: "bubblegum",
    caffeine: "caffeine",
  };

export function ThemePresetSelector({
  activePreset,
  onPresetChange,
  dictionary,
}: ThemePresetSelectorProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">{dictionary.label}</h3>

        <p className="text-muted-foreground text-xs">
          {dictionary.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {themePresets.map((preset) => {
          const isActive = activePreset === preset.id;

          const label = dictionary[presetDictionaryKeys[preset.id]];

          const colors = resolvedTheme === "dark" ? preset.dark : preset.light;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onPresetChange(preset.id)}
              className={cn(
                "group relative flex flex-col gap-3 rounded-lg border p-3 text-start transition-colors",
                "hover:bg-accent",
                isActive
                  ? "border-primary bg-accent"
                  : "border-border bg-background",
              )}
              aria-pressed={isActive}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>

                {isActive && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                <span
                  className="size-5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{ backgroundColor: colors.secondary }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{ backgroundColor: colors.muted }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
