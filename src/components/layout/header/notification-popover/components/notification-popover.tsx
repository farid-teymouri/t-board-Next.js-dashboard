"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import { apiGet } from "@/lib/api/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { NotificationClassSelector } from "./notification-class-selector";
import { filterNotifications } from "../utils/notification-filter";
import { NotificationRenderer } from "./notification-renderer";

import type { NotificationFilter } from "../notification-types";

import type {
  NotificationDictionary,
  TimeDictionary,
} from "../types/dictionary";

import type { UserNotificationsResponse } from "@/app/api/types/notifications";

import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

type NotificationPopoverProps = {
  dictionary: NotificationDictionary;
  timeDictionary: TimeDictionary;
};

export function NotificationPopover({
  dictionary,
  timeDictionary,
}: NotificationPopoverProps) {
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const {
    data: notifications,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user", "notifications"],
    queryFn: () => apiGet<UserNotificationsResponse>("/api/notifications"),
  });

  if (isPending || isError || !notifications) {
    return null;
  }

  const filteredNotifications = filterNotifications(notifications, filter);

  return (
    <Popover>
      <PopoverTrigger
        className="h-8.5 w-8.5"
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={dictionary.popover.ariaLabel}
          />
        }
      >
        <Bell />
      </PopoverTrigger>

      <PopoverPositioner align="center">
        <PopoverContent className="relative top-1 max-h-[calc(100vh-2rem)] w-72 space-y-3 overflow-y-auto p-0 sm:w-80">
          <div className="grid gap-2 p-4 pb-0">
            <div className="flex items-center justify-between space-y-1">
              <h5 className="text-md font-medium leading-none">
                {dictionary.popover.title}
              </h5>

              <Button variant="link" className="p-0 text-xs">
                {dictionary.popover.markAllAsRead}
              </Button>
            </div>

            <NotificationClassSelector
              value={filter}
              onValueChange={setFilter}
              dictionary={dictionary}
            />
          </div>

          <div className="grid p-0">
            <Separator />

            {filteredNotifications.map((notification, index) => (
              <div key={notification.id}>
                <NotificationRenderer
                  notification={notification}
                  dictionary={dictionary}
                  timeDictionary={timeDictionary}
                />

                {index < filteredNotifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
