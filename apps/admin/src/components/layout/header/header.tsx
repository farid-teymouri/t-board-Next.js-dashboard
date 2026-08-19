import { AdminPopover } from "./admin-setting-popover/admin-popover";

import { FullScreen } from "./full-screen/full-screen";

import { getDictionary } from "@/i18n/dictionaries";

import { NotificationPopover } from "./notification-popover/components/notification-popover";

import { LanguageSwitcher } from "./language-switcher/language-switcher";

export async function Header() {
  const dic = await getDictionary();
  return (
    <header className="w-full flex flex-row h-16 items-center justify-between border-b px-7  ">
      <div className="flex flex-row items-center gap-4">
        <AdminPopover
          name="farid teymouri"
          avatarSrc="https://github.com/evilrabbit.png"
          username="demo"
          status="online"
          role="Super Admin"
        />
        <FullScreen />
        <NotificationPopover
          dictionary={dic.notifications}
          timeDictionary={dic.util.time}
        />
        <LanguageSwitcher dictionary={dic.languageSwitcher} />
      </div>
      {/* <HeaderSearch />

      <div className="flex items-center gap-2">
        <HeaderNotifications />
        <HeaderUser />
      </div> */}
    </header>
  );
}
