import type { ServerEventNotification } from "@/types/notifications";

import type { NotificationDictionary } from "../types/dictionary";

export function getServerEventDictionary(
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
