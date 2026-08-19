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
    variant: "outline",
  },

  media: {
    variant: "outline",
  },

  server: {
    variant: "outline",
  },

  share: {
    variant: "outline",
  },
} as const;

export type NotificationType = keyof typeof notificationBadges;

export type NotificationFilter = "all" | "others" | NotificationFilterType;
