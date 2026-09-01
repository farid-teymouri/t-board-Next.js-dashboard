import type { ReactNode } from "react";
import Link from "next/link";

import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

import { NotificationBadge } from "./notification-badge";

import type { NotificationType } from "../notification-types";

type NotificationItemProps = {
  icon: ReactNode;
  description: string;
  createdAt: string;
  types: NotificationType[];
  badgeDictionary: Record<NotificationType, string>;
};

export function NotificationItem({
  icon,
  description,
  createdAt,
  types,
  badgeDictionary,
}: NotificationItemProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        className="rounded-none px-4 py-2"
        render={
          <Link href="#">
            {icon}

            <ItemContent className="space-y-1">
              <div className="flex w-full justify-end">
                <span className="text-xs">{createdAt}</span>
              </div>

              <ItemDescription className="text-wrap">
                {description}
              </ItemDescription>

              <div className="space-x-2">
                {types.map((type) => (
                  <NotificationBadge
                    key={type}
                    type={type}
                    dictionary={badgeDictionary}
                  />
                ))}
              </div>
            </ItemContent>
          </Link>
        }
      />
    </div>
  );
}
