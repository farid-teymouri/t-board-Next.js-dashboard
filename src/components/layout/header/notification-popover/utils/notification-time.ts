import type { NotificationTime } from "@/app/api/types/notifications";

import type { TimeDictionary } from "../types/dictionary";

export function formatNotificationTime(
  createdAt: NotificationTime,
  dictionary: TimeDictionary,
) {
  if (createdAt.unit === "now") {
    return dictionary.now;
  }

  return dictionary[createdAt.unit].replace("{value}", String(createdAt.value));
}
