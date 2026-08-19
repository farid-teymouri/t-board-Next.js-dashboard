import { locale } from "next/root-params";
import { notFound } from "next/navigation";

const dictionaries = {
  en: async () => ({
    util: (await import("./en.json")).default,

    adminSettings: (
      await import("@/components/layout/header/admin-setting-popover/en.json")
    ).default,

    notifications: (
      await import("@/components/layout/header/notification-popover/en.json")
    ).default,

    languageSwitcher: (
      await import("@/components/layout/header/language-switcher/en.json")
    ).default,
  }),

  fa: async () => ({
    util: (await import("./fa.json")).default,

    adminSettings: (
      await import("@/components/layout/header/admin-setting-popover/fa.json")
    ).default,

    notifications: (
      await import("@/components/layout/header/notification-popover/fa.json")
    ).default,

    languageSwitcher: (
      await import("@/components/layout/header/language-switcher/fa.json")
    ).default,
  }),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async () => {
  const currentLocale = await locale();

  if (!hasLocale(currentLocale)) {
    notFound();
  }

  return dictionaries[currentLocale]();
};
