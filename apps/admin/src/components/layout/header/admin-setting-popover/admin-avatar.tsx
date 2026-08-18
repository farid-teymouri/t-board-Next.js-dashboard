import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type AdminAvatarProps = {
  name: string;
  avatarSrc?: string;
};

export function AdminAvatar({ name, avatarSrc }: AdminAvatarProps) {
  return (
    <div className="flex w-full  flex-row justify-between items-center gap-3 py-1 ">
      <Settings className="size-5 ms-1" />

      <Avatar className="size-8 block ">
        <AvatarImage src={avatarSrc} alt={name} role="img" />
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
