import type { NotificationType } from "../notification-types";

export type NotificationBadgeDictionary = Record<
  NotificationType | "all" | "others",
  string
>;

export type ServerEventDictionary = {
  title: string;
  description: string;
};

export type NotificationDictionary = {
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

export type TimeDictionary = {
  now: string;
  seconds: string;
  minute: string;
  minutes: string;
  hour: string;
  hours: string;
};
