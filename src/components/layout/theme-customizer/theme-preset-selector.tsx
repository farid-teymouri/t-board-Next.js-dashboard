"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { themePresets } from "./presets";
import {
  getStoredThemePreset,
  setStoredThemePreset,
  applyThemePreset,
} from "./utils/theme-preset";
import type { ThemePresetId } from "./types/theme";
import { useState } from "react";

export function ThemePresetSelector() {
  const [activePreset, setActivePreset] = useState<ThemePresetId>(
    getStoredThemePreset(),
  );

  const handlePresetChange = (preset: ThemePresetId) => {
    setActivePreset(preset);
    setStoredThemePreset(preset);
    applyThemePreset(preset);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Theme preset</h3>

        <p className="text-muted-foreground text-xs">
          Choose a color palette for your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {themePresets.map((preset) => {
          const isActive = activePreset === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetChange(preset.id)}
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
                <span className="text-sm font-medium">{preset.name}</span>

                {isActive && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
              </div>

              <div className="flex gap-1.5">
                <span
                  className="size-5 rounded-full"
                  style={{
                    backgroundColor: preset.light.primary,
                  }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{
                    backgroundColor: preset.light.secondary,
                  }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{
                    backgroundColor: preset.light.accent,
                  }}
                />

                <span
                  className="size-5 rounded-full"
                  style={{
                    backgroundColor: preset.light.muted,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
