import { SidebarTrigger } from "@/components/ui/sidebar";
import type { Locale } from "@/i18n/config";
import { AdminPopover } from "./admin-setting-popover/admin-popover";
import { FullScreen } from "./full-screen/full-screen";
import { LanguageSwitcher } from "./language-switcher/language-switcher";
import { NotificationPopover } from "./notification-popover/components/notification-popover";
import { SearchInput } from "./search/search";

import { getDictionary } from "@/i18n/dictionaries";

import { SidebarLogo } from "../sidebar/sidebar-logo";

type HeaderProps = {
  locale: "fa" | "en";
};

export async function Header({ locale }: HeaderProps) {
  const dic = await getDictionary(locale);

  return (
    <header className="flex h-16 w-full shrink-0 items-center border-b px-7">
      <div className="flex w-full items-center gap-4">
        {/* Sidebar + Logo */}
        <div className="flex flex-row justify-between w-50 shrink-0 items-center gap-2">
          <SidebarLogo />
          <SidebarTrigger />
        </div>

        {/* Header actions */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="block w-full max-w-108.75">
            <SearchInput />
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher dictionary={dic.languageSwitcher} />

            <NotificationPopover
              dictionary={dic.notifications}
              timeDictionary={dic.util.time}
            />

            <FullScreen />

            <AdminPopover
              dictionary={dic.adminSettings}
              name="farid teymouri"
              avatarSrc="https://github.com/evilrabbit.png"
              username="demo"
              status="online"
              role="Super Admin"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
