import type { CSSProperties, ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

import { getDictionary } from "@/i18n/dictionaries";
import { ThemeCustomizer } from "@/components/layout/theme-customizer/theme-customizer";
import { Header } from "./header/header";
import { AdminSidebar } from "./sidebar/admin-sidebar";

type AdminLayoutProps = {
  children: ReactNode;
  locale: "fa" | "en";
};

export async function AdminLayout({ children, locale }: AdminLayoutProps) {
  const dictionary = await getDictionary(locale);

  const isRTL = locale === "fa";

  return (
    <SidebarProvider
      style={
        {
          "--admin-header-height": "4rem",
        } as CSSProperties
      }
    >
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="flex min-h-svh w-full flex-col"
      >
        <Header locale={locale} />

        <div className="flex min-h-0 flex-1">
          <AdminSidebar
            side={isRTL ? "right" : "left"}
            locale={locale}
            dictionary={dictionary.sidebar}
          />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <ThemeCustomizer side={isRTL ? "right" : "left"} locale={locale} />
    </SidebarProvider>
  );
}
