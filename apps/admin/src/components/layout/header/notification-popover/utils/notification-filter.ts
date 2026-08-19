import {
  notificationFilters,
  type NotificationFilter,
} from "../notification-types";

import type { Notification } from "../types/notification";

export function filterNotifications(
  notifications: Notification[],
  filter: NotificationFilter,
) {
  if (filter === "all") {
    return notifications;
  }

  if (filter === "others") {
    return notifications.filter((notification) =>
      notification.types.some((type) => !(type in notificationFilters)),
    );
  }

  return notifications.filter((notification) =>
    notification.types.includes(filter),
  );
}
