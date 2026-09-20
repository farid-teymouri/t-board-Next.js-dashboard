import { notFound } from "next/navigation";

import type { Locale } from "./config";
import { hasLocale } from "./config";

const dictionaries = {
  en: async () => ({
    util: (await import("./en.json")).default,

    settings: (
      await import("@/components/layout/header/user-setting-popover/en.json")
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

    dashboards: {
      sales: (await import("@/modules/dashboards/sales/en.json")).default,
      analytics: (await import("@/modules/dashboards/analytics/en.json"))
        .default,
      ecommerce: (await import("@/modules/dashboards/ecommerce/en.json"))
        .default,
      finance: (await import("@/modules/dashboards/finance/en.json")).default,
    },

    ecommerce: {
      checkout: (await import("@/modules/ecommerce/checkout/en.json")).default,
      products: (await import("@/modules/ecommerce/products/en.json")).default,
      productDetails: (
        await import("@/modules/ecommerce/product-details/en.json")
      ).default,
      invoices: (await import("@/modules/ecommerce/invoices/en.json")).default,
    },
    blog: {
      blogDetails: (await import("@/modules/blog/blog-details/en.json"))
        .default,
      list: (await import("@/modules/blog/list/en.json")).default,
    },

    jobs: {
      jobDetails: (await import("@/modules/jobs/job-details/en.json")).default,
      list: (await import("@/modules/jobs/list/en.json")).default,
    },
  }),

  fa: async () => ({
    util: (await import("./fa.json")).default,

    settings: (
      await import("@/components/layout/header/user-setting-popover/fa.json")
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

    dashboards: {
      sales: (await import("@/modules/dashboards/sales/fa.json")).default,
      analytics: (await import("@/modules/dashboards/analytics/fa.json"))
        .default,
      ecommerce: (await import("@/modules/dashboards/ecommerce/fa.json"))
        .default,
      finance: (await import("@/modules/dashboards/finance/fa.json")).default,
    },

    ecommerce: {
      checkout: (await import("@/modules/ecommerce/checkout/fa.json")).default,
      products: (await import("@/modules/ecommerce/products/fa.json")).default,
      productDetails: (
        await import("@/modules/ecommerce/product-details/fa.json")
      ).default,
      invoices: (await import("@/modules/ecommerce/invoices/fa.json")).default,
    },

    blog: {
      blogDetails: (await import("@/modules/blog/blog-details/fa.json"))
        .default,
      list: (await import("@/modules/blog/list/fa.json")).default,
    },

    jobs: {
      jobDetails: (await import("@/modules/jobs/job-details/fa.json")).default,
      list: (await import("@/modules/jobs/list/fa.json")).default,
    },
  }),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["fa"]>>;

export type UserSettingsDictionary = Dictionary["settings"];

export type SalesDashboardDictionary = Dictionary["dashboards"]["sales"];

export type AnalyticsDashboardDictionary =
  Dictionary["dashboards"]["analytics"];

export type EcommerceDashboardDictionary =
  Dictionary["dashboards"]["ecommerce"];

export type FinanceDashboardDictionary = Dictionary["dashboards"]["finance"];

export type EcommerceProductsDictionary = Dictionary["ecommerce"]["products"];

export type EcommerceProductDetailsDictionary =
  Dictionary["ecommerce"]["productDetails"];

export type EcommerceInvoicesDictionary = Dictionary["ecommerce"]["invoices"];

export type EcommerceCheckoutDictionary = Dictionary["ecommerce"]["checkout"];

export type BlogDictionary = Dictionary["blog"];

export type BlogListDictionary = Dictionary["blog"]["list"];

export type BlogDetailsDictionary = Dictionary["blog"]["blogDetails"];

export type JobsDictionary = Dictionary["jobs"];

export type JobListDictionary = Dictionary["jobs"]["list"];

export type JobDetailsDictionary = Dictionary["jobs"]["jobDetails"];

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
};
