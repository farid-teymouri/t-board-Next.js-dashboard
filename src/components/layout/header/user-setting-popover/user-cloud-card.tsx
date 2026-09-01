"use client";

import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import type { UserSettingsDictionary } from "@/i18n/dictionaries";
import type { UserStorage } from "@/app/api/types/storage";

import "./user-cloud-card.css";

type UserCloudCardProps = {
  dictionary: UserSettingsDictionary;
};

export function UserCloudCard({ dictionary }: UserCloudCardProps) {
  const {
    data: storage,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin", "storage"],
    queryFn: () => apiGet<UserStorage>("/api/storage"),
  });

  if (isPending || isError || !storage) {
    return null;
  }

  const usagePercent = Math.min(
    Math.round((storage.usedBytes / storage.totalBytes) * 100),
    100,
  );

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="space-y-2">
        <CardTitle>
          <h3 className="text-lg font-medium leading-none">
            {dictionary.cloudCard.title}
          </h3>
        </CardTitle>

        <CardDescription className="space-y-2">
          <h4 className="flex flex-row gap-1">
            <span className="text-primary">{usagePercent}%</span>

            <p>{dictionary.cloudCard.usage}</p>
          </h4>

          <Progress value={usagePercent} className="w-full max-w-sm" />
        </CardDescription>
      </CardHeader>

      <CardContent className="relative -mb-(--card-spacing) flex h-20 flex-col justify-between overflow-hidden p-3">
        <Button className="w-fit p-4">{dictionary.cloudCard.settings}</Button>

        <div className="user-card-content rtl:before:-left-10 ltr:before:-right-10 rtl:after:-left-32.5 ltr:after:-right-32.5" />
      </CardContent>
    </Card>
  );
}
