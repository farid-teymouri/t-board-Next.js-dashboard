import { notFound } from "next/navigation";

import type { Locale } from "./config";
import { hasLocale } from "./config";

const dictionaries = {
  en: async () => ({
    util: (await import("./en.json")).default,

    adminSettings: (
      await import("@/components/layout/header/admin-setting-popover/en.json")
    ).default,

    sidebar: (await import("@/components/layout/sidebar/en.json")).default,

    notifications: (
      await import("@/components/layout/header/notification-popover/en.json")
    ).default,

    languageSwitcher: (
      await import("@/components/layout/header/language-switcher/en.json")
    ).default,

    search: (await import("@/components/layout/header/search/en.json")).default,

    themeCustomizer: (
      await import("@/components/layout/theme-customizer/en.json")
    ).default,
  }),

  fa: async () => ({
    util: (await import("./fa.json")).default,

    adminSettings: (
      await import("@/components/layout/header/admin-setting-popover/fa.json")
    ).default,

    sidebar: (await import("@/components/layout/sidebar/fa.json")).default,

    notifications: (
      await import("@/components/layout/header/notification-popover/fa.json")
    ).default,

    languageSwitcher: (
      await import("@/components/layout/header/language-switcher/fa.json")
    ).default,

    search: (await import("@/components/layout/header/search/fa.json")).default,

    themeCustomizer: (
      await import("@/components/layout/theme-customizer/fa.json")
    ).default,
  }),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fa"]>>;

export type AdminSettingsDictionary = Dictionary["adminSettings"];

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
};
