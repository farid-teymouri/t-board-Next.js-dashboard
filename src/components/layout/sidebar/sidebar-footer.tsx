"use client";

import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { apiGet } from "@/lib/api/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

import type { UserProfile } from "@/app/api/types/profile";

type UserSidebarFooterProps = {
  logoutLabel: string;
};

export function UserSidebarFooter({ logoutLabel }: UserSidebarFooterProps) {
  const {
    data: profile,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => apiGet<UserProfile>("/api/profile"),
  });

  if (isPending || isError || !profile) {
    return null;
  }

  return (
    <div className="flex w-full flex-row items-center justify-between gap-3 group-data-[collapsible=icon]:justify-center">
      <div className="flex min-w-0 flex-row items-center gap-3 group-data-[collapsible=icon]:hidden">
        <Avatar className="size-9 shrink-0">
          <AvatarImage
            src={profile.avatarSrc ?? undefined}
            alt={profile.name}
          />

          <AvatarFallback>
            {profile.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium leading-tight">
            {profile.username}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {profile.email}
          </p>
        </div>
      </div>

      <Link
        href="#"
        aria-label={logoutLabel}
        className={buttonVariants({
          variant: "destructive",
          size: "icon",
        })}
      >
        <LogOut className="size-4 rtl:rotate-180!" />
      </Link>
    </div>
  );
}
