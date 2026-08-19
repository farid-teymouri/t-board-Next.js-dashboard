import { Share2 } from "lucide-react";

import { NotificationItem } from "../components/notification-item";
import type { NotificationType } from "../notification-types";

type SharedPostProps = {
  username: string;
  types: NotificationType[];
  social: string;
  createdAt: string;
  dictionary: {
    message: string;
  };
  badgeDictionary: Record<NotificationType, string>;
};

export function SharedPost({
  username,
  types,
  createdAt,
  social,
  dictionary,
  badgeDictionary,
}: SharedPostProps) {
  const message = dictionary.message
    .replace("{username}", username)
    .replace("{social}", social);

  return (
    <NotificationItem
      icon={<Share2 className="size-5 text-pink-500 dark:text-pink-500" />}
      description={message}
      createdAt={createdAt}
      types={types}
      badgeDictionary={badgeDictionary}
    />
  );
}
