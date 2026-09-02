import type { ThemePreset } from "../types/theme";

export const defaultTheme: ThemePreset = {
  id: "default",
  name: "Default",

  light: {
    background: "rgb(255, 255, 255)",
    foreground: "rgb(25, 25, 26)",

    card: "rgb(253, 253, 253)",
    cardForeground: "rgb(25, 25, 26)",

    popover: "rgb(255, 255, 255)",
    popoverForeground: "rgb(25, 25, 26)",

    primary: "rgb(25, 25, 26)",
    primaryForeground: "rgb(250, 250, 250)",

    secondary: "rgb(212, 212, 212)",
    secondaryForeground: "rgb(25, 25, 26)",

    muted: "rgb(238, 238, 238)",
    mutedForeground: "rgb(115, 115, 115)",

    accent: "rgb(238, 238, 238)",
    accentForeground: "rgb(25, 25, 26)",

    destructive: "rgb(207, 0, 28)",
    destructiveForeground: "rgb(255, 255, 255)",

    border: "rgb(238, 238, 238)",
    input: "rgb(245, 245, 245)",
    ring: "rgb(161, 161, 161)",

    chart1: "rgb(82, 82, 92)",
    chart2: "rgb(145, 197, 255)",
    chart3: "rgb(139, 168, 120)",
    chart4: "rgb(239, 187, 255)",
    chart5: "rgb(246, 223, 125)",

    sidebar: "rgb(250, 250, 250)",
    sidebarForeground: "rgb(25, 25, 26)",
    sidebarPrimary: "rgb(25, 25, 26)",
    sidebarPrimaryForeground: "rgb(250, 250, 250)",
    sidebarAccent: "rgb(245, 245, 245)",
    sidebarAccentForeground: "rgb(25, 25, 26)",
    sidebarBorder: "rgb(229, 229, 229)",
    sidebarRing: "rgb(161, 161, 161)",
  },

  dark: {
    background: "rgb(25, 25, 26)",
    foreground: "rgb(250, 250, 250)",

    card: "rgb(25, 25, 26)",
    cardForeground: "rgb(250, 250, 250)",

    popover: "rgb(25, 25, 26)",
    popoverForeground: "rgb(250, 250, 250)",

    primary: "rgb(229, 229, 229)",
    primaryForeground: "rgb(25, 25, 26)",

    secondary: "rgb(38, 38, 38)",
    secondaryForeground: "rgb(250, 250, 250)",

    muted: "rgb(38, 38, 38)",
    mutedForeground: "rgb(161, 161, 161)",

    accent: "rgb(64, 64, 64)",
    accentForeground: "rgb(250, 250, 250)",

    destructive: "rgb(255, 101, 104)",
    destructiveForeground: "rgb(250, 250, 250)",

    border: "rgb(38, 38, 38)",
    input: "rgb(38, 38, 38)",
    ring: "rgb(115, 115, 115)",

    chart1: "rgb(228, 228, 231)",
    chart2: "rgb(84, 136, 189)",
    chart3: "rgb(68, 152, 91)",
    chart4: "rgb(115, 61, 150)",
    chart5: "rgb(188, 185, 106)",

    sidebar: "rgb(38, 38, 38)",
    sidebarForeground: "rgb(250, 250, 250)",
    sidebarPrimary: "rgb(20, 71, 230)",
    sidebarPrimaryForeground: "rgb(250, 250, 250)",
    sidebarAccent: "rgb(38, 38, 38)",
    sidebarAccentForeground: "rgb(250, 250, 250)",
    sidebarBorder: "rgb(40, 40, 40)",
    sidebarRing: "rgb(82, 82, 82)",
  },
};
