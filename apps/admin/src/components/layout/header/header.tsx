// import { HeaderSearch } from "./header-search";
// import { HeaderNotifications } from "./header-notifications";
// import { HeaderUser } from "./header-user";
import { AdminPopover } from "./admin-setting-popover/admin-popover";
import { FullScreen } from "./full-screen/full-screen";
export function Header() {
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
      </div>
      {/* <HeaderSearch />

      <div className="flex items-center gap-2">
        <HeaderNotifications />
        <HeaderUser />
      </div> */}
    </header>
  );
}
