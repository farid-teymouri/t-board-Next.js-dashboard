import type { CSSProperties, ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { getDictionary } from "@/i18n/dictionaries";
import { ThemeCustomizer } from "@/components/layout/theme-customizer/theme-customizer";
import { DashboardGrid } from "../dashboards/dashboard-grid";
import { Header } from "./header/header";
import { UserSidebar } from "./sidebar/user-sidebar";
import { UserNavigationMenu } from "./sidebar/user-navigation-menu";

import { cookies } from "next/headers";

type UserLayoutProps = {
  children: ReactNode;
  locale: "fa" | "en";
};

export async function UserLayout({ children, locale }: UserLayoutProps) {
  const dictionary = await getDictionary(locale);
  const isRTL = locale === "fa";

  const cookieStore = await cookies();

  const menuOrientation =
    cookieStore.get("theme-menu-orientation")?.value === "horizontal"
      ? "horizontal"
      : "vertical";

  return (
    <SidebarProvider
      style={
        {
          "--user-header-height": "4rem",
        } as CSSProperties
      }
    >
      <div
        dir={isRTL ? "rtl" : "ltr"}
        data-menu-orientation={menuOrientation}
        className="flex min-h-svh w-full flex-col"
      >
        <Header locale={locale} />

        <div className="flex min-h-0 flex-1 in-data-[menu-orientation=horizontal]:lg:flex-col">
          {/* Sidebar
              - Mobile: always visible
              - Desktop: only in vertical mode
          */}
          <div className="block in-data-[menu-orientation=horizontal]:lg:hidden md:mx-2 mx-1">
            <UserSidebar
              side={isRTL ? "right" : "left"}
              locale={locale}
              dictionary={dictionary.sidebar}
            />
          </div>

          {/* Horizontal navigation
              - Mobile: hidden
              - Desktop: only in horizontal mode
          */}
          <div
            data-theme-content
            className="
          sticky top-20 z-40
          hidden
          w-full
          in-data-[menu-orientation=horizontal]:lg:block
          in-data-[menu-orientation=horizontal]:lg:px-5
          bg-background
          backdrop-blur-xl
          supports-backdrop-filter:bg-background/50
          border-b border-border/40
          in-data-[theme-width=container]:mx-auto
          in-data-[theme-width=container]:max-w-7xl
          in-data-[theme-width=container]:px-4
          in-data-[theme-width=container]:sm:px-6
          in-data-[theme-width=container]:lg:px-8
            "
          >
            <UserNavigationMenu
              locale={locale}
              dictionary={dictionary.sidebar}
            />
          </div>

          <main
            data-theme-content
            className=" flex min-w-0 flex-1 flex-col in-data-[menu-orientation=horizontal]:lg:mx-5 me-5 rounded-tl-xl rounded-tr-xl bg-foreground/2 "
          >
            <DashboardGrid menuOrientation={menuOrientation}>
              <div className=" flex w-full flex-col gap-14 p-5 in-data-[theme-width=container]:mx-auto in-data-[theme-width=container]:lg:w-[72vw] ">
                {children}
              </div>
            </DashboardGrid>
          </main>
        </div>
      </div>

      <ThemeCustomizer
        side={isRTL ? "right" : "left"}
        locale={locale}
        dictionary={dictionary.themeCustomizer}
      />
    </SidebarProvider>
  );
}
