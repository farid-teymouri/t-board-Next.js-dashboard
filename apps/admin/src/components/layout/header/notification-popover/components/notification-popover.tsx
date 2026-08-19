"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  notificationFilters,
  type NotificationType,
  type NotificationFilter,
} from "../notification-types";

import { NotificationClassSelector } from "./notification-class-selector";
import { NewUser } from "../notifications/new-user";
import { SharedPost } from "../notifications/shared-post";
import { ServerEvent } from "../notifications/server-event";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@/components/ui/popover";

type BaseNotification = {
  id: number;
  username: string;
  types: NotificationType[];
  createdAt: string;
};

type NewUserNotification = BaseNotification & {
  type: "new-user";
};

type SharedPostNotification = BaseNotification & {
  type: "shared-post";
  social: string;
};

type ServerEventNotification = BaseNotification & {
  type: "server-event";
  event: "high-cpu" | "high-memory" | "down" | "backup";
  title: string;
  description: string;
};

type Notification =
  | NewUserNotification
  | SharedPostNotification
  | ServerEventNotification;
const notifications: Notification[] = [
  {
    id: 1,
    type: "new-user",
    username: "farima23",
    types: ["new", "unread"],
    createdAt: "7 دقیقه پیش",
  },

  {
    id: 2,
    type: "server-event",
    username: "admin",
    event: "high-cpu",
    title: "مصرف پردازنده بالا",
    description: "هشدار: پردازنده تا ۹۲٪ اشغال شده",
    types: ["server", "warning"],
    createdAt: "15 دقیقه پیش",
  },

  {
    id: 3,
    type: "shared-post",
    username: "nilofare_abi",
    social: "facebook",
    types: ["share"],
    createdAt: "32 دقیقه پیش",
  },

  {
    id: 4,
    type: "new-user",
    username: "abasi8744",
    types: ["unread"],
    createdAt: "1 ساعت پیش",
  },
];
export function NotificationPopover() {
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "others"
        ? notifications.filter((notification) =>
            notification.types.some((type) => !(type in notificationFilters)),
          )
        : notifications.filter((notification) =>
            notification.types.includes(filter),
          );

  return (
    <Popover>
      <PopoverTrigger
        className="w-8.5 h-8.5 hover:text-primary"
        render={<Button variant="outline" size="icon" aria-label="اعلان‌ها" />}
      >
        <Bell />
      </PopoverTrigger>

      <PopoverPositioner>
        <PopoverContent className="relative top-1 max-h-[calc(100vh-2rem)] w-80 space-y-3 overflow-y-auto p-0">
          <div className="grid gap-2 p-4 pb-0">
            <div className="flex flex-row items-center justify-between space-y-1">
              <h5 className="text-md font-medium leading-none capitalize">
                اعلان‌های اخیر
              </h5>

              <Button variant="link" className="p-0 text-xs text-primary">
                همه را خواندم
              </Button>
            </div>

            <NotificationClassSelector
              value={filter}
              onValueChange={setFilter}
            />
          </div>

          <div className="grid p-0">
            <Separator />
            {filteredNotifications.map((notification, index) => (
              <div key={notification.id}>
                {notification.type === "new-user" && (
                  <NewUser
                    username={notification.username}
                    types={notification.types}
                    createdAt={notification.createdAt}
                  />
                )}
                {notification.type === "server-event" && (
                  <ServerEvent
                    username={notification.username}
                    event={notification.event}
                    title={notification.title}
                    description={notification.description}
                    types={notification.types}
                    createdAt={notification.createdAt}
                  />
                )}
                {notification.type === "shared-post" && (
                  <SharedPost
                    username={notification.username}
                    social={notification.social}
                    types={notification.types}
                    createdAt={notification.createdAt}
                  />
                )}

                {index < filteredNotifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
