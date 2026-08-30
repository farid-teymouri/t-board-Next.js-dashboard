"use client";

import { getStoredThemePreset, applyThemePreset } from "./utils/theme-preset";

import { getStoredThemeWidth, applyThemeWidth } from "./utils/theme-width";

import {
  getStoredThemeMenuOrientation,
  applyThemeMenuOrientation,
} from "./utils/theme-orientation";

export function applyStoredThemeSettings() {
  const preset = getStoredThemePreset();
  const width = getStoredThemeWidth();
  const orientation = getStoredThemeMenuOrientation();

  applyThemePreset(preset);
  applyThemeWidth(width);
  applyThemeMenuOrientation(orientation);
}
