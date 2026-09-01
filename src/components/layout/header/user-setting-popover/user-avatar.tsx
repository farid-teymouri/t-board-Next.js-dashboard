import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type UserAvatarProps = {
  name: string;
  avatarSrc?: string;
};

export function UserAvatar({ name, avatarSrc }: UserAvatarProps) {
  return (
    <div className="flex w-full  flex-row justify-between items-center gap-3 py-1">
      <Avatar className="size-8 block ">
        <AvatarImage src={avatarSrc} alt={name} role="img" />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>{" "}
      <Settings className="size-5 ms-1" />
    </div>
  );
}
