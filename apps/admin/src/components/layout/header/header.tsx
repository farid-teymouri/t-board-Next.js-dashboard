import { SidebarTrigger } from "@/components/ui/sidebar";

import { getDictionary } from "@/i18n/dictionaries";

import { AdminPopover } from "./admin-setting-popover/admin-popover";
import { FullScreen } from "./full-screen/full-screen";
import { LanguageSwitcher } from "./language-switcher/language-switcher";
import { NotificationPopover } from "./notification-popover/components/notification-popover";
import { SearchInput } from "./search/search";
import { MobileSearch } from "./mobile-search/mobile-search";
import { SidebarLogo } from "../sidebar/sidebar-logo";

type HeaderProps = {
  locale: "fa" | "en";
};

export async function Header({ locale }: HeaderProps) {
  const dic = await getDictionary(locale);
  return (
    <header className="relative flex w-full shrink-0 flex-col border-b z-20">
      {/* Main header */}
      <div className="flex h-16 w-full items-center px-4 md:px-5 lg:px-7">
        <div className="flex flex-row w-full items-center gap-3 md:gap-4 justify-between">
          {/* Sidebar + Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <SidebarLogo />{" "}
            </div>

            <SidebarTrigger />
          </div>

          {/* Desktop search */}
          <div className="hidden min-w-0 flex-1 md:block">
            <div className="w-full max-w-108.75">
              <SearchInput dictionary={dic.search} />
            </div>
          </div>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3 lg:gap-4">
            {/* Mobile Search */}
            <div className="md:hidden">
              <MobileSearch dictionary={dic.search} />
            </div>
            {/* Language */}
            <div className="block">
              <LanguageSwitcher dictionary={dic.languageSwitcher} />
            </div>
            {/* Notifications */}
            <NotificationPopover
              dictionary={dic.notifications}
              timeDictionary={dic.util.time}
            />
            {/* Fullscreen */}
            <div className="hidden lg:block">
              <FullScreen />
            </div>
            {/* Admin */}
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
