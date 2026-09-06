import type { NotificationType } from "@/types/notifications";

export const notificationFilters = {
  new: {
    variant: "default",
  },
  unread: {
    variant: "secondary",
  },
  pending: {
    variant: "link",
  },
  financial: {
    variant: "default",
  },
  warning: {
    variant: "destructive",
  },
} as const;

export type NotificationFilterType = keyof typeof notificationFilters;

export const notificationBadges = {
  ...notificationFilters,

  forum: {
    variant: "ghost",
  },

  media: {
    variant: "ghost",
  },

  server: {
    variant: "ghost",
  },

  share: {
    variant: "ghost",
  },
} as const;

export type NotificationFilter = "all" | "others" | NotificationFilterType;

export type { NotificationType };
