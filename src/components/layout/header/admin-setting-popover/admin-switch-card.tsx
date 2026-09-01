"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "@/components/ui/card";

import { apiGet } from "@/lib/api/client";

import type { AdminSettingsDictionary } from "@/i18n/dictionaries";
import type { AdminPreferences } from "@/app/api/admin/types/preferences";

import { AdminSwitchers } from "@/components/layout/header/admin-setting-popover/admin-switchers";

type AdminSwitchCardProps = {
  dictionary: AdminSettingsDictionary;
};

export function AdminSwitchCard({ dictionary }: AdminSwitchCardProps) {
  const {
    data: preferences,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "preferences"],
    queryFn: () => apiGet<AdminPreferences>("/api/admin/preferences"),
  });

  const [notifications, setNotifications] =
    useState<AdminPreferences["notifications"]>();

  if (isPending || isError || !preferences) {
    return null;
  }

  const currentNotifications = notifications ?? preferences.notifications;

  const updateNotification = (
    key: keyof AdminPreferences["notifications"],
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
        <AdminSwitchers
          id="sms-notification"
          text={dictionary.switchCard.sms}
          checked={currentNotifications.sms}
          onCheckedChange={(checked) => updateNotification("sms", checked)}
        />

        <AdminSwitchers
          id="email-notification"
          text={dictionary.switchCard.email}
          checked={currentNotifications.email}
          onCheckedChange={(checked) => updateNotification("email", checked)}
        />
      </CardContent>
    </Card>
  );
}
