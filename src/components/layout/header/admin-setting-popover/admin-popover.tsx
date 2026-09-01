"use client";

import { useQuery } from "@tanstack/react-query";
import { DoorOpen, Settings, UserRound } from "lucide-react";

import { apiGet } from "@/lib/api/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { AdminSettingsDictionary } from "@/i18n/dictionaries";
import type { AdminProfile } from "@/app/api/admin/types/profile";
import type { AdminDashboardUnreadCount } from "@/app/api/admin/types/dashboard";

import { AdminAvatar } from "./admin-avatar";
import { AdminCloudCard } from "./admin-cloud-card";
import { AdminSwitchCard } from "./admin-switch-card";
import { AdminLinkButton } from "./admin-link-button";

type AdminPopoverProps = {
  dictionary: AdminSettingsDictionary;
};

export function AdminPopover({ dictionary }: AdminPopoverProps) {
  const {
    data: profile,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => apiGet<AdminProfile>("/api/admin/profile"),
  });

  const { data: dashboardUnreadCount } = useQuery({
    queryKey: ["admin", "dashboard", "unread-count"],
    queryFn: () =>
      apiGet<AdminDashboardUnreadCount>("/api/admin/dashboard/unread-count"),
  });

  if (isPending) {
    return null;
  }

  if (isError || !profile) {
    return null;
  }

  const roleLabel = dictionary.profile.role[profile.role];
  const statusLabel = dictionary.profile.status[profile.status];

  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline" />}
        className="h-auto rounded-4xl!"
      >
        <AdminAvatar
          name={profile.name}
          avatarSrc={profile.avatarSrc ?? undefined}
        />
      </PopoverTrigger>

      <PopoverPositioner align="center">
        <PopoverContent className="relative max-h-[calc(100vh-2rem)] w-72 overflow-y-auto sm:w-80">
          <div className="grid gap-4">
            <div className="space-y-1">
              <h4 className="text-center font-medium capitalize leading-none">
                {profile.name}
              </h4>

              <p className="text-center text-xs text-muted-foreground">
                {roleLabel}
              </p>

              <span className="sr-only">{statusLabel}</span>
            </div>

            <Separator className="bg-accent" />

            <AdminCloudCard dictionary={dictionary} />

            <Separator className="bg-accent" />

            <div className="flex w-full flex-col">
              <AdminSwitchCard dictionary={dictionary} />
            </div>

            <Separator className="bg-accent" />

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
                socialBadge={
                  dashboardUnreadCount?.unreadCount
                    ? String(dashboardUnreadCount.unreadCount)
                    : undefined
                }
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
