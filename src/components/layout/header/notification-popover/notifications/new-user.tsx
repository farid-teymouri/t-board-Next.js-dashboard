import { UserPlus } from "lucide-react";

import { NotificationItem } from "../components/notification-item";
import type { NotificationType } from "../notification-types";

type NewUserProps = {
  username: string;
  types: NotificationType[];
  createdAt: string;
  dictionary: {
    message: string;
  };
  badgeDictionary: Record<NotificationType, string>;
};

export function NewUser({
  username,
  createdAt,
  types,
  dictionary,
  badgeDictionary,
}: NewUserProps) {
  const message = dictionary.message.replace("{username}", username);

  return (
    <NotificationItem
      icon={<UserPlus className="size-5" />}
      description={message}
      createdAt={createdAt}
      types={types}
      badgeDictionary={badgeDictionary}
    />
  );
}
