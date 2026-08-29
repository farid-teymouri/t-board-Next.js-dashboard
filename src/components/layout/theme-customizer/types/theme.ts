export type ThemePresetId =
  | "default"
  | "amber-minimal"
  | "amethyst-haze"
  | "bold-tech"
  | "bubblegum"
  | "caffeine";

export type ThemeColors = {
  background: string;
  foreground: string;

  card: string;
  cardForeground: string;

  popover: string;
  popoverForeground: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  muted: string;
  mutedForeground: string;

  accent: string;
  accentForeground: string;

  destructive: string;
  destructiveForeground: string;

  border: string;
  input: string;
  ring: string;

  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type ThemeTokens = ThemeColors & {
  radius?: string;

  fontSans?: string;
  fontSerif?: string;
  fontMono?: string;
  fontDisplay?: string;
  fontText?: string;

  shadow2xs?: string;
  shadowXs?: string;
  shadowSm?: string;
  shadow?: string;
  shadowMd?: string;
  shadowLg?: string;
  shadowXl?: string;
  shadow2xl?: string;

  shadowColor?: string;
  shadowOpacity?: string;
  shadowBlur?: string;
  shadowSpread?: string;
  shadowOffsetX?: string;
  shadowOffsetY?: string;

  letterSpacing?: string;
  spacing?: string;
  trackingNormal?: string;
};

export type ThemePreset = {
  id: ThemePresetId;
  name: string;
  light: ThemeTokens;
  dark: ThemeTokens;
};
