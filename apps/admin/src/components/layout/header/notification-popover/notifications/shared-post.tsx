import { NotificationBadge } from "../components/notification-badge";
import type { NotificationType } from "../notification-types";
import Link from "next/link";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { Share2 } from "lucide-react";
type SharedPostProps = {
  username: string;
  types: NotificationType[];
  social: string;
  createdAt: string;
};

export function SharedPost({
  username,
  types,
  createdAt,
  social,
}: SharedPostProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 ">
      <Item
        className="px-4 py-2 rounded-none"
        render={
          <Link href="#">
            <Share2 className="size-5 dark:text-pink-500 text-pink-500" />
            <ItemContent className="space-y-1">
              <div className="flex justify-end w-full">
                <span className="text-xs"> {createdAt}</span>
              </div>
              <ItemDescription className="text-wrap">
                کاربر
                <span className="mx-1 text-primary">{username}</span>
                پست شما را در
                <span className="mx-1 text-primary ">{social}</span>
                به اشتراک گذاشت.
              </ItemDescription>
              <div className="flex flex-wrap gap-1">
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
