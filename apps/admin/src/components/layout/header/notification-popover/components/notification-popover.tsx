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

type NotificationTime = {
  value: number;
  unit: "now" | "seconds" | "minute" | "minutes" | "hour" | "hours";
};
type BaseNotification = {
  id: number;
  username: string;
  types: NotificationType[];
  createdAt: NotificationTime;
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
  cpuUsage?: number;
};
type NotificationBadgeDictionary = Record<
  NotificationType | "all" | "others",
  string
>;
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
    createdAt: {
      value: 7,
      unit: "minutes",
    },
  },

  {
    id: 2,
    type: "server-event",
    username: "admin",
    event: "high-cpu",
    cpuUsage: 92,
    types: ["server", "warning"],
    createdAt: {
      value: 15,
      unit: "minutes",
    },
  },

  {
    id: 3,
    type: "shared-post",
    username: "nilofare_abi",
    social: "facebook",
    types: ["share"],
    createdAt: {
      value: 32,
      unit: "minutes",
    },
  },

  {
    id: 4,
    type: "new-user",
    username: "abasi8744",
    types: ["unread"],
    createdAt: {
      value: 1,
      unit: "hour",
    },
  },
];
type ServerEventDictionary = {
  title: string;
  description: string;
};
type NotificationDictionary = {
  badge: NotificationBadgeDictionary;

  classSelector: {
    placeholder: string;
    label: string;
  };

  popover: {
    title: string;
    markAllAsRead: string;
    ariaLabel: string;
  };

  newUser: {
    message: string;
  };

  sharedPost: {
    message: string;
  };

  serverEvent: {
    highCpu: ServerEventDictionary;
    highMemory: ServerEventDictionary;
    down: ServerEventDictionary;
    backup: ServerEventDictionary;
  };
};
type TimeDictionary = {
  now: string;
  seconds: string;
  minute: string;
  minutes: string;
  hour: string;
  hours: string;
};
type NotificationPopoverProps = {
  dictionary: NotificationDictionary;
  timeDictionary: TimeDictionary;
};

function formatNotificationTime(
  createdAt: NotificationTime,
  dictionary: TimeDictionary,
) {
  if (createdAt.unit === "now") {
    return dictionary.now;
  }

  return dictionary[createdAt.unit].replace("{value}", String(createdAt.value));
}

export function NotificationPopover({
  dictionary,
  timeDictionary,
}: NotificationPopoverProps) {
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

  function getServerEventDictionary(
    notification: ServerEventNotification,
    dictionary: NotificationDictionary["serverEvent"],
  ) {
    const eventDictionary = {
      "high-cpu": dictionary.highCpu,
      "high-memory": dictionary.highMemory,
      down: dictionary.down,
      backup: dictionary.backup,
    }[notification.event];

    return {
      title: eventDictionary.title,
      description: eventDictionary.description.replace(
        "{percent}",
        String(notification.cpuUsage ?? ""),
      ),
    };
  }

  return (
    <Popover>
      <PopoverTrigger
        className="w-8.5 h-8.5 hover:text-primary"
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

      <PopoverPositioner>
        <PopoverContent className="relative top-1 max-h-[calc(100vh-2rem)] w-80 space-y-3 overflow-y-auto p-0">
          <div className="grid gap-2 p-4 pb-0">
            <div className="flex flex-row items-center justify-between space-y-1">
              <h5 className="text-md font-medium leading-none capitalize">
                {dictionary.popover.title}
              </h5>

              <Button variant="link" className="p-0 text-xs text-primary">
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
                {notification.type === "new-user" && (
                  <NewUser
                    username={notification.username}
                    types={notification.types}
                    createdAt={formatNotificationTime(
                      notification.createdAt,
                      timeDictionary,
                    )}
                    dictionary={dictionary.newUser}
                    badgeDictionary={dictionary.badge}
                  />
                )}
                {notification.type === "server-event" && (
                  <ServerEvent
                    // event={notification.event}
                    // title={
                    //   getServerEventDictionary(
                    //     notification,
                    //     dictionary.serverEvent,
                    //   ).title
                    // }
                    description={
                      getServerEventDictionary(
                        notification,
                        dictionary.serverEvent,
                      ).description
                    }
                    types={notification.types}
                    createdAt={formatNotificationTime(
                      notification.createdAt,
                      timeDictionary,
                    )}
                    badgeDictionary={dictionary.badge}
                  />
                )}
                {notification.type === "shared-post" && (
                  <SharedPost
                    username={notification.username}
                    social={notification.social}
                    types={notification.types}
                    createdAt={formatNotificationTime(
                      notification.createdAt,
                      timeDictionary,
                    )}
                    dictionary={dictionary.sharedPost}
                    badgeDictionary={dictionary.badge}
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
