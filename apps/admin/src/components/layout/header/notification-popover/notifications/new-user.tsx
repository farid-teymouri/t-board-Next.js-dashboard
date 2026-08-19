import { NotificationBadge } from "../components/notification-badge";
import type { NotificationType } from "../notification-types";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";

type NewUserProps = {
  username: string;
  types: NotificationType[];
  createdAt: string;
};
export function NewUser({ username, createdAt, types }: NewUserProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 ">
      <Item
        className="px-4 py-2 rounded-none "
        render={
          <Link href="#">
            <UserPlus className="size-5" />
            <ItemContent className="space-y-1">
              <div className="flex justify-end w-full">
                <span className="text-xs"> {createdAt}</span>
              </div>
              <ItemDescription className="text-wrap">
                یک کاربر جدید با نام
                <span className="mx-1 text-primary">{username}</span>
                به جمع ما پیوست.
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
