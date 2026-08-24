import { Server } from "lucide-react";

import { NotificationItem } from "../components/notification-item";
import type { NotificationType } from "../notification-types";

type ServerEventProps = {
  description: string;
  createdAt: string;
  types: NotificationType[];
  badgeDictionary: Record<NotificationType, string>;
};

export function ServerEvent({
  description,
  createdAt,
  types,
  badgeDictionary,
}: ServerEventProps) {
  return (
    <NotificationItem
      icon={<Server className="size-5 text-blue-500 dark:text-sky-500" />}
      description={description}
      createdAt={createdAt}
      types={types}
      badgeDictionary={badgeDictionary}
    />
  );
}
