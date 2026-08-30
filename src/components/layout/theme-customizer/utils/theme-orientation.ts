import type { ThemeMenuOrientation } from "../types/theme";

const THEME_MENU_ORIENTATION_KEY = "theme-menu-orientation";

const THEME_MENU_ORIENTATIONS: ThemeMenuOrientation[] = [
  "vertical",
  "horizontal",
];

export function isValidThemeMenuOrientation(
  orientation: string | null,
): orientation is ThemeMenuOrientation {
  return (
    !!orientation &&
    THEME_MENU_ORIENTATIONS.includes(orientation as ThemeMenuOrientation)
  );
}

export function getStoredThemeMenuOrientation(): ThemeMenuOrientation {
  if (typeof window === "undefined") {
    return "vertical";
  }

  const storedOrientation = window.localStorage.getItem(
    THEME_MENU_ORIENTATION_KEY,
  );

  return isValidThemeMenuOrientation(storedOrientation)
    ? storedOrientation
    : "vertical";
}

export function setStoredThemeMenuOrientation(
  orientation: ThemeMenuOrientation,
) {
  window.localStorage.setItem(THEME_MENU_ORIENTATION_KEY, orientation);

  document.cookie = `${THEME_MENU_ORIENTATION_KEY}=${orientation}; path=/; max-age=31536000; SameSite=Lax`;
}

export function applyThemeMenuOrientation(orientation: ThemeMenuOrientation) {
  document.documentElement.setAttribute("data-menu-orientation", orientation);
}
