import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminAvatar } from "./admin-avatar";
import { AdminCloudCard } from "./admin-cloud-card";
import { AdminSwitchCard } from "./admin-switch-card";
import { AdminLinkButton } from "./admin-link-button";
import { Settings } from "lucide-react";
import { DoorOpen } from "lucide-react";
import { UserRound } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

type AdminInfoProps = {
  name: string;
  username: string;
  status: string;
  avatarSrc?: string;
  role: string;
};

export function AdminPopover({ name, avatarSrc, role }: AdminInfoProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" />}
        className="h-auto rounded-4xl!"
      >
        <AdminAvatar name={name} avatarSrc={avatarSrc} />
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent className="relative w-80 max-h-[calc(100vh-2rem)] overflow-y-auto">
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

            <AdminCloudCard />

            <Separator />

            <div className="flex flex-col w-full">
              <AdminSwitchCard />
            </div>

            <Separator />

            <div className="flex flex-col gap-1">
              <AdminLinkButton
                variant="ghost"
                href="admin/account/settings"
                text="تنظیمات حساب"
              >
                <Settings data-icon="inline-end" />
              </AdminLinkButton>

              <AdminLinkButton
                variant="secondary"
                href="admin/public-page"
                text="صفحه عمومی"
                socialBadge="5"
              >
                <UserRound data-icon="inline-end" />
              </AdminLinkButton>

              <AdminLinkButton href="admin/logout" text="خروج" variant="ghost">
                <DoorOpen data-icon="inline-end" />
              </AdminLinkButton>
            </div>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
