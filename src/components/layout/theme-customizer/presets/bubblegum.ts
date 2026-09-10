import type { ThemePreset } from "../types/theme";

export const bubblegum: ThemePreset = {
  id: "bubblegum",

  name: "Bubblegum",

  light: {
    background: "oklch(0.9399 0.0203 345.6985)",
    foreground: "oklch(0.4712 0 0)",

    card: "oklch(0.9498 0.0500 86.8891)",
    cardForeground: "oklch(0.4712 0 0)",

    popover: "oklch(1.0000 0 0)",
    popoverForeground: "oklch(0.4712 0 0)",

    primary: "oklch(0.6209 0.1801 348.1385)",
    primaryForeground: "oklch(1.0000 0 0)",

    secondary: "oklch(0.8095 0.0694 198.1863)",
    secondaryForeground: "oklch(0.3211 0 0)",

    muted: "oklch(0.8800 0.0504 212.0952)",
    mutedForeground: "oklch(0.5795 0 0)",

    accent: "oklch(0.9195 0.0801 87.6670)",
    accentForeground: "oklch(0.3211 0 0)",

    destructive: "oklch(0.7091 0.1697 21.9551)",
    destructiveForeground: "oklch(1.0000 0 0)",

    border: "oklch(0.6209 0.1801 348.1385)",
    input: "oklch(0.9189 0 0)",
    ring: "oklch(0.7002 0.1597 350.7532)",

    chart1: "oklch(0.6209 0.1801 348.1385)",
    chart2: "oklch(0.7000 0.1000 210)",
    chart3: "oklch(0.7000 0.1300 88)",
    chart4: "oklch(0.7600 0.1400 350)",
    chart5: "oklch(0.5600 0.1200 215)",

    sidebar: "oklch(0.9140 0.0424 343.0913)",
    sidebarForeground: "oklch(0.3211 0 0)",
    sidebarPrimary: "oklch(0.6559 0.2118 354.3084)",
    sidebarPrimaryForeground: "oklch(1.0000 0 0)",
    sidebarAccent: "oklch(0.8228 0.1095 346.0184)",
    sidebarAccentForeground: "oklch(0.3211 0 0)",
    sidebarBorder: "oklch(0.9464 0.0327 307.1745)",
    sidebarRing: "oklch(0.6559 0.2118 354.3084)",
  },

  dark: {
    background: "oklch(0.2497 0.0305 234.1628)",
    foreground: "oklch(0.9306 0.0197 349.0785)",

    card: "oklch(0.2902 0.0299 233.5352)",
    cardForeground: "oklch(0.9306 0.0197 349.0785)",

    popover: "oklch(0.2902 0.0299 233.5352)",
    popoverForeground: "oklch(0.9306 0.0197 349.0785)",

    primary: "oklch(0.9195 0.0801 87.6670)",
    primaryForeground: "oklch(0.2497 0.0305 234.1628)",

    secondary: "oklch(0.7794 0.0803 4.1330)",
    secondaryForeground: "oklch(0.2497 0.0305 234.1628)",

    muted: "oklch(0.2713 0.0086 255.5780)",
    mutedForeground: "oklch(0.7794 0.0803 4.1330)",

    accent: "oklch(0.6699 0.0988 356.9762)",
    accentForeground: "oklch(0.9306 0.0197 349.0785)",

    destructive: "oklch(0.6702 0.1806 350.3599)",
    destructiveForeground: "oklch(0.2497 0.0305 234.1628)",

    border: "oklch(0.3907 0.0399 242.2181)",
    input: "oklch(0.3093 0.0305 232.0027)",
    ring: "oklch(0.6998 0.0896 201.8672)",

    chart1: "oklch(0.8200 0.1200 200)",
    chart2: "oklch(0.7800 0.1300 4)",
    chart3: "oklch(0.8500 0.1000 88)",
    chart4: "oklch(0.7000 0.1300 357)",
    chart5: "oklch(0.5200 0.0900 217)",

    sidebar: "oklch(0.2303 0.0270 235.9743)",
    sidebarForeground: "oklch(0.9670 0.0029 264.5419)",
    sidebarPrimary: "oklch(0.6559 0.2118 354.3084)",
    sidebarPrimaryForeground: "oklch(1.0000 0 0)",
    sidebarAccent: "oklch(0.8228 0.1095 346.0184)",
    sidebarAccentForeground: "oklch(0.2781 0.0296 256.8480)",
    sidebarBorder: "oklch(0.3729 0.0306 259.7328)",
    sidebarRing: "oklch(0.6559 0.2118 354.3084)",
  },
};
