import { NotificationBadge } from "../components/notification-badge";
import type { NotificationType } from "../notification-types";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

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
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        className="rounded-none px-4 py-2"
        render={
          <Link href="#">
            <UserPlus className="size-5" />

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
