import type { ThemeWidth } from "../types/theme";

const THEME_WIDTH_KEY = "theme-width";

const THEME_WIDTH_VALUES: ThemeWidth[] = ["container", "fluid"];

export function isValidThemeWidth(width: string | null): width is ThemeWidth {
  return !!width && THEME_WIDTH_VALUES.includes(width as ThemeWidth);
}

export function getStoredThemeWidth(): ThemeWidth {
  if (typeof window === "undefined") {
    return "container";
  }

  const storedWidth = window.localStorage.getItem(THEME_WIDTH_KEY);

  return isValidThemeWidth(storedWidth) ? storedWidth : "container";
}

export function setStoredThemeWidth(width: ThemeWidth) {
  window.localStorage.setItem(THEME_WIDTH_KEY, width);

  document.cookie = `${THEME_WIDTH_KEY}=${width}; path=/; max-age=31536000; SameSite=Lax`;
}

export function applyThemeWidth(width: ThemeWidth) {
  document.documentElement.setAttribute("data-theme-width", width);
}
