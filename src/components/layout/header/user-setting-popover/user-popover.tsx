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

import type { UserSettingsDictionary } from "@/i18n/dictionaries";
import type { UserProfile } from "@/app/api/types/profile";
import type { UserDashboardUnreadCount } from "@/app/api/types/public-page/unread-count";

import { UserAvatar } from "./user-avatar";
import { UserCloudCard } from "./user-cloud-card";
import { UserSwitchCard } from "./user-switch-card";
import { UserLinkButton } from "./user-link-button";

type UserPopoverProps = {
  dictionary: UserSettingsDictionary;
};

export function UserPopover({ dictionary }: UserPopoverProps) {
  const {
    data: profile,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => apiGet<UserProfile>("/api/profile"),
  });

  const { data: dashboardUnreadCount } = useQuery({
    queryKey: ["admin", "dashboard", "unread-count"],
    queryFn: () =>
      apiGet<UserDashboardUnreadCount>("/api/public-page/unread-count"),
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
        <UserAvatar
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

            <UserCloudCard dictionary={dictionary} />

            <Separator className="bg-accent" />

            <div className="flex w-full flex-col">
              <UserSwitchCard dictionary={dictionary} />
            </div>

            <Separator className="bg-accent" />

            <div className="flex flex-col gap-1">
              <UserLinkButton
                variant="ghost"
                href="/api/account/settings"
                text={dictionary.links.accountSettings}
              >
                <Settings data-icon="inline-end" />
              </UserLinkButton>

              <UserLinkButton
                variant="secondary"
                href="/api/public-page"
                text={dictionary.links.publicPage}
                socialBadge={
                  dashboardUnreadCount?.unreadCount
                    ? String(dashboardUnreadCount.unreadCount)
                    : undefined
                }
              >
                <UserRound data-icon="inline-end" />
              </UserLinkButton>

              <UserLinkButton
                href="/api/logout"
                text={dictionary.links.logout}
                variant="ghost"
              >
                <DoorOpen data-icon="inline-end" />
              </UserLinkButton>
            </div>
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
