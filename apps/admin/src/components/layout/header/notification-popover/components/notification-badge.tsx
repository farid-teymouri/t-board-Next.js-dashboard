import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import {
  notificationBadges,
  type NotificationType,
} from "../notification-types";

type NotificationBadgeProps = {
  type: NotificationType;
};

export function NotificationBadge({ type }: NotificationBadgeProps) {
  const notification = notificationBadges[type];

  if (notification.variant === "link") {
    return (
      <Badge
        variant="link"
        className="text-primary underline"
        // render={<Link href={notification.href}>{notification.label}</Link>}
      >
        <span className="pb-1"> {notification.label}</span>
      </Badge>
    );
  }
  if (notification.variant === "destructive") {
    return (
      <Badge
        className="dark:bg-rose-600 bg-red-700  dark:text-foreground text-white items-center"
        variant={notification.variant}
      >
        <span className="pb-1"> {notification.label}</span>
      </Badge>
    );
  }

  return (
    <Badge className="items-center" variant={notification.variant}>
      <span className="pb-1"> {notification.label}</span>
    </Badge>
  );
}
