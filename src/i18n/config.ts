export const i18nConfig = {
  locales: ["fa", "en"],
  defaultLocale: "fa",
  prefixDefault: false,
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

export const hasLocale = (locale: string): locale is Locale =>
  i18nConfig.locales.includes(locale as Locale);

export default i18nConfig;
