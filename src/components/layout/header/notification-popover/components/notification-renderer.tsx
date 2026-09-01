import { NewUser } from "../notifications/new-user";
import { ServerEvent } from "../notifications/server-event";
import { SharedPost } from "../notifications/shared-post";

import { formatNotificationTime } from "../utils/notification-time";
import { getServerEventDictionary } from "../utils/server-event";

import type { Notification } from "@/app/api/admin/types/notifications";
import type {
  NotificationDictionary,
  TimeDictionary,
} from "../types/dictionary";

type NotificationRendererProps = {
  notification: Notification;
  dictionary: NotificationDictionary;
  timeDictionary: TimeDictionary;
};

export function NotificationRenderer({
  notification,
  dictionary,
  timeDictionary,
}: NotificationRendererProps) {
  const createdAt = formatNotificationTime(
    notification.createdAt,
    timeDictionary,
  );

  if (notification.type === "new-user") {
    return (
      <NewUser
        username={notification.username}
        types={notification.types}
        createdAt={createdAt}
        dictionary={dictionary.newUser}
        badgeDictionary={dictionary.badge}
      />
    );
  }

  if (notification.type === "server-event") {
    const { description } = getServerEventDictionary(
      notification,
      dictionary.serverEvent,
    );

    return (
      <ServerEvent
        description={description}
        types={notification.types}
        createdAt={createdAt}
        badgeDictionary={dictionary.badge}
      />
    );
  }

  if (notification.type === "shared-post") {
    return (
      <SharedPost
        username={notification.username}
        social={notification.social}
        types={notification.types}
        createdAt={createdAt}
        dictionary={dictionary.sharedPost}
        badgeDictionary={dictionary.badge}
      />
    );
  }

  return null;
}
