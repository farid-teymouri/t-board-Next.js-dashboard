import type { ThemePreset } from "../types/theme";

export const defaultTheme: ThemePreset = {
  id: "default",
  name: "Default",

  light: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",

    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.145 0 0)",

    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.145 0 0)",

    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",

    secondary: "oklch(0.97 0 0)",
    secondaryForeground: "oklch(0.205 0 0)",

    muted: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.556 0 0)",

    accent: "oklch(0.97 0 0)",
    accentForeground: "oklch(0.205 0 0)",

    destructive: "oklch(0.577 0.245 27.325)",
    destructiveForeground: "oklch(1 0 0)",

    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",

    chart1: "oklch(0.81 0.1 252)",
    chart2: "oklch(0.62 0.19 260)",
    chart3: "oklch(0.55 0.22 263)",
    chart4: "oklch(0.49 0.22 264)",
    chart5: "oklch(0.42 0.18 266)",

    sidebar: "oklch(0.985 0 0)",
    sidebarForeground: "oklch(0.145 0 0)",
    sidebarPrimary: "oklch(0.205 0 0)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.97 0 0)",
    sidebarAccentForeground: "oklch(0.205 0 0)",
    sidebarBorder: "oklch(0.922 0 0)",
    sidebarRing: "oklch(0.708 0 0)",
  },

  dark: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",

    card: "oklch(0.205 0 0)",
    cardForeground: "oklch(0.985 0 0)",

    popover: "oklch(0.269 0 0)",
    popoverForeground: "oklch(0.985 0 0)",

    primary: "oklch(0.922 0 0)",
    primaryForeground: "oklch(0.205 0 0)",

    secondary: "oklch(0.269 0 0)",
    secondaryForeground: "oklch(0.985 0 0)",

    muted: "oklch(0.269 0 0)",
    mutedForeground: "oklch(0.708 0 0)",

    accent: "oklch(0.371 0 0)",
    accentForeground: "oklch(0.985 0 0)",

    destructive: "oklch(0.704 0.191 22.216)",
    destructiveForeground: "oklch(0.985 0 0)",

    border: "oklch(0.275 0 0)",
    input: "oklch(0.325 0 0)",
    ring: "oklch(0.556 0 0)",

    chart1: "oklch(0.81 0.1 252)",
    chart2: "oklch(0.62 0.19 260)",
    chart3: "oklch(0.55 0.22 263)",
    chart4: "oklch(0.49 0.22 264)",
    chart5: "oklch(0.42 0.18 266)",

    sidebar: "oklch(0.205 0 0)",
    sidebarForeground: "oklch(0.985 0 0)",
    sidebarPrimary: "oklch(0.488 0.243 264.376)",
    sidebarPrimaryForeground: "oklch(0.985 0 0)",
    sidebarAccent: "oklch(0.269 0 0)",
    sidebarAccentForeground: "oklch(0.985 0 0)",
    sidebarBorder: "oklch(0.275 0 0)",
    sidebarRing: "oklch(0.439 0 0)",
  },
};
