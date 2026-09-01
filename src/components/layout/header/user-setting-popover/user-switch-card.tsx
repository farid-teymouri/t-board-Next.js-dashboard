"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";

import { apiGet } from "@/lib/api/client";

import type { UserSettingsDictionary } from "@/i18n/dictionaries";
import type { UserPreferences } from "@/app/api/types/preferences";

import { UserSwitchers } from "@/components/layout/header/user-setting-popover/user-switchers";

type UserSwitchCardProps = {
  dictionary: UserSettingsDictionary;
};

export function UserSwitchCard({ dictionary }: UserSwitchCardProps) {
  const {
    data: preferences,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "preferences"],
    queryFn: () => apiGet<UserPreferences>("/api/preferences"),
  });

  const [notifications, setNotifications] =
    useState<UserPreferences["notifications"]>();

  if (isPending || isError || !preferences) {
    return null;
  }

  const currentNotifications = notifications ?? preferences.notifications;

  const updateNotification = (
    key: keyof UserPreferences["notifications"],
    checked: boolean,
  ) => {
    setNotifications((current) => ({
      ...(current ?? preferences.notifications),
      [key]: checked,
    }));
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="flex flex-col space-y-3">
        <UserSwitchers
          id="sms-notification"
          text={dictionary.switchCard.sms}
          checked={currentNotifications.sms}
          onCheckedChange={(checked) => updateNotification("sms", checked)}
        />

        <UserSwitchers
          id="email-notification"
          text={dictionary.switchCard.email}
          checked={currentNotifications.email}
          onCheckedChange={(checked) => updateNotification("email", checked)}
        />
      </CardContent>
    </Card>
  );
}
