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
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        className="rounded-none px-4 py-2"
        render={
          <Link href="#">
            <Share2 className="size-5 text-pink-500 dark:text-pink-500" />

            <ItemContent className="space-y-1">
              <div className="flex w-full justify-end">
                <span className="text-xs">{createdAt}</span>
              </div>

              <ItemDescription className="text-wrap">{message}</ItemDescription>

              <div className="flex flex-wrap gap-1">
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
