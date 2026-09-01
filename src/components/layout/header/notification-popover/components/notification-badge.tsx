import { Badge } from "@/components/ui/badge";
import { SoftBadge } from "@/components/ui/soft-badge";
import {
  notificationBadges,
  type NotificationType,
} from "../notification-types";

type NotificationBadgeProps = {
  type: NotificationType;
  dictionary: Record<NotificationType, string>;
};

export function NotificationBadge({
  type,
  dictionary,
}: NotificationBadgeProps) {
  const notification = notificationBadges[type];

  if (notification.variant === "link") {
    return (
      <Badge variant="link" className="text-primary underline">
        <span className="rtl:pb-1">{dictionary[type]}</span>
      </Badge>
    );
  }

  // if (notification.variant === "destructive") {
  //   return (
  //     <Badge
  //       variant="destructive"
  //       className="items-center bg-red-700 text-white dark:bg-rose-600 dark:text-foreground"
  //     >
  //       <span className="rtl:pb-1 ">{dictionary[type]}</span>
  //     </Badge>
  //   );
  // }

  return (
    <SoftBadge className="items-center" variant={notification.variant}>
      <span className="rtl:pb-1 ">{dictionary[type]}</span>
    </SoftBadge>
  );
}
