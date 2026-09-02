import type { ThemePresetId } from "../types/theme";

const THEME_PRESET_KEY = "theme-preset";

const THEME_PRESET_IDS: ThemePresetId[] = [
  "default",
  "amber-minimal",
  "rose-pine",
  "bold-tech",
  "bubblegum",
  "caffeine",
];

export function isValidThemePreset(
  preset: string | null,
): preset is ThemePresetId {
  return !!preset && THEME_PRESET_IDS.includes(preset as ThemePresetId);
}

export function getStoredThemePreset(): ThemePresetId {
  if (typeof window === "undefined") {
    return "default";
  }

  const storedPreset = window.localStorage.getItem(THEME_PRESET_KEY);

  return isValidThemePreset(storedPreset) ? storedPreset : "default";
}

export function setStoredThemePreset(preset: ThemePresetId) {
  window.localStorage.setItem(THEME_PRESET_KEY, preset);
  document.cookie = `${THEME_PRESET_KEY}=${preset}; path=/; max-age=31536000; SameSite=Lax`;
}

export function applyThemePreset(preset: ThemePresetId) {
  document.documentElement.setAttribute("data-theme", preset);
}
