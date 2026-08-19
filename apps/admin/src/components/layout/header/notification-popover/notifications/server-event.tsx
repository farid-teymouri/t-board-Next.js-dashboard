import Link from "next/link";
import { Server } from "lucide-react";

import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { NotificationBadge } from "../components/notification-badge";
import type { NotificationType } from "../notification-types";

export type ServerEventType = "high-cpu" | "high-memory" | "down" | "backup";
type ServerEventProps = {
  username: string;
  event: ServerEventType;
  title: string;
  description: string;
  createdAt: string;
  types: NotificationType[];
};

export function ServerEvent({
  username,
  event,
  title,
  createdAt,
  description,
  types,
}: ServerEventProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        className="rounded-none px-4 py-2"
        render={
          <Link href="#">
            <Server className="size-5 dark:text-sky-500 text-blue-500" />

            <ItemContent className="space-y-1 ">
              <div className="flex justify-end w-full">
                <span className="text-xs"> {createdAt}</span>
              </div>

              <ItemDescription className="text-wrap">
                {description}
              </ItemDescription>

              <div className="flex flex-wrap gap-1 items-center">
                {types.map((type) => (
                  <NotificationBadge key={type} type={type} />
                ))}
              </div>
            </ItemContent>
          </Link>
        }
      />
    </div>
  );
}
