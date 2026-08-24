import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminAvatar } from "./admin-avatar";
import { AdminCloudCard } from "./admin-cloud-card";
import { AdminSwitchCard } from "./admin-switch-card";
import { AdminLinkButton } from "./admin-link-button";
import { Settings } from "lucide-react";
import { DoorOpen } from "lucide-react";
import { UserRound } from "lucide-react";
import type { AdminSettingsDictionary } from "@/i18n/dictionaries";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

// type AdminInfoProps = {
//   name: string;
//   username: string;
//   status: string;
//   avatarSrc?: string;
//   role: string;
// };
type AdminPopoverProps = {
  dictionary: AdminSettingsDictionary;
  name: string;
  avatarSrc: string;
  username: string;
  status: "online" | "offline";
  role: string;
};
export function AdminPopover({
  dictionary,
  name,
  avatarSrc,
  role,
}: AdminPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" />}
        className="h-auto rounded-4xl! hover:text-primary"
      >
        <AdminAvatar name={name} avatarSrc={avatarSrc} />
      </PopoverTrigger>

      <PopoverPositioner align="center">
        <PopoverContent className="relative sm:w-80 w-72 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="leading-none font-medium capitalize text-center">
                {name}
              </h4>

              <p className="text-muted-foreground text-xs text-center">
                {role}
              </p>
            </div>

            <Separator />

            <AdminCloudCard dictionary={dictionary} />

            <Separator />

            <div className="flex flex-col w-full">
              <AdminSwitchCard dictionary={dictionary} />
            </div>

            <Separator />

            <div className="flex flex-col gap-1">
              <AdminLinkButton
                variant="ghost"
                href="admin/account/settings"
                text={dictionary.links.accountSettings}
              >
                <Settings data-icon="inline-end" />
              </AdminLinkButton>

              <AdminLinkButton
                variant="secondary"
                href="admin/public-page"
                text={dictionary.links.publicPage}
                socialBadge="5"
              >
                <UserRound data-icon="inline-end" />
              </AdminLinkButton>

              <AdminLinkButton
                href="admin/logout"
                text={dictionary.links.logout}
                variant="ghost"
              >
                <DoorOpen data-icon="inline-end" />
              </AdminLinkButton>
            </div>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
