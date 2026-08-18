// import { HeaderSearch } from "./header-search";
// import { HeaderNotifications } from "./header-notifications";
// import { HeaderUser } from "./header-user";
import { AdminPopover } from "./admin-setting-popover/admin-popover";

export function Header() {
  return (
    <header className="w-full flex flex-row h-16 items-center justify-between border-b px-7  ">
      <AdminPopover
        name="farid teymouri"
        avatarSrc="https://github.com/evilrabbit.png"
        username="demo"
        status="online"
        role="Super Admin"
      />

      {/* <HeaderSearch />

      <div className="flex items-center gap-2">
        <HeaderNotifications />
        <HeaderUser />
      </div> */}
    </header>
  );
}
