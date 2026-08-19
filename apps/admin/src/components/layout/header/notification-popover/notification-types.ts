export const notificationFilters = {
  new: {
    label: "جدید",
    variant: "default",
  },

  unread: {
    label: "دیده نشده",
    variant: "secondary",
  },

  pending: {
    label: "در انتظار تأیید",
    variant: "link",
    // href: "/notifications/list/pending",
  },

  financial: {
    label: "مالی",
    variant: "default",
  },

  warning: {
    label: "هشدار",
    variant: "destructive",
  },
} as const;

export type NotificationFilterType = keyof typeof notificationFilters;

export const notificationBadges = {
  ...notificationFilters,

  forum: {
    label: "انجمن",
    variant: "outline",
  },

  media: {
    label: "مدیا",
    variant: "outline",
  },

  server: {
    label: "سرور",
    variant: "outline",
  },

  share: {
    label: "اشتراک گذاری",
    variant: "outline",
  },
} as const;

export type NotificationType = keyof typeof notificationBadges;

export type NotificationFilter = "all" | "others" | NotificationFilterType;
